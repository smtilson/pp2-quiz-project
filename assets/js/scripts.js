// Initial setup
// set up submission logs
let correctAnswers = {};
let incorrectAnswers = {};
for (let track of trackList) {
    correctAnswers[track] = [];
    incorrectAnswers[track] = [];
}
document.addEventListener("DOMContentLoaded", setupPage);

// Main function
/**
 * Gets users guess. Checks if it is correct, 
 * calls functions to provide user with feedback, logs progress.
 */
function playSongQuiz() {
    const songHTML = getSongHTML();
    let answerBox = document.getElementById("user-answer");
    const userAnswer = answerBox.value;
    if (catchNonsense(userAnswer)) {
        let message = nonsenseFeedback(userAnswer);
        displayFeedback(message);
        resetAnswerArea();
        return;
    }
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
        logGuess(answer, correct);
    }
    // resets game for next guess
    resetAnswerArea();
}

// Check submission functions
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
 * Checks if guess was already submitted.
 * @param {string} guess - Correct answer or user submitted guess 
 * @param {boolean} correct - True if guess is correct
 * @return {boolean} True if guess is already present in appropriate list
 */
function alreadyGuessed(guess, correct) {
    const normedGuess = norm(guess);
    let submissions = getLogs(correct);
    submissions = submissions.map((word) => norm(word));
    // checks for guess in logs
    if (submissions.includes(normedGuess)) {
        return true;
    } else {
        return false;
    }
}

// Logging functions
/**
 * Gets relevant log for song.
 * @param {boolean} correct - Determines which log to get 
 * @returns {array} Array of already logged answers
 */
function getLogs(correct) {
    if (correct) {
        return correctAnswers[getSongHTML()];
    } else {
        return incorrectAnswers[getSongHTML()];
    }
}

/**
 * Logs the guess in the appropriate object.
 * @param {string} guess - string to be logged 
 * @param {boolean} correct - Determines where to log string
 */
function logGuess(guess, correct) {
    if (correct) {
        correctAnswers[getSongHTML()].push(guess);
    } else {
        incorrectAnswers[getSongHTML()].push(guess);
    }
}

// feedback functions
/**
 * Generates feedback text based on answer.
 * @param {string} answer - Correct answer or user submitted guess
 * @param {string} songName - Name of song in title format 
 * @param {boolean} guessed - True if already submitted 
 * @param {boolean} correct - True if answer is correct
 */
function generateFeedback(answer, songName, guessed, correct) {
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
 * Produces feedback for nonsense answers.
 * @param {string} guess - user submitted nonsense answer 
 * @returns {string} Message to be given to user
 */
function nonsenseFeedback(guess) {
    return `I don't think ${guess} is a very serious answer. Try again.`;
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

// Functions for navigation and editing HTML
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
    let index = trackList.indexOf(songHTML);
    if (index + 1 < trackList.length) {
        songHTML = trackList[index + 1];
    } else {
        songHTML = trackList[0];
    }
    return songHTML;
}

/**
 * Gets prev song on album.
 * @param {string} songHTML - Current song in html format 
 * @returns {string} Prev song name in html format
 */
function findPrevSongHTML(songHTML) {
    const index = trackList.indexOf(songHTML);
    if (index - 1 >= 0) {
        songHTML = trackList[index - 1];
    } else {
        songHTML = trackList[trackList.length - 1];
    }
    return songHTML;
}

/**
 * Updates section.data-song, song title, youtube link, and aria label to specified song.
 * Resets score, completion percentage, and submission areas.
 * Calls setup function.
 * @param {string} songHTML - Song to be loaded for the game. 
 */
function changeQuestion(songHTML) {
    let section = document.getElementById('game-section');
    section.dataset.song = songHTML;
    let titleHeader = document.getElementById('song-title');
    titleHeader.innerText = `${htmlToTitle(songHTML)} from All Day`;
    updateIFrame(songHTML);
    resetScoreArea(songHTML);
    setupEventHandlers();
    resetAnswerArea();
}

/**
 * Updates iframe youtube link and aria label.
 * @param {string} songHTML 
 */
function updateIFrame(songHTML) {
    let iframe = document.getElementById('song-video');
    iframe.setAttribute('src', youtubeLinks[songHTML]);
    let ariaLabel = `Youtube video for ${htmlToTitle(songHTML)}, but image is just the album cover for All Day`;
    iframe.setAttribute('aria-label', ariaLabel);
}

/**
 * Resets input area
 */
function resetAnswerArea() {
    let answerBox = document.getElementById('user-answer');
    answerBox.value = '';
    answerBox.focus();
}

/**
 * Sets up score area for song.
 * @param {string} songHTML - Song in html format 
 */
function resetScoreArea(songHTML) {
    let oldScore = correctAnswers[songHTML].length;
    resetElementById('score', oldScore);
    resetElementById('completion-percentage', completionPercentage(oldScore, songHTML));
    resetElementById('correct', '');
    for (let answer of correctAnswers[songHTML]) {
        addGuess(answer, true);
    }
    resetElementById('incorrect', '');
    for (let answer of incorrectAnswers[songHTML]) {
        addGuess(answer, false);
    }
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
 */
function setupPage() {
    if (window.screen.width >= 768) {
        moveRecordDivs();
        moveArrows();
    }
    setupEventHandlers();
    resetAnswerArea();
}


/**
 * Sets up event handlers
 */
function setupEventHandlers() {
    let nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', nextButtonHandler);
    let prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', prevButtonHandler);
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
}