import pgPromise from 'pg-promise';
import { insertUser, insertLanguages, getUsers } from '../../src/services/databaseConnection';
import {
  insertUserQuery,
  insertLanguagesQuery,
  deleteObsoleteLanguagesQuery,
  getUsersQuery
} from '../../src/utils/queries';
import { customError } from '../../src/utils/utils';

jest.mock('../../src/utils/queries');

describe('myModule', () => {
  let db: any;

  beforeAll(() => {
    const pgp = pgPromise();
    db = pgp({
      'user': process.env.PG_USERNAME,
      'password': process.env.PG_PASSWORD,
      'database': process.env.PG_DATABASE,
      'host': process.env.PG_HOST,
      'port': 5432
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('insertUser', () => {
    it('should add a new user to the DB', async () => {
      const mockResult = { id: 1, new_insertion: true };
      db.one.mockResolvedValue(mockResult);

      const user = { username: 'testuser', name: 'Test User', location: 'Test Location' };
      const result = await insertUser(user);

      expect(db.one).toHaveBeenCalledWith(insertUserQuery, [user.username, user.name, user.location]);
      expect(result).toBe(mockResult.id);
    });

    it('should return an existing user ID from the DB', async () => {
      const mockResult = { id: 1, new_insertion: false };
      db.one.mockResolvedValue(mockResult);

      const user = { username: 'testuser', name: 'Test User', location: 'Test Location' };
      const result = await insertUser(user);

      expect(db.one).toHaveBeenCalledWith(insertUserQuery, [user.username, user.name, user.location]);
      expect(result).toBe(mockResult.id);
    });

    it('should handle errors from db.one', async () => {
      const user = { username: 'testuser', name: 'Test User', location: 'Test Location' };
      const mockError = new Error('Database error');

      db.one.mockRejectedValueOnce(mockError);

      await expect(insertUser(user)).rejects.toThrow(customError('Error adding user to DB', mockError));

      expect(db.one).toHaveBeenCalledWith(insertUserQuery, ['testuser', 'Test User', 'Test Location']);
    });
  });

  describe('insertLanguages', () => {
    it('should insert new and delete obsolete languages', async () => {
      const mockBatchResult = [ { language: 'JavaScript' }, { language: 'TypeScript' } ];
      const mockTx = {
        oneOrNone: jest.fn(),
        batch: jest.fn().mockResolvedValue(mockBatchResult),
        any: jest.fn().mockResolvedValue(mockBatchResult),
      };

      db.tx.mockImplementation((cb: any) => cb(mockTx));

      await insertLanguages(1, ['JavaScript', 'TypeScript']);

      expect(db.tx).toHaveBeenCalled();
      expect(mockTx.oneOrNone).toHaveBeenCalledWith(insertLanguagesQuery, [1, 'JavaScript']);
      expect(mockTx.oneOrNone).toHaveBeenCalledWith(insertLanguagesQuery, [1, 'TypeScript']);
      expect(mockTx.batch).toHaveBeenCalled();
      expect(mockTx.any).toHaveBeenCalledWith(deleteObsoleteLanguagesQuery, [1, ['JavaScript', 'TypeScript']]);
    });

    it('should skip existing languages', async () => {
      const mockBatchResult = [ null, { language: 'TypeScript' } ];
      const mockTx = {
        oneOrNone: jest.fn(),
        batch: jest.fn().mockResolvedValue(mockBatchResult),
        any: jest.fn().mockResolvedValue([]),
      };

      db.tx.mockImplementation((cb: any) => cb(mockTx));

      await insertLanguages(1, ['JavaScript', 'TypeScript']);

      expect(db.tx).toHaveBeenCalled();
      expect(mockTx.oneOrNone).toHaveBeenCalledWith(insertLanguagesQuery, [1, 'JavaScript']);
      expect(mockTx.oneOrNone).toHaveBeenCalledWith(insertLanguagesQuery, [1, 'TypeScript']);
      expect(mockTx.batch).toHaveBeenCalled();
      expect(mockTx.any).toHaveBeenCalledWith(deleteObsoleteLanguagesQuery, [1, ['JavaScript', 'TypeScript']]);
    });

    it('should handle errors in the transaction', async () => {
      const mockBatchResult = [ { language: 'JavaScript' }, { language: 'TypeScript' } ];
      const mockError = new Error('Transaction error');

      db.tx.mockImplementation((cb: any) => cb({
        oneOrNone: jest.fn(),
        batch: jest.fn().mockResolvedValue(mockBatchResult),
        any: jest.fn().mockRejectedValue(mockError)
      }));

      await expect(insertLanguages(1, ['JavaScript', 'TypeScript']))
        .rejects.toThrow(customError('Error adding Languages to DB', mockError));

      expect(db.tx).toHaveBeenCalled();
    });
  });

  describe('getUsers', () => {
    it('should call db.any with the correct query and return the user data', async () => {
      const mockQuery = 'SELECT * FROM users WHERE location = $1 AND language = $2';
      const mockValues = ['Test Location', 'JavaScript'];
      const mockResult = [{ id: 1, name: 'Test User', location: 'Test Location' }];
      (getUsersQuery as jest.Mock).mockReturnValue({ query: mockQuery, values: mockValues });

      db.any.mockResolvedValue(mockResult);

      const result = await getUsers('Test Location', ['JavaScript']);

      expect(db.any).toHaveBeenCalledWith(mockQuery, mockValues);
      expect(result).toEqual(mockResult);
    });

    it('should handle errors from db.any', async () => {
      const mockError = new Error('Database error');
      db.any.mockRejectedValue(mockError);

      await expect(getUsers('Test Location', ['JavaScript']))
        .rejects.toThrow(customError('Error getting Users from DB', mockError));

      expect(db.any).toHaveBeenCalledWith('SELECT * FROM users WHERE location = $1 AND language = $2', ['Test Location', 'JavaScript']);
    });
  });
});
