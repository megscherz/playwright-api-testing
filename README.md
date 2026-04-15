# Playwright API Testing Suite — JSONPlaceholder

A personal API test automation project built with Playwright and TypeScript, testing RESTful API endpoints against [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free, public fake REST API used for practice and prototyping.

## About This Project

This project was built to demonstrate API testing skills using Playwright's built-in request context. It covers core HTTP methods including GET, POST, PUT, and DELETE, with both positive and negative test scenarios to validate response status codes, response body structure, and data integrity.

## Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- JSONPlaceholder REST API

## Test Coverage

| Test Suite | What's Covered |
|------------|----------------|
| GET all posts | Status 200, response shape, correct count |
| GET single post | Status 200, correct ID returned |
| GET non-existent post | Status 404 negative test |
| POST create post | Status 201, response matches sent data |
| PUT update post | Status 200, updated values returned |
| DELETE post | Status 200, successful deletion |

## Project Structure

```
├── tests/
│   └── posts.spec.ts
├── playwright.config.ts
└── README.md
```

## How To Run

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# View test report
npx playwright show-report
```

## Key Concepts Demonstrated

- REST API testing using Playwright request context
- Validating HTTP status codes across GET, POST, PUT, and DELETE methods
- Verifying response body structure and data integrity
- Negative testing for non-existent resources
- Configuring base URL for clean, maintainable test code
