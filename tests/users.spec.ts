import { test, expect } from "@playwright/test";
import { testUser, updatedUser } from "../testData/users";

test.describe("Users API", () => {
  test("should get all users", async ({ request }) => {
    const response = await request.get("/users");
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      website: expect.any(String),
      address: {
        street: expect.any(String),
        suite: expect.any(String),
        city: expect.any(String),
        zipcode: expect.any(String),
        geo: {
          lat: expect.any(String),
          lng: expect.any(String),
        },
      },
      company: {
        name: expect.any(String),
        catchPhrase: expect.any(String),
        bs: expect.any(String),
      },
    });
    expect(users.length).toBe(10);
  });

  test("should get a single user", async ({ request }) => {
    const response = await request.get("/users/1");
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      phone: expect.any(String),
      website: expect.any(String),
      address: {
        street: expect.any(String),
        suite: expect.any(String),
        city: expect.any(String),
        zipcode: expect.any(String),
        geo: {
          lat: expect.any(String),
          lng: expect.any(String),
        },
      },
      company: {
        name: expect.any(String),
        catchPhrase: expect.any(String),
        bs: expect.any(String),
      },
    });
  });

  test("should return 404 for a user that does not exist", async ({
    request,
  }) => {
    const response = await request.get("/users/999");
    expect(response.status()).toBe(404);
  });

  test("should return empty array for userId that has no posts", async ({
    request,
  }) => {
    const response = await request.get("/posts?userId=999");
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBe(0);
  });

  test("should create a new user", async ({ request }) => {
    const response = await request.post("/users", {
      data: testUser,
    });

    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.id).toBeDefined();
    const { id, ...responseWithoutId } = user;
    expect(responseWithoutId).toMatchObject(testUser);
  });

  test("should update a user", async ({ request }) => {
    const res = await request.put("/users/1", {
      data: updatedUser,
    });

    expect(res.status()).toBe(200);
  });

  test("should delete a user", async ({ request }) => {
    const response = await request.delete("/users/1");
    expect(response.status()).toBe(200);
  });
});
