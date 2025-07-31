import { Page, expect } from "@playwright/test";

export class HomePage {
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
}
