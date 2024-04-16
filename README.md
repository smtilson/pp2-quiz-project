# He used What?? <a name="title"></a>
### The Girl Talk samples quiz that you can finally play outside of your own head
Girl Talk is a mash-up artist, sampling an eclectic collection of music to create original and vibrant songs. Online quiz tests your musical knowledge to see if you can name that artist or song he is sampling. Find the quiz <a href="https://smtilson.github.io/pp2-quiz-project/">here</a>.

## Table of Contents <a name="toc"></a>
- [Title](#title)
- [Introduction](#intro)
<!--- [Design Planes](#planes)-->
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
<!--needs screenshots-->
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

### Testing the Game itself

### Testing responsiveness

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
