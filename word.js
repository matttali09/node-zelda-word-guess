// import the Letter object constructor
var Letter = require("./letter.js");

// Word Object constructor
var Word = function (word) {
    // get the input and store it
    this.word = word;
    // create an array of the current word
    var wordArray = word.split("");
    // empty array for the letter objects to be pushed to
    this.array = [];

    // function to initialize a new letter object for each of the letters in the current word
    var toLetter = function () {
        for (var i in wordArray) {
            var letter = new Letter(this.wordArray(i));
            // push the letter obj to the new array
            this.array.push(letter);
        }
    }

    // function to convert the letters to strings to be displayed to the user
    toString = function () {
        var string = "";
        // loop through the letter objects
        for (var i in this.array) {
            var letter = this.array[i];
            string += `${letter}`;
        }
        // display for the user
        console.log(string);
    }

    // When the user guesses a letter check every letter object to see if the guess matches one of them
    guessCharacter = function (x) {
        // A count is used to check if any letter was changed from guessed=false to guessed=true
        let count = 0;
        for (let i in this.array) {
            let LetterObj = this.array[i];
            // Calle the guessLetter function of the current letter we are looking at
            LetterObj.guessLetter(x);
            // If the current letter matches the user's guess then increase count
            if (LetterObj.letter.toLowerCase() == x) {
                count++;
            }
        }
        // If count was increased at all then this method returns true this is used to check if the user guesses the letter
        // correctly and if we need to lower how many guesses they have left
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }

    guessWord = function (word) {
        if (word.toLowerCase() === this.word.toLowerCase()) {
            for (let letter of this.array) {
                letter.guessed = true;
            }
            return true;
        } else {
            return false;
        }
    }

    // This method checks to see if any letter is still hidden or not, used to check if the user has guessed the word
    checkLettersForGuessed = function () {
        // Initialize a count
        let count = 0;
        for (let i in this.array) {
            let LetterObj = this.array[i];
            // If the letter hasn't been guessed yet increase count
            if (!LetterObj.guessed) {
                count++;
            }
        }
        // If there are still unguessed letters, return true. If all letters have been guessed return false.
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }

}

// Export the Word Object
module.exports = Word;
