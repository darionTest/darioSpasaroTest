import { test, expect } from '@playwright/test';
import GridPage from "../pages/grid";

test.describe("Grid Tests", () => {
    let gridPage;

    test.beforeEach(async ({ page }) => {
        gridPage = new GridPage(page);
        await gridPage.navigate("/grid");
    });

    test("Positive Case - Get product based on position", async () => {
        const position = 6;
        const { name, price } = await gridPage.getItemAtPosition(position);
        expect(name).toBe('Super Pepperoni');
        expect(price).toBe(10);
    });

    test("Positive Case - Verify all items have required elements", async () => {
        const boolean = await gridPage.allItemsHaveRequiredElements();
        expect(boolean).toBe(true);
    });
});