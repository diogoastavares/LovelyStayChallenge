# Utility Tests

Unit tests for utility functions and SQL queries used in the application. The tests validate that utility functions are correct and that SQL queries generate the expected statements.

## `queries`

This file contains tests for the SQL queries used in the application. The tests verify that the SQL queries are correctly formatted and produce the expected results.

### **Tests Included**

1. **`insertUserQuery`**
    - **Description**: Tests the `insertUserQuery` to ensure that the SQL statement for inserting or updating a user is correctly formatted.
    - **Assertions**:
        - Verifies that the SQL query for inserting or updating a user includes the correct fields and handles conflicts by updating the existing records.
        - Checks that the query returns the correct user ID and insertion status.

1. **`insertLanguagesQuery`**
    - **Description**: Tests the `insertLanguagesQuery` to ensure that the SQL statement for inserting a language into the `Languages` table is correctly formatted.
    - **Assertions**:
        - Verifies that the SQL query handles conflicts where the language already exists for a user.
        - Ensures that the query returns the inserted language.

1. **`deleteObsoleteLanguagesQuery`**
    **Description**: Tests the `deleteObsoleteLanguagesQuery` to ensure that the SQL statement for deleting languages from the `Languages` table that are no longer associated with a user is correctly formatted.
    **Assertions**:
        - Checks that the SQL query deletes the obsolete languages correctly.
        - Ensures that the query returns the deleted languages.

1. **`getUsersQuery`**
    - **Description**: Tests the `getUsersQuery` to ensure that the SQL statement for retrieving users based on optional `location` and `languages` conditions is correctly formatted.
    - **Assertions**:
        - Verifies that the SQL query correctly handles cases where no conditions are provided.
        - Ensures that the query includes location and language conditions as required.
        - Checks that the query returns the correct users based on the conditions provided.

## `utils`

This file contains tests for the utility functions used in the application. The tests verify that utility functions behave as expected and handle errors correctly.

### `Tests Included`

1. **`githubHeaders`**
    - **Description**: Tests the `githubHeaders` object to ensure that the correct headers are set for GitHub API requests.
    - **Assertions**:
        - Verifies that the `githubHeaders` object includes the `Accept` header for GitHub API version and `X-GitHub-Api-Version` header.

1. **`githubBaseUrl`**
    - **Description**: Tests the `githubBaseUrl` to ensure that the base URL for GitHub API requests is correctly set.
    - **Assertions**:
        - Checks that the `githubBaseUrl` is set to the correct GitHub API base URL.

1. **`customError`**
    - **Description**: Tests the `customError` function to ensure it formats errors properly based on the type of error.
    - **Assertions**:
        - Verifies that `customError` returns a message for `AxiosError` with a status of 404.
        - Ensures that `customError` returns a default message for `AxiosError` with unknown status or general errors.
        - Checks that `customError` correctly formats errors from other types of `Error` instances.