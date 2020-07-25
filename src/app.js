// @ts-check
const yargs = require('yargs');
const chalk = require('chalk');
const { addNote, removeNote, getNotes, readNote } = require('./notes');

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
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const { title } = argv;
    const note = readNote(title);
    if (note) {
      console.log(chalk.blueBright.inverse('Your note!'));
      console.log(chalk.yellowBright(note.title));
      console.log(chalk.magentaBright(note.body));
    } else {
      console.log(chalk.redBright.inverse('Note does not exist!'));
    }
  },
});

/**
 * list all notes command
 */
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    console.log(chalk.blueBright.inverse('Your notes!'));
    const allNotes = getNotes();
    allNotes.forEach((note, index) =>
      console.log(chalk.yellowBright(`${index + 1}- ${note.title}`))
    );
  },
});

yargs.parse();
