import { fetchJson } from './catalogFetcher';
import {
  VALIDATION_RULES_URL,
  VALIDATION_FIELDS_URL,
  VALIDATION_CATALOG_URL,
  DATABASE_ERRORS_URL,
  KAFKA_ERRORS_URL,
  SYSTEM_ERRORS_URL,
} from './catalogConfig';
import { catalogStore } from './catalogStore';

export async function loadCatalog(): Promise<void> {
  try {
    const [rules, fields, catalog, dbErrors, kafkaErrors, systemErrors] = await Promise.all([
      fetchJson(VALIDATION_RULES_URL),
      fetchJson(VALIDATION_FIELDS_URL),
      fetchJson(VALIDATION_CATALOG_URL),
      fetchJson(DATABASE_ERRORS_URL),
      fetchJson(KAFKA_ERRORS_URL),
      fetchJson(SYSTEM_ERRORS_URL),
    ]);

    catalogStore.validationRules = rules;
    catalogStore.validationFields = fields;
    catalogStore.validationCatalog = catalog;

    catalogStore.databaseErrors = dbErrors;
    catalogStore.kafkaErrors = kafkaErrors;
    catalogStore.systemErrors = systemErrors;

    catalogStore.lastLoaded = new Date();

    console.log('[Error Catalog] Catalog loaded');
  } catch (err) {
    console.warn('[Error Catalog] Catalog load failed', err);
  }
}
