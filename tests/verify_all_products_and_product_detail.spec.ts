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

test("Verify all products and product detail", async ({ page }) => {
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

  // product detail page verification here
  await page.locator('[href="/product_details/1"]').click();
  const productNameFromDetails = await page
    .locator(".product-information h2")
    .textContent();
  expect(productNameFromDetails).toBe(productName);

  const productInfo = page.locator(".product-information");

  // Verify product name
  await expect(productInfo.locator("h2")).toBeVisible();

  // Verify category
  await expect(
    productInfo.locator("p", { hasText: "Category:" })
  ).toBeVisible();

  // Verify price
  await expect(productInfo.locator("span > span")).toBeVisible();

  // Verify availability
  await expect(
    productInfo.locator("p", { hasText: "Availability:" })
  ).toBeVisible();

  // Verify condition
  await expect(
    productInfo.locator("p", { hasText: "Condition:" })
  ).toBeVisible();

  // Verify brand
  await expect(productInfo.locator("p", { hasText: "Brand:" })).toBeVisible();
});
