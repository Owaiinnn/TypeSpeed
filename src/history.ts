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
