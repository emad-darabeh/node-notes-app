const yargs = require('yargs');

console.log(chalk.blue.inverse('Success!'));

/**
 * add a new note command
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler: () => {
    console.log('adding a new note!');
  },
});

/**
 * remove a note command
 */
yargs.command({
  command: 'remove',
  describe: 'Remove an existing note',
  handler: () => {
    console.log('removing an existing note!');
  },
});

/**
 * read an existing note command
 */
yargs.command({
  command: 'read',
  describe: 'Read an existing note',
  handler: () => {
    console.log('reading an existing note!');
  },
});

/**
 * list all notes command
 */
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: () => {
    console.log('listing out all notes!');
  },
});

console.log(yargs.argv);
