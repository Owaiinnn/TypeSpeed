# ⌨ TypeSpeed — Terminal Typing Test for VS Code

A typing speed test extension that runs directly in VS Code's integrated terminal. Practice typing with real **code snippets** and track your improvement over time.

![TypeSpeed Demo](https://img.shields.io/badge/WPM-Track_Your_Speed-blue)

## Features

- **Code-focused typing tests** — Practice with 100+ real code snippets in JavaScript, TypeScript, Python, Rust, Go, Java, C, Ruby, Swift, and Kotlin
- **Three difficulty levels** — Easy (simple statements), Medium (functions & classes), Hard (generics & advanced patterns)
- **Live stats** — See your WPM, accuracy, errors, and time in real-time as you type
- **Color-coded feedback** — Green for correct characters, red highlight for mistakes
- **Status bar integration** — See your last and best WPM right in the status bar
- **Quick launch** — Start a test instantly with `Ctrl+Shift+T` (`Cmd+Shift+T` on Mac)
- **Persistent history** — Track all your past attempts with averages and personal bests
- **History dashboard** — A dedicated webview panel showing your stats and progress

## Getting Started

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Owaiinnn/TypeSpeed.git typespeed-vscode
cd typespeed-vscode

# Install dependencies
npm install

# Compile
npm run compile
```

### Development

1. Open the folder in VS Code
2. Press `F5` to launch the Extension Development Host
3. In the new window, open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
4. Run **TypeSpeed: Start Typing Test**

### Package as VSIX

```bash
npm install -g @vscode/vsce
vsce package
```

Then install the `.vsix` file via **Extensions → ··· → Install from VSIX**.

## Commands

| Command | Keybinding | Description |
| ------- | ---------- | ----------- |
| `TypeSpeed: Start Typing Test` | `Ctrl+Shift+T` | Launch a new typing test in the terminal |
| `TypeSpeed: View History` | | Open the history dashboard |
| `TypeSpeed: Clear History` | | Delete all saved results |

## How It Works

1. Choose a difficulty level (Easy / Medium / Hard / Random)
2. A code snippet appears in the terminal with a box-drawing UI
3. Start typing — the timer begins on your first keystroke
4. Characters turn **green** when correct, **red** when wrong
5. Use **Backspace** to fix mistakes
6. Press **Enter** for newlines in the code
7. When you finish the snippet, your results appear
8. Press **R** to retry or **Q** to quit

## Stats Tracked

- **Gross WPM** — Raw typing speed (total characters / 5 / minutes)
- **Net WPM** — Adjusted for errors (correct characters / 5 / minutes)
- **Accuracy** — Percentage of characters typed correctly
- **Error count** — Total mistyped characters
- **Time elapsed** — How long you took to complete the snippet

## History

Your results persist across VS Code sessions using `globalState`. The history panel shows:

- Summary cards (total tests, average WPM, best WPM, average accuracy)
- Full table of all past attempts with date, stats, language, and difficulty
- A sparkline trend of your recent WPM scores (in the terminal results view)

---

Happy typing! 🚀
