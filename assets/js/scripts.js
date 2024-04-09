// Initial setup
document.addEventListener("DOMContentLoaded", function () {
    // add event listeners to elements
    const button = document.getElementById('submit-button');
    button.addEventListener("click", submitHandler);
    let answerBox = document.getElementById('user-answer');
    answerBox.value = '';
    answerBox.focus();
    answerBox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            submitHandler(event);
        }
    });
});

// main gameplay loop function
/**
 * 
 * @param {string all lower case, no spaces} songName
 */
function playSongQuiz(songName) {
    // this function should:
    // - set focus
    // - fetch answers once!
    //   - this way they can be sort of stored here 
    //     while the game play loop runs and I don't 
    //     have to fetch them over and over, hopefully
    // - run main gameplay loop
    // - control stopping and starting of video with 
    //   respect to other songs
    // should this take an event instead and then 
    // the song can be accessed from the this keyword
    alert('this function is not yet implemented.')
    throw 'this function is not yet implemented. Aborting.'
}

// event handlers
function submitHandler(event) {
    // this function feels like it is doing too much

    const answerBox = document.getElementById('user-answer');
    const userAnswer = answerBox.value;
    checkAnswer(userAnswer, 'Oh No');
    answerBox.value = '';
}

// get data from "form"

// Functions related to checking answers

/**
 * This checks if userAnswer is a sample from the songName
 * @param {string submitted by user.} userAnswer 
 * @param {name of current track/question user is on.} songName 
 */
function checkAnswer(userAnswer, songName) {
    userAnswer = userAnswer.toLowerCase();
    if (songName === 'Oh No') {
        const solutions = fetchSolutions(songName);
        //should I strip off the? maybe reference in instructions.
        const answer = compareGuess(userAnswer, solutions);
        if (answer) {
            addGuess(answer, true);
        } else {
            addGuess(userAnswer, false);
        }
    } else {
        alert(`The checkAnswer function hasn't been implemented for ${songName} yet.`);
        throw `The checkAnswer function hasn't been implemented for ${songName} yet. Aborting.`;
    }
}

/**
 * Compares user submitted answer to possible solutions.
 * what does this return? boolean and string answer? 
 * probably just the string anser and then we can use 
 * truthy/falsyness of the return value
 * 
 * Maybe this should take an array as a second parameter so 
 * it can be used when adding guess to the display
 * @param {user submitted string not standardized} userAnswer 
 * @param {array of strings not standardized} answerArray 
 */
function compareGuess(userAnswer, answerArray) {
    standardizedUserAnswer = utility.norm(userAnswer);
    // when adding functionality to log songs and artists separately, 
    // have this return an array where the second value dictates 
    // if it is a song or an artist
    // console.log('userAnswer post standardization is ', standardizedUserAnswer, ' in compareGuess function');
    for (let song of answerArray.song) {
        testTerm = utility.norm(song);
        if (utility.standardizedUserAnswer === testTerm) {
            return song;
        }
    }
    for (let artist of answerArray.artist) {
        // creates testTerm in standardized form
        testTerm = utility.norm(artist);
        if (standardizedUserAnswer === testTerm) {
            return artist;
        }
    }
    return '';
}

/**
 * 
 * @param {user answer standardized to title case string} guess 
 * @param {boolean depending on answer} correctness 
 */
// it feels like this function is doing too much
function addGuess(guess, correctness) {
    let span;

    // changes guess to a standardized form
    guess = guess.toLowerCase();
    // checks which span to access
    if (correctness) {
        span = document.getElementById('correct-submissions');
        alertText = "That is correct!";
    } else {
        span = document.getElementById('incorrect-submissions');
        // issue with the grammar of was vs were
        alertText = `That is incorrect. ${guess} was not sampled for this song.`;
    }
    // checks to see if text is empty or if it already contains
    // the guess
    let text = span.innerText;
    if (text === '') {
        text = utility.toTitle(guess);
        incrementScores(correctness);
    } else {
        let submissions = text.split('; ');
        submissions = submissions.map((word) => word.toLowerCase());
        // if it is not already present then we add it
        // if it is already present then we do nothing
        if (!submissions.includes(guess)) {
            // use ; in case , is in a song or artist name
            text += '; ' + utility.toTitle(guess);
            incrementScores(correctness);
        } else {
            // discourages guessing the same thing
            alertText += `You already guessed ${guess}.`;
            if (correctness) {
                alertText += " Stop trying to pad your score!";
            } else {
                alertText += " Try thinking of something else.";
            }
        }
    }
    // writes to appropriate span element
    span.innerText = text;
    alert(alertText);
}

/**
 * Checks to see if answer was previously guessed.
 * Returns body for span as well as alertText for an alert.
 * @param {standardized string} guess 
 * @param {string of previous guesses} spanContents
 * @param {boolean} correctness 
 */
function previousGuesses(guess, spanContents, correctness) {

}

/**
 * checks if answer was already guessed
 */
// I guess I replaced this function?
// maybe I should use it again?
function checkAlreadyGuessed(guess, correctness) {
    let span;
    let text;
    let alreadyGuessed;
    if (correctness) {
        span = document.getElementById("correct-submissions");
    } else {
        span = document.getElementById("incorrect-submissions");
    }
    let submissions = span.innerText.split('; ');
    if (submissions.includes(guess)) {
        text = '';
        alreadyGuessed = true;
    } else {
        text = '; ' + guess;
        alreadyGuessed = false;
    }
    span.innerText += text;
    return [correctness, alreadyGuessed];
}

