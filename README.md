# LovelyStay Challenge

## Overview

This project is a Node.js application developed as a challenge for LovelyStay. 
The main objective of this application is to manage users by fetching their 
information from GitHub and storing it in a PostgreSQL database. It also 
provides functionality to list users with optional filters based on location 
and programming languages. The application uses TypeScript, Sequelize ORM for 
database management, ESLint for code quality assurance, and Jest for unit 
testing and coverage reporting.

## Project Structure

```bash
LovelyStayChallenge/
├── .eslintrc
├── .gitignore
├── .sequelizerc
├── package-lock.json
├── package.json
├── tsconfig.json
├── __tests__/
│ ├── controllers/
│ │ ├── languagesController.test.ts
│ │ ├── usersController.test.ts
│ │ └── README.md
│ ├── services/
│ │ ├── databaseConnection.test.ts
│ │ ├── githubConnection.test.ts
│ │ └── README.md
│ ├── utils/
│ │ ├── queries.test.ts
│ │ ├── utils.test.ts
│ │ └── README.md
│ └── README.md
├── db/
│ ├── config/
│ │ └── database.ts
│ ├── migrations/
│ │ ├── 00-create-users.ts
│ │ └── 01-create-languages.ts
│ ├── models/
│ │ ├── Languages.ts
│ │ └── Users.ts
│ └── README.md
├── src/
│ ├── controllers/
│ │ ├── languagesController.ts
│ │ ├── usersController.ts
│ │ └── README.md
│ ├── services/
│ │ ├── databaseConnection.ts
│ │ ├── githubConnection.ts
│ │ └── README.md
│ ├── utils/
│ │ ├── queries.ts
│ │ ├── utils.ts
│ │ └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- PostgreSQL (make sure it is installed and running)

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

5. **Run migrations to set up the database:**

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

## Testing

The `__tests__` folder contains unit tests for different parts of the application. For more information see [Testing](./__tests__/).

### Running the Tests

To run all tests, use the following command:

```bash
npm run test
````

To check the test coverage, use:

```bash
npm run test:cov
```


You can also run tests for specific parts of the application:

- **Controllers**: View [Controller Tests](./__tests__/controllers/)
    
    ```bash
    npm run test __tests__/controllers/
    ```

- **Services**: View [Service Tests](./__tests__/services/)

    ```bash
    npm run test __tests__/services/
    ```

- **Utils**: View [Utils Tests](./__tests__/utils/)

    ```bash
    npm run test __tests__/utils/
    ```

## Project Details

For detailed information about the database models, controllers, services, and utilities used in this project, please refer to the specific README files located in their respective folders:

- **Database:** Refer to [Database](./db/) for details on database setup.
- **Controllers:** Refer to [Controllers](./src/controllers/) for information about the controllers.
- **Services:** Refer to [Services](./src/services/) for details on services.
- **Utilities:** Refer to [Utilities](./src/utils/) for information about the utility functions and constants.

For any questions or suggestions, please contact [diogo.tav.1997@gmail.com].