// Initial setup
document.addEventListener("DOMContentLoaded", function () {
    // add event listeners to elements
    const button = document.getElementById('submit-button');
    button.addEventListener("click", submitHandler);
});

// event handlers
function submitHandler(event){
    // this will involve a loop and give text inputs all a 
    // class to loop through and then run something to get 
    // the data from those upon the click of the submit button
    // or should we only have one input box?
    const userAnswer = document.getElementById('artist').value;
    checkAnswer(userAnswer,'Oh No');
}

// get data from "form"

// Functions related to checking answers

/**
 * This checks if userAnswer is a sample from the songName
 * @param {string submitted by user.} userAnswer 
 * @param {name of current track/question user is on.} songName 
 */
function checkAnswer(userAnswer,songName) {
    if (songName === 'Oh No') {
        const solutions = fetchSolutions(songName);
        const correctness = solutions.includes(userAnswer.toLowerCase());
        if (correctness) {
            alert('That is correct!');
        } else {
            alert(`That is incorrect. ${userAnswer} was not sampled for ${songName}.`)
        }
        incrementScores(correctness);
    } else {
        alert(`The checkAnswer function hasn't been implemented for ${songName} yet.`);
        throw `The checkAnswer function hasn't been implemented for ${songName} yet. Aborting.`;
    }
}


/**
 * This function increments the correct and incorrect answers
 * @param {a boolean determining if the answer was correct} result 
 */
function incrementScores(result) {
    if (result) {
        let scoreBox = document.getElementById('right');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore+1;
    } else {
        let scoreBox = document.getElementById('wrong');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore+1;
    }
}

// serialize data
function transformWikiData(songName) {
    let raw = document.getElementById(songName).textContent;
    raw = raw.trim();
    let sampleList = raw.split('\n');
    // cleans each string in the array
    sampleList = sampleList.map((item) => cleanString(item));
    // replaces strings with JS objects
    sampleList = sampleList.map((item)=> sampleStringToData(item));
    return sampleList;
}

/**
 * This is a utility function for reformatting the sample data 
 * obtained from the fandom wiki.
 * @param {string to be cleaned} string 
 * @returns string without special dash characters or double quotes
 */
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
function titleSwap (sampleString) {
    const hasDash = sampleString.includes('-');
    const hasSpace = sampleString.includes(' ');
    if (hasDash && hasSpace) {
        alert(`${sampleString} contains both spaces and dashes. This function can not transform it.`)
        return sampleString;
    } else if (hasDash) {
        return sampleString.toLowerCase().replace('-', ' ');
    } else if (hasSpace) {
        sampleString = sampleString.replace(' ', '-');
        return toTitle(sampleString);
    } else {
        alert('Not sure how we got here, the string has neither.');
        return sampleString;
    }

}

function capitalize(word) {
    return word[0].toUpperCase()+word.slice(1);
}

function toTitle(string) {
    let words = string.split(' ');
    words = words.map(w=>capitalize(w));
    return words.join(' ');
}

/**
 * This function produces an js object containing start of sample,
 * end of sample, artist, and song sampled.
 * @param {This should be a string detailing the duration of the sample, the artist, and the song} sampleString 
 */
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
    return sampleData;
}

// perhaps this should be broken into two pieces, one 
// that gets the solutions when the song starts/page loads 
// while the other would check the solutions for the song
// I am having a hard time articulating this.
function fetchSolutions(songName) {
    if (songName === 'Oh No') {
        let solutions = [];
        songName = swapDash(songName);
        const rawSolutions = transformWikiData(songName);
        return ['black sabbath'];
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
function setup() {
}