/**
 * Increments correct or incorrect answer tally
 * @param {boolean: the answer was correct} result 
 */
function incrementScores(result) {
    if (result) {
        let scoreBox = document.getElementById('right');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    } else {
        let scoreBox = document.getElementById('wrong');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    }
}


// obtaining processable version of data
function transformWikiData(songName) {
    let raw = document.getElementById(songName).textContent;
    raw = raw.trim();
    let sampleList = raw.split('\n');
    // cleans each string in the array
    sampleList = sampleList.map((item) => utility.cleanString(item));
    // replaces strings with JS objects
    sampleList = sampleList.map((item) => sampleStringToData(item));
    return sampleList;
}

/**
 * This function produces an js object containing start of sample,
 * end of sample, artist, and song sampled.
 * @param {This should be a string detailing the duration of the sample, the artist, and the song} sampleString 
 */
// utility function
function sampleStringToData(sampleString) {
    let data = sampleString.split(" ; ");
    /* should I validate data is of the correct form?*/
    let sampleData = {};
    // single quotes matter here because of the form
    // the data is in.
    let keys = ['start', 'end', 'artist', 'song'];
    for (let index in keys) {
        sampleData[keys[index]] = data[index];
    }
    sampleData.artist = utility.primaryArtist(sampleData.artist);
    return sampleData;
}



// perhaps this should be broken into two pieces, one 
// that gets the solutions when the song starts/page loads 
// while the other would check the solutions for the song
// I am having a hard time articulating this.
function fetchSolutions(songName) {
    if (songName === 'Oh No') {
        songName = utility.titleSwap(songName);
        const rawSolutions = transformWikiData(songName);
        // maybe this can be changed to a computed property thing?
        const artistList = rawSolutions.map((entry) => entry.artist);
        const songList = rawSolutions.map((entry) => entry.song);
        return {
            song: songList,
            artist: artistList,
        };
    } else {
        alert(`The fetchSolutions function hasn't been implemented for ${songName} yet.`);
        throw `The fetchSolutions function hasn't been implemented for ${songName} yet. Aborting.`;
    }
}

// This utility object is to keep utility functions in one place
// All functions take a string and return a string in a different 
// format
utility = {
    /**
     * Returns normalized version of string
     * suitable for comparison purposes
     * @param {string to be normalized} string 
     */
    norm: function (string) {
        let commonWords = ['the'];
        string = string.toLowerCase();
        for (let word of commonWords) {
            string = string.replace(word, '');
        }
        // we remove common words before spacing in case the 
        // removal of spaces causes some common words to appeaer 
        // when they wouldn't otherwise
        while (string.includes(' ')) {
            string = string.replace(' ', '');
        }
        return string;
    },

    /**
     * Removes " and special dash characters from strings
     * @param {string} string 
     */
    cleanString: function (string) {
        // replaces special dashes with normal dash
        string = string.replace(/\u2013|\u2012|\u2014/g, ";");
        /* if removing the double quotes in this way causes an issue, 
        then it can be done later after the dictionary is built by 
        just slicing off the first and last character of the string */
        while (string.includes('"')) {
            string = string.replace('"', '');
        }
        return string;
    },

    /**
     * Swaps title format and html format
     * ex: Oh No with oh-no.
     * If string is not in one of the formats, it will be 
     * returned unmodified
     * @param {string in either format} string
     */
    // utility function
    titleSwap: function (string) {
        const hasDash = string.includes('-');
        const hasSpace = string.includes(' ');
        if (hasDash && hasSpace) {
            alert(`${string} contains both spaces and dashes. This function can not transform it.`)
            return string;
        } else if (hasDash) {
            string = string.replace('-', ' ');
            string = utility.toTitle(string);
            return string;
        } else if (hasSpace) {
            string = string.replace(' ', '-');
            string = string.toLowerCase();
            return string;
        } else {
            alert('Not sure how we got here, the string has neither.');
            return string;
        }
    },

    /**
     * 
     * @param {string} word 
     * @returns 
     */
    capitalize: function (word) {
        if (word === '') {
            alert('capitalize was passed an empty word.')
            return '';
        } else if (typeof (word) === 'string') {
            // normal behavior
            // everything else in the function body is to catch a bug
            return word[0].toUpperCase() + word.slice(1);
        } else {
            console.log(word);
            console.log(word[0]);
            console.log(typeof word);
            alert('capitalize was passed a non string')
            throw `${word} is not a string, it is a ${typeof word}.`
        }
    },

    /**
     * Capitalizes first letter of each word.
     */
    toTitle: function (string) {
        let words = string.split(' ');
        words = words.map(w => utility.capitalize(w));
        return words.join(' ');
    },

    /**
     * This addresses the issue of answers like 2Pac featuring...
     * it replaces the string by just the primary artist
     */
    primaryArtist: function (artistString) {
        let primaryArtist = artistString.split(' featuring')[0];
        primaryArtist = primaryArtist.split(' feat')[0];
        return primaryArtist;
    },
}