// Initial setup

console.log('initial setup');
document.addEventListener("DOMContentLoaded", function () {
    console.log("loaded");
    console.log('started dom content loaded listener');
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
function incrementScores(result,songHTML) {
    if (result) {
        let scoreBox = document.getElementById('correct-answer-score');
        const oldScore = parseInt(scoreBox.innerText);
        scoreBox.innerText = oldScore + 1;
        let percentageBox = document.getElementById('completion-percentage');
        let percentage = computeCompletionPercentage(songHTML);
        percentageBox.innerText = percentage;
    }
}

function computeCompletionPercentage(songHTML) {
    let points = document.getElementById('correct-answer-score').innerText;
    let totalPossible = solutions[songHTML].length;
    console.log(points);
    console.log(totalPossible);
    let percentage = parseInt(points)/parseInt(totalPossible);
    console.log(percentage);
    percentage = 100*percentage;
    console.log(percentage);
    percentage = Math.round(percentage);
    console.log(percentage);
    return percentage;
}


/**
 * This object contains various tests
 * need to add tests for each song.
 */


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
/**
 * This moves the location of the records as well as 
 * the prev and next song arrows.
 * @returns if screen is too small, nothing is returned
 */
function adjustForLargeScreens() {
    console.log("adjusting function hit");
    if (window.screen.width < 768) {
        return;
    }
    let recordsDiv = document.getElementById("records-div");
    console.log(recordsDiv);
    console.log(recordsDiv.children);
    let left = recordsDiv.children[0];
    console.log(left);
    let right = recordsDiv.children[1];
    console.log(right);
    let targetDiv1 = document.getElementById('main-content-div');
    let targetDiv2 = document.getElementById('video-feedback-answer-div');
    let arrowSection = document.getElementById('outer-arrow-section');
    let arrows = document.getElementById('arrows');
    targetDiv1.appendChild(right);
    targetDiv1.insertBefore(left, targetDiv1.firstChild);
    recordsDiv.remove();
    targetDiv2.appendChild(arrows);
    arrowSection.remove();
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
    adjustForLargeScreens();
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