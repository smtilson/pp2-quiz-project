// Initial setup

// writes game page sections
alert(`${window.location.pathname}`);
if (window.location.pathname === '/game.html') {
    alert(`Success ${window.location.pathname}`);
} else if (window.location.pathname === '/test.html') {
    let div = document.getElementById('js-generated-div');
    div.innerHTML = testWriteBasicLinks();
} else {
    alert('not yet correct');
    alert(`${window.location.pathname}`);
}

alert('initial setup');
document.addEventListener("DOMContentLoaded", function () {
    // add event listeners to elements
    alert("loaded");
    console.log('started dom content loaded listener');
    let sections = document.getElementsByTagName('section');
    console.log("sections found");
    for (let section of sections) {
        section.addEventListener("mouseenter", function () {
            // alert(`mouse enter is being triggered for ${this.id}`);
            //alert(`section ${this.id} mouse over trigger hit`)
            const songName = this.id;
            // this needs to be fixed.
            const button = section.getElementsByClassName('submit-button')[0];
            // alert("button event about to be added");
            button.addEventListener("click", function (event) {
                alert("event triggered by button click")
                playSongQuiz(songName)
            });
            console.log(songName);
            // alert("button event already added");
            let answerBox = section.getElementsByClassName('user-answer')[0];
            answerBox.value = '';
            answerBox.focus();
            // alert("answerbox event about to be added");
            answerBox.addEventListener('keydown', function (event) {
                if (answerBox.value === '') {
                    return;
                } else if (event.key === 'Enter') {
                    // alert("play song triggered by enter key press")
                    // this can be done better using the event
                    playSongQuiz(songName);
                }
            });
        });
    }
});


// main game play loop function
// this will be executed each time enter is hit
// or submit is clicked
// - control stopping and starting of video with 
//   respect to other songs
// should this take an event instead and then 
// the song can be accessed from the this keyword
/**
 * 
 * @param {string html format} songName
 */
function playSongQuiz(songHTML) {
    alert(`playsong triggered with ${songHTML}`);
    let answerBox = getElementBySongAndClass(songHTML, "user-answer");
    const userAnswer = answerBox.value;
    // this is a temp fix for the event being triggered 
    // when the listener is added
    /*if (userAnswer === '') {
        answerBox.value = '';
        answerBox.focus();
        return '';
    }*/
    // these need to be changed so that they access stuff 
    // from the event object
    // fetches userAnswer
    // This should be changed to being accessed from the event
    const songJS = toJS(songHTML);
    // fetches solutions
    const songSolutions = formatSolutions(songJS);

    let answer = compareGuess(userAnswer, songSolutions);
    const correct = (answer) ? true : false;
    // resets answer to userAnswer if the guess was incorrect   
    answer = (answer) ? answer : userAnswer;
    let guessed = alreadyGuessed(answer, correct, songHTML);
    // delivers feedback
    alert(generateFeedback(answer, toTitle(songHTML), guessed, correct));
    // adjusts score and log area appropriately
    if (!guessed) {
        incrementScores(correct, songHTML);
        addGuess(answer, correct, songHTML);
    }
    // resets game for next guess
    answerBox.value = '';
    answerBox.focus();
}

/**
 * This is only used for testing
 * @param {*} answer 
 * @param {*} songName 
 */

function checkAnswer(userAnswer) {
    const songSolutions = formatSolutions("ohNo");
    let answer = compareGuess(userAnswer, songSolutions);
    const correct = (answer) ? true : false;
    answer = (answer) ? answer : userAnswer;
    const guessed = alreadyGuessed(answer, correct);
    alert(generateFeedback(answer, 'Oh No', guessed, correct));
    if (!guessed) {
        incrementScores(correct);
        addGuess(answer, correct);
    }
}


// get data from "form"

// Functions related to checking answers

