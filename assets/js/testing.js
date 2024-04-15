// note that there is no difference between incorrect
// songs and artists currently
// I should come up with more test cases for artist names
// Some of these have been broken by various refactors.
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


function testSongs() {
    resetScores();
    checkAnswer("war pigs"); //+1 correct
    compareScores(1, 0);
    checkAnswer("war pIGs the"); // repeat
    compareScores(1, 0);
    checkAnswer("w ar  pigs"); // repeat
    compareScores(1, 0);
}

function testArtists() {
    resetScores();
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
    compareScores(0, 0);
    for (let index in artistNames) {
        console.log("index is ", index);
        checkAnswer(artistNames[index]);
        compareScores(compareValues[index][0], compareValues[index][1]);
    }
}

function fetchScores() {
    return [getElementBySongAndClass('oh-no', 'correct-answer-score').textContent,
        getElementBySongAndClass('oh-no', 'incorrect-answer-score').textContent
    ];
}

function fetchAnswers() {
    const correct = getElementBySongAndClass('oh-no', "correct-submissions").textContent.split(';');
    const incorrect = getElementBySongAndClass('oh-no', "incorrect-submissions").textContent.split(';');
    return [correct, incorrect];
}

function resetScores() {
    getElementBySongAndClass('oh-no', 'correct-answer-score').textContent = 0;
    getElementBySongAndClass('oh-no', 'completion-percentage').textContent = 0;
}

function compareScores(cScore, iScore) {
    let correct = fetchScores()[0];
    let incorrect = fetchScores()[1];
    console.log(`correct should be ${cScore}, it is `, correct);
    console.log(`incorrect should be ${iScore}, it is `, incorrect);
}