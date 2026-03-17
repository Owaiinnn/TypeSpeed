import * as vscode from "vscode";
import { TypingTestRunner } from "./runner";
import { HistoryManager, HistoryPanel } from "./historyPanel";
import { CodeSnippet } from "./snippets";

let statusBarItem: vscode.StatusBarItem;

function updateStatusBar(historyManager: HistoryManager): void {
  const stats = historyManager.getStats();
  if (stats.totalTests === 0) {
    statusBarItem.text = "$(keyboard) TypeSpeed";
    statusBarItem.tooltip = "Click to start a typing test";
  } else {
    const history = historyManager.getHistory();
    const lastWpm = history[0].wpm;
    statusBarItem.text = `$(keyboard) ${lastWpm} WPM | Best: ${stats.bestWpm}`;
    statusBarItem.tooltip = `Last: ${lastWpm} WPM | Best: ${stats.bestWpm} WPM | Avg: ${stats.avgWpm} WPM (${stats.totalTests} tests)\nClick to start a typing test`;
  }
  statusBarItem.show();
}

export function activate(context: vscode.ExtensionContext) {
  const historyManager = new HistoryManager(context);

  // ─── Status Bar ───
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = "typespeed.start";
  updateStatusBar(historyManager);

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

    const runner = new TypingTestRunner(historyManager, () => updateStatusBar(historyManager));
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
      updateStatusBar(historyManager);
      vscode.window.showInformationMessage("TypeSpeed history cleared.");
    }
  });

  context.subscriptions.push(startCmd, historyCmd, clearCmd, statusBarItem);
}

export function deactivate() {}
