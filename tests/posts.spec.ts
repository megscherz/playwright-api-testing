import { test, expect } from '@playwright/test';
import { testPost, updatedPost, patchedPost } from '../testData/posts';

test.describe('Posts API', () => {

  test('should get all posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
      userId: expect.any(Number),
    });
  });

  test('should get a single post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post).toMatchObject({
      title: expect.any(String),
      body: expect.any(String),
      userId: expect.any(Number),
    });
  });

  test('should return 404 for a post that does not exist', async ({ request }) => {
    const response = await request.get('/posts/999');
    expect(response.status()).toBe(404);
  });

  test('should get all posts from a single user', async ({ request }) => {
    const response = await request.get('/posts?userId=1');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    expect(
      posts.every((post: { userId: number }) => post.userId === 1),
    ).toBe(true);
  })

  test('should create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
        data: testPost
    });
    
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post.title).toBe(testPost.title);
    expect(post.body).toBe(testPost.body);
    expect(post.userId).toBe(testPost.userId);
  });

  test('should update an existing post', async ({ request }) => {
    const response = await request.put('/posts/1', {
        data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.title).toBe(updatedPost.title);
    expect(post.body).toBe(updatedPost.body);
    expect(post.userId).toBe(updatedPost.userId);
  });

  test('should update part of an existing post', async ({ request }) => {
    const response = await request.patch('/posts/1', {
        data: patchedPost
    });

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.title).toBe(patchedPost.title);
  });

  test('should delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

});