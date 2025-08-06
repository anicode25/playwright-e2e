import { test, expect } from "@playwright/test";
import { HomePage } from "../tests/pages/home";
import { SignUp_Login_Page } from "../tests/pages/signup_login";
import { ProductsPage } from "../tests/pages/products";

const baseURL = process.env.BASE_URL!;
const userName = process.env.REGISTER_USER_NAME!;
const userEmail = process.env.REGISTER_USER_EMAIL!;
const userPassword = process.env.REGISTER_USER_PASSWORD!;

const home = new HomePage();
const products = new ProductsPage();
const signupandlogin = new SignUp_Login_Page();

test.beforeEach(async ({ page }) => {
  await home.goToHomePage(page, baseURL);
});

test("Search product and verify cart after login", async ({ page }) => {
  const expectedProductName = "Blue Top";
  await home.navigateToProductsPage(page);
  await products.verifyProductsList(page);
  await products.searchProduct(page, expectedProductName);
  await products.verifySingleSearchResultMatches(page, expectedProductName);
  await products.addProductToCart(page, 1);
  await products.viewCartFromPopup(page);
  const ProductName = await page
    .locator('[href="/product_details/1"]')
    .textContent();
  await expect(ProductName).toBe(expectedProductName);
  await home.navigateToSignupPage(page);
  await signupandlogin.logIn(page, userName, userEmail, userPassword);
  await home.navigateToCartPage(page);
  const ProductNameCheckTwice = await page
    .locator('[href="/product_details/1"]')
    .textContent();
  await expect(ProductName).toBe(ProductNameCheckTwice);
});
