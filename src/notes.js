// @ts-check
/**
 * Notes module
 * @module note
 */

/**
 * A note
 * @typedef {Object} Note
 * @property {string} title - note title
 * @property {string} body - note body
 */

const fs = require('fs');

/**
 * add a new note to the list of notes
 * @param {string} title - note title
 * @param {string} body - note body
 * @returns {boolean} - true if note added successfully
 */
const addNote = (title, body) => {
  try {
    // get the array of all notes from the notes.json file
    const allNotes = getNotes();

    if (checkForDuplicates(allNotes, title)) {
      return false;
    }

    // create a new note with the title and body provided
    const newNote = {
      title,
      body,
    };
    // add the newly created note to the notes array
    allNotes.push(newNote);

    // overwrite the notes.json file with the notes array that container the new note
    saveNotes(allNotes);
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 * save an array of notes to notes.json file
 * @param {Note[]} notes - array of all notes
 * @returns {void}
 */
const saveNotes = (notes) => {
  try {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
  } catch (error) {
    console.log(error);
  }
};

/**
 * check if the array of notes contains a note with the same title
 * @param {Note[]} notes - notes array
 * @param {string} title - new note's title
 * @returns {boolean} - true if there is duplicates
 */
const checkForDuplicates = (notes, title) => {
  const duplicateNotes = notes.filter((note) => note.title === title);
  return duplicateNotes.length > 0;
};

/**
 * gets all notes from notes.json file as an a array
 * @returns {Note[]} array of notes
 */
const getNotes = () => {
  try {
    // read data from the notes.json file
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    // parse the json data into an array of all notes
    return JSON.parse(dataJSON);
  } catch (error) {
    // return an empty array if the file does not exist
    return [];
  }
};

module.exports = { addNote };
