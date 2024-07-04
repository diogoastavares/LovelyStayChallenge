export const insertUserQuery = `
    INSERT INTO "Users" (github_username, name, location)
    VALUES($1, $2, $3) 
    ON CONFLICT (github_username)
    DO UPDATE SET
        name = EXCLUDED.name,
        location = EXCLUDED.location
    RETURNING id, (xmax = 0) AS new_insertion`;

export const insertLanguagesQuery = `
    INSERT INTO "Languages" (user_id, language)
    VALUES ($1, $2)
    ON CONFLICT (user_id, language) DO NOTHING
    RETURNING language`;

export const deleteObsoleteLanguagesQuery = `
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

const getUsersBaseQuery = `
    SELECT u.*
    FROM "Users" u`;

const languagesCondition = `
    u.id IN (
        SELECT user_id
        FROM "Languages"
        WHERE language IN ($/languages:csv/)
        GROUP BY user_id
        HAVING COUNT(DISTINCT language) = $/languageCount/
    )`

export const getUsersQuery = (conditions: {
    location: string | undefined,
    languages: string[] | undefined
}): { [key: string]: any } => {
    let query: string = getUsersBaseQuery;
    let conditionsArray: string[] = [];
    let values: { [key: string]: any } = {};

    if (conditions.location) {
        conditionsArray.push('u.location = ${location}');
        values.location = location;
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
}