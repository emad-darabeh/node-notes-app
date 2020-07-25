// @ts-check
const yargs = require('yargs');
const chalk = require('chalk');
const { addNote, removeNote } = require('./notes');

/**
 * add a new note command
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const { title, body } = argv;
    if (addNote(title, body)) {
      console.log(chalk.greenBright.inverse('Note added successfully!'));
    } else {
      console.log(chalk.redBright.inverse('Note title taken!'));
    }
  },
});

/**
 * remove a note command
 */
yargs.command({
  command: 'remove',
  describe: 'Remove an existing note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const { title } = argv;
    if (removeNote(title)) {
      console.log(chalk.greenBright.inverse('Note removed successfully!'));
    } else {
      console.log(chalk.redBright.inverse('Note does not exist!'));
    }
  },
});

/**
 * read an existing note command
 */
yargs.command({
  command: 'read',
  describe: 'Read an existing note',
  handler() {
    console.log('reading an existing note!');
  },
});

/**
 * list all notes command
 */
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    console.log('listing out all notes!');
  },
});

yargs.parse();
