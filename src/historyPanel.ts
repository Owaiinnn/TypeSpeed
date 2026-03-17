import * as vscode from "vscode";

export interface TestResult {
  timestamp: string;
  wpm: number;
  accuracy: number;
  errors: number;
  elapsed: number; // seconds
  language: string;
  difficulty: string;
  snippetLength: number;
}

const HISTORY_KEY = "typespeed.history";
const MAX_HISTORY = 50;

export class HistoryManager {
  constructor(private context: vscode.ExtensionContext) {}

  getHistory(): TestResult[] {
    return this.context.globalState.get<TestResult[]>(HISTORY_KEY, []);
  }

  async addResult(result: TestResult): Promise<void> {
    const history = this.getHistory();
    history.unshift(result); // newest first
    if (history.length > MAX_HISTORY) {
      history.length = MAX_HISTORY;
    }
    await this.context.globalState.update(HISTORY_KEY, history);
  }

  async clearHistory(): Promise<void> {
    await this.context.globalState.update(HISTORY_KEY, []);
  }

  getStats(): {
    totalTests: number;
    avgWpm: number;
    avgAccuracy: number;
    bestWpm: number;
    recentTrend: number[];
  } {
    const history = this.getHistory();
    if (history.length === 0) {
      return {
        totalTests: 0,
        avgWpm: 0,
        avgAccuracy: 0,
        bestWpm: 0,
        recentTrend: [],
      };
    }

    const avgWpm = Math.round(history.reduce((s, r) => s + r.wpm, 0) / history.length);
    const avgAccuracy = Math.round(history.reduce((s, r) => s + r.accuracy, 0) / history.length);
    const bestWpm = Math.max(...history.map((r) => r.wpm));
    const recentTrend = history.slice(0, 10).map((r) => r.wpm).reverse();

    return {
      totalTests: history.length,
      avgWpm,
      avgAccuracy,
      bestWpm,
      recentTrend,
    };
  }
}

export class HistoryPanel {
  constructor(private historyManager: HistoryManager) {}

  show(): void {
    const history = this.historyManager.getHistory();
    const stats = this.historyManager.getStats();

    const panel = vscode.window.createWebviewPanel(
      "typespeedHistory",
      "⌨ TypeSpeed History",
      vscode.ViewColumn.One,
      { enableScripts: false }
    );

    panel.webview.html = this.getHtml(history, stats);
  }

  private getHtml(
    history: TestResult[],
    stats: { totalTests: number; avgWpm: number; avgAccuracy: number; bestWpm: number; recentTrend: number[] }
  ): string {
    const rows = history
      .map(
        (r, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${new Date(r.timestamp).toLocaleDateString()} ${new Date(r.timestamp).toLocaleTimeString()}</td>
          <td class="wpm">${r.wpm}</td>
          <td>${r.accuracy}%</td>
          <td class="errors">${r.errors}</td>
          <td>${r.elapsed}s</td>
          <td><span class="lang">${r.language}</span></td>
          <td><span class="diff diff-${r.difficulty}">${r.difficulty}</span></td>
        </tr>`
      )
      .join("");

    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: var(--vscode-font-family, 'Segoe UI', Tahoma, sans-serif);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      padding: 24px;
      line-height: 1.5;
    }
    h1 { margin: 0 0 8px 0; font-size: 22px; }
    .subtitle { opacity: 0.6; margin-bottom: 24px; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: var(--vscode-editorWidget-background, #1e1e1e);
      border: 1px solid var(--vscode-editorWidget-border, #333);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--vscode-textLink-foreground, #4fc1ff);
    }
    .stat-label {
      font-size: 12px;
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    th {
      text-align: left;
      padding: 10px 12px;
      border-bottom: 2px solid var(--vscode-editorWidget-border, #333);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
      opacity: 0.7;
    }
    td {
      padding: 8px 12px;
      border-bottom: 1px solid var(--vscode-editorWidget-border, #222);
    }
    tr:hover td {
      background: var(--vscode-list-hoverBackground, #2a2d2e);
    }
    .wpm { font-weight: 700; color: var(--vscode-textLink-foreground, #4fc1ff); }
    .errors { color: var(--vscode-errorForeground, #f44747); }
    .lang {
      background: var(--vscode-badge-background, #333);
      color: var(--vscode-badge-foreground, #ccc);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
    .diff {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .diff-easy { background: #1a3a1a; color: #4ec94e; }
    .diff-medium { background: #3a3a1a; color: #e0c040; }
    .diff-hard { background: #3a1a1a; color: #f06060; }

    .empty {
      text-align: center;
      padding: 48px;
      opacity: 0.5;
      font-size: 15px;
    }
  </style>
</head>
<body>
  <h1>⌨ TypeSpeed History</h1>
  <p class="subtitle">Your typing test results across sessions</p>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">${stats.totalTests}</div>
      <div class="stat-label">Tests Taken</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.avgWpm}</div>
      <div class="stat-label">Average WPM</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.bestWpm}</div>
      <div class="stat-label">Best WPM</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${stats.avgAccuracy}%</div>
      <div class="stat-label">Average Accuracy</div>
    </div>
  </div>

  ${
    history.length > 0
      ? `<table>
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>WPM</th>
        <th>Accuracy</th>
        <th>Errors</th>
        <th>Time</th>
        <th>Language</th>
        <th>Difficulty</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`
      : `<div class="empty">No tests yet. Run <strong>TypeSpeed: Start Typing Test</strong> to get started!</div>`
  }
</body>
</html>`;
  }
}
