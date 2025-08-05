import { Page, expect } from "@playwright/test";

export class CartPage {
  async goToHomePage(page: Page, baseURL: string) {
    await page.goto(baseURL);
    await expect(page).toHaveURL("https://www.automationexercise.com/");
    await expect(page).toHaveTitle("Automation Exercise");
  }

  async navigateToSignupPage(page: Page) {
    await page.locator('//a[@href="/login"]').click();
    await expect(
      page.getByRole("heading", { name: "New User Signup!" })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Login to your account" })
    ).toBeVisible();
  }

  async navigateToProductsPage(page: Page) {
    await page.locator('//a[@href="/products"]').click();
    await expect(
      page.getByRole("heading", { name: "All Products" })
    ).toBeVisible();
  }

  async proceedToCheckoutWithoutLogin(page: Page) {
    await page.getByText("Proceed To Checkout").click();
    await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();
    await expect(
      page.getByText("Register / Login account to proceed on checkout.")
    ).toBeVisible();
    await page.locator('[href="/login"]').nth(1).click();
    await expect(
      page.getByRole("heading", { name: "New User Signup!" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login to your account" })
    ).toBeVisible();
  }

  async proceedToCheckoutWithLogin(page: Page) {
    await page.getByText("Proceed To Checkout").click();
    await page.locator('[name="message"]').fill("I am a test user");
    await page.locator('[href="/payment"]').click();
  }

  async completePaymentDetailsAndConfirmOrder(page: Page) {
    await expect(page.getByRole("heading", { name: "Payment" })).toBeVisible();
    await page.locator('[data-qa="name-on-card"]').fill("Test User");
    await page.locator('[data-qa="card-number"]').fill("4242424242424242");
    await page.locator('[data-qa="cvc"]').fill("123");
    await page.locator('[data-qa="expiry-month"]').fill("12");
    await page.locator('[data-qa="expiry-year"]').fill("2030");
    await page.locator('[data-qa="pay-button"]').click();
    await page.waitForTimeout(2000);
    // await expect(
    //   page.getByText("Your order has been placed successfully!")
    // ).toBeVisible();
  }
}
