import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(public page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async verifyOnHomePage() {
    await expect(this.page.getByRole('heading', { name: 'Employees' })).toBeVisible();
  }

  async clickAddEmployee() {
    await this.page.locator('#btn-add-new-employee').click();
  }

  async verifyEmployeeInList(name: string) {
    const row = this.page.locator('.employee-row', { hasText: name });
    await expect(row).toBeVisible();
  }
}
