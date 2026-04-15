import { test, expect } from '@playwright/test';
import { testTodo, updatedTodo } from '../testData/todos';

test.describe('Todos API', () => {

  test('should get all todos', async ({ request }) => {
    const response = await request.get('/todos');
    expect(response.status()).toBe(200);
    const todos = await response.json();
    expect(todos.length).toBe(200);
    expect(todos[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
      userId: expect.any(Number),
    });
  });

  test('should get a single todo', async ({ request }) => {
    const response = await request.get('/todos/1');
    expect(response.status()).toBe(200);
    const todo = await response.json();
    expect(todo.id).toBe(1);
    expect(todo).toMatchObject({
      title: expect.any(String),
      completed: expect.any(Boolean),
      userId: expect.any(Number),
    });
  });

  test('should return 404 for a todo that does not exist', async ({ request }) => {
    const response = await request.get('/todos/999');
    expect(response.status()).toBe(404);
  });

  test('should filter todos by completion status using query params', async ({ request }) => {
    const response = await request.get('/todos?completed=true');
    expect(response.status()).toBe(200);
    const todos = await response.json();
    expect(todos.length).toBeGreaterThan(0);
    expect(todos.every((todo: { completed: boolean }) => todo.completed === true)).toBe(true);
  })

  test('should create a new todo', async ({ request }) => {
    const response = await request.post('/todos', {
        data: testTodo
    });
    
    expect(response.status()).toBe(201);
    const todo = await response.json();
    expect(todo.title).toBe(testTodo.title);
    expect(todo.completed).toBe(testTodo.completed);
    expect(todo.userId).toBe(testTodo.userId);
  });

   test('should update an existing todo', async ({ request }) => {
    const response = await request.put('/todos/1', {
        data: updatedTodo
    });
    
    expect(response.status()).toBe(200);
    const todo = await response.json();
    expect(todo.title).toBe(updatedTodo.title);
    expect(todo.completed).toBe(updatedTodo.completed);
    expect(todo.userId).toBe(updatedTodo.userId);
  });

  test('should delete a todo', async ({ request }) => {
    const response = await request.delete('/todos/1');
    expect(response.status()).toBe(200);
  });

});