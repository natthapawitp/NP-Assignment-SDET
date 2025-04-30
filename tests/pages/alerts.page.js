import { expect } from '@playwright/test';

export class AlertsPage {
  constructor(page) {
    this.page = page;
    this.confirmButton = page.locator('#confirmButton');
    this.cancelMessage = page.getByText('You selected Cancel');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/alerts');
  }

  async triggerAndDismissConfirmDialog() {
    this.page.once('dialog', async (dialog) => {
      console.log(`Dialog opened: ${dialog.message()}`);
      await dialog.dismiss();
    });
    await this.confirmButton.click();
  }

  async isCancelMessageVisible() {
    return await this.cancelMessage.isVisible();
  }
}
