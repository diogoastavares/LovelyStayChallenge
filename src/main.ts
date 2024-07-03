import { program } from "commander";
import { fetchAndAddUser, /*listUsers*/ } from './controllers/usersController';
import { addLanguages } from './controllers/languagesController';

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
    .option('-l, --location <location>', 'Users\' location')
    .option('--languages <value...>', 'Programming languages to filter Users')
    .description('List users stored in the database, with possibility to filter by location and/or programming languages')
    //.action(listUsers)

program.parse()
