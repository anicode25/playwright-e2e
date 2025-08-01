import { test, expect } from "@playwright/test";
import { HomePage } from "../tests/pages/home";
import { ProductsPage } from "../tests/pages/products";

const baseURL = process.env.BASE_URL!;

const home = new HomePage();
const products = new ProductsPage();

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

test("Add products in Cart", async ({ page }) => {
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
  await expect(checkoutButton).toBeVisible();
});
