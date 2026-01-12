import * as vscode from 'vscode';
import { catalogStore } from './catalogStore';

export class ErrorCatalogTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
    if (!element) {
      return [
        new vscode.TreeItem('Validation', vscode.TreeItemCollapsibleState.Collapsed),
        new vscode.TreeItem('Database Errors', vscode.TreeItemCollapsibleState.Collapsed),
        new vscode.TreeItem('System Errors', vscode.TreeItemCollapsibleState.Collapsed),
      ];
    }

    switch (element.label) {
      case 'Validation':
        return [
          new vscode.TreeItem('Rules', vscode.TreeItemCollapsibleState.Collapsed),
          new vscode.TreeItem('Fields', vscode.TreeItemCollapsibleState.Collapsed),
        ];

      case 'Rules':
        return this.validationRules();

      case 'Fields':
        return this.validationFields();

      case 'Database Errors':
        return this.databaseErrors();

      case 'System Errors':
        return this.systemErrors();
    }

    return [];
  }

  private validationRules(): vscode.TreeItem[] {
    if (!catalogStore.validationRules) {
      return [];
    }

    return Object.entries(catalogStore.validationRules).map(
      ([code, rule]: any) =>
        new vscode.TreeItem(`${code} – ${rule.name}`, vscode.TreeItemCollapsibleState.None),
    );
  }

  private validationFields(): vscode.TreeItem[] {
    if (!catalogStore.validationFields) {
      return [];
    }

    return Object.entries(catalogStore.validationFields).map(
      ([code, field]: any) =>
        new vscode.TreeItem(`${code} – ${field.name}`, vscode.TreeItemCollapsibleState.None),
    );
  }

  private databaseErrors(): vscode.TreeItem[] {
    if (!catalogStore.databaseErrors?.DB) {
      return [];
    }

    return Object.entries(catalogStore.databaseErrors.DB).map(
      ([code, err]: any) =>
        new vscode.TreeItem(`DB_${code} – ${err.name}`, vscode.TreeItemCollapsibleState.None),
    );
  }

  private systemErrors(): vscode.TreeItem[] {
    if (!catalogStore.systemErrors?.IS) {
      return [];
    }

    return Object.entries(catalogStore.systemErrors.IS).map(
      ([code, err]: any) =>
        new vscode.TreeItem(`IS_${code} – ${err.name}`, vscode.TreeItemCollapsibleState.None),
    );
  }
}
