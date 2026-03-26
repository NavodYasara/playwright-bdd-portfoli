import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures';
import { getUniqueEmployeeData } from '../utils/testData';

const { Given, When, Then } = createBdd(test);

let currentEmployeeData: any;

Given('I navigate to the home page', async ({ homePage }) => {
  await homePage.navigate();
  await homePage.verifyOnHomePage();
});

When('I click on Add New Employee', async ({ homePage }) => {
  await homePage.clickAddEmployee();
});

When('I fill out the employee form with valid data', async ({ employeePage }) => {
  currentEmployeeData = getUniqueEmployeeData();
  await employeePage.fillEmployeeForm(currentEmployeeData);
});

When('I submit the form', async ({ employeePage }) => {
  await employeePage.submitForm();
});

Then('I should see the new employee in the list', async ({ homePage }) => {
  await homePage.verifyEmployeeInList(currentEmployeeData.name);
});
