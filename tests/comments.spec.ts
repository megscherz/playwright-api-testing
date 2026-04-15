import { test, expect } from "@playwright/test";
import { testPost, updatedPost } from "../testData/posts";
import { testComment, updatedComment } from "../testData/comments";

test.describe("Comments API", () => {
  test("should get all comments", async ({ request }) => {
    const response = await request.get("/comments");
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(comments[0]).toHaveProperty("id");
    expect(comments[0]).toHaveProperty("name");
    expect(comments[0]).toHaveProperty("email");
    expect(comments[0]).toHaveProperty("body");
    expect(comments[0]).toHaveProperty("postId");
    expect(comments.length).toBe(500);
  });

  test("should get a single comment", async ({ request }) => {
    const response = await request.get("/comments/1");
    expect(response.status()).toBe(200);
    const comment = await response.json();
    expect(comment.id).toBe(1);
    expect(comment).toHaveProperty("name");
    expect(comment).toHaveProperty("body");
    expect(comment).toHaveProperty("email");
    expect(comment).toHaveProperty("postId");
  });

  test("should return 404 for a comment that does not exist", async ({
    request,
  }) => {
    const response = await request.get("/comments/999");
    expect(response.status()).toBe(404);
  });

  test("should get all comments for a specific post", async ({ request }) => {
    const response = await request.get("/posts/1/comments");
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(
      comments.every((comment: { postId: number }) => comment.postId === 1),
    ).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
  });

  test("should get comments by postId using query params", async ({
    request,
  }) => {
    const response = await request.get("/comments?postId=1");
    expect(response.status()).toBe(200);
    const comments = await response.json();
    expect(
      comments.every((comment: { postId: number }) => comment.postId === 1),
    ).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
  });

  test("should create a new comment", async ({ request }) => {
    const response = await request.post("/comments", {
      data: testComment,
    });

    expect(response.status()).toBe(201);
    const comment = await response.json();
    expect(comment.postId).toBe(testComment.postId);
    expect(comment.body).toBe(testComment.body);
    expect(comment.name).toBe(testComment.name);
    expect(comment.email).toBe(testComment.email);
    expect(comment.id).toBe(1);
  });

  test("should update an existing comment", async ({ request }) => {
    const response = await request.put("/comments/1", {
      data: updatedComment,
    });

    expect(response.status()).toBe(200);
    const comment = await response.json();
    expect(comment.postId).toBe(updatedComment.postId);
    expect(comment.body).toBe(updatedComment.body);
    expect(comment.name).toBe(updatedComment.name);
    expect(comment.email).toBe(updatedComment.email);
  });

  test("should delete a comment", async ({ request }) => {
    const response = await request.delete("/comments/1");
    expect(response.status()).toBe(200);
  });
});
