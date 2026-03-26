Feature: Employee Management
  As an admin
  I want to manage employees
  So that the company directory is up to date

  Scenario: Add a new employee
    Given I navigate to the home page
    When I click on Add New Employee
    And I fill out the employee form with valid data
    And I submit the form
    Then I should see the new employee in the list
