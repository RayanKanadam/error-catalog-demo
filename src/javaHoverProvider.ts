import * as vscode from 'vscode';
import { catalogStore } from './catalogStore';

const ERROR_CODE_REGEX = /\b(?:VA_\d{2}_\d{4}|DB_\d{4}|IS_\d{4}|KA_\d{4})\b/;

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

    if (code.startsWith('VA_')) {
      return this.validationHover(code);
    }

    if (code.startsWith('DB_')) {
      return this.simpleErrorHover(code, catalogStore.databaseErrors?.DB, 'Database');
    }

    if (code.startsWith('IS_')) {
      return this.simpleErrorHover(code, catalogStore.systemErrors?.IS, 'System');
    }

    if (code.startsWith('KA_')) {
      return this.simpleErrorHover(code, catalogStore.kafkaErrors?.KA, 'Kafka');
    }
  }

  // ------------------------
  // Validation hover
  // ------------------------

  private validationHover(code: string): vscode.Hover | undefined {
    const [, ruleId, fieldId] = code.split('_');

    const rule = catalogStore.validationRules?.[ruleId];
    const field = catalogStore.validationFields?.[fieldId];
    const allowed = catalogStore.validationCatalog?.VA?.[ruleId]?.includes(fieldId);

    if (!rule || !field || !allowed) {
      return;
    }

    const md = new vscode.MarkdownString();
    md.appendMarkdown(`### Validation Error – ${rule.name}\n\n`);
    md.appendMarkdown(`**Annotation:** \`${rule.annotation}\`\n\n`);
    md.appendMarkdown(`**Field:** ${field.name} (${fieldId})\n\n`);
    md.appendMarkdown(`**Description:** ${rule.description}`);

    return new vscode.Hover(md);
  }

  // ------------------------
  // DB / System / Kafka hover
  // ------------------------

  private simpleErrorHover(code: string, table: any, label: string): vscode.Hover | undefined {
    const id = code.split('_')[1];
    const err = table?.[id];
    if (!err) {
      return;
    }

    const md = new vscode.MarkdownString();
    md.appendMarkdown(`### ${label} Error – ${err.name}\n\n`);
    if (err.httpCode) {
      md.appendMarkdown(`**HTTP Code:** ${err.httpCode}\n\n`);
    }
    md.appendMarkdown(err.description);

    return new vscode.Hover(md);
  }
}
