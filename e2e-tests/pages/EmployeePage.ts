import { Page, expect } from '@playwright/test';

export class EmployeePage {
  constructor(public page: Page) {}

  async fillEmployeeForm(data: { name: string, email: string, role: string, isRemote: boolean }) {
    await this.page.locator('#name').fill(data.name);
    await this.page.locator('#email').fill(data.email);
    await this.page.locator('#role').selectOption(data.role);
    
    if (data.isRemote) {
      await this.page.locator('#remote').check();
    } else {
      await this.page.locator('#remote').uncheck();
    }
  }

  async submitForm() {
    await this.page.locator('#btn-submit').click();
  }
}
