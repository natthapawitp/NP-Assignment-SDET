import { test, expect } from '@playwright/test';
import { AlertsPage } from '../tests/pages/alerts.page';

test.describe('UI Test: Alerts Page', () => {
    let alertsPage;
    let pageInstance; // variable to store the page instance

    // STEP 1: Setup before each test
    test.beforeEach(async ({ page }) => {
        pageInstance = page; // store the page instance for later use
        alertsPage = new AlertsPage(page);
        await alertsPage.navigate();
    });

    // STEP 2: Test dismissing a confirmation alert
    test('should dismiss the confirm alert and verify the cancel message', async () => {

        // --- STEP 2.1: Trigger and dismiss the alert ---
        await alertsPage.triggerAndDismissConfirmDialog();

        // --- STEP 2.2: Verify that the cancel message is displayed ---
        const isVisible = await alertsPage.isCancelMessageVisible();
        expect(isVisible).toBeTruthy();
    });

    // STEP 3: Teardown after each test (close the page)
    test.afterEach(async () => {
        await pageInstance.close(); // close the tab after the test
    });
});
