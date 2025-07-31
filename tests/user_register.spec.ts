import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { HomePage } from "../tests/pages/home";
import { SignUp_Login_Page } from "../tests/pages/signup_login";

const baseURL = process.env.BASE_URL!;
const signUpName = faker.person.fullName();
const signUpEmail = `testuser_${Date.now()}@mail.com`;
const signUpPassword = "Itobuz#1234";

const home = new HomePage();
const signupandlogin = new SignUp_Login_Page();

test.beforeEach(async ({ page }) => {
  await home.goToHomePage(page, baseURL);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `screenshots/${testInfo.title}.png`,
      fullPage: true,
    });
  }
});

test("register a new user", async ({ page }) => {
  await home.navigateToSignupPage(page);
  await signupandlogin.signUp(page, signUpName, signUpEmail);
  await signupandlogin.completeAccountInfo(page, signUpPassword);
  await signupandlogin.deleteAccount(page);
});
