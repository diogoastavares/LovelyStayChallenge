# Controllers

## `usersController`

The `usersController` handles user-related operations including fetching user details from GitHub, adding users to the database, and listing users based on location and programming languages.

### **Functions**

- **`fetchAndAddUser`:** Fetches a GitHub user’s information and adds the user to the database. Also fetches the user's programming languages from GitHub.
- **`listUsers`:** Lists users from the database based on optional location and language filters.

```typescript
// Fetches GitHub user information for 'johndoe', adds the user to the database, 
// and retrieves the user's ID and programming languages.
const result = await fetchAndAddUser('johndoe');

// Lists users from 'New York' who know 'JavaScript'.
await listUsers('New York', ['JavaScript']);
```

### **Errors**

These functions rely on `githubConnection` and `databaseConnection` services, which may throw errors. 
See the [Services](../services/README.md) section for details on these errors.

## `languagesController`

The `languagesController` manages the addition of programming languages for a user in the database.

### **Functions**

- **`addLanguages`:** Adds or updates the list of programming languages for a user in the database.

```typescript
// Adds programming languages for the user with ID 1.
await addLanguages(1, ['Python', 'Go']);
```

### **Errors**

This function relies on the `databaseConnection` service, which may throw errors. 
See the [Services](../services/README.md) section for details on these errors.