import * as vscode from 'vscode';
import { ErrorCatalogTreeProvider } from './errorCatalogTree';
import { JavaHoverProvider } from './javaHoverProvider';
import { loadCatalog } from './catalogLoader';
import { generateErrorCode } from './generateErrorCode';

export function activate(context: vscode.ExtensionContext) {
  console.log('[Error Catalog] Activated');

  vscode.window.registerTreeDataProvider('errorCatalogView', new ErrorCatalogTreeProvider());

  context.subscriptions.push(
    vscode.languages.registerHoverProvider('java', new JavaHoverProvider()),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('errorCatalog.generateErrorCode', generateErrorCode),
  );

  loadCatalog();
}

export function deactivate() {}
