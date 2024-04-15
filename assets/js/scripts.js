// Initial setup

console.log('initial setup');
document.addEventListener("DOMContentLoaded", function () {
    console.log("loaded");
    console.log('started dom content loaded listener');
    setupPage();
});


/**
 * I don't think I need to pass this any thing at all, but maybe that is faster/more efficient than calling a function over and over.
 * @param {string html format} songName
 */
function playSongQuiz() {
    const songHTML = getSongHTML();
    console.log(`playsong triggered with ${songHTML}`);
    let answerBox = document.getElementById("user-answer");
    const userAnswer = answerBox.value;
    console.log(userAnswer);
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
        incrementScores(correct, songHTML);
        addGuess(answer, correct);
    }
    // resets game for next guess
    answerBox.value = '';
    answerBox.focus();
}

// Functions related to checking answers

/**
 * Checks if userAnswer is in answerArray using normalized form of each 
 * @param {user submitted string} userAnswer 
 * @param {array of sampled asrtists and songs} answerArray 
 * @returns correct format of answer or empty string
 */
function compareGuess(userAnswer, answerArray) {
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
        message += ' You already guessed that. Try guessing something new.';
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
    let raw;
    const normedGuess = norm(guess);
    console.log(normedGuess);
    if (correctness) {
        raw = document.getElementById('correct-submissions').innerHTML;
    } else {
        raw = document.getElementById('incorrect-submissions').innerHTML;
    }
    let submissions = htmlListToArray(raw);
    console.log(submissions);
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
    let div;
    let listId;
    let submissionList;
    if (correctness) {
        div = document.getElementById('correct-submissions');
        listId = 'correct-list';
    } else {
        div = document.getElementById('incorrect-submissions');
        listId = 'incorrect-list';
    }
    if (div.innerText === '') {
        submissionList = document.createElement("ul");
        submissionList.setAttribute('id', listId);
        div.appendChild(submissionList);
    } else {
        submissionList = document.getElementById(listId);
    }
    let newItem = document.createElement("li");
    newItem.innerText = answer;
    submissionList.appendChild(newItem);
}


/**
 * Increments correct or incorrect answer tally
 * @param {boolean: the answer was correct} result 
 */
function incrementScores(result, songHTML) {
    if (result) {
        let scoreBox = document.getElementById('correct-answer-score');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
        console.log(scoreBox.innerText);
        let percentageBox = document.getElementById('completion-percentage');
        let percentage = computeCompletionPercentage(songHTML);
        percentageBox.innerText = percentage;
        console.log(percentage);

    }
}

function computeCompletionPercentage(songHTML) {
    let points = document.getElementById('correct-answer-score').innerText;
    let totalPossible = solutions[songHTML].length;
    console.log(points);
    console.log(totalPossible);
    let percentage = parseInt(points) / parseInt(totalPossible);
    console.log(percentage);
    percentage = 100 * percentage;
    console.log(percentage);
    percentage = Math.round(percentage);
    console.log(percentage);
    return percentage;
}

// These functions manage writing the html for the page and navigation 

/**
 * 
 * @returns returns songHTML string of current page
 */
function getSongHTML() {
    const section = document.getElementById('game-section');
    return section.dataset.song;
}

function nextButtonHandler() {
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

/**
 * Updates keys fields in the html in order to play quiz for another song.
 * Also reloads event handlers.
 * @param {song name in html format} songHTML 
 */
function changeQuestion(songHTML) {
    let section = document.getElementById('game-section');
    section.dataset.song = songHTML;
    let titleHeader = document.getElementById('song-title');
    titleHeader.innerText = `${htmlToTitle(songHTML)} from All Day`;
    let iframe = document.getElementById('song-video');
    const ytlink = youtubeLinks[songHTML];
    iframe.setAttribute('src', ytlink);
    let ariaLabel = `Youtube video for ${toTitle(songHTML)}, but image is just the album cover for All Day`;
    iframe.setAttribute('aria-label', ariaLabel);
    resetElementById('correct-answer-score', '0');
    resetElementById('completion-percentage', '0');
    resetElementById('correct-submissions', '');
    resetElementById('incorrect-submissions', '');
    setupPage();
}

/**
 * Resets innerHTML of element to specified base value.
 * @param {element to be reset} elementId 
 * @param {value to be set} resetValue 
 */
function resetElementById(elementId, resetValue) {
    let element = document.getElementById(elementId);
    element.innerHTML = resetValue;
}

// These functions are called regardless but only take effect
// when the screen is a certain size
/**
 * This moves the prev and next song arrows on larger screens.
 */
function moveArrows() {
    let targetDiv = document.getElementById('video-feedback-answer-div');
    let arrowSection = document.getElementById('outer-arrow-section');
    let arrows = document.getElementById('arrows');
    targetDiv.appendChild(arrows);
    arrowSection.remove();
}

/**
 * This moves record div on larger screens.
 */
function moveRecordDivs() {
    console.log('move records called')
    let recordsDiv = document.getElementById("records-div");
    let left = recordsDiv.children[0];
    let right = recordsDiv.children[1];
    let targetDiv = document.getElementById('game-content-div');
    targetDiv.insertBefore(left, targetDiv.firstChild);
    targetDiv.appendChild(right);
    recordsDiv.remove();
}

// this could be refactored so that the event that is being
// listened for is a touch
/**
 * maybe this should be removed
 * This function gives visual feedback, letting a user know they have clicked a button
 * @param {id for element that should respond when clicked} elementId 
 * @param {class to be added to button upon click} className 
 */
function addClickResponseForMobile(elementId, className) {
    let button = document.getElementById(elementId);
    if (button) {
        button.addEventListener("click", function () {
            button.classList.add(className);
        });
    }
}

/**
 * Adds event handlers.
 * Checks screen size and moves elements if suitable.
 *
 */
function setupPage() {
    console.log('setupEventHandler called');
    if (window.screen.width >= 768) {
        moveRecordDivs();
        moveArrows();
    }
    addClickResponseForMobile('play-game', 'clicked-play-game');
    let nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', nextButtonHandler);
    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', prevButtonHandler);
    // should this be refactored into a separate function?
    const button = document.getElementById('submit-button');
    button.addEventListener("click", playSongQuiz);
    let answerBox = document.getElementById('user-answer');
    answerBox.addEventListener('keydown', function (event) {
        if (answerBox.value === '') {
            return;
        } else if (event.key === 'Enter') {
            playSongQuiz();
        }
    });
    answerBox.value = '';
    answerBox.focus();
}