# Services Tests

Unit tests for the service functions in the application. It includes tests for `databaseConnection` and `githubConnection`.

## `databaseConnection`

Tests for the `databaseConnection` service, covering functions such as `insertUser`, `insertLanguages`, and `getUsers`.

### **Tests Included**

1. **`insertUser`**
    - **Description**: Tests the `insertUser` function to ensure it correctly adds or retrieves a user from the database.
    - **Assertions**:
        - Adds a new user to the database.
        - Returns an existing user ID if the user already exists.
        - Handles errors from `db.one` and throws a custom error.

1. **`insertLanguages`**
    - **Description**: Tests the `insertLanguages` function to ensure it correctly inserts and deletes languages in the database.
    - **Assertions**:
        - Inserts new and deletes obsolete languages.
        - Skips existing languages.
        - Handles errors in the transaction and throws a custom error.

1. **`getUsers`**
    - **Description**: Tests the `getUsers` function to ensure it correctly retrieves user data based on the provided location and languages.
    - **Assertions**:
        - Calls `db.any` with the correct query and parameters.
        - Handles errors from `db.any` and throws a custom error.

## `githubConnection`

Tests for the `githubConnection` service, covering functions such as `fetchGitHubUser` and `fetchGithubLanguages`.

### **Tests Included**

1. **`fetchGitHubUser`**
    - **Description**: Tests the `fetchGitHubUser` function to ensure it correctly fetches and formats GitHub user data.
    - **Assertions**:
        - Fetches user data and returns a formatted response.
        - Handles errors and throws a custom error.

1. **`fetchGithubLanguages`**
    - **Description**: Tests the `fetchGithubLanguages` function to ensure it correctly fetches and returns unique languages from GitHub repositories.
    - **Assertions**:
        - Fetches user repositories and returns unique languages.
        - Handles errors and throws a custom error.