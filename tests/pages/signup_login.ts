import { Page, expect } from "@playwright/test";

export class SignUp_Login_Page {
  async signUp(page: Page, signUpName: string, signUpEmail: string) {
    await page.locator('[data-qa="signup-name"]').fill(signUpName);
    await page.locator('[data-qa="signup-email"]').fill(signUpEmail);
    await page.locator('[data-qa="signup-button"]').click();
  }

  async completeAccountInfo(page: Page, signUpPassword: string) {
    await expect(
      page.getByRole("heading", { name: "Enter Account Information" })
    ).toBeVisible();

    await page.locator('[id="id_gender1"]').click();
    await expect(page.locator('[id="id_gender1"]')).toBeChecked();
    await page.locator('[data-qa="password"]').fill(signUpPassword);
    await page.locator('[data-qa="days"]').selectOption("9");
    await page.locator('[data-qa="months"]').selectOption("October");
    await page.locator('[data-qa="years"]').selectOption("1994");
    await page.locator('[data-qa="first_name"]').fill("Test");
    await page.locator('[data-qa="last_name"]').fill("Code");
    await page.locator('[data-qa="company"]').fill("XYZ");
    await page.locator('[data-qa="address"]').fill("12, ABC Road");
    await page.locator('[data-qa="state"]').fill("West Bengal");
    await page.locator('[data-qa="city"]').fill("kolkata");
    await page.locator('[data-qa="zipcode"]').fill("123456");
    await page.locator('[data-qa="mobile_number"]').fill("0123456789");
    await page.locator('[data-qa="create-account"]').click();

    await expect(
      page.getByRole("heading", { name: "Account Created!" })
    ).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();
  }

  async deleteAccount(page: Page) {
    await page.locator('[href="/delete_account"]').isVisible();
    await page.locator('[href="/delete_account"]').click();
    await expect(
      page.getByRole("heading", { name: "Account Deleted!" })
    ).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();
  }
}
