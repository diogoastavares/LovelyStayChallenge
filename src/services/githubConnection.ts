import axios, { AxiosError, AxiosResponse } from 'axios';
import { githubBaseUrl, githubHeaders } from '../utils/utils' 

export async function fetchGitHubUser(username: string): Promise<any> {
    return await axios.get(
        `${githubBaseUrl}/users/${username}`, 
        { headers: githubHeaders }
    )
    .then((response: AxiosResponse) => {
        console.log(`User ${username} found!`);

        return {
            name: response.data.name,
            location: response.data.location
        }
    })
    .catch((error: AxiosError) => {
        throw(new Error(`Error when fetching GitHub User: ${error.message}`))
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

        console.log(`Programming languages found for ${username}: ${Array.from(languages)}`)

        return Array.from(languages);
    })
    .catch((error: AxiosError) => {
        throw(new Error(`Error when fetching GitHub Languages: ${error.message}`))
    });
};