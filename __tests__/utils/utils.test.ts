import { AxiosError } from 'axios';
import { githubHeaders, githubBaseUrl, customError } from '../../src/utils/utils';

describe('utils module', () => {
  describe('githubHeaders', () => {
    it('should have the correct GitHub headers', () => {
      expect(githubHeaders).toEqual({
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      });
    });
  });

  describe('githubBaseUrl', () => {
    it('should have the correct GitHub base URL', () => {
      expect(githubBaseUrl).toBe('https://api.github.com');
    });
  });

  describe('customError', () => {
    it('should return a custom error with AxiosError and status 404', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404
        }
      } as AxiosError;

      const error = customError('Test Title', axiosError);
      expect(error.message).toBe('Test Title: Not Found');
      expect(error.stack).toBe('');
    });

    it('should return a custom error with AxiosError and unknown status', () => {
      const axiosError = {
        isAxiosError: true,
      } as AxiosError;

      const error = customError('Test Title', axiosError);
      expect(error.message).toBe('Test Title: Unknown Error');
      expect(error.stack).toBe('');
    });

    it('should return a custom error with non-Axios Error', () => {
      const normalError = new Error('Normal error');

      const error = customError('Test Title', normalError);
      expect(error.message).toBe('Test Title: Normal error');
      expect(error.stack).toBe('');
    });
  });
});
