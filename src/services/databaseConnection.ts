import pgPromise from 'pg-promise';
import {
  deleteObsoleteLanguagesQuery,
  insertLanguagesQuery,
  insertUserQuery,
  getUsersQuery
} from '../utils/queries';
import {
  customError
} from '../utils/utils';

const pgp = pgPromise();
const db = pgp({
  'user': process.env.PG_USERNAME,
  'password': process.env.PG_PASSWORD,
  'database': process.env.PG_DATABASE,
  'host': process.env.PG_HOST,
  'port': 5432
});

export async function insertUser(
  user: {
    [key: string]: string
  }
): Promise<number> {
  return await db.one(insertUserQuery, [
    user.username,
    user.name,
    user.location
  ])
    .then(result => {
      if (!result.new_insertion) {
        console.log('[ Already Exists! Updating Values.. ]');
      }

      console.log(`-> User ID: ${result.id}`);

      return result.id;
    })
    .catch((error: Error) => {
      throw customError('Error adding user to DB', error);
    });
};

export const insertLanguages = async (
  userId: number,
  languages: string[]
): Promise<void> => {
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
        throw customError('Error adding Languages to DB', error);
      });
  });
};

export const getUsers = async (
  location?: string,
  languages?: string[]
): Promise<{
  [key: string]: string
}[]> => {
  const { query, values } = getUsersQuery({ location, languages });

  return db.any(query, values)
    .catch((error: Error) => {
      throw customError('Error getting Users from DB', error);
    });
};
