# Controllers Tests

Unit tests for the controller functions in the application. It includes tests for `languagesController` and `usersController`.

## `languagesController`

Tests for the `languagesController`, specifically the addLanguages function, ensuring correct behavior under different scenarios.

### **Tests Included**

1. **Call `insertLanguages` when languages array is not empty**
    - **Description**: Ensures `insertLanguages` is called with the correct parameters when the languages array is not empty.
    - **Assertions**:
        - **`insertLanguages`** is called with the user ID and languages array.
        - **`insertLanguages`** is called exactly once.

1. **Do not call `insertLanguages` and log a message when languages array is empty**
    - **Description**: Ensures `insertLanguages` is not called and a log message is produced when the languages array is empty.
    - **Assertions**:
        - `insertLanguages` is not called.
        - Console logs `[ No programming languages found! ]`.

1. **Log a message when languages are being inserted**
    - **Description**: Ensures a log message is produced when languages are being inserted.
    - **Assertions**:
        - Console logs `[ Inserting languages to database... ]`.

## `usersController`

Tests for the `usersController`, covering the `fetchAndAddUser` and `listUsers` functions.

### **Tests Included**

1. **Fetch GitHub user, insert user to the database, and fetch user languages**
    - **Description**: Ensures `fetchAndAddUser` fetches a GitHub user, inserts the user into the database, and fetches the user's languages.
    - **Assertions**:
        - `fetchGitHubUser` is called with the username.
        - `insertUser` is called with the user information.
        - `fetchGithubLanguages` is called with the username.
        - Returns an object with `userId` and `languages`.

1. **Log a message when inserting user to the database**
    - **Description**: Ensures a log message is produced when a user is being inserted into the database.
    - **Assertions**:
        - Console logs `[ Inserting user to database... ]`.

1. **Call `getUsers` with no parameters and log the result**
    - **Description**: Ensures `listUsers` calls `getUsers` with no parameters and logs the result.
    - **Assertions**:
        - `getUsers` is called with `undefined, undefined`.
        - Console logs the returned users.

1. **Call `getUsers` with location and languages parameters and log the result**
    - **Description**: Ensures `listUsers` calls `getUsers` with location and languages parameters and logs the result.
    - **Assertions**:
        - `getUsers` is called with the location and languages.
        - Console logs the returned users.