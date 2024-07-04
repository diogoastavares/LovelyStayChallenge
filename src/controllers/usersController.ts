import { fetchGitHubUser, fetchGithubLanguages } from "../services/githubConnection"
import { insertUser, getUsers } from "../services/databaseConnection"


export const fetchAndAddUser = async (username: string): Promise<{
    userId: number,
    languages: string[]
}> => {
    const userInfo = await fetchGitHubUser(username);

    console.log("[ Inserting user to database... ]");

    return {
        userId: await insertUser(userInfo), 
        languages: await fetchGithubLanguages(username)
    };
};

export const listUsers = async (location?: string, languages?: string[]): Promise<void> => {
    console.log(await getUsers(location, languages));
}