// Notes App, CRUD operation file.

const fs = require("fs");
const chalk = require("chalk");

// LOADING ALL NOTES
function loadNotes() {
  try {
    const data = fs.readFileSync("notes.json").toString();
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveNotes(new_notes) {
  const jsonData = JSON.stringify(new_notes);
  fs.writeFileSync("notes.json", jsonData);
}

// ADDING NOTE
function addNote(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added."));
  } else {
    console.log(chalk.red.inverse("Note already exist."));
  }
}

// READ A NOTE
function readNote(title) {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
}

// LIST ALL NOTES
function showList() {
  const notes = loadNotes();
  if (notes.length) {
    console.log(chalk.green.inverse("Your Notes"));
    notes.forEach(function (note) {
      console.log(note.title);
    });
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
}

// REMOVING A NOTE
function removeNote(title) {
  const notes = loadNotes();
  const new_notes = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > new_notes.length) {
    saveNotes(new_notes);
    return console.log(chalk.green.inverse("Note removed."));
  }
  return console.log(chalk.red.inverse("Note not found."));
}

module.exports = {
  addNote,
  removeNote,
  readNote,
  showList,
};
