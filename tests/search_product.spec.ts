import { test, expect } from "@playwright/test";
import { HomePage } from "../tests/pages/home";

const baseURL = process.env.BASE_URL!;

const home = new HomePage();

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

test("Search products", async ({ page }) => {
  await home.navigateToProductsPage(page);
  await page.waitForTimeout(3000);
  const productList = await page.locator(".features_items .col-sm-4");
  await expect(productList.first()).toBeVisible();
  const count = await productList.count();
  expect(count).toBeGreaterThan(0);

  // verify product name here
  const productName = await page
    .locator(".productinfo p")
    .first()
    .textContent();
  console.log(`Product Name: ${productName}`);

  await page.getByPlaceholder("Search Product").fill(productName!);
  await page.locator("[id=submit_search]").click();
  await page.waitForTimeout(3000);

  // Check that exactly one product appears
  const productResults = page.locator(".productinfo p");
  await expect(productResults).toHaveCount(1);

  // Verify the product name matches
  const searchedProductName = (
    await productResults.first().textContent()
  )?.trim();
  expect(searchedProductName).toBe(productName);
});
