// Initial setup

console.log('initial setup');
document.addEventListener("DOMContentLoaded", function () {
    console.log("loaded");
    console.log('started dom content loaded listener');

    adjustRecordsForLargeScreens();

    setupEventHandlers();
});


/**
 * I don't think I need to pass this any thing at all, but maybe that is faster/more efficient than calling a function over and over.
 * @param {string html format} songName
 */
function playSongQuiz(songHTML) {
    console.log(`playsong triggered with ${songHTML}`);
    let answerBox = document.getElementById("user-answer");
    const userAnswer = answerBox.value;
    // these need to be changed so that they access stuff 
    // from the event object
    // fetches userAnswer
    // This should be changed to being accessed from the event
    // const songJS = htmlToJS(songHTML);
    // fetches solutions
    const songSolutions = solutions[songHTML];

    let answer = compareGuess(userAnswer, songSolutions);
    const correct = (answer) ? true : false;
    // resets answer to userAnswer if the guess was incorrect   
    answer = (answer) ? answer : userAnswer;
    let guessed = alreadyGuessed(answer, correct);
    // delivers feedback
    const feedback = generateFeedback(answer, htmlToTitle(songHTML), guessed, correct);
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
    console.log(generateFeedback(answer, 'Oh No', guessed, correct));
    if (!guessed) {
        incrementScores(correct);
        addGuess(answer, correct);
    }
}

// Functions related to checking answers

/**
 * Checks if userAnswer is in answerArray using normalized form of each 
 * @param {user submitted string} userAnswer 
 * @param {array of sampled asrtists and songs} answerArray 
 * @returns correct format of answer or empty string
 */
function compareGuess(userAnswer, answerArray) {
    // console.log(`compare fired with ${userAnswer}`)
    normedUserAnswer = norm(userAnswer);
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
    let feedbackSpan = document.getElementById("feedback");
    feedbackSpan.innerText = feedback;
    feedbackSpan.parentNode.style.display = 'flex';
}

/**
 * This checks if a guess was already guessed.
 * @param {*} guess 
 * @param {*} correctness 
 */
function alreadyGuessed(guess, correctness) {
    let span;
    const normedGuess = norm(guess);
    if (correctness) {
        span = document.getElementById('correct-submissions');
    } else {
        span = document.getElementById('incorrect-submissions');
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
        span = document.getElementById('correct-submissions');
    } else {
        span = document.getElementById('incorrect-submissions');
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
        let scoreBox = document.getElementById('correct-answer-score');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    } else {
        let scoreBox = document.getElementById('incorrect-answer-score');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
    }
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
    const section = document.getElementById('game-section');
    return section.dataset.song;
}

function nextButtonHandler(event) {
    console.log('next button handler firing');
    let songHTML = getSongHTML();
    songHTML = findNextSongHTML(songHTML);
    changeQuestion(songHTML);
}

function prevButtonHandler(event) {
    let songHTML = getSongHTML();
    songHTML = findPrevSongHTML(songHTML);
    changeQuestion(songHTML);
}

function findNextSongHTML(songHTML) {
    console.log("current song is ", songHTML);
    let index = tracks.indexOf(songHTML);
    console.log(index);
    if (index + 1 < tracks.length) {
        songHTML = tracks[index + 1];
    } else {
        songHTML = tracks[0];
    }
    console.log("now it is ", songHTML);
    return songHTML;
}

function findPrevSongHTML(songHTML) {
    const index = tracks.indexOf(songHTML);
    if (index - 1 >= 0) {
        songHTML = tracks[index - 1];
    } else {
        songHTML = tracks[0];
    }
    console.log("now it is ", songHTML);
    return songHTML;
}

function changeQuestion(songHTML) {
    let section = document.getElementById('game-section');
    section.dataset.song = songHTML;
    let titleHeader = document.getElementById('song-title');
    titleHeader.innerText = `${htmlToTitle(songHTML)} from All Day`;
    let iframe = document.getElementById('song-video');
    const ytlink = youtubeLinks[songHTML];
    iframe.setAttribute('src', ytlink);
    resetElementById('correct-submissions');
    resetElementById('incorrect-submissions');
    setupEventHandlers();



    // needs to update song title
    // needs to update youtube link
    // needs to reset scores
    // needs to reset feedback
    // needs to rerun event handlers maybe?
}

function resetElementById(elementId) {
    let element = document.getElementById(elementId);
    element.innerHTML = '';
}

// These functions are called regardless but only take effect
// when the screen is a certain size
function adjustRecordsForLargeScreens() {
    if (window.screen.width < 768) {
        return;
    }
    let recordsDiv = document.getElementById("records-div");
    let left = recordsDiv.children[0];
    let right = recordsDiv.children[1];
    let targetDiv = document.getElementById('main-content-div');
    targetDiv.appendChild(right);
    targetDiv.insertBefore(left, targetDiv.firstChild);
    recordsDiv.setAttribute('display', 'none');
}

// this could be refactored so that the event that is being
// listened for is a touch
function addClickResponseForMobile(elementId, className) {
    /*if (window.screen.width > 900) {
        return ;
    }*/
    let button = document.getElementById(elementId);
    if (button) {
        button.addEventListener("click", function () {
            button.classList.add(className);
        });
    }
}

/**
 * This adds all event handlers.
 * It is done this way so that it can be called 
 * again when the song for the game changes.
 */
function setupEventHandlers() {
    console.log('setupEventHandler called');
    adjustRecordsForLargeScreens();
    addClickResponseForMobile('play-game', 'clicked-play-game');
    let section = document.getElementById('game-section');
    let nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', nextButtonHandler);
    console.log('next button set');
    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', prevButtonHandler);
    console.log('prev button set');
    // should this listener be added at screen load?
    // does it depend on the screen size?
    // maybe change this to be the play event of the video or a click on the video, or mousenter on the video.
    // shit, house is this triggered on mobile??
    section.addEventListener("mouseenter", function () {
        // console.log(`mouse enter is being triggered for ${this.id}`);
        //console.log(`section ${this.id} mouse over trigger hit`)
        const songHTML = this.dataset.song;
        const button = document.getElementById('submit-button');
        // console.log("button event about to be added");
        // should this be refactored?
        button.addEventListener("click", function () {
            console.log("event triggered by button click")
            playSongQuiz(songHTML)
        });
        // console.log("button event already added");
        let answerBox = document.getElementById('user-answer');
        answerBox.value = '';
        answerBox.focus();
        // console.log("answerbox event about to be added");
        answerBox.addEventListener('keydown', function (event) {
            if (answerBox.value === '') {
                return;
            } else if (event.key === 'Enter') {
                // console.log("play song triggered by enter key press")
                // this can be done better using the event
                playSongQuiz(songHTML);
            }
        });
    });
};