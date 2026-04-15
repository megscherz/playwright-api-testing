import { test, expect } from '@playwright/test';
import { testTodo, updatedTodo } from '../testData/todos';

test.describe('Todos API', () => {

  test('should get all todos', async ({ request }) => {
    const response = await request.get('/todos');
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('completed');
    expect(posts[0]).toHaveProperty('userId');
    expect(posts.length).toBe(200);
  });

  test('should get a single todo', async ({ request }) => {
    const response = await request.get('/todos/1');
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toHaveProperty('id');
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('completed');
    expect(post).toHaveProperty('userId');
  });

  test('should return 404 for a todo that does not exist', async ({ request }) => {
    const response = await request.get('/todos/999');
    expect(response.status()).toBe(404);
  });

  test('should create a new todo', async ({ request }) => {
    const response = await request.post('/todos', {
        data: testTodo
    });
    
    expect(response.status()).toBe(201);
    const post = await response.json();
    expect(post.title).toBe('My Test Todo');
    expect(post.completed).toBe(false);
    expect(post.userId).toBe(1);
  });

   test('should update an existing todo', async ({ request }) => {
    const response = await request.put('/todos/1', {
        data: updatedTodo
    });
    
    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.title).toBe('My Test Todo 2');
    expect(post.completed).toBe(true);
    expect(post.userId).toBe(1);
  });

  test('should delete a todo', async ({ request }) => {
    const response = await request.delete('/todos/1');
    expect(response.status()).toBe(200);
  });

});