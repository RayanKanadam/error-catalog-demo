/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(__webpack_require__(1));
const errorCatalogTree_1 = __webpack_require__(2);
const javaHoverProvider_1 = __webpack_require__(4);
const catalogLoader_1 = __webpack_require__(5);
const generateErrorCode_1 = __webpack_require__(9);
function activate(context) {
    console.log('[Error Catalog] Activated');
    vscode.window.registerTreeDataProvider('errorCatalogView', new errorCatalogTree_1.ErrorCatalogTreeProvider());
    context.subscriptions.push(vscode.languages.registerHoverProvider('java', new javaHoverProvider_1.JavaHoverProvider()));
    context.subscriptions.push(vscode.commands.registerCommand('errorCatalog.generateErrorCode', generateErrorCode_1.generateErrorCode));
    (0, catalogLoader_1.loadCatalog)();
}
function deactivate() { }


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorCatalogTreeProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const catalogStore_1 = __webpack_require__(3);
class ErrorCatalogTreeProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
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
    validationRules() {
        if (!catalogStore_1.catalogStore.validationRules) {
            return [];
        }
        return Object.entries(catalogStore_1.catalogStore.validationRules).map(([code, rule]) => new vscode.TreeItem(`${code} – ${rule.name}`, vscode.TreeItemCollapsibleState.None));
    }
    validationFields() {
        if (!catalogStore_1.catalogStore.validationFields) {
            return [];
        }
        return Object.entries(catalogStore_1.catalogStore.validationFields).map(([code, field]) => new vscode.TreeItem(`${code} – ${field.name}`, vscode.TreeItemCollapsibleState.None));
    }
    databaseErrors() {
        if (!catalogStore_1.catalogStore.databaseErrors?.DB) {
            return [];
        }
        return Object.entries(catalogStore_1.catalogStore.databaseErrors.DB).map(([code, err]) => new vscode.TreeItem(`DB_${code} – ${err.name}`, vscode.TreeItemCollapsibleState.None));
    }
    systemErrors() {
        if (!catalogStore_1.catalogStore.systemErrors?.IS) {
            return [];
        }
        return Object.entries(catalogStore_1.catalogStore.systemErrors.IS).map(([code, err]) => new vscode.TreeItem(`IS_${code} – ${err.name}`, vscode.TreeItemCollapsibleState.None));
    }
}
exports.ErrorCatalogTreeProvider = ErrorCatalogTreeProvider;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.catalogStore = void 0;
exports.catalogStore = {};


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JavaHoverProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const catalogStore_1 = __webpack_require__(3);
const ERROR_CODE_REGEX = /\b(?:VA_\d{2}_\d{4}|DB_\d{4}|IS_\d{4}|KA_\d{4})\b/;
class JavaHoverProvider {
    provideHover(document, position) {
        const range = document.getWordRangeAtPosition(position, ERROR_CODE_REGEX);
        if (!range) {
            return;
        }
        const code = document.getText(range);
        if (code.startsWith('VA_')) {
            return this.validationHover(code);
        }
        if (code.startsWith('DB_')) {
            return this.simpleErrorHover(code, catalogStore_1.catalogStore.databaseErrors?.DB, 'Database');
        }
        if (code.startsWith('IS_')) {
            return this.simpleErrorHover(code, catalogStore_1.catalogStore.systemErrors?.IS, 'System');
        }
        if (code.startsWith('KA_')) {
            return this.simpleErrorHover(code, catalogStore_1.catalogStore.kafkaErrors?.KA, 'Kafka');
        }
    }
    // ------------------------
    // Validation hover
    // ------------------------
    validationHover(code) {
        const [, ruleId, fieldId] = code.split('_');
        const rule = catalogStore_1.catalogStore.validationRules?.[ruleId];
        const field = catalogStore_1.catalogStore.validationFields?.[fieldId];
        const allowed = catalogStore_1.catalogStore.validationCatalog?.VA?.[ruleId]?.includes(fieldId);
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
    simpleErrorHover(code, table, label) {
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
exports.JavaHoverProvider = JavaHoverProvider;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadCatalog = loadCatalog;
const catalogFetcher_1 = __webpack_require__(6);
const catalogConfig_1 = __webpack_require__(8);
const catalogStore_1 = __webpack_require__(3);
async function loadCatalog() {
    try {
        const [rules, fields, catalog, dbErrors, kafkaErrors, systemErrors] = await Promise.all([
            (0, catalogFetcher_1.fetchJson)(catalogConfig_1.VALIDATION_RULES_URL),
            (0, catalogFetcher_1.fetchJson)(catalogConfig_1.VALIDATION_FIELDS_URL),
            (0, catalogFetcher_1.fetchJson)(catalogConfig_1.VALIDATION_CATALOG_URL),
            (0, catalogFetcher_1.fetchJson)(catalogConfig_1.DATABASE_ERRORS_URL),
            (0, catalogFetcher_1.fetchJson)(catalogConfig_1.KAFKA_ERRORS_URL),
            (0, catalogFetcher_1.fetchJson)(catalogConfig_1.SYSTEM_ERRORS_URL),
        ]);
        catalogStore_1.catalogStore.validationRules = rules;
        catalogStore_1.catalogStore.validationFields = fields;
        catalogStore_1.catalogStore.validationCatalog = catalog;
        catalogStore_1.catalogStore.databaseErrors = dbErrors;
        catalogStore_1.catalogStore.kafkaErrors = kafkaErrors;
        catalogStore_1.catalogStore.systemErrors = systemErrors;
        catalogStore_1.catalogStore.lastLoaded = new Date();
        console.log('[Error Catalog] Catalog loaded');
    }
    catch (err) {
        console.warn('[Error Catalog] Catalog load failed', err);
    }
}


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchJson = fetchJson;
const https = __importStar(__webpack_require__(7));
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${url} (status ${res.statusCode})`));
                return;
            }
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                }
                catch (err) {
                    reject(err);
                }
            });
        })
            .on('error', (err) => reject(err));
    });
}


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("https");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SYSTEM_ERRORS_URL = exports.KAFKA_ERRORS_URL = exports.DATABASE_ERRORS_URL = exports.VALIDATION_CATALOG_URL = exports.VALIDATION_FIELDS_URL = exports.VALIDATION_RULES_URL = exports.CATALOG_BASE_URL = void 0;
exports.CATALOG_BASE_URL = 'https://raw.githubusercontent.com/RayanKanadam/error-catalog-errors-demo/main';
exports.VALIDATION_RULES_URL = `${exports.CATALOG_BASE_URL}/validation/rules.json`;
exports.VALIDATION_FIELDS_URL = `${exports.CATALOG_BASE_URL}/validation/fields.json`;
exports.VALIDATION_CATALOG_URL = `${exports.CATALOG_BASE_URL}/validation/catalog.json`;
exports.DATABASE_ERRORS_URL = `${exports.CATALOG_BASE_URL}/database/errors.json`;
exports.KAFKA_ERRORS_URL = `${exports.CATALOG_BASE_URL}/kafka/errors.json`;
exports.SYSTEM_ERRORS_URL = `${exports.CATALOG_BASE_URL}/system/errors.json`;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateErrorCode = generateErrorCode;
const vscode = __importStar(__webpack_require__(1));
const catalogStore_1 = __webpack_require__(3);
async function generateErrorCode() {
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
    const ruleEntry = Object.entries(catalogStore_1.catalogStore.validationRules ?? {}).find(([, rule]) => rule.annotation === annotation);
    if (!ruleEntry) {
        vscode.window.showWarningMessage(`Unknown annotation ${annotation}`);
        return;
    }
    const [ruleId] = ruleEntry;
    // Resolve fieldId from field name
    const fieldEntry = Object.entries(catalogStore_1.catalogStore.validationFields ?? {}).find(([, field]) => field.usage === fieldName || field.name === fieldName);
    if (!fieldEntry) {
        vscode.window.showWarningMessage(`Unknown field ${fieldName}`);
        return;
    }
    const [fieldId] = fieldEntry;
    // Validate mapping
    const allowed = catalogStore_1.catalogStore.validationCatalog?.VA?.[ruleId]?.includes(fieldId);
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


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map