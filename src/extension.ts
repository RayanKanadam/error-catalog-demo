import * as vscode from 'vscode';
import { ErrorCatalogTreeProvider } from './errorCatalogTree';
import { JavaHoverProvider } from './javaHoverProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('[Error Catalog] Activated');

  vscode.window.registerTreeDataProvider('errorCatalogView', new ErrorCatalogTreeProvider());

  context.subscriptions.push(
    vscode.languages.registerHoverProvider('java', new JavaHoverProvider()),
  );
}

export function deactivate() {}
