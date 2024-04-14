// Initial setup

alert('initial setup');
document.addEventListener("DOMContentLoaded", function () {
    // add event listeners to elements
    alert("loaded");
    console.log('started dom content loaded listener');
    let section = document.getElementsByTagName('section')[0];
    console.log("section found");
    let nextButton = document.getElementById('next-button');
    console.log(nextButton.id);
    nextButton.addEventListener('click', nextButtonHandler);
    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', prevButtonHandler);
    // should this listener be added at screen load?
    // does it depend on the screen size?
    section.addEventListener("mouseenter", function () {
        // alert(`mouse enter is being triggered for ${this.id}`);
        //alert(`section ${this.id} mouse over trigger hit`)
        const songHTML = this.dataset.song;
        const button = section.getElementsByClassName('submit-button')[0];
        // alert("button event about to be added");
        button.addEventListener("click", function () {
            alert("event triggered by button click")
            playSongQuiz(songHTML)
        });
        // alert("button event already added");
        let answerBox = document.getElementsByClassName('user-answer')[0];
        answerBox.value = '';
        answerBox.focus();
        // alert("answerbox event about to be added");
        answerBox.addEventListener('keydown', function (event) {
            if (answerBox.value === '') {
                return;
            } else if (event.key === 'Enter') {
                // alert("play song triggered by enter key press")
                // this can be done better using the event
                playSongQuiz(songHTML);
            }
        });
    });
});


// main game play loop function
// this will be executed each time enter is hit
// or submit is clicked
// - control stopping and starting of video with 
//   respect to other songs
// should this take an event instead and then 
// the song can be accessed from the this keyword
/**
 * I don't think I need to pass this any thing at all, but maybe that is faster/more efficient than calling a function over and over.
 * @param {string html format} songName
 */
