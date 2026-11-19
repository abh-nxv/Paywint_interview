import { test, expect } from '@playwright/test';

const APP_URL = 'https://paywint-qa.netlify.app/app/login.html';

test('valid login reaches the dashboard', async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome, student!')).toBeVisible();
  
  // ...now add the other tests listed above.
});

test('empty fields', async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.getByText('Username is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
});

test('invalid password', async ({ page }) => {
  await page.goto(APP_URL);
   await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.getByText('Your username or password is invalid! (2 attempts remaining)')).toBeVisible();
});

test('invalid password 3 times', async ({ page }) => {
  await page.goto(APP_URL);
   await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password1');
  await page.getByRole('button', { name: 'Log in' }).click();
   await page.getByLabel('Password').fill('Password1');
     await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByLabel('Password').fill('Password1');
      await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('button',{name: 'Log in'})).toBeDisabled();
});

test('5 rows', async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome, student!')).toBeVisible();
  await expect(page.getByTestId("count")).toHaveText("Showing 5 of 5 products");
});

test('search for keybpard', async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome, student!')).toBeVisible();
  await page.getByPlaceholder("Search products by name…").fill('keyboard');
  await expect(page.getByRole('cell',{name: "Mechanical Keyboard"})).toBeVisible();
    await expect(page.getByTestId("count")).toHaveText("Showing 1 of 5 products");
});

test('add webcam', async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome, student!')).toBeVisible();
  await page.locator('#newProduct').fill('webcam');
  await page.locator('#addBtn').click();
    await expect(page.getByTestId("count")).toHaveText("Showing 6 of 6 products");
});

test('logout', async ({ page }) => {
  await page.goto(APP_URL);
  await page.getByLabel('Username').fill('student');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome, student!')).toBeVisible();
  await page.locator('#logoutBtn').click();
    await expect(page).toHaveURL(/login/);
});

//a - auto waiting makes playwright automatically wait for elementions to be actionable before performing operations on it. Fixed sleep makes the tests slow and test flakiness will also be introduced.
//b - role based selection is better because of better accessibility friendly approach and makes the tests more readable.