import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL!);

export async function insertUser(user: any): Promise<number> {
    console.log("Inserting user to database...");

    return await db.one(
        'INSERT INTO users(name, location) VALUES($1, $2) RETURNING id',
        [user.name, user.location]
    )
    .then(result => {
        console.log(`-> User added to database with id: ${result.id}`);
        return result.id
    })
    .catch((error: Error) => {
        throw new Error (`Error Inserting User into DB: ${error.message}`)
    });
};

export const insertLanguages = async (userId: number, languages: string[]): Promise<void> => {
    const queries = languages.map(language =>
        db.none(
            'INSERT INTO languages(user_id, language) VALUES($1, $2)', 
            [userId, language]
        ).then(() => console.log(`-> ${language} OK!`))
    );
    
    console.log("Inserting languages to database...");

    await Promise.all(queries).then(() => {
        console.log("Languages added to database!");
    })
    .catch((error: Error) => {
        throw new Error (`Error Inserting Languages into DB: ${error.message}`)
    });;
};
