import { test, expect } from '@playwright/test';

const baseURL = process.env.BASE_URL!;
const testEmail = process.env.TEST_EMAIL!;
const testPassword = process.env.TEST_PASSWORD!;

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
  await expect(page).toHaveURL('https://www.automationexercise.com/');
  await expect(page).toHaveTitle('Automation Exercise');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
  }
});

test('register a new user', async ({ page }) => {
  await page.locator('//a[@href="/login"]').click();
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

  await page.locator('[data-qa="signup-name"]').fill('Test Code');
  await page.locator('[data-qa="signup-email"]').fill(testEmail);
  await page.locator('[data-qa="signup-button"]').click();

  await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

  await page.locator('[id="id_gender1"]').click();
  await expect(page.locator('[id="id_gender1"]')).toBeChecked();
  await page.locator('[data-qa="password"]').fill(testPassword);
  await page.locator('[data-qa="days"]').selectOption('9');
  await page.locator('[data-qa="months"]').selectOption('October');
  await page.locator('[data-qa="years"]').selectOption('1994');
  await page.locator('[data-qa="first_name"]').fill('Test');
  await page.locator('[data-qa="last_name"]').fill('Code');
  await page.locator('[data-qa="company"]').fill('XYZ');
  await page.locator('[data-qa="address"]').fill('12, ABC Road');
  await page.locator('[data-qa="state"]').fill('West Bengal');
  await page.locator('[data-qa="city"]').fill('kolkata');
  await page.locator('[data-qa="zipcode"]').fill('123456');
  await page.locator('[data-qa="mobile_number"]').fill('0123456789');
  await page.locator('[data-qa="create-account"]').click();

  await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
  await page.locator('[data-qa="continue-button"]').click();

  await page.locator('[href="/delete_account"]').isVisible();
  await page.locator('[href="/delete_account"]').click();
  await expect(page.getByRole('heading', { name: 'Account Deleted!' })).toBeVisible();
  await page.locator('[data-qa="continue-button"]').click();
});
