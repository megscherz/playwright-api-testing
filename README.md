# Playwright API Testing Suite

A personal API test automation project built with Playwright and TypeScript, testing RESTful API endpoints across two different APIs — [JSONPlaceholder](https://jsonplaceholder.typicode.com) and [DummyJSON](https://dummyjson.com). Covers core HTTP methods, authentication flows, nested routes, query parameters, and negative testing scenarios.

## About This Project

This project was built to demonstrate API testing skills using Playwright's built-in request context. It covers CRUD operations, authentication with JWT tokens, query parameter filtering, nested resource routes, and edge case/negative testing across multiple endpoints.

## Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- JSONPlaceholder REST API
- DummyJSON REST API
- dotenv for environment variable management

## Test Coverage

| Test Suite | Endpoint | What's Covered |
|------------|----------|----------------|
| Posts | JSONPlaceholder `/posts` | GET all, GET single, GET 404, POST, PUT, PATCH, DELETE, filter by userId |
| Users | JSONPlaceholder `/users` | GET all, GET single, GET 404, POST, PUT, DELETE, nested objects |
| Comments | JSONPlaceholder `/comments` | GET all, GET single, GET 404, POST, PUT, DELETE, nested route, query params |
| Todos | JSONPlaceholder `/todos` | GET all, GET single, GET 404, POST, PUT, DELETE, filter by completion status |
| Auth | DummyJSON `/auth` | Login, get current user, refresh token, invalid credentials, missing password, unauthorized access |

## Key Concepts Demonstrated

- Full CRUD operations across multiple endpoints
- JWT authentication flow — login, protected routes, token refresh
- Nested route testing (`/posts/1/comments`)
- Query parameter filtering (`/todos?completed=true`)
- Negative testing — 400, 401, 404 status codes
- Test data management with separate testData files
- Environment variables with dotenv
- `toMatchObject` for shape validation including deeply nested objects
- `array.every()` for validating all items in a response meet a condition

## Project Structure

```
├── tests/
│   ├── posts.spec.ts
│   ├── users.spec.ts
│   ├── comments.spec.ts
│   ├── todos.spec.ts
│   └── auth.spec.ts
├── testData/
│   ├── posts.ts
│   ├── users.ts
│   ├── comments.ts
│   ├── todos.ts
│   └── auth.ts
├── .env
├── playwright.config.ts
└── README.md
```

## How To Run

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/auth.spec.ts

# Run tests with UI mode
npx playwright test --ui

# View test report
npx playwright show-report
```

## Environment Variables

Create a `.env` file in the root directory:

```
DUMMYJSON_URL=https://dummyjson.com/auth
JSONPLACEHOLDER_URL=https://jsonplaceholder.typicode.com
```
