const Word = require("./word.js");
const inquirer = require('inquirer');

var wordBank = ["master sword", "link", "zelda", "ganondorf", "ganon", "minish cap", "ocarina", "time", "hero", "hero of time", "forest", "death mountain", "zora", "goron", "hyrule", "hyrulian", "fairy", "kokiri", "great deku tree", "deku nut", "bombs", "deku seeds", "deku leaf", "valoo", "saria", "skulltula", "royal family", "hylia", "nyrue", "farore", "din", "hookshot", "longshot", "boss", "phantom ganon", "jabu jabu", "hylian shield"]

// string to pass to the word object
var currentWord = "";
var guessesRemaining = 10;
// empty array to display user guesses
var guessedLetters = [];

// function to pick a random word from wordBank and initialize a new Word object.
let computerChoice = function () {
    var random = Math.floor(Math.random() * wordBank.length)
    currentWord = new Word(wordBank[random])
};

// check if any letters are still remaining for the win or loss of the game.
let checkWin = function () {
    var ifStillRemain = currentWord.checkForLettersGuessed();
    if (!ifStillRemain) {
        return true;
    }
    else {
        return false;
    }
};

// reinitialize the variables displayed for the game.
let start = function () {
    guessesRemaining = 10;
    guessedLetters = [];
    computerChoice();
    promptUser();
};

// prompting the user main method to display the prompt
promptUser = function () {
    // If the user still has guesses left ask them the question
    if (guessesRemaining > 0) {
        console.log(`=======================================`);
        console.log(`Guesses remaining: ${guessesRemaining}`);

        // Display the current word with _ or correctly guessed letters from the Word and toString method
        currentWord.toString();
        // Call the prompt
        inquirer.prompt([
            {
                type: 'input',
                name: 'userGuess',
                message: 'What letter do you guess?',
                // Used to sanitize the user input
                validate: function (value) {
                    // Return an array if the letter guessed is in the alphabet
                    let pass = value.match(/[A-Za-z]/);
                    // Check to make sure the user only types 1 letter
                    if (value.length === 1) {
                        // Check if the user hasn't already guessed this letter
                        if (guessedLetters.indexOf(value) == -1) {
                            // If the array holds any value then the user guess is good to go
                            if (pass) {
                                return true;
                                // If the user guess isn't a number from 0-9 or a letter in the alphabet
                            } else {
                                return "Please enter a valid letter!";
                            };
                            // If the user has already guessed the letter
                        } else {
                            return "You've already guessed this letter!"
                        }
                        // If the user guess is not 1 character long
                    } else {
                        return "You can only guess one letter at a time!"
                    }
                },
            }
        ]).then((res) => {
            // Assign the user guess to guess
            let guess = res.userGuess;
            // Push the guessed letter into the array of guessed lettrs
            guessedLetters.push(guess);
            // Check the guess to every letter in the word object, if something changed then return true;
            let guessBool = currentWord.guessCharacter(guess);
            // If you guessed correctly
            if (guessBool) {
                // Check if the user has guessed all the letters
                if (checkWin()) {
                    console.log(`=======================================`);
                    console.log(`You guessed correctly!`);
                    // Updates the word after the user guesses it correctly
                    currentWord.toString();
                    console.log(`Words remaining: ${wordBank.length}`);
                    // If there are still words left to guess then ask if the user would like to keep playing
                    if (wordBank.length > 0) {
                        inquirer.prompt([
                            {
                                type: 'confirm',
                                name: 'playAgain',
                                message: 'Keep Playing?',
                                default: true,
                            }
                        ]).then((res) => {
                            // If they do, call the start method otherwise end the code
                            if (res.playAgain) {
                                start();
                            } else {
                                console.log('Okay Bye!');
                            }
                        });
                        // If there aren't any words left to guess then end the code
                    } else {
                        console.log(`You guessed 'em all!`);
                    }
                    // If the user has guessed correctly, but there are still more letters to guess then start the prompt over again
                } else {
                    promptUser();
                }
                // If the user guesses a letter incorrectly then subtract 1 from guesses reamaining and start the prompt again
            } else {
                guessesRemaining--;
                promptUser();
            };
        })
        // If the user is out of guesses, end the script and display what the correct word was
    } else {
        console.log(`Out of guesses! The currect word was "${currentWord.word}".`);
    }
}
// starts the game
promptUser();