// setupTests.ts
import { IDatabase } from 'pg-promise';

// Define the type for the mock database
interface MockDb extends IDatabase<any> {
    one: jest.Mock;
    tx: jest.Mock;
    any: jest.Mock;
}

// Create the mock database
const mockDb: Partial<MockDb> = {
    one: jest.fn(),
    tx: jest.fn(),
    any: jest.fn()
};

// Mock pg-promise
jest.mock('pg-promise', () => {
    return () => {
        return (cn: any) => {
            // Validate the connection configuration
            if (JSON.stringify(cn) !== JSON.stringify({
                user: 'mock-username',
                password: 'mock-password',
                database: 'mock-database',
                host: 'mock-host',
                port: 5432
            })) {
                throw new Error('Unexpected DATABASE_URL');
            }
            return mockDb;
        };
    };
});

// Set environment variables for the database configuration
process.env.DATABASE_URL = 'mock-database-url';
process.env.PG_USERNAME = 'mock-username';
process.env.PG_PASSWORD = 'mock-password';
process.env.PG_DATABASE = 'mock-database';
process.env.PG_HOST = 'mock-host';
process.env.PG_PORT = '5432';  // Note that environment variables are strings
