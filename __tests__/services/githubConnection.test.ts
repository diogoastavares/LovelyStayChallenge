// githubApi.test.ts

import axios, { AxiosError, AxiosHeaders } from 'axios';
import { fetchGitHubUser, fetchGithubLanguages } from '../../src/services/githubConnection';
import { githubBaseUrl, githubHeaders, customError } from '../../src/utils/utils';

// Mock the axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GitHub API Functions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchGitHubUser', () => {
    test('should fetch user data and return formatted response', async () => {
      const username = 'testUser';
      const mockResponse = {
        data: {
          login: 'testUser',
          name: 'Test User',
          location: 'Portugal'
        }
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchGitHubUser(username);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${githubBaseUrl}/users/${username}`,
        { headers: githubHeaders }
      );
      expect(result).toEqual({
        username: 'testUser',
        name: 'Test User',
        location: 'Portugal'
      });
    });

    test('should handle errors and throw a custom error', async () => {
      const username = 'testUser';
      const mockError = {
        isAxiosError: true,
        response: {
          status: 404
        }
      } as AxiosError;

      mockedAxios.get.mockRejectedValue(mockError);

      await expect(fetchGitHubUser(username)).rejects.toThrow(customError('Error when fetching GitHub User', mockError));
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${githubBaseUrl}/users/${username}`,
        { headers: githubHeaders }
      );
    });
  });

  describe('fetchGithubLanguages', () => {
    test('should fetch user repos and return unique languages', async () => {
      const username = 'testUser';
      const mockResponse = {
        data: [
          { language: 'JavaScript' },
          { language: 'TypeScript' },
          { language: 'JavaScript' },
          { language: 'Python' }
        ]
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchGithubLanguages(username);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${githubBaseUrl}/users/${username}/repos`,
        { headers: githubHeaders }
      );
      expect(result).toEqual(['JavaScript', 'TypeScript', 'Python']);
    });

    test('should handle errors and throw a custom error', async () => {
      const username = 'testUser';
      const mockError = {
        isAxiosError: true,
        response: {
          status: 500
        }
      } as AxiosError;
      mockedAxios.get.mockRejectedValue(mockError);

      await expect(fetchGithubLanguages(username)).rejects.toThrow(customError('Error when fetching GitHub Languages', mockError));
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${githubBaseUrl}/users/${username}/repos`,
        { headers: githubHeaders }
      );
    });
  });
});
