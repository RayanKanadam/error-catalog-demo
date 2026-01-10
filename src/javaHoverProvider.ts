import * as vscode from 'vscode';

const ERROR_CODE_REGEX = /\b(?:VA_\d{2}_\d{4}|DB_\d{4})\b/;

export class JavaHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position, ERROR_CODE_REGEX);

    if (!range) {
      return;
    }

    const code = document.getText(range);

    return new vscode.Hover(`**Error Code:** \`${code}\`\n\n(Basic hover – source wired)`);
  }
}
