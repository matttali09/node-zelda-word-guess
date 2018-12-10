const Word = require("./word.js");
const inquirer = require('inquirer');

var wordBank = ["master sword", "link", "zelda", "ganondorf", "ganon", "minish cap", "ocarina", "time", "hero", "hero of time", "forest", "death mountain", "zora", "goron", "hyrule", "hyrulian", "fairy", "kokiri", "great deku tree", "deku nut", "bombs", "deku seeds", "deku leaf", "valoo", "saria", "skulltula", "royal family", "hylia", "nyrue", "farore", "din", "hookshot", "longshot", "boss", "phantom ganon", "jabu jabu", "hylian shield"]

// string to pass to the word object
var currentWord = "";
var guessesRemaining = 10;
// empty array to display user guesses
guessedLetters = [];

// function to pick a random word from wordBank and initialize a new Word object.
computerChoice = function () {
    var random = Math.floor(Math.random() * wordBank.length)
    currentWord = new Word(wordBank[random])
}