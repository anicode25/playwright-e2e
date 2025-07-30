import { test, expect, request } from '@playwright/test';

test('checking the ID is present in the json', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // checking the ID is present in the json body
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
});
