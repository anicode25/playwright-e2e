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

test("Verify all products and product detail", async ({ page }) => {
  const productName = await page
    .locator(".productinfo p")
    .first()
    .textContent();
  await home.navigateToProductsPage(page);
  await page.waitForTimeout(3000);
  await products.verifyProductsList(page);

  await products.verifyFistProductName(page);

  await products.goToProductDetailFromList(page);
  await products.verifyProductDetails(page, productName!);
});