/**
 * Compares user submitted answer to possible solutions.
 * what does this return? boolean and string answer? 
 * probably just the string answer and then we can use 
 * truthy/falsyness of the return value
 * 
 * Maybe this should take an array as a second parameter so 
 * it can be used when adding guess to the display
 * @param {user submitted string not standardized} userAnswer 
 * @param {array of strings not standardized} answerArray 
 */
function compareGuess(userAnswer, answerArray) {
    normedUserAnswer = norm(userAnswer);
    // when adding functionality to log songs and artists separately, 
    // have this return an array where the second value dictates 
    // if it is a song or an artist
    for (let answer of answerArray) {
        const testTerm = norm(answer);
        if (normedUserAnswer === testTerm) {
            return answer;
        }
    }
    return '';
}

/**
 * Generates feedback text to either be alerted to user
 * or populate a html element.
 * @param {string} answer 
 * @param {string} songName
 * @param {boolean} guessed 
 * @param {boolean} correct 
 */

function generateFeedback(answer, songName, guessed, correct) {
    // the songName input needs to be addressed here.
    answer = toTitle(answer);
    let message;
    if (correct) {
        message = `That is correct! ${answer} was sampled for ${songName}.`;
    } else {
        message = `That is incorrect. ${answer} was not sampled for ${songName}.`;
    }
    if (guessed) {
        message += ' You already guessed that. Try guessing something new.'
    }
    return message;
}

/**
 * This should only check if a guess was already guessed
 * maybe it should provide alert text?
 * @param {*} guess 
 * @param {*} correctness 
 */
function alreadyGuessed(guess, correctness, songHTML) {
    let span;
    const normedGuess = norm(guess);
    if (correctness) {
        span = getElementBySongAndClass(songHTML, 'correct-submissions');
    } else {
        span = getElementBySongAndClass(songHTML, 'incorrect-submissions');
    }
    let submissions = span.innerText.split('; ');
    submissions = submissions.map((word) => norm(word));
    if (submissions.includes(normedGuess)) {
        return true;
    } else {
        return false;
    }
}

/**
 * This justs adds guess
 */

function addGuess(answer, correctness, songHTML) {
    let span;
    if (correctness) {
        span = getElementBySongAndClass(songHTML, 'correct-submissions');
    } else {
        span = getElementBySongAndClass(songHTML, 'incorrect-submissions');
    }
    span.innerText += '; ' + answer;
}


/**
 * Increments correct or incorrect answer tally
 * @param {boolean: the answer was correct} result 
 */
function incrementScores(result, songHTML) {
    if (result) {
        let scoreBox = getElementBySongAndClass(songHTML, 'correct-answer-score');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    } else {
        let scoreBox = getElementBySongAndClass(songHTML, 'incorrect-answer-score');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    }
}

/**
 * Returns appropriate element.
 * @param {html format string} songName 
 * @param {html format string} className 
 */
function getElementBySongAndClass(songName, className) {
    const section = document.querySelector(`#${songName}`);
    const element = section.querySelector(`.${className}`);
    return element;
}

