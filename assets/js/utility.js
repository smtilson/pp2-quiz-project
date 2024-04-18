// This file contains utility functions. They are primarily used to 
// format strings or convert strings into a different form of data 
// for processing by other functions. They are mostly used by 
// database.js but are also used in the script.js for processing. 

/**
 * Returns a format of string for comparison purposes. This format allows
 * for users to submit guesses that are not exact matches in terms of 
 * punctuation etc.
 * @param {string} string - String to be formatted
 * @returns {string} Normalized format of string
 */
function norm(string) {
    // we remove common words, then punctuation, then spaces
    // this order avoids creation of new occurrences of common words
    string = string.toLowerCase();
    string = removeParenthetical(string);
    // adds buffer so words will be removed from beginning 
    // and end of string
    string = ' ' + string + ' ';
    let removeWords = ['the', 'a', 'an', "'n'", 'of', 'and', ];
    // ensures that words aren't removed from interior of words
    removeWords = removeWords.map((word) => ' ' + word + ' ');
    for (let word of removeWords) {
        string = replaceAll(string, word, ' ');
    }
    // removes punctuation and spaces
    let removeSymbols = ['.', ',', '&', '"', "'", '-', ' '];
    for (let symbol of removeSymbols) {
        string = replaceAll(string, symbol, '');
    }
    return string;
}

/**
 * Removes all occurrences of substring. Warning, depending on choices,
 * new instances of the substring may be created by this removal process.
 * @param {string} string - String to be modified 
 * @param {string} substring - String to be replaced
 * @param {string} replacement - Replacement string
 * @returns {string} String with substring replaced
 */
function replaceAll(string, substring, replacement) {
    while (string.includes(substring)) {
        string = string.replace(substring, replacement);
    }
    return string;
}

/**
 * Replaces special dash characters with semi-colons for processing purposes.
 * @param {string} string - String we want cleaned 
 * @returns {string} Cleaned version of string
 */
function preprocessString(string) {
    string = string.trim();
    // earlier versions of the code addressing these dashes was inspired by this SO question:
    // https://stackoverflow.com/questions/10436523/remove-a-long-dash-from-a-string-in-javascript
    let removal = ['\u2013', '\u2012', '\u2014', ];
    // replaces special dashes with semi-colon
    for (let term of removal) {
        string = replaceAll(string, term, ';');
    }
    string = replaceAll(string, '"', '');
    return string;
}

/**
 * Transforms raw form of sample list into array of string data that 
 * has been preprocessed.
 * @param {string} rawSamples - Large string, unprocessed 
 * @returns {array} Array of strings that have been cleaned
 */
function transformWikiData(rawSamples) {
    let sampleList = rawSamples.split('\n');
    // cleans each string in the array
    sampleList = sampleList.map((item) => preprocessString(item));
    // replaces strings with JS objects
    sampleList = sampleList.map((item) => sampleStringToData(item));
    return sampleList;
}

/**
 * Formats solutions into a single array containing both artists and songs.
 * @param {array} artistAndSongSolutions - Array of song objects
 * @returns {array} Artists and Songs sampled in single array
 */
function formatSolutions(artistAndSongSolutions) {
    const artistList = artistAndSongSolutions.map((entry) => entry.artist);
    const songList = artistAndSongSolutions.map((entry) => entry.song);
    return artistList.concat(songList);
}

/**
 * Produces js Object containing data from sample stored by key
 * @param {string} sampleString - string of sample data: start, end, artist, song 
 * @returns {object} Object containing sample data.
 */
function sampleStringToData(sampleString) {
    let data = sampleString.split(" ; ");
    let sampleData = {};
    let keys = ['start', 'end', 'artist', 'song'];
    for (let index in keys) {
        sampleData[keys[index]] = data[index];
    }
    sampleData.artist = primaryArtist(sampleData.artist);
    sampleData.song = removeParenthetical(sampleData.song);
    return sampleData;
}

/**
 * Transforms song in html format to song in title format.
 * @param {string} string - Song in html format
 * @returns {string} Song in title format
 */
function htmlToTitle(string) {
    string = replaceAll(string, '-', ' ');
    // the below part of the function was inspired by this SO question:
    // https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    let words = string.split(' ');
    words = words.map(w => capitalize(w));
    return words.join(' ');
}

/**
 * Capitalizes first letter of string.
 * @param {string} word
 * @returns {string} Word
 */
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

/**
 * Removes featured artists.
 * @param {string} artist 
 * @returns {string} Only primary artist of song
 */
function primaryArtist(artist) {
    let primaryArtist = artist.split(' featuring')[0];
    primaryArtist = primaryArtist.split(' feat')[0];
    return primaryArtist;
}

/**
 * Removes parenthetical statements. Only applied to song titles.
 * @param {string} song 
 * @returns {string} Only primary title
 */
function removeParenthetical(songString) {
    return songString.split('(')[0].trim();
}

/**
 * Determines if string is likely nonsense.
 * @param {string} string - user submitted answer 
 * @returns 
 */
function catchNonsense(string) {
    let words = string.split(' ');
    for (let word of words) {
        if (word.length > 20) {
            return true;
        }
    }
    return false;
}

/**
 * Used to create links for the readme from the embedded format 
 * used for iframes.
 * @param {string} songHTML - song in html format
 * @param {string} embedLink - youtube link in embed format. 
 * @returns {string} Anchor tag with song name in title format
 */
function linkForReadme(songHTML, embedLink) {
    let watchLink = '<a href="';
    watchLink += embedLink.replace('embed/', 'watch?v=');
    watchLink += `">${htmlToTitle(songHTML)}</a>`;
    return watchLink;
}