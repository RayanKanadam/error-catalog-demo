export interface CatalogStore {
  validationRules?: Record<string, any>;
  validationFields?: Record<string, any>;
  validationCatalog?: Record<string, any>;

  databaseErrors?: Record<string, any>;
  kafkaErrors?: Record<string, any>;
  systemErrors?: Record<string, any>;

  lastLoaded?: Date;
}

export const catalogStore: CatalogStore = {};
