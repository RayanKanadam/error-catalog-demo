# Error Catalog

This repository is the single source of truth for application error codes.

## Structure

- Validation errors (VA): Bean validation & input checks
- Database errors (DB): Persistence & constraint violations

## Governance

- All changes must go via Pull Request
- Rule IDs and Field IDs are immutable
- Error codes are never reused
- Owners: Platform Team

## Consumers

- VS Code Error Catalog extension
- Runtime validation frameworks
- Documentation generators
