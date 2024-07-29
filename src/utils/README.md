# Utilities

The **`Utilities`** section covers helper functions, constants, and queries used throughout the project. 
These utilities aid in building the application’s features and managing interactions with the database and external APIs.

## `queries`

This file contains SQL queries used for database operations related to users and languages.

### **Queries**

- **`insertUserQuery`:** SQL query for inserting or updating a user in the Users table.
- **`insertLanguagesQuery`:** SQL query for inserting a new language for a user.
- **`deleteObsoleteLanguagesQuery`:** SQL query for deleting obsolete programming languages for a user.
- **`getUsersQuery`:** A function that generates a SQL query for retrieving users with optional filters for location and languages.

```typescript
// Insert or update user details in the database.
const query = insertUserQuery;

// Insert a new programming language for a user.
const query = insertLanguagesQuery;

// Delete obsolete programming languages for a user.
const query = deleteObsoleteLanguagesQuery;

// Retrieve users based on location and languages.
const { query, values } = getUsersQuery({ location: 'New York', languages: ['JavaScript', 'Python'] });
```

### **Errors**

Errors in these queries are generally related to database operations and are managed within the services that use these queries. 
For details, see the [Services](../services/README.md) section for potential errors.

## `utils`

This file contains utility functions and constants for managing GitHub API requests and handling errors.

### **Constants**

- **`githubHeaders`:** Headers for GitHub API requests.
- **`githubBaseUrl`:** Base URL for GitHub API requests.

```typescript
// Headers for GitHub API requests.
const headers = githubHeaders;
// GitHub API base URL.
const baseUrl = githubBaseUrl;

// GitHub API to retrieve a user info.
const response = await axios.get(`${githubBaseUrl}/users/${username}`, { headers: githubHeaders });
```

### **Functions**

- **customError`:** Function that creates custom error messages, based on an AxiosError or general Error, 
that may be used in catch blocks for error handling. 
For more details on errors, refer to the [Services](../services/README.md) section where these utilities are employed.

```typescript
// Create a custom error message.
const error = customError('Fetching GitHub User', axiosError);

throw error;
```