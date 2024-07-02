import { insertLanguages } from "../services/databaseConnection"

export const addLanguages = async (userId: number, languages: string[]): Promise<void> => {
    await insertLanguages(userId, languages);
}