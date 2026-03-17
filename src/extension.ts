import * as vscode from "vscode";
import { TypingTestRunner } from "./runner";
import { HistoryManager } from "./history";
import { HistoryPanel } from "./historyPanel";
import { CodeSnippet } from "./snippets";

export function activate(context: vscode.ExtensionContext) {
  const historyManager = new HistoryManager(context);

  // ─── Start Typing Test ───
  const startCmd = vscode.commands.registerCommand("typespeed.start", async () => {
    const difficulty = await vscode.window.showQuickPick(
      [
        { label: "$(zap) Easy", description: "Short, simple snippets", value: "easy" as const },
        { label: "$(flame) Medium", description: "Functions and classes", value: "medium" as const },
        { label: "$(warning) Hard", description: "Advanced patterns & generics", value: "hard" as const },
        { label: "$(question) Random", description: "Any difficulty", value: undefined },
      ],
      {
        placeHolder: "Select difficulty level",
        title: "TypeSpeed — Choose Difficulty",
      }
    );

    if (difficulty === undefined) {
      return; // user cancelled
    }

    const runner = new TypingTestRunner(historyManager);
    await runner.start(difficulty.value as CodeSnippet["difficulty"] | undefined);
  });

  // ─── View History ───
  const historyCmd = vscode.commands.registerCommand("typespeed.history", () => {
    const panel = new HistoryPanel(historyManager);
    panel.show();
  });

  // ─── Clear History ───
  const clearCmd = vscode.commands.registerCommand("typespeed.clearHistory", async () => {
    const confirm = await vscode.window.showWarningMessage(
      "Clear all TypeSpeed history? This cannot be undone.",
      { modal: true },
      "Clear History"
    );
    if (confirm === "Clear History") {
      await historyManager.clearHistory();
      vscode.window.showInformationMessage("TypeSpeed history cleared.");
    }
  });

  context.subscriptions.push(startCmd, historyCmd, clearCmd);
}

export function deactivate() {}
