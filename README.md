# 🧪 EMS – Employee Management System (BDD Test Automation Portfolio)

A full-stack web application built specifically to showcase **real-world, industry-standard test automation** using **Playwright** and **Behavior-Driven Development (BDD)**. 

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), TailwindCSS |
| Backend | Node.js, Express |
| Database | SQLite |
| Test Framework | Playwright |
| BDD Layer | playwright-bdd (Cucumber/Gherkin) |
| Design Pattern | Page Object Model (POM) |

---

## 📐 Project Structure

```
BDD-practice/
├── backend/                  # Node.js + Express REST API
│   ├── server.js             # Express server, routes (CRUD + file download)
│   └── database.js           # SQLite schema + connection setup
│
├── frontend/                 # React SPA (Vite)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── EmployeeList.jsx   # Employee table with Edit/Delete
│       │   ├── EmployeeForm.jsx   # Rich form (input, dropdown, radio, checkbox, datepicker, file upload)
│       │   ├── KanbanBoard.jsx    # Drag & Drop status board
│       │   └── ComplexElements.jsx # Modal, Alert, Tooltip, Iframe, File Download
│       └── App.jsx
│
└── e2e-tests/                # Playwright BDD Test Suite
    ├── features/             # Gherkin .feature files
    ├── steps/                # Step definitions (TypeScript)
    ├── pages/                # Page Object Model classes
    ├── utils/                # Test data management utilities
    ├── fixtures.ts           # Custom Playwright test fixtures
    └── playwright.config.ts  # Central Playwright configuration
```

---

## 🎯 What I Built – Application Features

This is a realistic **Employee Management System** that contains a wide variety of UI elements, specifically chosen to cover the maximum number of test scenario types:

| UI Element / Interaction | Where |
|---|---|
| ✅ Text & Email Inputs | Employee Form |
| ✅ Native Select Dropdown | Role selector |
| ✅ Radio Buttons | Status selector (Active / Inactive) |
| ✅ Checkbox | Remote Work toggle |
| ✅ Date Picker | Join Date |
| ✅ File Upload | Profile picture upload |
| ✅ CRUD Table | Employee List (Create, Read, Update, Delete) |
| ✅ Drag and Drop | Kanban Board (status change by dragging cards) |
| ✅ Hover Menus | Navigation dropdown (hover-to-reveal) |
| ✅ Tooltips | Hover tooltip element |
| ✅ Modal Dialog | Confirm action modal |
| ✅ Native Browser Alert | `window.alert()` interaction |
| ✅ File Download | Report generation and download |
| ✅ Iframe | Embedded iframe element |

---

## 🏗️ Automation Architecture

### Behavior-Driven Development (BDD) with Gherkin
Tests are written first in **plain English** (Gherkin) so non-technical stakeholders can read and contribute to test coverage:

```gherkin
Feature: Employee Management

  Scenario: Add a new employee
    Given I navigate to the home page
    When I click on Add New Employee
    And I fill out the employee form with valid data
    And I submit the form
    Then I should see the new employee in the list
```

### Page Object Model (POM)
All UI interactions are encapsulated in dedicated Page Object classes, keeping step definitions clean and avoiding test code duplication:

```
pages/
├── HomePage.ts       # Navigation, verifications for the employee list
└── EmployeePage.ts   # Form filling, submission, assertions for employee CRUD
```

```typescript
// Example: EmployeePage.ts
async fillEmployeeForm(data: { name, email, role, isRemote }) {
  await this.page.locator('#name').fill(data.name);
  await this.page.locator('#email').fill(data.email);
  await this.page.locator('#role').selectOption(data.role);
  if (data.isRemote) await this.page.locator('#remote').check();
}
```

### Custom Fixtures
Playwright's fixture mechanism is used to inject pre-built POM instances cleanly into every BDD step, following dependency injection principles:

```typescript
// fixtures.ts
export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  employeePage: async ({ page }, use) => await use(new EmployeePage(page)),
});
```

### Test Data Management
Dynamic test data is generated programmatically to prevent conflicts between test runs and ensure complete isolation:

```typescript
// utils/testData.ts
export const getUniqueEmployeeData = () => ({
  name: `Test User ${Date.now()}`,
  email: `testuser${Date.now()}@example.com`,
  role: 'Developer',
  isRemote: true
});
```

---

## ▶️ Running the Project

### Prerequisites
- Node.js v18+

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Test Dependencies & Browsers
```bash
cd e2e-tests
npm run init
```

### 4. Run the Tests
> Tests will automatically start both the backend and frontend servers!

```bash
cd e2e-tests
npm run test
```

### 5. Run the App Manually
```bash
# Terminal 1
cd backend && node server.js

# Terminal 2
cd frontend && npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📊 Playwright Configuration Highlights

- **Auto-server management**: `webServer` config starts both backend and frontend automatically before running tests.
- **Full tracing**: Traces captured on first retry for debugging.
- **HTML Report**: Visual test report generated after every test run (`npx playwright show-report`).
- **Viewport**: Fixed at 1280×720 for consistency.

---

## 💡 Key Concepts Demonstrated

| Concept | How It's Applied |
|---|---|
| BDD / Gherkin | `.feature` files with Scenarios, Given/When/Then steps |
| Page Object Model | Separate `pages/` directory with typed POM classes |
| Test Fixtures | Custom `fixtures.ts` for dependency injection |
| Test Data Management | `utils/testData.ts` with dynamic data generation |
| TypeScript | All automation code written in TypeScript |
| Web API Testing | Backend REST API tested indirectly via UI + server calls |
| Selector Strategy | Semantic IDs (`#name`, `#btn-submit`) for reliable selectors |
| Drag & Drop Testing | React DnD Kanban board automated with Playwright |

---
