// This file contains utility functions that will be used by the DB file
// as well as the main script file. They each modify the format of a string.

/**
 * Returns normalized version of string
 * suitable for comparison purposes
 * @param {string to be normalized} string 
 */
function norm(string) {
    // we remove common words before spacing in case the 
    // removal of spaces causes some common words to appeaer 
    // when they wouldn't otherwise
    string = string.toLowerCase();
    let removeStrings = ['the', 'a', 'an', "'", '-', ' '];
    for (let word of removeStrings) {
        string = replaceAll(string, word, '');
    }
    return string;
}

/**
 * This removes all instances of substring from the string.
 * @param {*} string 
 */
function replaceAll(string, substring, replacement) {
    while (string.includes(substring)) {
        string = string.replace(substring, replacement);
    }
    return string;
}

/**
 * Removes " and special dash characters from strings
 * @param {string} string 
 */
function cleanString(string) {
    // does this trim do anything?
    string = string.trim();
    let removal = ['\u2013','\u2012','\u2014',];
    // replaces special dashes with normal dash
    for (let term of removal) {
        string = replaceAll(string, term, ';');
    }
    /* if removing the double quotes in this way causes an issue, 
    then it can be done later after the dictionary is built by 
    just slicing off the first and last character of the string */
    string = replaceAll(string, '"', '');
    return string;
}

/**
 * converts a string to JS format
 * @param {string in either format} string 
 */
function toJS(string) {
    string = replaceAll(string, '-', ' ');
    string = toTitle(string);
    string = string[0].toLowerCase() + string.slice(1);
    string = replaceAll(string, ' ', '');
    return string;
}
/**
 * Swaps title format and html format
 * ex: Oh No with oh-no.
 * If string is not in one of the formats, it will be 
 * returned unmodified
 * @param {string in either format} string
 */
// utility function
function titleSwap(string) {
    if (string.includes('-') && string.includes(' ')) {
        alert(`${string} contains both spaces and dashes. This function can not transform it.`);
    } else if (string.includes('-')) {
        string = replaceAll(string, '-', ' ');
        string = toTitle(string);
    } else if (string.includes(' ')) {
        string = replaceAll(string, ' ', '-');
        string = string.toLowerCase();
    } else {
        alert('Not sure how we got here, the string has neither.');
    }
    return string;
}

/**
 * converts track listing to html format
 * @param {track listing format} trackListing 
 * @returns 
 */
function trackToHTML(trackListing) {
    let string = trackListing.replace(/\u2013|\u2012|\u2014/g, ";");
    string = string.split(' ;')[0];
    string = replaceAll(string, '"', '');
    string = replaceAll(string, "'", '');
    return titleSwap(string);
}

/**
 * 
 * @param {string} word 
 * @returns 
 */
function capitalize(word) {
    if (word === '') {
        // hit this with "war pig"
        alert('capitalize was passed an empty word.')
        return '';
    } else if (typeof (word) === 'string') {
        // normal behavior
        // everything else in the function body is to catch a bug
        return word[0].toUpperCase() + word.slice(1);
    } else {
        console.log(word);
        console.log(word[0]);
        console.log(typeof word);
        alert('capitalize was passed a non string')
        throw `${word} is not a string, it is a ${typeof word}.`
    }
}

/**
 * Capitalizes first letter of each word.
 */
function toTitle(string) {
    let words = string.split(' ');
    words = words.map(w => capitalize(w));
    return words.join(' ');
}

/**
 * This addresses the issue of answers like 2Pac featuring...
 * it replaces the string by just the primary artist
 */
function primaryArtist(artistString) {
    let primaryArtist = artistString.split(' featuring')[0];
    primaryArtist = primaryArtist.split(' feat')[0];
    return primaryArtist;
}