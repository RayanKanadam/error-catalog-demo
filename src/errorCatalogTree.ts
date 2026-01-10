import * as vscode from 'vscode';

export class ErrorCatalogTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): vscode.ProviderResult<vscode.TreeItem[]> {
    return [new vscode.TreeItem('Validation (VA)'), new vscode.TreeItem('Database (DB)')];
  }
}
