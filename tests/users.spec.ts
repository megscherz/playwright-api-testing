import { test, expect } from "@playwright/test";
import { testUser, updatedUser } from "../testData/users";

test.describe("Users API", () => {
  test("should get all users", async ({ request }) => {
    const response = await request.get("/users");
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("username");
    expect(users[0]).toHaveProperty("email");
    expect(users[0]).toHaveProperty("phone");
    expect(users[0]).toHaveProperty("website");
    expect(users[0].company).toMatchObject({
      name: expect.any(String),
      catchPhrase: expect.any(String),
      bs: expect.any(String),
    });
    expect(users[0].address).toMatchObject({
      street: expect.any(String),
      suite: expect.any(String),
      city: expect.any(String),
      zipcode: expect.any(String),
    });
    expect(users[0].address.geo).toMatchObject({
      lat: expect.any(String),
      lng: expect.any(String),
    });
    expect(users.length).toBe(10);
  });

  test("should get a single user", async ({ request }) => {
    const response = await request.get("/users/1");
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("email");
    expect(user.address).toMatchObject({
      street: expect.any(String),
      suite: expect.any(String),
      city: expect.any(String),
      zipcode: expect.any(String),
    });
    expect(user.address.geo).toMatchObject({
      lat: expect.any(String),
      lng: expect.any(String),
    });
    expect(user).toHaveProperty("phone");
    expect(user).toHaveProperty("website");
    expect(user.company).toMatchObject({
      name: expect.any(String),
      catchPhrase: expect.any(String),
      bs: expect.any(String),
    });
  });

  test("should return 404 for a user that does not exist", async ({
    request,
  }) => {
    const response = await request.get("/users/999");
    expect(response.status()).toBe(404);
  });

  test("should create a new user", async ({ request }) => {
    const response = await request.post("/users", {
      data: testUser
    });

    const user = await response.json();
    expect(response.status()).toBe(201);
    expect(user).toMatchObject({
      name: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "Chicago",
      },
    });
    expect(user).toHaveProperty("id");
  });

  test("should update an existing user", async ({ request }) => {
    const response = await request.put("/users/1", {
      data: updatedUser
    });

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toMatchObject({
      name: "Jane Doe",
      username: "janedoe",
      email: "janedoe@example.com",
    });
  });

  test("should delete a user", async ({ request }) => {
    const response = await request.delete("/users/1");
    expect(response.status()).toBe(200);
  });
});
