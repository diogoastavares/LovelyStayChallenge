import pgPromise from 'pg-promise';
import { 
    deleteObsoleteLanguagesQuery, 
    insertLanguagesQuery, 
    insertUserQuery,
    getUsersQuery
} from '../utils/queries';
import { customError } from '../utils/utils';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL!);

export async function insertUser(user: any): Promise<number> {
    return await db.one(insertUserQuery, [user.username, user.name, user.location])
        .then(result => {
            if (!result.new_insertion) {
                console.warn("[ Already Exists! Updating Values.. ]")
            }

            console.log(`-> User ID: ${result.id}`);

            return result.id;
        })
        .catch((error: Error) => {
            throw customError("Error adding user do DB", error);
        });
};

export const insertLanguages = async (userId: number, languages: string[]): Promise<void> => {
    await db.tx(t => {
        const addResults = languages.map(language =>
            t.oneOrNone(insertLanguagesQuery,
                [userId, language])
        );

        return t.batch(addResults)
            .then(results => {
                results.forEach((result, index) => {
                    const language = languages[index];
                    if (result) {
                        console.log(`-> ${language} added!`);
                    } else {
                        console.log(`-> ${language} already exists! Skipped...`);
                    }
                });

                return t.any(deleteObsoleteLanguagesQuery, [userId, languages]);
            })
            .then(obsoleteLanguages => {
                if (obsoleteLanguages.length > 0) {
                    obsoleteLanguages.forEach(({ language }) => {
                        console.log(`-> ${language} removed!`);
                    });
                } else {
                    console.log('[ No obsolete languages to remove! ]');
                }
            })
            .catch((error: Error) => {
                throw customError("Error adding Languages do DB", error);
            });
    });
}

export const getUsers = async (location?: string, languages?: string[]): Promise<any[]> => {
    const { query, values } = getUsersQuery({ location, languages });

    return db.any(query, values)
        .catch(error => {
            throw customError("Error getting Users from DB", error)
        })
}