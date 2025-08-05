import { test } from "@playwright/test";
import { HomePage } from "../tests/pages/home";
import { SignUp_Login_Page } from "../tests/pages/signup_login";
import { ProductsPage } from "../tests/pages/products";
import { CartPage } from "../tests/pages/cart";

const baseURL = process.env.BASE_URL!;
const userName = process.env.REGISTER_USER_NAME!;
const userEmail = process.env.REGISTER_USER_EMAIL!;
const userPassword = process.env.REGISTER_USER_PASSWORD!;

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

test("Place Order: Login before checkout", async ({ page }) => {
  await home.navigateToSignupPage(page);
  await signupandlogin.logIn(page, userName, userEmail, userPassword);
  await home.navigateToProductsPage(page);
  await page.waitForTimeout(3000);
  await products.verifyProductsList(page);
  await products.addProductToCart(page, 1);
  await products.continueShoppingFromPopup(page);
  await products.addProductToCart(page, 2);
  await products.viewCartFromPopup(page);
  await page.waitForTimeout(500);
  await cart.proceedToCheckoutWithLogin(page);
  await cart.completePaymentDetailsAndConfirmOrder(page);
  // await signupandlogin.deleteAccount(page);   // Optionall
});