function playSongQuiz(songHTML) {
    alert(`playsong triggered with ${songHTML}`);
    let answerBox = document.getElementsByClassName("user-answer")[0];
    const userAnswer = answerBox.value;
    document.getEle
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
    const songJS = htmlToJS(songHTML);
    // fetches solutions
    const songSolutions = formatSolutions(songJS);

    let answer = compareGuess(userAnswer, songSolutions);
    const correct = (answer) ? true : false;
    // resets answer to userAnswer if the guess was incorrect   
    answer = (answer) ? answer : userAnswer;
    let guessed = alreadyGuessed(answer, correct);
    // delivers feedback
    const feedback = generateFeedback(answer, titleSwap(songHTML), guessed, correct);
    console.log(feedback);
    displayFeedback(feedback);
    // adjusts score and log area appropriately
    if (!guessed) {
        incrementScores(correct);
        addGuess(answer, correct);
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
 * Adds feedback string to html document
 * @param {*} feedback 
 * @param {*} songName 
 */
function displayFeedback(feedback) {
    let feedbackSpan = document.getElementsByClassName("feedback")[0];
    feedbackSpan.innerText = feedback;
    feedbackSpan.parentNode.style.display = 'flex';
}

/**
 * This should only check if a guess was already guessed
 * maybe it should provide alert text?
 * @param {*} guess 
 * @param {*} correctness 
 */
function alreadyGuessed(guess, correctness) {
    let span;
    const normedGuess = norm(guess);
    if (correctness) {
        span = document.getElementsByClassName('correct-submissions')[0];
    } else {
        span = document.getElementsByClassName('incorrect-submissions')[0];
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

function addGuess(answer, correctness) {
    let span;
    if (correctness) {
        span = document.getElementsByClassName('correct-submissions')[0];
    } else {
        span = document.getElementsByClassName('incorrect-submissions')[0];
    }
    if (span.innerText === '') {
        span.innerText = answer;
    } else {
        span.innerText += '; ' + answer;
    }
}


/**
 * Increments correct or incorrect answer tally
 * @param {boolean: the answer was correct} result 
 */
function incrementScores(result) {
    if (result) {
        let scoreBox = document.getElementsByClassName('correct-answer-score')[0];
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    } else {
        let scoreBox = document.getElementsByClassName('incorrect-answer-score')[0];
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    }
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
 * These functions manage writing the html for the page and navigation 
 * 
 */

function testWriteBasicLinks() {
    let text = '';
    for (let key in youtubeLinks) {
        text += sectionContent(key, youtubeLinks[key]);
    }
    return text;
}

/**
 * 
 * @returns returns songHTML string of current page
 */
function getSongHTML() {
    const section = document.getElementsByTagName('section')[0];
    return section.dataset.song;
}

function nextButtonHandler(event) {
    alert('next button handler firing');
    let songHTML = getSongHTML();
    songHTML = findNextSongHTML(songHTML);
    writePage(songHTML);
}

function prevButtonHandler(event) {
    let songHTML = getSongHTML();
    songHTML = findPrevSongHTML(songHTML);
    writePage(songHTML);
}

function findNextSongHTML(songHTML) {
    console.log("current song is ", songHTML);
    let index = trackList.indexOf(songHTML);
    console.log(index);
    if (index + 1 < trackList.length) {
        songHTML = trackList[index + 1];
    } else {
        songHTML = trackList[0];
    }
    console.log("now it is ", songHTML);
    return songHTML;
}

function findPrevSongHTML(songHTML) {
    const index = trackList.indexOf(songHTML);
    if (index - 1 >= 0) {
        songHTML = trackList[index - 1];
    } else {
        songHTML = trackList[0];
    }
    console.log("now it is ", songHTML);
    return songHTML;
}

function writePage(songHTML) {
    let section = document.getElementsByTagName('section')[0];
    const ytlink = youtubeLinks[songHTML];
    section.innerHTML = buildHTML(songHTML, ytlink);
    section.dataset.song = songHTML;
    setupEventHandlers();
}
/**
 * Once the game page is finished, this should be updated appropriately
 * @param {*} songHTML 
 * @param {*} ytLink 
 * @returns string of html for the page for the song
 * should this be refactored into multiple functions writing different parts of the html?
 */
function buildHTML(songHTML, ytLink) {
    console.log(songHTML);
    console.log(ytLink);
    let content = `<div class="main-content-div gap5">
    <div class="content container left panel">
        <p class="instructions">
            Guess the artists or songs that are being sampled.</p>
        <!-- I think I may delete this from the game play 
            <p class="content container difficulty">Have fun! </p> -->
    </div>
    <div class="video-feedback-answer-div">
        <h3 class="song-title">
            ${htmlToTitle(songHTML)} from All Day
        </h3>
        <div class="video-div">
            <iframe id="song-video" width="300" height="225"
                src="${ytLink}">
            </iframe>
        </div>
        <div class="feedback-div container content">
            <span class="feedback"></span>
        </div>
        <div class="answer-area container content">
            <input type="text" class="user-answer">
            <button type="submit" class="submit-button">Submit Answer</button>
        </div>
    </div>
    <div class="content container right panel records-div">
        <!--<div class="scores-div">-->
            <p class="scores">Correct: <span class="correct-answer-score">0</span></p>
            <p class="scores">Incorrect: <span class="incorrect-answer-score">0</span></p>
       <!-- </div>-->
        <!-- make this just a string list for now -->
        <!--<div class="submitted-answers">-->
            <p>Sampled: <span class="correct-submissions"></span></p>
            <p>Not Sampled: <span class="incorrect-submissions"></span></p>
        <!--</div>-->
    </div>
</div>
<div id="arrows">
                <button id="prev-button">Prev</button>
                <button id="next-button">Next</button>
            </div>`;
    return content
}

function setupEventHandlers() {
    console.log('setupEventHandler called');
    let section = document.getElementsByTagName('section')[0];
    let nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', nextButtonHandler);
    console.log('next button set');
    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', prevButtonHandler);
    console.log('prev button set');
    // should this listener be added at screen load?
    // does it depend on the screen size?
    section.addEventListener("mouseenter", function () {
        // alert(`mouse enter is being triggered for ${this.id}`);
        //alert(`section ${this.id} mouse over trigger hit`)
        const songHTML = this.dataset.song;
        const button = section.getElementsByClassName('submit-button')[0];
        // alert("button event about to be added");
        // should this be refactored?
        button.addEventListener("click", function () {
            alert("event triggered by button click")
            playSongQuiz(songHTML)
        });
        // alert("button event already added");
        let answerBox = document.getElementsByClassName('user-answer')[0];
        answerBox.value = '';
        answerBox.focus();
        // alert("answerbox event about to be added");
        answerBox.addEventListener('keydown', function (event) {
            if (answerBox.value === '') {
                return;
            } else if (event.key === 'Enter') {
                // alert("play song triggered by enter key press")
                // this can be done better using the event
                playSongQuiz(songHTML);
            }
        });
    });
};
