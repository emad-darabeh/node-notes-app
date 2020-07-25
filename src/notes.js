// @ts-check
/**
 * Notes module
 * @module note
 */
const fs = require('fs');

/**
 * A note
 * @typedef {Object} Note
 * @property {string} title - note title
 * @property {string} body - note body
 */

/**
 * add a new note to the list of notes
 * @param {string} title - note title
 * @param {string} body - note body
 * @returns {boolean} true if note added successfully
 */
const addNote = (title, body) => {
  try {
    const allNotes = getNotes();
    if (checkForDuplicates(allNotes, title)) {
      return false;
    }
    const newNote = {
      title,
      body,
    };
    allNotes.push(newNote);
    saveNotes(allNotes);
    return true;
  } catch (error) {
    console.log(error);
  }
};

/**
 * remove an existing note by its unique title
 * @param {string} title - note title
 * @returns {boolean} true if the note has been deleted successfully
 */
const removeNote = (title) => {
  try {
    const allNotes = getNotes();
    const noteIndex = allNotes.findIndex((note) => note.title === title);
    if (noteIndex === -1) return false;
    allNotes.splice(noteIndex, 1);
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
 * @returns {boolean} true if there is duplicates
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
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    // return an empty array if the file does not exist
    return [];
  }
};

module.exports = { addNote, removeNote };
