# LovelyStay Challenge

## Overview

This project is a Node.js application developed as a challenge for LovelyStay. 
The main objective of this application is to manage users by fetching their 
information from GitHub and storing it in a PostgreSQL database. It also 
provides functionality to list users with optional filters based on location 
and programming languages. The application uses TypeScript, Sequelize ORM for 
database management, and ESLint for code quality assurance.

## Project Structure

```bash
LovelyStayChallenge/
├── .eslintrc
├── .gitignore
├── .sequelizerc
├── package-lock.json
├── package.json
├── tsconfig.json
├── db/
│ ├── config/
│ │ └── database.ts
│ ├── migrations/
│ │ ├── 00-create-users.ts
│ │ └── 01-create-languages.ts
│ └── models/
│ ├── Languages.ts
│ └── Users.ts
├── src/
│ ├── controllers/
│ │ ├── languagesController.ts
│ │ └── usersController.ts
│ ├── services/
│ │ ├── databaseConnection.ts
│ │ └── githubConnection.ts
│ └── utils/
│ ├── queries.ts
│ └── utils.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- PostgreSQL

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/LovelyStayChallenge.git
    cd LovelyStayChallenge
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure the database connection:**

    The database configuration is managed via environment variables. Create a 
    `.env` file in the root directory of the project and add your database 
    configuration variables:

    ```plaintext
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    DB_DATABASE=your_database_name
    ```

4. **Install the `dotenv` package to load environment variables:**

    ```bash
    npm install dotenv
    ```

6. **Run migrations to set up the database:**

    ```bash
    npx sequelize-cli db:migrate
    ```

## Running the Application

To start the application, use:

```bash
npm start
```

## Running Commands

This application is designed to be operated via specific commands. Use the
following commands to run various parts of the application:

- To add a new user by fetching information from GitHub and storing it in the
database:

    ```bash
    npm run addUser <username>
    ```

    Replace `<username>` with the GitHub username of the user you want to add.

- To list all users stored in the database with optional filters:

    ```bash
    npm run listUsers [options]
    ```

    **Options:**
    - **-l, --location [location]:** Filter users by location.
    - **--languages [languages...]:** Filter users by programming languages.

## Development

To start the application in development mode with hot-reloading:

```bash
npm run dev
```

## Linting

To run ESLint to check for linting errors:

```bash
npm run lint
```

## Project Details

### Database Models

- **Users:** Manages user data.
- **Languages:** Manages language data.

### Controllers

- **usersController:** Handles CRUD operations related to users.
- **languagesController.ts:** Handles CRUD operations related to languages.

### Services

- **databaseConnection:** Manages the connection to the database.
- **githubConnection:** Placeholder for potential GitHub API interactions.

### Utilities

- **queries:** Contains common database queries.
- **utils:** Contains utility functions.

## Contact

For any questions or suggestions, please contact [diogo.tav.1997@gmail.com].