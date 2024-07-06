# Testing

This directory contains all the unit tests for the application. The tests are organized into subdirectories based on the functionality they cover. Below is a detailed overview of each section.

## Setup Tests

The `setupTests.ts` file configures the testing environment, setting up mock implementations for the database connection.

### Setup Details

- **Mock Database Configuration:** Mocks the `pg-promise` library and sets up a mock database with functions like `one`, `tx`, and `any`.
- **Environment Variables:** Sets environment variables for database configuration, ensuring consistency during tests.

This setup ensures that the tests run in a controlled environment with consistent database configurations, making the tests reliable and repeatable.

## Controllers

The controllers folder contains unit tests for the controller functions in the application. It includes tests for `languagesController` and `usersController`. For more information refer to [Controller Tests](./controllers/).

## Services

The services folder contains unit tests for the service functions in the application. It includes tests for `databaseConnection` and `githubConnection`. For more information refer to [Controller Tests](./services/).

## Utils

The utils folder contains unit tests for the utility functions in the application. For more information refer to [Controller Tests](./utils/).