// Initial setup

console.log('initial setup');
document.addEventListener("DOMContentLoaded", setupPage);


/**
 * Main gameplay function. Gets users answer. Checks if it is a solution, 
 * calls functions to provide user with feedback.
 */
function playSongQuiz() {
    const songHTML = getSongHTML();
    let answerBox = document.getElementById("user-answer");
    const userAnswer = answerBox.value;
    const songSolutions = solutions[songHTML];
    let answer = compareGuess(userAnswer, songSolutions);
    const correct = (answer) ? true : false;
    // resets answer to userAnswer if the guess was incorrect   
    answer = (answer) ? answer : userAnswer;
    let guessed = alreadyGuessed(answer, correct);
    // delivers feedback
    const feedback = generateFeedback(answer, htmlToTitle(songHTML), guessed, correct);
    displayFeedback(feedback);
    // adjusts score and records area appropriately
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
 * @param {string} userAnswer - User submitted string 
 * @param {array} answerArray - Array of sampled artists and songs 
 * @returns {string} Correct format of answer or empty string
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
 * Generates feedback text based on answer.
 * @param {string} answer - Correct answer or user submitted guess
 * @param {string} songName - Name of song in title format 
 * @param {boolean} guessed - True if already submitted 
 * @param {boolean} correct - True if answer is correct
 */
function generateFeedback(answer, songName, guessed, correct) {
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
 * Adds feedback string to html document.
 * @param {string} feedback - Message to be added to feedback span
 */
function displayFeedback(feedback) {
    let feedbackSpan = document.getElementById("feedback");
    feedbackSpan.innerText = feedback;
    feedbackSpan.parentNode.style.display = 'flex';
}

/**
 * Checks if guess was already submitted.
 * @param {string} guess - Correct answer or user submitted guess 
 * @param {boolean} correct - True if guess is correct
 * @return {boolean} True if guess is already present in appropriate list
 */
function alreadyGuessed(guess, correct) {
    let rawListHTML;
    const normedGuess = norm(guess);
    console.log(normedGuess);
    if (correct) {
        rawListHTML = document.getElementById('correct').innerHTML;
    } else {
        rawListHTML = document.getElementById('incorrect').innerHTML;
    }
    let submissions = htmlListToArray(rawListHTML);
    submissions = submissions.map((word) => norm(word));
    if (submissions.includes(normedGuess)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Adds either correctly formatted answer to correct submissions 
 * box or the users submitted answer to incorrect submissions box.
 * @param {string} answer - String to be added to submissions box
 * @param {boolean} correct - Determines which submissions box to write to
 */
function addGuess(answer, correct) {
    let div;
    let listId;
    let submissionList;
    // determine which div to access
    if (correct) {
        div = document.getElementById('correct');
        listId = 'correct-list';
    } else {
        div = document.getElementById('incorrect');
        listId = 'incorrect-list';
    }
    // get list or create list
    if (div.innerText === '') {
        submissionList = document.createElement("ul");
        submissionList.setAttribute('id', listId);
        div.appendChild(submissionList);
    } else {
        submissionList = document.getElementById(listId);
    }
    // create new item for list
    let newItem = document.createElement("li");
    newItem.innerText = answer;
    submissionList.appendChild(newItem);
}

/**
 * Increments score and updates completion percentage.
 * @param {boolean} correct - Correctness of answer 
 * @param {string} songHTML - Current song in html format 
 */
function incrementScores(correct, songHTML) {
    if (!correct) {
        return;
    }
    let scoreBox = document.getElementById('score');
    const oldScore = parseInt(scoreBox.innerText);
    const newScore = oldScore + 1;
    scoreBox.innerText = newScore;
    let percentageBox = document.getElementById('completion-percentage');
    percentageBox.innerText = completionPercentage(newScore, songHTML);
}


// warning, this has been updated so may cause failure due to type
/**
 * 
 * @param {number} points - Current score
 * @param {string} songHTML - Song name in html format for number of solutions 
 * @returns {number} An integer
 */
function completionPercentage(points, songHTML) {
    let totalPossible = solutions[songHTML].length;
    let percentage = parseInt(points) / parseInt(totalPossible);
    percentage = 100 * percentage;
    percentage = Math.round(percentage);
    return percentage;
}

// These functions manage writing the html for the page and navigation 

/**
 * Gets songHTML.
 * @returns {string} Song name in HTML format
 */
function getSongHTML() {
    const section = document.getElementById('game-section');
    return section.dataset.song;
}

/**
 * Event handler for next song button. Gets next songHTML and calls 
 * changeQuestion to update the page.
 */
function nextButtonHandler() {
    let songHTML = getSongHTML();
    songHTML = findNextSongHTML(songHTML);
    changeQuestion(songHTML);
}

/**
 * Event handler for prev song button. Gets prev songHTML and calls 
 * changeQuestion to update the page.
 */
function prevButtonHandler() {
    let songHTML = getSongHTML();
    songHTML = findPrevSongHTML(songHTML);
    changeQuestion(songHTML);
}

/**
 * Gets next song on album.
 * @param {string} songHTML - Current song in html format 
 * @returns {string} Next song name in html format
 */
function findNextSongHTML(songHTML) {
    let index = tracks.indexOf(songHTML);
    if (index + 1 < tracks.length) {
        songHTML = tracks[index + 1];
    } else {
        songHTML = tracks[0];
    }
    return songHTML;
}

/**
 * Gets prev song on album.
 * @param {string} songHTML - Current song in html format 
 * @returns {string} Prev song name in html format
 */
function findPrevSongHTML(songHTML) {
    const index = tracks.indexOf(songHTML);
    if (index - 1 >= 0) {
        songHTML = tracks[index - 1];
    } else {
        songHTML = tracks[0];
    }
    return songHTML;
}

/**
 * Updates keys fields in the html in order to play quiz for another song.
 * Also reloads event handlers.
 * @param {song name in html format} songHTML 
 */


// is calling the setup function again necessary?
/**
 * Updates section.data-song, song title, youtube link, and aria label to specified song.
 * Resets score, completion percentage, and submission areas.
 * Calls setup function. (is this necessary)
 * @param {string} songHTML - Song to be loaded for the game. 
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
    resetElementById('score', '0');
    resetElementById('completion-percentage', '0');
    resetElementById('correct', '');
    resetElementById('incorrect', '');
    setupPage();
}

/**
 * Resets innerHTML of element to specified base value.
 * @param {string} elementId - Element to be reset 
 * @param {string} resetValue - Base value for reset 
 */
function resetElementById(elementId, resetValue) {
    let element = document.getElementById(elementId);
    element.innerHTML = resetValue;
}


/**
 * Changes parent element of arrow buttons for larger screens.
 */
function moveArrows() {
    let targetDiv = document.getElementById('video-feedback-answer-div');
    let arrowSection = document.getElementById('outer-arrow-section');
    let arrows = document.getElementById('arrows');
    targetDiv.appendChild(arrows);
    arrowSection.remove();
}

/**
 * Changes location of record panels for larger screens.
 */
function moveRecordDivs() {
    let recordsDiv = document.getElementById("records-div");
    let left = recordsDiv.children[0];
    let right = recordsDiv.children[1];
    let targetDiv = document.getElementById('game-content-div');
    targetDiv.insertBefore(left, targetDiv.firstChild);
    targetDiv.appendChild(right);
    recordsDiv.remove();
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