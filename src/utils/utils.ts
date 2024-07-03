import { AxiosError } from "axios";

export const githubHeaders: { [key: string]: string } = {
    Accept: "application/vnd.github+json",
    'X-GitHub-Api-Version': '2022-11-28'
}

export const githubBaseUrl: string = 'https://api.github.com';

const errorMessages: { [key: string]: string } = {
    404: "Not Found"
}

export const customError = (title: string, error: any) => ((e: Error) => { e.stack = ''; return e; })(new Error(`${title}: ${ errorMessages[error.response?.status!] || error.message}`))
