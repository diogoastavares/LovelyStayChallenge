export const insertUserQuery = `
    INSERT INTO users(github_username, name, location)
    VALUES($1, $2, $3) 
    ON CONFLICT (github_username)
    DO UPDATE SET
        name = EXCLUDED.name,
        location = EXCLUDED.location
    RETURNING id, (xmax = 0) AS new_insertion`;

export const insertLanguagesQuery = `
    INSERT INTO Languages (user_id, language)
    VALUES ($1, $2)
    ON CONFLICT (user_id, language) DO NOTHING
    RETURNING language`;

export const deleteObsoleteLanguagesQuery = `
    DELETE FROM Languages
    WHERE user_id = $1
    AND language IN (
        SELECT language
        FROM Languages
        WHERE user_id = $1
        EXCEPT
        SELECT unnest($2::text[])
    )
    RETURNING language`;