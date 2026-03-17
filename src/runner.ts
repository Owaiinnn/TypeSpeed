import * as vscode from "vscode";
import { CodeSnippet, getRandomSnippet, fetchSnippetFromAPI } from "./snippets";
import { HistoryManager, TestResult } from "./history";

// ANSI escape helpers
const ESC = "\x1b";
const BOLD = `${ESC}[1m`;
const DIM = `${ESC}[2m`;
const RESET = `${ESC}[0m`;
const GREEN = `${ESC}[32m`;
const RED = `${ESC}[31m`;
const YELLOW = `${ESC}[33m`;
const CYAN = `${ESC}[36m`;
const MAGENTA = `${ESC}[35m`;
const BG_RED = `${ESC}[41m${ESC}[37m`;
const HIDE_CURSOR = `${ESC}[?25l`;
const SHOW_CURSOR = `${ESC}[?25h`;

const TAB_SIZE = 4;

function moveTo(row: number, col: number): string {
  return `${ESC}[${row};${col}H`;
}

function clearScreen(): string {
  return `${ESC}[2J${ESC}[3J${ESC}[H`;
}

export class TypingTestRunner {
  private writeEmitter = new vscode.EventEmitter<string>();
  private terminal: vscode.Terminal | undefined;
  private snippet: CodeSnippet | undefined;
  private typed: string = "";
  private startTime: number = 0;
  private finished = false;

  constructor(private historyManager: HistoryManager) {}

  async start(difficulty?: CodeSnippet["difficulty"]): Promise<void> {
    // Try API first, fall back to built-in
    let snippet: CodeSnippet | null = null;
    try {
      snippet = await fetchSnippetFromAPI(difficulty);
    } catch {
      // API failed, will use built-in
    }
    this.snippet = snippet || getRandomSnippet(difficulty);
    this.typed = "";
    this.startTime = 0;
    this.finished = false;

    const writeEmitter = new vscode.EventEmitter<string>();
    this.writeEmitter = writeEmitter;

    const pty: vscode.Pseudoterminal = {
      onDidWrite: writeEmitter.event,
      open: () => {
        // Initial clear + render
        this.write(clearScreen());
        this.render();
      },
      close: () => {},
      handleInput: (data: string) => {
        if (this.finished) {
          if (data === "r" || data === "R") {
            this.restart();
          } else if (data === "q" || data === "Q") {
            this.terminal?.dispose();
          }
          return;
        }
        this.handleInput(data);
      },
    };

    this.terminal = vscode.window.createTerminal({
      name: `⌨ TypeSpeed [${this.snippet.language}]`,
      pty,
    });
    this.terminal.show();
  }

  private write(text: string): void {
    this.writeEmitter.fire(text);
  }

  private render(): void {
    if (!this.snippet) { return; }

    const target = this.snippet.text;
    const width = 78;

    // Full clear: wipes screen + scrollback, moves cursor to 1,1
    this.write(clearScreen());
    this.write(HIDE_CURSOR);

    // ─── Header ───
    const sourceTag = this.snippet.source === "api" ? " [API]" : " [Built-in]";
    const titleContent = `  ⌨  TypeSpeed — ${this.snippet.language} (${this.snippet.difficulty})${sourceTag}`;
    const titlePad = Math.max(0, width - titleContent.length - 2);
    this.write(`${BOLD}${CYAN}╔${"═".repeat(width - 2)}╗${RESET}\r\n`);
    this.write(
      `${BOLD}${CYAN}║${RESET}${BOLD}${titleContent}${RESET}${" ".repeat(titlePad)}${BOLD}${CYAN}║${RESET}\r\n`
    );
    this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);

    // ─── Live stats bar ───
    const elapsed = this.startTime > 0 ? (Date.now() - this.startTime) / 1000 : 0;
    const wordsTyped = this.typed.split(/\s+/).filter(Boolean).length;
    const currentWpm = elapsed > 0 ? Math.round((wordsTyped / elapsed) * 60) : 0;
    const { correctChars, errorChars } = this.calcAccuracy();
    const totalTyped = correctChars + errorChars;
    const currentAccuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

