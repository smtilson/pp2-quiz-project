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
    // - fetch answers
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
        const correctness = solutions.includes(userAnswer);
        if (correctness) {
            alert('That is correct!');
        } else {
            // issue with the grammar of was vs were
            alert(`That is incorrect. ${userAnswer} was not sampled for ${songName}.`)
        }
        incrementScores(correctness);
        addGuess(userAnswer, correctness)
    } else {
        alert(`The checkAnswer function hasn't been implemented for ${songName} yet.`);
        throw `The checkAnswer function hasn't been implemented for ${songName} yet. Aborting.`;
    }
}

/**
 * 
 * @param {user answer standardized to title case string} guess 
 * @param {boolean depending on answer} correctness 
 */
function addGuess(guess, correctness) {
    // should I be adding their guess or the correct answer?
    let span;
    // changes guess to a standardized form
    guess = guess.toLowerCase();
    // checks which span to access
    if (correctness) {
        span = document.getElementById('correct-submissions');
    } else {
        span = document.getElementById('incorrect-submissions');
    }
    // checks to see if text is empty or if it already contains
    // the guess
    let text = span.innerText;
    if (text === '') {
        text = toTitle(guess);
    } else {
        let submissions = text.split('; ');
        submissions = submissions.map((word)=>word.toLowerCase());
        // if it is not already present then we add it
        // if it is already present then we do nothing
        if (!submissions.includes(guess)) {
            // use ; in case , is in a song or artist name
            text += '; ' + toTitle(guess);
        }
    }
    span.innerText = text;

}

/**
 * checks if answer was already guessed
 */
function checkAlreadyGuessed(guess, correctness) {
    let span;
    let text;
    if (correctness) {
        span = document.getElementById("correct-submissions");
    } else {
        span = document.getElementById("incorrect-submissions");
    }
    let submissions = span.innerText.split('; ');
    if (submissions.includes(guess)) {
        text = '';
    } else {
        text = '; ' + guess;
    }
    span.innerText += text;
}

/**
 * This function increments the correct and incorrect answers
 * @param {a boolean determining if the answer was correct} result 
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


// obtaining processable version of data data
function transformWikiData(songName) {
    let raw = document.getElementById(songName).textContent;
    raw = raw.trim();
    let sampleList = raw.split('\n');
    // cleans each string in the array
    sampleList = sampleList.map((item) => cleanString(item));
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
    sampleData.artist = primaryArtist(sampleData.artist);
    return sampleData;
}

/**
 * This is a utility function for standardizing the sample data 
 * obtained from the fandom wiki.
 * @param {string to be cleaned} string 
 * @returns string without special dash characters or double quotes
 */
// utility function
function cleanString(string) {
    // replaces special dashes with normal dash
    string = string.replace(/\u2013|\u2012|\u2014/g, ";");
    /* if removing the double quotes in this way causes an issue, 
    then it can be done later after the dictionary is built by 
    just slicing off the first and last character of the string */
    while (string.includes('"')) {
        string = string.replace('"', '');
    }
    return string;
}

/**
 * this swaps dashes for spaces and vice versa,
 * also capitalizes first letters or makes them lower case.
 * @param {a string with dashes and no spaces or spaces and no dashes} sampleString 
 */
// utility function
function titleSwap(sampleString) {
    const hasDash = sampleString.includes('-');
    const hasSpace = sampleString.includes(' ');
    if (hasDash && hasSpace) {
        alert(`${sampleString} contains both spaces and dashes. This function can not transform it.`)
        return sampleString;
    } else if (hasDash) {
        sampleString = sampleString.replace('-', ' ');
        sampleString = toTitle(sampleString);
        return sampleString;
    } else if (hasSpace) {
        sampleString = sampleString.replace(' ', '-');
        sampleString = sampleString.toLowerCase();
        return sampleString;
    } else {
        alert('Not sure how we got here, the string has neither.');
        return sampleString;
    }

}

// utility function
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// utility function
function toTitle(string) {
    let words = string.split(' ');
    words = words.map(w => capitalize(w));
    return words.join(' ');
}

/**
 * This addresses the issue of answers like 2Pac featuring...
 * it replaces the string by just the primary artist
 */
// utility function
function primaryArtist (artistString) {
    let primaryArtist = artistString.split(' featuring')[0];
    primaryArtist = primaryArtist.split(' feat')[0];
    return primaryArtist
}

// perhaps this should be broken into two pieces, one 
// that gets the solutions when the song starts/page loads 
// while the other would check the solutions for the song
// I am having a hard time articulating this.
function fetchSolutions(songName) {
    if (songName === 'Oh No') {
        //let solutions = [];
        songName = titleSwap(songName);
        const rawSolutions = transformWikiData(songName);
        let artistList = rawSolutions.map((entry) => entry.artist.toLowerCase());
        console.log(artistList);
        return artistList;
    } else {
        alert(`The fetchSolutions function hasn't been implemented for ${songName} yet.`);
        throw `The fetchSolutions function hasn't been implemented for ${songName} yet. Aborting.`;
    }
}


/**
 * This setup function is called when DOM loads.
 * It adds event listeners, initializes the game,
 * and collects solutions from html document.
 */
function setup() {}