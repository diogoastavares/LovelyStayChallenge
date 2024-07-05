import { fetchAndAddUser, listUsers } from '../../src/controllers/usersController';
import {
  fetchGitHubUser,
  fetchGithubLanguages
} from '../../src/services/githubConnection';
import {
  insertUser,
  getUsers
} from '../../src/services/databaseConnection';

jest.mock('../../src/services/githubConnection');
jest.mock('../../src/services/databaseConnection');

describe('fetchAndAddUser', () => {
  const mockFetchGitHubUser = fetchGitHubUser as jest.MockedFunction<typeof fetchGitHubUser>;
  const mockFetchGithubLanguages = fetchGithubLanguages as jest.MockedFunction<typeof fetchGithubLanguages>;
  const mockInsertUser = insertUser as jest.MockedFunction<typeof insertUser>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch GitHub user, insert user to the database, and fetch user languages', async () => {
    const username = 'testuser';
    const userInfo = { id: '1', name: 'Test User' };
    const languages = ['JavaScript', 'TypeScript'];

    mockFetchGitHubUser.mockResolvedValue(userInfo);
    mockInsertUser.mockResolvedValue(Number(userInfo.id));
    mockFetchGithubLanguages.mockResolvedValue(languages);

    const result = await fetchAndAddUser(username);

    expect(mockFetchGitHubUser).toHaveBeenCalledWith(username);
    expect(mockFetchGitHubUser).toHaveBeenCalledTimes(1);
    expect(mockInsertUser).toHaveBeenCalledWith(userInfo);
    expect(mockInsertUser).toHaveBeenCalledTimes(1);
    expect(mockFetchGithubLanguages).toHaveBeenCalledWith(username);
    expect(mockFetchGithubLanguages).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      userId: Number(userInfo.id),
      languages
    });
  });

  it('should log a message when inserting user to the database', async () => {
    const username = 'testuser';
    const userInfo = { id: '1', name: 'Test User' };
    const languages = ['JavaScript', 'TypeScript'];

    mockFetchGitHubUser.mockResolvedValue(userInfo);
    mockInsertUser.mockResolvedValue(Number(userInfo.id));
    mockFetchGithubLanguages.mockResolvedValue(languages);

    const consoleSpy = jest.spyOn(console, 'log');

    await fetchAndAddUser(username);

    expect(consoleSpy).toHaveBeenCalledWith('[ Inserting user to database... ]');

    consoleSpy.mockRestore();
  });
});

describe('listUsers', () => {
  const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getUsers with no parameters and log the result', async () => {
    const users = [{ id: '1', name: 'Test User' }];
    mockGetUsers.mockResolvedValue(users);

    const consoleSpy = jest.spyOn(console, 'log');

    await listUsers();

    expect(mockGetUsers).toHaveBeenCalledWith(undefined, undefined);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(users);

    consoleSpy.mockRestore();
  });

  it('should call getUsers with location and languages parameters and log the result', async () => {
    const location = 'Test Location';
    const languages = ['JavaScript', 'TypeScript'];
    const users = [{ id: '1', name: 'Test User' }];
    mockGetUsers.mockResolvedValue(users);

    const consoleSpy = jest.spyOn(console, 'log');

    await listUsers(location, languages);

    expect(mockGetUsers).toHaveBeenCalledWith(location, languages);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(users);

    consoleSpy.mockRestore();
  });
});
