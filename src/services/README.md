# Services

## `databaseConnection`

The `databaseConnection` service manages interactions with the PostgreSQL database for user management and language tracking.

### **Functions**

- **`insertUser`:** Adds or updates a user’s information in the database. Returns the user ID.

- **`insertLanguages`:** Adds programming languages for a user and removes obsolete languages.

- **`getUsers`:** Retrieves users from the database with optional location and language filters.

```typescript
// Adds or updates johndoe user's details, returning the ID.
await insertUser({ username: 'johndoe', name: 'John Doe', location: 'New York' });

// Adds new programming languages and removes obsolete ones for the user with ID 1.
await insertLanguages(1, ['JavaScript', 'TypeScript']);

// Retrieves a list of users from New York who know JavaScript.
const users = await getUsers('New York', ['JavaScript']);
```

### **Errors**

`insertUser`, `insertLanguages`, and `getUsers` may throw errors due to various issues related to database operations. Below are some common errors you might encounter and how to interpret the error messages.

```bash
Error adding user to DB: <error>
```
**Possible Causes:**

- Database connection issues.
- Invalid or missing user data.

```bash
Error adding Languages to DB: <error>
```

**Possible Causes:**

- Issues with the languages array (e.g., invalid or empty languages).
- Transaction errors during the database update.

```bash
Error getting Users from DB: <error>
```

**Possible Causes:**

- Incorrect query or filter parameters.
- Issues with the getUsersQuery function or SQL query.


## `githubConnection`

The githubConnection service handles interactions with the GitHub API to fetch user data and repository languages.

### **Functions**

- **`fetchGitHubUser`:** Fetches a user's information from GitHub by username.
- **`fetchGithubLanguages`:** Fetches the programming languages used by the
specified GitHub user from their repositories.

```typescript
// Fetches the GitHub user information for 'johndoe'.
const user = await fetchGitHubUser('johndoe');

// Fetches the programming languages used by 'johndoe'.
const languages = await fetchGithubLanguages('johndoe');
```

### **Errors**

`fetchGitHubUser` and `fetchGithubLanguages` may throw errors if the user does not exist or if there is an issue with the GitHub API.

```bash
Error fetching GitHub user: <error>

Error fetching GitHub languages: <error>
```