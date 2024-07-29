# Database

## Models

The project uses Sequelize ORM to define and interact with the PostgreSQL database. 
Below are the database models used in the project.

### Users Model

Manages user data.

| Field | Type | Description |
|-|-|-|
| `id` | INTEGER, Primary Key |	Unique identifier, auto-incremented |
| `github_username` | STRING, Not Null |	GitHub username |
| `name` | STRING, Not Null | User's name |
| `location` | STRING, Not Null | User's location |

### Languages Model

Manages programming language data associated with users.

|Field | Type | Description |
|-|-|-|
|`id`	| INTEGER, Primary Key	| Unique identifier, auto-incremented|
|`user_id` | INTEGER, Not Null	| Identifier of the associated user|
|`language`| STRING, Not Null	| Programming language name|

#### Associations

- Users:
    - `hasMany` relationship with `Languages`
- Languages:
    - `belongsTo` relationship with `Users`

### Synchronization

Models are synchronized with the database to ensure tables are created or updated according to the model definitions.

## Migrations

The project uses Sequelize migrations to manage database schema changes. Migrations help in creating, altering, and deleting database tables and columns in a controlled and versioned manner.

### Users Table Migration

The `Users` table is created with the following fields:

| Field | Type | Description |
|-|-|-|
| `id` | INTEGER, Primary Key |	Unique identifier, auto-incremented |
| `github_username` | STRING, Not Null |	GitHub username |
| `name` | STRING, Not Null | User's name |
| `location` | STRING, Not Null | User's location |

### Languages Table Migration

The `Languages` table is created with the following fields:

|Field | Type | Description |
|-|-|-|
|`id`	| INTEGER, Primary Key	| Unique identifier, auto-incremented|
|`user_id` | INTEGER, Not Null	| Identifier of the associated user|
|`language`| STRING, Not Null	| Programming language name|

#### Constraints and Associations

- Users Table:
    - Unique constraint on `github_username`.

- Languages Table:
    - Foreign key constraint on `user_id`, referencing `Users(id)`, with cascading delete and update actions.
    - Unique constraint on the combination of `user_id` and `language`.

### Applying Migrations

To apply migrations, use the following Sequelize CLI commands:

- Run all migrations:

```bash
npm run db:migrate
```

- Revert a migration:

```bash
npm run db:migrate:undo
```

These commands ensure that the database schema is up-to-date with the model definitions.

## Sequelize Configuration

The project uses a configuration file to set up the Sequelize connection to the PostgreSQL database. The configuration is environment-specific and is stored in on the `config` folder, [here](./config/database.ts).

### Environment Variables

The configuration relies on the following environment variables, which should be defined in a `.env` file at the root of the project:

- `PG_USERNAME`: The username for the PostgreSQL database.
- `PG_PASSWORD`: The password for the PostgreSQL database.
- `PG_DATABASE`: The name of the PostgreSQL database.
- `PG_HOST`: The host address of the PostgreSQL database.

Example `.env` file:

```env
PG_USERNAME=your_db_username
PG_PASSWORD=your_db_password
PG_DATABASE=your_db_name
PG_HOST=your_db_host
```

This setup ensures that sensitive information is kept out of the source code and can be easily managed using environment variables.
