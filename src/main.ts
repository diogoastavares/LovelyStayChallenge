import { program } from "commander";
import { fetchAndAddUser, listUsers } from './controllers/usersController';
import { addLanguages } from './controllers/languagesController';
import { argv } from "process";

program
    .command('addUser')
    .argument('<username>', 'GitHub username')
    .description('Fetch information about a given GitHub user and stores it into de Database')
    .action( async (username: string) => {
        const {userId, languages} = await fetchAndAddUser(username);
        await addLanguages(userId, languages);
    })

program
    .command('listUsers')
    .option('-l, --location [location]', 'Users\' location')
    .option('--languages [languages...]', 'Programming languages to filter Users')
    .description('List users stored in the database, with possibility to filter by location and/or programming languages')
    .action(async (options) => {
        await listUsers(options.location, options.languages);
    })

program.parse()
