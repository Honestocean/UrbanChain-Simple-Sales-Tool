# Sales API E2E Tests

This project contains end-to-end API tests for the Sales API using Playwright.

## Prerequisites

1. Make sure the Sales API is running on `http://localhost:3000`
2. Ensure the database is set up and accessible

## Running the Tests

### Install Dependencies

```bash
yarn install
```

### Run All Tests

```bash
yarn test
```

### Run Tests in UI Mode

```bash
yarn test --ui
```

### Run Only Sales API Tests

```bash
yarn test tests/sales-api.spec.ts
```

### Run Tests in Headed Mode (see browser)

```bash
yarn test --headed
```

## Test Data

Tests use realistic sample data based on the sale.json structure:

```json
{
  "name": "Energy Supply Account",
  "customerName": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "mpans": ["1234567890123", "9876543210987"],
  "contractStartDate": "2025-01-01",
  "contractEndDate": "2026-01-01",
  "status": "active"
}
```
