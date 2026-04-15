import { test, expect } from "@playwright/test";
import { expectedUser, validUser } from "../testData/auth";

const BASE_URL = process.env.DUMMYJSON_URL;

test.describe("Auth API", () => {
  test("should login successfully with valid credentials", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: validUser,
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.username).toBe(expectedUser.username);
    expect(body).toHaveProperty("accessToken");
    expect(body).toHaveProperty("refreshToken");
    expect(body.accessToken).toBeTruthy();
    expect(body.refreshToken).toBeTruthy();
  });

  test("should get the current authenticated user", async ({ request }) => {
    // Step 1 — login first to get the token
    const loginResponse = await request.post(`${BASE_URL}/login`, {
      data: validUser,
    });
    const { accessToken } = await loginResponse.json();

    // Step 2 — use the token to get the current user
    const response = await request.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toMatchObject(expectedUser);
  });

  test("should get a new access token", async ({ request }) => {
    // Step 1 — login first to get the token
    const loginResponse = await request.post(`${BASE_URL}/login`, {
      data: validUser,
    });
    const { refreshToken } = await loginResponse.json();

    // Step 2 — use the refresh token to a new access token
    const response = await request.post(`${BASE_URL}/refresh`, {
      headers: {
        refreshToken: refreshToken,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.accessToken).not.toBe(refreshToken);
    expect(body).toHaveProperty("accessToken");
    expect(body).toHaveProperty("refreshToken");
    expect(body.accessToken).toBeTruthy();
    expect(body.refreshToken).toBeTruthy();
  });

  test("should return 400 when password is missing", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        username: "emilys",
        // no password
      },
    });
    expect(response.status()).toBe(400);
  });

  test("should return 401 when credentials are invalid", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        username: "emilys",
        password: "wrongpassword",
      },
    });
    expect(response.status()).toBe(400);
  });

  test("should return 401 when accessing protected route without token", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/me`);
    expect(response.status()).toBe(401);
  });

  test("should return 401 when refresh token is invalid", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_URL}/refresh`, {
      data: {
        refreshToken: "invalidtoken123",
      },
    });
    expect(response.status()).toBe(403);
  });
});
