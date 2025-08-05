import { test } from "@playwright/test";
import { HomePage } from "../tests/pages/home";
import { SignUp_Login_Page } from "../tests/pages/signup_login";
import { ProductsPage } from "../tests/pages/products";
import { CartPage } from "../tests/pages/cart";
import { faker } from "@faker-js/faker";

const baseURL = process.env.BASE_URL!;
const signUpName = faker.person.fullName();
const signUpEmail = `testuser_${Date.now()}@mail.com`;
const signUpPassword = "Itobuz#1234";

const home = new HomePage();
const products = new ProductsPage();
const cart = new CartPage();
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

test("Place Order: Register while checkout ", async ({ page }) => {
  await home.navigateToProductsPage(page);
  await page.waitForTimeout(3000);
  await products.verifyProductsList(page);
  await products.addProductToCart(page, 1);
  await products.continueShoppingFromPopup(page);
  await products.addProductToCart(page, 2);
  await products.viewCartFromPopup(page);
  await page.waitForTimeout(500);
  const checkoutButton = page.locator("a.btn.btn-default.check_out", {
    hasText: "Proceed To Checkout",
  });
  await cart.proceedToCheckoutWithoutLogin(page);
  await page.waitForTimeout(1000);
  await signupandlogin.signUp(page, signUpName, signUpEmail);
  await signupandlogin.completeAccountInfo(page, signUpPassword);

  await page.locator('[href="/view_cart"]').nth(0).click();
  await cart.proceedToCheckoutWithLogin(page);
  await cart.completePaymentDetailsAndConfirmOrder(page);
  await signupandlogin.deleteAccount(page);
});
