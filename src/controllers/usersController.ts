import { fetchGitHubUser, fetchGithubLanguages } from "../services/githubConnection"
import { insertUser } from "../services/databaseConnection"


export const fetchAndAddUser = async (username: string): Promise<{
    userId: number,
    languages: string[]
}> => {
    const userInfo = await fetchGitHubUser(username);

    console.log(userInfo);

    return {
        userId: await insertUser(userInfo), 
        languages: await fetchGithubLanguages(username)
    };
};
