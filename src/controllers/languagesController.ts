import { insertLanguages } from '../services/databaseConnection';

export const addLanguages = async (
  userId: number,
  languages: string[]
): Promise<void> => {
  if (languages.length) {
    console.log('[ Inserting languages to database... ]');

    await insertLanguages(userId, languages);
  }
  else {
    console.log('[ No programming languages found! ]');
  }
};
