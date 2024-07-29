// queries.test.ts

import { insertUserQuery, insertLanguagesQuery, deleteObsoleteLanguagesQuery, getUsersQuery } from '../../src/utils/queries';

// Utility function to normalize SQL query strings for comparison
const normalizeSQL = (query: string): string => query.replace(/\s+/g, ' ').trim();

describe('SQL Queries', () => {
  test('insertUserQuery should match the expected SQL string', () => {
    const expected = `
      INSERT INTO "Users" (github_username, name, location)
      VALUES($1, $2, $3) 
      ON CONFLICT (github_username)
      DO UPDATE SET
          name = EXCLUDED.name,
          location = EXCLUDED.location
      RETURNING id, (xmax = 0) AS new_insertion`.trim();
    expect(normalizeSQL(insertUserQuery)).toBe(normalizeSQL(expected));
  });

  test('insertLanguagesQuery should match the expected SQL string', () => {
    const expected = `
    INSERT INTO "Languages" (user_id, language)
    VALUES ($1, $2)
    ON CONFLICT (user_id, language) DO NOTHING
    RETURNING language`.trim();
    expect(normalizeSQL(insertLanguagesQuery)).toBe(normalizeSQL(expected));
  });

  test('deleteObsoleteLanguagesQuery should match the expected SQL string', () => {
    const expected = `
    DELETE FROM "Languages"
    WHERE user_id = $1
    AND language IN (
        SELECT language
        FROM "Languages"
        WHERE user_id = $1
        EXCEPT
        SELECT unnest($2::text[])
    )
    RETURNING language`.trim();
    expect(normalizeSQL(deleteObsoleteLanguagesQuery)).toBe(normalizeSQL(expected));
  });

  describe('getUsersQuery', () => {
    test('should return the base query with no conditions', () => {
      const result = getUsersQuery({ location: undefined, languages: undefined });
      const expectedQuery = 'SELECT u.* FROM "Users" u';
      expect(normalizeSQL(result.query)).toBe(normalizeSQL(expectedQuery));
      expect(result.values).toEqual({});
    });

    test('should include location condition in the query', () => {
      const result = getUsersQuery({ location: 'New York', languages: undefined });
      const expectedQuery = 'SELECT u.* FROM "Users" u WHERE u.location = ${location}';
      expect(normalizeSQL(result.query)).toBe(normalizeSQL(expectedQuery));
      expect(result.values).toEqual({ location: 'New York' });
    });

    test('should include languages condition in the query', () => {
      const result = getUsersQuery({ location: undefined, languages: ['JavaScript', 'Python'] });
      const expectedQuery = `
    SELECT u.*
    FROM "Users" u
    WHERE u.id IN (
        SELECT user_id
        FROM "Languages"
        WHERE language IN ($/languages:csv/)
        GROUP BY user_id
        HAVING COUNT(DISTINCT language) = $/languageCount/
    )`.trim();
      expect(normalizeSQL(result.query)).toBe(normalizeSQL(expectedQuery));
      expect(result.values).toEqual({ languages: ['JavaScript', 'Python'], languageCount: 2 });
    });

    test('should include both location and languages conditions in the query', () => {
      const result = getUsersQuery({ location: 'New York', languages: ['JavaScript', 'Python'] });
      const expectedQuery = `
    SELECT u.*
    FROM "Users" u
    WHERE u.location = \$\{location\}
    AND u.id IN (
        SELECT user_id
        FROM "Languages"
        WHERE language IN ($/languages:csv/)
        GROUP BY user_id
        HAVING COUNT(DISTINCT language) = $/languageCount/
    )`.trim();
      expect(normalizeSQL(result.query)).toBe(normalizeSQL(expectedQuery));
      expect(result.values).toEqual({ location: 'New York', languages: ['JavaScript', 'Python'], languageCount: 2 });
    });

    test('should return correct query for only location with languages', () => {
      const result = getUsersQuery({ location: 'San Francisco', languages: ['JavaScript'] });
      const expectedQuery = `
    SELECT u.*
    FROM "Users" u
    WHERE u.location = \$\{location\}
    AND u.id IN (
        SELECT user_id
        FROM "Languages"
        WHERE language IN ($/languages:csv/)
        GROUP BY user_id
        HAVING COUNT(DISTINCT language) = $/languageCount/
    )`.trim();
      expect(normalizeSQL(result.query)).toBe(normalizeSQL(expectedQuery));
      expect(result.values).toEqual({ location: 'San Francisco', languages: ['JavaScript'], languageCount: 1 });
    });
  });
});