// obtaining processable version of data
// maybe combine this and formatSolutions into one function.
// maybe not as this will likely be moved somewhere else when 
// I use a different form for the database
function transformWikiData(songName) {
    // if (songName === '') {
    let sampleList = rawSolutions[songName].split('\n');
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



// perhaps this should be broken into two pieces, one 
// that gets the solutions when the song starts/page loads 
// while the other would check the solutions for the song
// I am having a hard time articulating this.

// what format should the input for this be?
// keep track of this variable and make it "more efficient"
function formatSolutions(songName) {
    const preSolutions = transformWikiData(songName);
    // maybe this can be changed to a computed property thing?
    const artistList = preSolutions.map((entry) => entry.artist);
    const songList = preSolutions.map((entry) => entry.song);
    return artistList.concat(songList);
}


/**
 * This object contains various tests
 * need to add tests for each song.
 */

const testSuite = {
    // note that there is no difference between incorrect
    // songs and artists
    // I should come up with more test cases for artist names
    testSongs: function () {
        testSuite.resetScores();
        checkAnswer("war pigs"); //+1 correct
        testSuite.compareScores(1, 0);
        checkAnswer("war pIGs the"); // repeat
        testSuite.compareScores(1, 0);
        checkAnswer("w ar  pigs"); // repeat
        testSuite.compareScores(1, 0);
    },
    testArtists: function () {
        this.resetScores();
        let artistNames = ["2pac", "2pa c", "2Pac", "the Ramones", "Ramones", "Black Sabbath", "Black Sabbath", "Jay-Z", "Jay z", "2asd", "2asd", "asd", ];
        let compareValues = [
            [1, 0],
            [1, 0],
            [1, 0],
            [2, 0],
            [2, 0],
            [3, 0],
            [3, 0],
            [4, 0],
            [4, 0],
            [4, 1],
            [4, 1],
            [4, 2],
        ];
        testSuite.compareScores(0, 0);
        for (let index in artistNames) {
            console.log("index is ", index);
            checkAnswer(artistNames[index]);
            testSuite.compareScores(compareValues[index][0], compareValues[index][1]);
        }
    },
    fetchScores: function () {
        return [getElementBySongAndClass('oh-no', 'correct-answer-score').textContent,
            getElementBySongAndClass('oh-no', 'incorrect-answer-score').textContent
        ];
    },
    fetchAnswers: function () {
        const correct = getElementBySongAndClass('oh-no', "correct-submissions").textContent.split(';');
        const incorrect = getElementBySongAndClass('oh-no', "incorrect-submissions").textContent.split(';');
        return [correct, incorrect];
    },
    resetScores: function () {
        getElementBySongAndClass('oh-no', 'correct-answer-score').textContent = 0;
        getElementBySongAndClass('oh-no', 'incorrect-answer-score').textContent = 0;
    },
    compareScores: function (cScore, iScore) {
        let correct = testSuite.fetchScores()[0];
        let incorrect = testSuite.fetchScores()[1];
        console.log(`correct should be ${cScore}, it is `, correct);
        console.log(`incorrect should be ${iScore}, it is `, incorrect);
    },
}

/**
 * This object contains all the solutions for the quiz in the initial raw form
 * It is only hear temporarily, maybe.
 */

function testWriteBasicLinks() {
    let text = '';
    for (let key in youtubeLinks) {
        text += sectionContent(key, youtubeLinks[key]);
    }
    return text;
}

function basicSection(songId, ytLink) {
    return `<section id="${songId}">
    <h2>${songId}</h2>
    <iframe width="420" height="315" src="${ytLink}">
            </iframe>
            </section>`
}


/* This element was removed to speed up load time. 
<iframe id="let-it-out-video" width="420" height="315"
            src="${ytLink}">
        </iframe>*/
function sectionContent(sectionId, ytLink) {
    let content = `<section id="${sectionId}">
<div class="main-content-div">
<div class="left-panel">
    <p class="content container instructions">
        Simple version of instructions</p>
    <p class="content container difficulty">a word about difficulty, or not</p>
</div>
<div class="video-answer-div">
    <div class="video-div">
       IFRAME ELEMENT GOES HERE for ${sectionId}
    </div>
    <div class="answer-area container">
        <input type="text" class="user-answer">
        <button type="submit" class="submit-button">Submit Answer</button>
    </div>
</div>
<div class="content container feedback-div">
    <div class="scores-div">
        <p class="scores">Number Correct: <span class="correct-answer-score">0</span></p>
        <p class="scores">Number Incorrect: <span class="incorrect-answer-score">0</span></p>
    </div>
    <!-- make this just a string list for now -->
    <div class="submitted-answers">
        <p>Was Sampled: <span class="correct-submissions"></span></p>
        <p>Was Not Sampled: <span class="incorrect-submissions"></span></p>
    </div>
</div>
</div>
</section>`;
    return content
}