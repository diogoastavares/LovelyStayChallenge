import axios, { AxiosError, AxiosResponse } from 'axios';
import { githubBaseUrl, githubHeaders, customError } from '../utils/utils' 

export async function fetchGitHubUser(username: string): Promise<any> {
    return await axios.get(
        `${githubBaseUrl}/users/${username}`, 
        { headers: githubHeaders }
    )
    .then((response: AxiosResponse) => {
        console.log(`[ User ${username} found! ]`);

        return {
            username: response.data.login,
            name: response.data.name,
            location: response.data.location
        }
    })
    .catch((error: AxiosError) => {
        throw customError(error);
    });
};

export const fetchGithubLanguages = async (username: string): Promise<string[]> => {
    return await axios.get(
        `${githubBaseUrl}/users/${username}/repos`,
        { headers: githubHeaders }
    )
    .then((response: AxiosResponse) => {
        const languages = new Set<string>

        response.data.forEach((repo: any) => {
            if (repo.language) {
                languages.add(repo.language);
            }
        });

        console.log(`-> ${username} Programming languages: ${Array.from(languages)}`)

        return Array.from(languages);
    })
    .catch((error: AxiosError) => {
        throw customError(error);
    });
};