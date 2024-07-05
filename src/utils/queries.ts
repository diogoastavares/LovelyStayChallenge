export const insertUserQuery: string = `
  INSERT INTO "Users" (github_username, name, location)
  VALUES($1, $2, $3) 
  ON CONFLICT (github_username)
  DO UPDATE SET
      name = EXCLUDED.name,
      location = EXCLUDED.location
  RETURNING id, (xmax = 0) AS new_insertion`;

export const insertLanguagesQuery: string = `
  INSERT INTO "Languages" (user_id, language)
  VALUES ($1, $2)
  ON CONFLICT (user_id, language) DO NOTHING
  RETURNING language`;

export const deleteObsoleteLanguagesQuery: string = `
  DELETE FROM "Languages"
  WHERE user_id = $1
  AND language IN (
    SELECT language
    FROM "Languages"
    WHERE user_id = $1
    EXCEPT
    SELECT unnest($2::text[])
  )
  RETURNING language`;

const getUsersBaseQuery: string = `
  SELECT u.*
  FROM "Users" u`;

const languagesCondition: string = `
  u.id IN (
    SELECT user_id
    FROM "Languages"
    WHERE language IN ($/languages:csv/)
    GROUP BY user_id
    HAVING COUNT(DISTINCT language) = $/languageCount/
  )`;

export const getUsersQuery = (
  conditions: {
    location: string | undefined,
    languages: string[] | undefined
  }
): {
  query: string
  values: object
} => {
  let query: string = getUsersBaseQuery;
  const conditionsArray: string[] = [];
  const values: { [key: string]: string | string[] | number } = {};

  if (conditions.location) {
    conditionsArray.push('u.location = ${location}');
    values.location = conditions.location;
  }

  if (conditions.languages && conditions.languages.length > 0) {
    conditionsArray.push(languagesCondition);
    values.languages = conditions.languages;
    values.languageCount = conditions.languages.length;
  }

  if (conditionsArray.length > 0) {
    query += ' WHERE ' + conditionsArray.join(' AND ');
  }

  return {
    query,
    values
  };
};
