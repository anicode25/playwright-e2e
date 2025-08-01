import { Page, expect } from "@playwright/test";

export class ProductsPage {
  async verifyProductsList(page: Page) {
    const productList = await page.locator(".features_items .col-sm-4");
    await expect(productList.first()).toBeVisible();
    const count = await productList.count();
    expect(count).toBeGreaterThan(0);
  }
  async searchProduct(page: Page, productName: string) {
    await page.getByPlaceholder("Search Product").fill(productName!);
    await page.locator("[id=submit_search]").click();
    await page.waitForTimeout(3000);
  }
  async verifySingleSearchResultMatches(page: Page, productName: string) {
    // Check that exactly one product appears
    const productResults = page.locator(".productinfo p");
    await expect(productResults).toHaveCount(1);
    // Verify the product name matches
    const searchedProductName = (
      await productResults.first().textContent()
    )?.trim();
    expect(searchedProductName).toBe(productName);
  }

  async verifyFistProductName(page: Page) {
    const productName = await page
      .locator(".productinfo p")
      .first()
      .textContent();
    console.log(`Product Name: ${productName}`);
  }

  async goToProductDetailFromList(page: Page) {
    await page.locator('[href="/product_details/1"]').click();
  }

  async verifyProductDetails(page: Page, expectedProductName: string) {
    const productInfo = page.locator(".product-information");

    // Verify name
    const actualProductName = await productInfo.locator("h2").textContent();
    expect(actualProductName?.trim()).toBe(expectedProductName);

    // Check product information
    await expect(productInfo.locator("h2")).toBeVisible();
    await expect(
      productInfo.locator("p", { hasText: "Category:" })
    ).toBeVisible();
    await expect(productInfo.locator("span > span")).toBeVisible();
    await expect(
      productInfo.locator("p", { hasText: "Availability:" })
    ).toBeVisible();
    await expect(
      productInfo.locator("p", { hasText: "Condition:" })
    ).toBeVisible();
    await expect(productInfo.locator("p", { hasText: "Brand:" })).toBeVisible();
  }
}
