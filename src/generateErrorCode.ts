import * as vscode from 'vscode';
import { catalogStore } from './catalogStore';

export async function generateErrorCode() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const document = editor.document;
  if (document.languageId !== 'java') {
    return;
  }

  const position = editor.selection.active;
  const line = document.lineAt(position.line);

  // Expect pattern: @NotBlank or @NotNull
  const annotationMatch = line.text.match(/@\w+/);
  if (!annotationMatch) {
    vscode.window.showWarningMessage('No validation annotation found on this line');
    return;
  }

  const annotation = annotationMatch[0];

  // Look ahead for field declaration
  const nextLine = document.lineAt(position.line + 1)?.text;
  if (!nextLine) {
    return;
  }

  const fieldMatch = nextLine.match(/private\s+\w+\s+(\w+);/);
  if (!fieldMatch) {
    vscode.window.showWarningMessage('No field declaration found below annotation');
    return;
  }

  const fieldName = fieldMatch[1];

  // Resolve ruleId from annotation
  const ruleEntry = Object.entries(catalogStore.validationRules ?? {}).find(
    ([, rule]: any) => rule.annotation === annotation,
  );

  if (!ruleEntry) {
    vscode.window.showWarningMessage(`Unknown annotation ${annotation}`);
    return;
  }

  const [ruleId] = ruleEntry;

  // Resolve fieldId from field name
  const fieldEntry = Object.entries(catalogStore.validationFields ?? {}).find(
    ([, field]: any) => field.usage === fieldName || field.name === fieldName,
  );

  if (!fieldEntry) {
    vscode.window.showWarningMessage(`Unknown field ${fieldName}`);
    return;
  }

  const [fieldId] = fieldEntry;

  // Validate mapping
  const allowed = catalogStore.validationCatalog?.VA?.[ruleId]?.includes(fieldId);

  if (!allowed) {
    vscode.window.showWarningMessage(`Rule ${ruleId} not allowed for field ${fieldId}`);
    return;
  }

  const errorCode = `VA_${ruleId}_${fieldId}`;

  await editor.edit((editBuilder) => {
    editBuilder.insert(document.lineAt(position.line + 1).range.end, ` // ${errorCode}`);
  });

  vscode.window.showInformationMessage(`Generated error code: ${errorCode}`);
}
