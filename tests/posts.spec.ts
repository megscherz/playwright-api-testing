import { test, expect } from '@playwright/test';
import { testPost, updatedPost } from '../testData/posts';

test.describe('Posts API', () => {

  test('should get all posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    expect(posts[0]).toHaveProperty('userId');
    expect(posts.length).toBe(100);
  });

  test('should get a single post', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('id');
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(post).toHaveProperty('userId');
  });

  test('should return 404 for a post that does not exist', async ({ request }) => {
    const response = await request.get('/posts/999');
    expect(response.status()).toBe(404);
  });

  test('should create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
        data: testPost
    });
    
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post.title).toBe('My Test Post');
    expect(post.body).toBe('This is the body of my test post');
    expect(post.userId).toBe(1);
  });

   test('should update an existing post', async ({ request }) => {
    const response = await request.put('/posts/1', {
        data: updatedPost
    });
    
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.title).toBe('My Test Post 2');
    expect(post.body).toBe('I am updating the body of the post');
    expect(post.userId).toBe(1);
  });

  test('should delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

});