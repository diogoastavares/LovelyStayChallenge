import { addLanguages } from '../../src/controllers/languagesController';
import { insertLanguages } from '../../src/services/databaseConnection';

jest.mock('../../src/services/databaseConnection');

describe('addLanguages', () => {
  const mockInsertLanguages = insertLanguages as jest.MockedFunction<typeof insertLanguages>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call insertLanguages when languages array is not empty', async () => {
    const userId = 1;
    const languages = ['JavaScript', 'TypeScript'];

    await addLanguages(userId, languages);

    expect(mockInsertLanguages).toHaveBeenCalledWith(userId, languages);
    expect(mockInsertLanguages).toHaveBeenCalledTimes(1);
  });

  it('should not call insertLanguages and log message when languages array is empty', async () => {
    const userId = 1;
    const languages: string[] = [];

    // Mock console.log to check if it gets called with specific messages
    const consoleSpy = jest.spyOn(console, 'log');

    await addLanguages(userId, languages);

    expect(mockInsertLanguages).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('[ No programming languages found! ]');

    consoleSpy.mockRestore();
  });

  it('should log message when languages are being inserted', async () => {
    const userId = 1;
    const languages = ['JavaScript', 'TypeScript'];

    // Mock console.log to check if it gets called with specific messages
    const consoleSpy = jest.spyOn(console, 'log');

    await addLanguages(userId, languages);

    expect(consoleSpy).toHaveBeenCalledWith('[ Inserting languages to database... ]');

    consoleSpy.mockRestore();
  });
});
