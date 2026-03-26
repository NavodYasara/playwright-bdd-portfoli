import { test as base } from 'playwright-bdd';
import { HomePage } from './pages/HomePage';
import { EmployeePage } from './pages/EmployeePage';

type MyFixtures = {
  homePage: HomePage;
  employeePage: EmployeePage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  employeePage: async ({ page }, use) => await use(new EmployeePage(page)),
});
