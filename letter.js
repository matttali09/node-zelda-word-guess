// letter object constructor
var Letter = function () {
    // save an empty string property for the current letter
    this.letterName = "";
    // create a boolean property to check if the letter has been guessed yet
    this.guessed = false;

    // function to turn the letter into an underscore or the revealed letter
    this.letterGuessed = function () {
        if (this.guessed || this.letterName === " ") {
            this.guessed = true;
            return this.letterName;
        }
        else {
            return "_";
        }
    }

    // function to check the user guess agianst the current word letter
    this.letterCheck = function (userGuess) {
        // if they match change guessed to true and run letterGuessed function
        if (this.letterName.toLowerCase() === userGuess) {
            this.guessed = true;
            this.letterGuessed();
        }
    }
}

// Export the Letter Object
module.exports = Letter;