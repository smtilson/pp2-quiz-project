# He used What?? <a name="title"></a>
### The Girl Talk samples quiz that you can finally play outside of your own head
Girl Talk is a mash-up artist, sampling an eclectic collection of music to create original and vibrant songs. Online quiz tests your musical knowledge to see if you can name that artist or song he is sampling. Find the quiz <a href="https://smtilson.github.io/pp2-quiz-project/">here</a>.

## Table of Contents <a name="toc"></a>
- [Title](#title)
- [Introduction](#intro)
- [Features](#features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits and Outside Sources](#credits)

## Introduction <a name="intro"></a>

![Landing page responsive screenshot](/assets/images/screenshots/landing-page-amiresponsive.png)
"He Sampled WHAT??" is a musical quiz based on the album All Day by Girl Talk. Girl Talk is the most widely recognized mash-up artist. He makes music by sampling different songs to construct original collages triggering deep feelings of nostalgia. Inevitably, when listening to his music you try to figure out what songs he has sampled. This is that game. It is very challenging due to his eclectic taste. The point  of the game is to enhance the listening experience.

![Game page responsive screenshot](/assets/images/screenshots/game-page-amiresponsive.png)
(Note: the image of the game in mobile AmIResponsive produced is innaccurate. I have included more photos below) <!-- loose end -->

This game is implemented for all songs on All Day, and we hope to eventually implement it for all of Girl Talks albums. As well as the Grey Album by Danger Mouse, and the works of other mashup artists.

### Project Description
This side is an interactive game. You guess which artists and songs are sampled in the song that is playing.

### User Demographics
The expected user is interested in music and perhaps very interested in Girl Talk. There is no prerequisite of having heard or having not heard Girl Talk before. Familiarity with modern pop music is necessary. Familiarity with hip hop and club rap will be very helpful. As the album was released in 2010, nothing more recent is necessary.

### Wireframes
After the initial brainstorming, I used Balsamiq to make some wireframes for the mobile and desktop versions of the site. Further development necessitated deviation from these initial plans.

<img alt="Mobile site wireframe" src="./assets/images/screenshots/wireframe-mobile.png" height="250px" width="150px">

Due to space limitations, the instructions were moved to a landing page. An area was also added for displaying feedback to the user.

<img alt="Desktop site wireframe" src="./assets/images/screenshots/wireframe-desktop.png" height="350px" width="550px">



## Features <a name="features"></a>
### Features
#### Landing Page
User stories:
- As a user, I visit the landing page and read the instructions for the game. I am told what kinds of answers to submit. I am told incorrect guesses are not penalized. I am told to be very happy with 10% completion on a song.
- As a user, I click on the "Let's Go" link and am taken to the game page. My cursor is in the input field.

The landing page contains instructions for the game. The instructions explains what type of quiz this is and what types of answers to submit. The landing page also contains a "Warning" paragraph about the difficulty of the quiz. It is meant to encourage players who are unfamiliar with Girl Talk.

<img alt="Landing page on desktop" src="./assets/images/screenshots/landing-page-desktop.png" height="350px" width="575px">

On the left are instructions for the game. On the right is a warning about the difficulty of the quiz. (If you wish to cheat, please see <!-- loose end --> for a link to the answers.)
Below these, there is a button which takes users to the main game page.

<img src="./assets/images/screenshots/landing-page-mobile.png" alt="Landing page on mobile" height="300px" width="150px">

On mobile, these elements are displayed vertically.

#### Game Page
User stories:
- As a user, I type a guess and push the enter key/click the button with the mouse. The guess is submitted. I receive feedback telling me if the answer is correct. If it is correct, my score and completion percentage are updated. The input field emptied and my cursor is there.
- As a user, I submit a new guess. The guess is logged by being written on the left if it is correct and on the right if it is incorrect.
- As a user, I submit a guess I have already submitted. It is not logged and my score is not impacted. I am encouraged to try something new.
- As a user, I click the right arrow button on the game page. The game is updated so that it is set for the next track on All Day. The score, completion percentage, and logging areas are reset.
- As a user, I click the left arrow button on the game page. The game is updated so that it is set for the previous track on All Day. The score, completion percentage, and logging areas are reset.
- As a user, I click the back button on the game page. I am taken back to the landing page with the instructions.

The game page displays the song title and album name. This informs the user which song they are playing the quiz for. Below this, there is an embedded youtube video. This allows a user to listen to the song as the player takes the quiz. It does not autoplay.

<img alt="Title, video, and answer area screen shot" src="./assets/images/screenshots/title-video-answer-area-screenshot.png" height="300px" width ="300px">

There is an answer area with an input field. It is labelled with "Song/Artist" to remind the user they should be entering only one, and not both a song and artist. The answer can be submitted using the enter key or by clicking/tapping the "Submit Answer" button.

Once the user submits an answer, it is processed into a normalized format. This is to avoid simple errors like "the ramones" or "Mia" when the official answers would be "Ramones" and "M.I.A.", respectively. Feedback is then displayed to the user related to their submission. It tells them if their guess was correct. If they have already submitted that guess, it encourages them to try something new. This is what would be displayed if a user submitted the same guess an additional time.

<img alt="Feedback area upon resubmit mobile" src="./assets/images/screenshots/feedback-resubmit-mobile.png" height="75px" width="300px">


There are two score related areas. In mobile, they are next to each other. 

<img alt="Score area on mobile" src="./assets/images/screenshots/score-area-mobile.png" width="300px" height="125px">

On the left, the score is given and correct guesses (the official form) are logged. On the right, the percentage of total correct answers is given and incorrect answers are logged. When a user goes to a new song/question, these areas are reset. When a user returns to a song/question they have already made progress on, the score area is reconstructed as it was when they last attempted that question. (Note: this does not remain when the browser is refreshed and the javascript files are reloaded.)

To prevent overflow of these areas, a function catches any submission with containing a word consisting of more than 20 consecutive characters. 

<img alt="Feedback for nonsense submission on mobile" src="./assets/images/screenshots/nonsense-feedback-mobile.png" height="75px" width="300px">


On larger screens, they are on either side of the video.

![Score area on Desktop](/assets/images/screenshots/score-area-desktop.png)

For navigation, there are three buttons at the bottom of the page. The left arrow button loads the game for the previous track on the album. The right arrow button loads the game for the next track on the album. Loading the game for a different track resets the score, percentage, and logging areas. The back button takes the user back to the landing page with instructions.

<img alt="Navigation buttons desktop" src="./assets/images/screenshots/navigation-buttons-desktop.png" height="75px" width="350px">

### Future improvements

- Implement lazy loading for youtube videos
- Implement advanced scoring where users get an extra bonus for guessing the sample while it is playing.
- Add more Girl Talk albums.
- Change videos to be from Girl Walk.
- Add links to wiki incase they guess one of the unknown samples.

## Testing <a name="testing"></a>

### Testing Features
I tested the initial version of logging and scoring with custom functions. Since significant refactoring, I have tested them manually. I have tested all buttons manually on mobile and on desktop. 

### Testing the Game itself
During early development, when the game was only implemented for the first track, I used some functions to test that the game was functioning as expected when given specified input. These functions can be found in testing.js. Due to refactoring, they no longer function appropriately. Since those refactors, I have been testing manually. I have played the game for the first 7 tracks and found some bugs that I have fixed, which will be detailed below. These integration tests ensured that the events were being appropriately triggered in mobile and on desktop. I have also had a few friends play the game.

### Testing responsiveness
To test responsiveness, I used chrome dev tools. I considered the following screen sizes:
- On mobile: 320x628, 375×667, 414×736, 360×800, 390×844
- Larger: 768x1024, 1024x768, 933x622, 1024x622
The game functioned on all of these. I had to compromise on the appearance a bit. I used breakpoints in my CSS to address when the width and height change.

### Validation

#### HTML
The HTML has been validated with [W3 HTML validator](#html-validator). The only issues were:
- trailing '/>' on elements in the head that were introduced byt the formatter I used;
- a button element that was wrapped in an anchor tag.
Both of these have been addressed.

#### CSS
The CSS was validated with [Jigsaw CSS validator](#css-validator). No errors were found.

#### Javascript
The Javascript has been validated by [JSHint](#js-validator). There were no major issues.
It caught:
- missing semi-colons
- unnecessary trailing commas
These were immediately corrected.

It mentioned:
- 'const', 'let', '=>', and 'for of' loops only being available in ES6.
- 'for in' loops should be called inside of an 'if' block. 
- functions being called that are not defined in the body of that JS file
- variables that are not used in the body of that JS file

Regarding the last two points. In order to compartmentalize and organize the work, I moved utility functions, mostly used for formatting, to a separate file, utility.js. I also moved all of the data that is stored to database.js. This causes no problem at runtime as this files are loaded in proper order. Therefore the functions called are already in the namespace before they are called.

### Bugs
- There were special dash characters contained in the raw data that was used for the solutions.
Fix: This was addressed by [SO dash question](#so-dash-question). I removed the special characters initially using the code suggested there but later used my replaceAll function.
- Capitalize was throwing an error. This was due to it being fed an empty string.
Fix: Capitalize is only called by toTitle. So trim() is called before capitalize is to address this issue.
- Certain correct song titles were not being marked correct.
Fix: When refactoring to package all utility functions into a single object, something was not properly replaced. Thus, the check to see if a user answer was a song that was sampled was failing automatically. This was been fixed. The utility object was later made into a separate file.
- Automated tests revealed that submissions were being over-counted.
Fix: This was due to using only toLowerCase() and not my custom norm() function. This was fixed.
- The wrong format of correct answer was being logged.
Fix: In the compareGuess function, I was not setting a new variable for the comparison and so the wrong string was being returned by compareGuess. This was fixed
- The core game play loop was not loading.
Fix: The issue was that an old event handler which was deleted had not yet been removed from the set up. It was being added as a listener, but the function no longer existed. This was fixed.
- The javascript files were not loading.
Fix: There was a typo in an array definition and some missing semi-colons. Fixing these addressed the issue.
- When loading game.html, a 'mouseoverevent' was causing an empty string to be submitted.
Fix: This was fixed by catching empty strings and preventing them from being submitted. Subsequently, 'mouseoverevent' triggers were completely removed.
- When submitting an answer with button click, or enter key playSongQuiz was being triggered too many times.
Fix: The above fix addressed this. I also refactored how the function was being assigned to the listener, I believe this also addressed the issue.
- At 320px, the body was not properly centered.
Fix: Changing video iframes to width==300 height=225 addressed the issue. [SO: body width question](#so-body-width-question)
- Submitting a string with a space at the end, which happens if you auto-complete an answer, causes things not to submit properly (my wife encountered this when I was showing her the app).
Fix: This was fixed by adding a call to trim(), it was related to the issue above where capitalize is being fed an empty string.
- Going to next or prev question reset the score area location.
Fix: This was properly addressed by changing the function changeQuestion. Instead of writing new HTML it simply updates certain elements.
- adjustForLargeScreens (now moveRecordDivs) was preventing event handlers from being added.
Fix: This was happening because the function was being called too many times. The second time it is called it attempts to get an element that has been removed, and so the function throws an error. This was fixed by removing one of the times that the function was called.
- Submitting answers shifts the screen.
Fix: This was addressed by modifying the height and width of the feedback element so that it doesn't change o dynamically.
- Incorrect submissions panel was unevenly spaced when compared to the correct submissions panel.
Fix: This happened because the earlier version of the adjustForLargeScreens function only set the display value to none. This meant that the gap for the parent element was being applied. Removing the elements resolved this.
- Refactor to add submissions list broke alreadyGuessed function.
Fix: This was fixed by refactoring alreadyGuessed to look at the submissions lists instead of the HTML.
- Long submissions cause the submissions container to overflow (issue #18 and #20 appear to be the same).
Fix: This was addressed by catching submissions that have words of more than 20 characters and flagging them as nonsense. The normal gameplay loop is prevented and specific feedback is given.
- If there are too many submissions, they get pushed underneath the Score/Completion percentage.
Fix: Addressed this by setting a margin-top value to the div containing the list.
- On large screens, the submission containers are squeezed. This is due to the div containing them being constricted.
Fix: I could not figure out what was causing this. I looked at every width statement in my CSS file. In the end, I fixed this by setting the width of the relevant element to be in terms of vw on larger screens.
- Incorrect entries are logged twice. 
Fix: This was because the wrong thing was being pushed to the incorrectAnswers array. This was fixed by changing when the alreadyGuessed function is called.
- Media queries for screens of min-width 360px were causing issues.
Fix: I fixed this by removing them.
- False negative answers for answers with special characters.
Fix: I manually edited answers in the database file where I found special characters.
- When changing the question, the scores were erased instead of being reset to 0.
Fix: I addressed this by adding a resetValue parameter to the resetElementById function.
- Feedback area on new question displays undefined.
Fix: The resetElementById call was removed completely.

#### Bugs left in
- If a artist is sampled twice on the same song, the user is unable to submit the user a second time and receive credit. This is fixable, but it was not a priority as it happens very seldom.
- The appearance of the app could be improved.
- When loading on larger screens, the page appears differently before certain Javascript functions "move" the score area and arrow button area. I am not sure how to fix this right now, and it is a minor inconvenience.
- The automated tests do not function properly due to refactoring. As the need for automated tests was not as necessary after the main game play loop had been established, the need for these tests is not as high a priority. In general, this would not be true.
- If a user submits 'a', 'an', 'the', or 'of' the incorrect answer will not be logged. Luckily, 'The The' is not sampled on the album.
- Special characters are not recognized or addressed in full generality. Above rawSolutions in database.js, I have noted which entries have been manually adjusted.

### Lighthouse
I used the chrome [Lighthouse](#lighthouse) extension to test my project. For the landing page I got 100:

<img alt="Landing page report" src="./assets/images/screenshots/lighthouse-landing-page-report.png">

For the game page I did well, except on performance:

<img alt="Game page report" src="./assets/images/screenshots/lighthouse-game-page-report.png">

This was due to the inefficient loading of the embedded youtube video. One fix would be to implement lazy loading of the video. I plan on doing this in the future.

### Wave
I used the chrome extension for [Wave](#wave) to test accessibility.
For the landing page I got:

<img alt="Wave landing page report" src="./assets/images/screenshots/wave-landing-page-report.png" height="200px" width="150px">

For the game page I got:

<img alt="Wave game page report" src="./assets/images/screenshots/wave-game-page-report.png" height="200px" width="150px">

One of the alerts is to a redundant link. I addressed this by removing the link in the header.
The other alert is to the youtube video that is embedded.

## Deployment <a name="deployment"></a>
To deploy the project follow the following steps.

1. Copy/Clone the <a href="https://github.com/smtilson/pp2-quiz-project" target="_blank">repository</a> on github.

2. Go to your copy of the repository on your github page (likely `https://github.com/YOUR-USERNAME-HERE/pp2-quiz-project`)

3. Open settings tab on top right of page

4. Click on pages link on the left sidebar in the "Code and Automation" section.

5. Set "Source" to "Deploy from branch", select "main" branch, and set folder to /(root) under "Build and Deployment". Then click Save.

6. Return to the "Code" tab and wait for site to build. Try doing a hard refresh.

7. On the right hand side under "Deployments", click on "github-pages".

8. Click on the link which matches `https://USERNAME.github.io/REPO-NAME/` to view the deployed site.

[return to Table of Contents](#toc)


## Credits and Outside Sources <a name="credits"></a>

### Technologies, Frameworks, and resources used
I coded this project in HTML, CSS, and Javascript.


- <a href="https://validator.w3.org/#validate_by_input">W3 HTML validator</a> <a name="html-validator"></a>
- <a href="https://jigsaw.w3.org/css-validator/#validate_by_input">Jigsaw W3 CSS validator</a><a name="css-validator"></a>
- <a href="https://jshint.com/">JSHint: Javascript tool</a><a name="js-validator"></a>
- <a href="https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk">Lighthouse chrome plug in</a> <a name="lighthouse"></a>
- Wave chrome plug in


### StackOverflow
- <a href="https://stackoverflow.com/questions/10436523/remove-a-long-dash-from-a-string-in-javascript">SO: special dash characters</a> <a name="so-dash-question"></a>
- <a href="https://stackoverflow.com/questions/30358630/html-body-not-filling-complete-width-on-mobile-devices">SO: body width question</a> <a name="so-body-width-question"></a>

### Slack
- Daisy_mentor suggested the Wave tool, as well as making an empty span and populating it with feedback.
- Anders suggested using the Issues tab in github.
- Beardie mentioned that students received poor marks for using 'let' when they should have used 'const'. This was helpful information.

### Feedback
I showed the app to other members of my cohort (Holinda, Alex, and Anders), members of my family (my brother and my wife), and my friends (Lou and Mike). They gave me positive encouragement and feedback. In particular, Lou pointed out that the page looked poorly on his Pixel 4 phone. A screenshot Anders sent pointed to the submission areas being in the "wrong" place. I also received feedback regarding  the difficulty of the quiz. This is why I have added the blurb on the landing page. I also plan on uploading my own scores so that people don't feel bad.

My mentor gave helpful feedback. He suggested I make a database object in JS to store the solutions instead of hiding them in the html. He suggested that I change the size of some key elements to improve the appearance.


### Non-coding references

#### Music
Youtube videos for each song are used.
They are:
- <a href="https://www.youtube.com/watch?v=4bMM7tGV9MI">Oh No</a>
- <a href="https://www.youtube.com/watch?v=FtsxfquYHf0">Let It Out</a>
- <a href="https://www.youtube.com/watch?v=xVmXXWcfitw">Thats Right</a>
- <a href="https://www.youtube.com/watch?v=Ka3GznTXur8">Jump On Stage</a>
- <a href="https://www.youtube.com/watch?v=DZu_lLGFDtM">This Is The Remix</a>
- <a href="https://www.youtube.com/watch?v=lzf8NNF1Af4">On And On</a>
- <a href="https://www.youtube.com/watch?v=MRCEgD1nRRM">Get It Get It</a>
- <a href="https://www.youtube.com/watch?v=Nr2cfwR0roU">Down For The Count</a>
- <a href="https://www.youtube.com/watch?v=9DBmMoW5lSs">Make Me Wanna</a>
- <a href="https://www.youtube.com/watch?v=p1pd69r1Il8">Steady Shock</a>
- <a href="https://www.youtube.com/watch?v=i0yY0zxk-18">Triple Double</a>
- <a href="https://www.youtube.com/watch?v=Bo5bBq2j2EE">Every Day</a>

#### Sample list

- The data of which samples play when is taken from <a href="https://girltalk.fandom.com/wiki/All_Day">Girl Talk fandom wiki: All Day</a>.

- The official samples list, without time stamps, is from <a href="https://illegalart.net/allday/samples.html">Illegal Art: GIRL TALK - ALL DAY SAMPLES LIST</a>.

- The album itself can be downloaded from <a href="https://illegalart.net/allday/">Girl Talk - All Day</a>.
