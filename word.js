// import the Letter object constructor
var Letter = require("./letter.js");

// Word Object constructor
var Word = function (word) {
    // get the input and store it
    this.word = word;
    // create an array of the current word
    wordArray = word.split("");

    // empty array for the letter objects to be pushed to
    this.array = [];
    this.wordDisplay = function () {
        if (Letter.guessedCorrect === true) {
            this.newArray.push(Letter.letterName);
        }
        else {
            this.newArray.push("_ ");
        }
        return newArray;
    };
    this.wordCheck = function (guess) {
        for (var i = 0; i < newArray.length; i++) {
            if (guess === newArray[i]) {
                newArray.push(Letter.letterName);
            }
        }
    }
}

// Export the Word Object
module.exports = Word;