    const statsRaw = `  WPM: ${currentWpm}  │  Accuracy: ${currentAccuracy}%  │  Errors: ${errorChars}  │  Time: ${elapsed.toFixed(1)}s`;
    const statsColored = `  WPM: ${BOLD}${currentWpm}${RESET}  │  Accuracy: ${BOLD}${currentAccuracy}%${RESET}  │  Errors: ${BOLD}${RED}${errorChars}${RESET}  │  Time: ${BOLD}${elapsed.toFixed(1)}s${RESET}`;
    const statsPad = Math.max(0, width - statsRaw.length - 2);
    this.write(`${BOLD}${CYAN}║${RESET}${statsColored}${" ".repeat(statsPad)}${BOLD}${CYAN}║${RESET}\r\n`);
    this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);

    // ─── Code display ───
    const lines = target.split("\n");
    let charIndex = 0;

    for (const line of lines) {
      let rendered = `${BOLD}${CYAN}║${RESET}  `;
      let visibleLen = 3; // "║  "

      for (let i = 0; i < line.length; i++) {
        const targetChar = line[i];
        if (charIndex < this.typed.length) {
          const typedChar = this.typed[charIndex];
          if (typedChar === targetChar) {
            rendered += `${GREEN}${targetChar}${RESET}`;
          } else {
            rendered += `${BG_RED}${targetChar}${RESET}`;
          }
        } else if (charIndex === this.typed.length) {
          rendered += `${ESC}[7m${targetChar}${RESET}`;
        } else {
          rendered += `${DIM}${targetChar}${RESET}`;
        }
        visibleLen++;
        charIndex++;
      }

      // Handle newline marker
      if (charIndex < target.length) {
        if (charIndex === this.typed.length) {
          rendered += `${ESC}[7m↵${RESET}`;
          visibleLen++;
        }
        charIndex++; // for the \n
      }

      const padding = Math.max(0, width - visibleLen - 1);
      rendered += " ".repeat(padding) + `${BOLD}${CYAN}║${RESET}`;
      this.write(rendered + "\r\n");
    }

    // ─── Footer ───
    this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);
    const hintText = this.startTime === 0
      ? "  Start typing to begin... (Tab = 4 spaces)"
      : "  Tab = 4 spaces │ Backspace = undo │ Enter = newline";
    const hintPad = Math.max(0, width - hintText.length - 2);
    this.write(
      `${BOLD}${CYAN}║${RESET}${DIM}${hintText}${RESET}${" ".repeat(hintPad)}${BOLD}${CYAN}║${RESET}\r\n`
    );
    this.write(`${BOLD}${CYAN}╚${"═".repeat(width - 2)}╝${RESET}\r\n`);
  }

  private handleInput(data: string): void {
    if (!this.snippet) { return; }

    const target = this.snippet.text;

    for (const char of data) {
      if (char === "\x7f" || char === "\b") {
        // Smart backspace: if the last N chars are all spaces and align to tab,
        // delete a full tab stop worth of spaces
        if (this.typed.length > 0) {
          const deleteCount = this.calcBackspaceCount();
          this.typed = this.typed.slice(0, -deleteCount);
        }
      } else if (char === "\t") {
        // Tab: always inserts exactly TAB_SIZE spaces
        if (this.startTime === 0) {
          this.startTime = Date.now();
        }
        this.typed += " ".repeat(TAB_SIZE);
      } else if (char === "\r" || char === "\n") {
        if (this.startTime === 0) {
          this.startTime = Date.now();
        }
        this.typed += "\n";
      } else if (char === "\x03") {
        this.terminal?.dispose();
        return;
      } else {
        if (this.startTime === 0) {
          this.startTime = Date.now();
        }
        this.typed += char;
      }
    }

    if (this.typed.length >= target.length) {
      this.typed = this.typed.slice(0, target.length);
      this.finished = true;
      this.showResults();
      return;
    }

    this.render();
  }

  /**
   * Calculates how many characters to delete on backspace.
   * If the cursor is preceded by spaces that form a tab-aligned block,
   * delete the whole block (up to TAB_SIZE). Otherwise delete 1.
   */
  private calcBackspaceCount(): number {
    // Find the start of the current line in typed text
    const lastNewline = this.typed.lastIndexOf("\n");
    const lineStart = lastNewline + 1;
    const colPosition = this.typed.length - lineStart;

    // Check if trailing chars are all spaces
    let trailingSpaces = 0;
    for (let i = this.typed.length - 1; i >= lineStart; i--) {
      if (this.typed[i] === " ") {
        trailingSpaces++;
      } else {
        break;
      }
    }

    if (trailingSpaces >= TAB_SIZE) {
      // Delete enough spaces to align back to previous tab stop
      const spacesToDelete = colPosition % TAB_SIZE === 0 ? TAB_SIZE : colPosition % TAB_SIZE;
      return Math.min(spacesToDelete, trailingSpaces);
    } else if (trailingSpaces > 0 && trailingSpaces === colPosition) {
      // Line is only spaces — delete to previous tab stop
      const spacesToDelete = colPosition % TAB_SIZE === 0 ? TAB_SIZE : colPosition % TAB_SIZE;
      return Math.min(spacesToDelete, trailingSpaces);
    }

    return 1;
  }

  private calcAccuracy(): { correctChars: number; errorChars: number } {
    if (!this.snippet) { return { correctChars: 0, errorChars: 0 }; }
    const target = this.snippet.text;
    let correct = 0;
    let errors = 0;
    for (let i = 0; i < this.typed.length; i++) {
      if (i < target.length && this.typed[i] === target[i]) {
        correct++;
      } else {
        errors++;
      }
    }
    return { correctChars: correct, errorChars: errors };
  }

  private async showResults(): Promise<void> {
    if (!this.snippet) { return; }

    const elapsed = (Date.now() - this.startTime) / 1000;
    const target = this.snippet.text;
    const { correctChars, errorChars } = this.calcAccuracy();
    const totalChars = target.length;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    const minutes = elapsed / 60;
    const grossWpm = Math.round(totalChars / 5 / minutes);
    const netWpm = Math.max(0, Math.round((correctChars / 5) / minutes));

    const width = 78;

    const result: TestResult = {
      timestamp: new Date().toISOString(),
      wpm: netWpm,
      accuracy,
      errors: errorChars,
      elapsed: Math.round(elapsed),
      language: this.snippet.language,
      difficulty: this.snippet.difficulty,
      snippetLength: totalChars,
    };
    await this.historyManager.addResult(result);

    // Results screen
    this.write(clearScreen());
    this.write(SHOW_CURSOR);

    this.write(`${BOLD}${CYAN}╔${"═".repeat(width - 2)}╗${RESET}\r\n`);
    const completeText = "  🏁 Test Complete!";
    const completePad = Math.max(0, width - completeText.length - 2);
    this.write(
      `${BOLD}${CYAN}║${RESET}  ${BOLD}${MAGENTA}🏁 Test Complete!${RESET}${" ".repeat(completePad)}${BOLD}${CYAN}║${RESET}\r\n`
    );
    this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);

    // Big WPM
    const wpmStr = `${netWpm} WPM`;
    const wpmPad = Math.floor((width - wpmStr.length - 4) / 2);
    this.write(
      `${BOLD}${CYAN}║${RESET}${" ".repeat(wpmPad)}${BOLD}${GREEN}${wpmStr}${RESET}${" ".repeat(
        Math.max(0, width - wpmPad - wpmStr.length - 2)
      )}${BOLD}${CYAN}║${RESET}\r\n`
    );

    this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);

    // Stats — compute visible length manually for clean padding
    const stats = [
      { label: "Gross WPM:", value: `${grossWpm}` },
      { label: "Net WPM:", value: `${netWpm}` },
      { label: "Accuracy:", value: `${accuracy}%` },
      { label: "Errors:", value: `${errorChars} / ${totalChars} characters` },
      { label: "Time:", value: `${elapsed.toFixed(1)} seconds` },
      { label: "Language:", value: this.snippet.language },
      { label: "Difficulty:", value: this.snippet.difficulty },
    ];

    for (const { label, value } of stats) {
      const lineText = `  ${label}${" ".repeat(14 - label.length)}${value}`;
      const isError = label === "Errors:";
      const colored = isError
        ? `  ${BOLD}${label}${RESET}${" ".repeat(14 - label.length)}${RED}${value}${RESET}`
        : `  ${BOLD}${label}${RESET}${" ".repeat(14 - label.length)}${value}`;
      const pad = Math.max(0, width - lineText.length - 2);
      this.write(`${BOLD}${CYAN}║${RESET}${colored}${" ".repeat(pad)}${BOLD}${CYAN}║${RESET}\r\n`);
    }

    // History trend
    const histStats = this.historyManager.getStats();
    if (histStats.totalTests > 1) {
      this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);
      const trendText = `  Avg WPM: ${histStats.avgWpm} │ Best: ${histStats.bestWpm} │ Tests: ${histStats.totalTests}`;
      const trendPad = Math.max(0, width - trendText.length - 2);
      this.write(
        `${BOLD}${CYAN}║${RESET}${DIM}${trendText}${RESET}${" ".repeat(trendPad)}${BOLD}${CYAN}║${RESET}\r\n`
      );

      if (histStats.recentTrend.length > 1) {
        const sparkline = this.makeSparkline(histStats.recentTrend);
        const sparkText = `  Recent trend: ${sparkline}`;
        const sparkPad = Math.max(0, width - sparkText.length - 2);
        this.write(
          `${BOLD}${CYAN}║${RESET}${DIM}${sparkText}${RESET}${" ".repeat(sparkPad)}${BOLD}${CYAN}║${RESET}\r\n`
        );
      }
    }

    this.write(`${BOLD}${CYAN}╠${"═".repeat(width - 2)}╣${RESET}\r\n`);
    const actText = "  [R] Restart  [Q] Quit";
    const actColored = `  ${YELLOW}[R]${RESET} Restart  ${YELLOW}[Q]${RESET} Quit`;
    const actPad = Math.max(0, width - actText.length - 2);
    this.write(
      `${BOLD}${CYAN}║${RESET}${actColored}${" ".repeat(actPad)}${BOLD}${CYAN}║${RESET}\r\n`
    );
    this.write(`${BOLD}${CYAN}╚${"═".repeat(width - 2)}╝${RESET}\r\n`);
  }

  private async restart(): Promise<void> {
    this.finished = false;
    this.typed = "";
    this.startTime = 0;
    let snippet: CodeSnippet | null = null;
    try {
      snippet = await fetchSnippetFromAPI(this.snippet?.difficulty);
    } catch {
      // fall back
    }
    this.snippet = snippet || getRandomSnippet(this.snippet?.difficulty);
    this.render();
  }

  private makeSparkline(data: number[]): string {
    const blocks = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    return data.map((v) => blocks[Math.min(7, Math.floor(((v - min) / range) * 7))]).join("");
  }
}
