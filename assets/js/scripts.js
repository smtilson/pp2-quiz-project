// Initial setup
document.addEventListener("DOMContentLoaded", function () {
    // this is development set up
    var ohNoStringSampleList = transformWikiData('oh-no');
});

// event listeners

// get data from form

// check answers

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
    string = string.replace(/\u2013|\u2012|\u2014/g, "-");
    /* if removing the double quotes in this way causes an issue, 
    then it can be done later after the dictionary is built by 
    just slicing off the first and last character of the string */
    while (string.includes('"')) {
        string = string.replace('"', '');
    }
    return string;
}

/**
 * This function produces an js object containing start of sample,
 * end of sample, artist, and song sampled.
 * @param {This should be a string detailing the duration of the sample, the artist, and the song} sampleString 
 */
function sampleStringToData(sampleString) {
    let data = sampleString.split(" - ");
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

/**
 * This function should produce the solutions
 * from the html document, it is not currently implemented
 */
function getSolutions() {
    alert('This function is not yet implemented.');
    throw 'This function is not yet implemented.';
    let raw = document.getElementById('hidden-solutions').textContent;
    console.log(answers)
}

/**
 * This setup function is called when DOM loads.
 * It adds event listeners, initializes the game,
 * and collects solutions from html document.
 */
function setup() {
    getSolutions();
}