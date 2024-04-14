// This file stores the answers as copied from the reference
// they require processing to be in a wokrable format.
// I can't get the localhost to load while here at ukm, so I will
// copy the relevant files here in advance.

console.log("Database loading");

const rawSolutions = {
    'oh-no': `0:00 ‒ 2:09 — Black Sabbath – "War Pigs"
    0:13 ‒ 0:16 — 2Pac featuring K-Ci & JoJo – "How Do U Want It"
    0:15 ‒ 0:16 — Jay-Z – "99 Problems"
    0:20 ‒ 2:02 — Ludacris featuring Mystikal and I-20 – "Move Bitch"
    0:20 ‒ 0:53 — JC featuring Yung Joc – "Vote 4 Me"
    1:01 ‒ 2:00 — Jay-Z featuring Alicia Keys – "Empire State of Mind"
    2:02 ‒ 2:42 — N.W.A – "Express Yourself" (Extended Mix)
    2:03 ‒ 2:45 — David Banner featuring Chris Brown and Yung Joc – "Get Like Me"
    2:04 ‒ 2:39 — Eminem featuring Dr. Dre and 50 Cent – "Crack a Bottle"
    2:05 ‒ 2:40 — Cali Swag District – "Teach Me How to Dougie"
    2:12 ‒ 2:13 — The Pack – "This Shit Slappin"
    2:13 ‒ 2:34 — Jane's Addiction – "Jane Says"
    2:40 ‒ 2:42 — M.I.A. – "Paper Planes"
    2:43 ‒ 2:45 — Jimmy Smith – "I'm Gonna Love You Just a Little More Babe"
    2:45 ‒ 4:11 — The Brothers Johnson – "Strawberry Letter 23"
    2:46 ‒ 4:13 — Dorrough – "Ice Cream Paint Job"
    3:49 ‒ 4:10 — 2Pac featuring Dramacydal – "Me Against the World"
    4:00 ‒ 5:39 — J-Kwon – "Tipsy '09"
    4:11 ‒ 5:38 — Ramones – "Blitzkrieg Bop"
    4:15 ‒ 4:18 — Doug E. Fresh and Slick Rick – "La Di Da Di"
    4:19 ‒ 4:45 — The Doors – "Waiting for the Sun"
    4:21 ‒ 4:50 — Aaliyah – "Try Again"
    4:45 ‒ 4:50 — Trina featuring Killer Mike – "Look Back at Me"
    4:53 ‒ 4:53 — N.W.A – "Appetite for Destruction"
    4:56 ‒ 5:39 — Missy Elliott – "Get Ur Freak On"`,
    'let-it-out': `0:00 ‒ 0:01 — Ramones – "Blitzkrieg Bop"
0:00 ‒ 0:05 — Missy Elliott – "Get Ur Freak On"
0:00 ‒ 0:09 — Busta Rhymes featuring Spliff Star – "Make It Clap"
0:01 ‒ 0:10 — Bun B featuring Juvenile and Webbie – "Pop It 4 Pimp"
0:09 ‒ 1:23 — General Public – "Tenderness"
0:16 ‒ 1:33 — Jay-Z featuring Amil and Ja Rule – "Can I Get A..."
1:24 ‒ 1:25 — Citizen King – "Better Days (And the Bottom Drops Out)"
1:25 ‒ 2:23 — Juicy J featuring Project Pat – "Twerk"
1:25 ‒ 1:34 — Allen Toussaint – "Get Out of My Life, Woman"
1:30 ‒ 2:45 — Electric Light Orchestra – "Mr. Blue Sky"
2:21 ‒ 2:22 — Big Tymers – "Still Fly"
2:23 ‒ 2:23 — Barry White – "I'm Gonna Love You Just a Little More Baby"
2:24 ‒ 2:53 — Clipse featuring Pharrell – "I'm Good"
2:45 ‒ 3:17 — Craig Mack featuring The Notorious B.I.G., Rampage, LL Cool J, and Busta Rhymes – "Flava in Ya Ear" (Remix)
2:47 ‒ 2:50 — Christina Aguilera featuring Nicki Minaj – "Woohoo"
2:48 ‒ 2:49 — Billy Preston – "Nothing from Nothing"
2:50 ‒ 2:51 — Rancid – "Ruby Soho"
2:53 ‒ 2:55 — Jay-Z – "D.O.A. (Death of Auto-Tune)"
2:56 ‒ 3:14 — GZA – "Liquid Swords"
3:16 ‒ 4:42 — Beck – "Loser"
3:19 ‒ 3:49 — Jim Jones and Ron Browz featuring Juelz Santana – "Pop Champagne"
3:25 ‒ 4:10 — Snoop Dogg featuring Pharrell – "Drop It Like It's Hot"
3:49 ‒ 3:58 — Rihanna featuring Jeezy – "Hard"
3:59 ‒ 5:14 — Wale featuring Gucci Mane – "Pretty Girls"
4:42 ‒ 5:14 — Jean Knight – "Mr. Big Stuff"
4:42 ‒ 5:19 — Deftones – "Around the Fur"
5:14 ‒ 6:29 — Sir Mix-a-Lot – "Posse on Broadway"
5:16 ‒ 5:25 — Black Rob – "Whoa!"
5:25 ‒ 6:28 — Fugazi – "Waiting Room"
5:34 ‒ 5:35 — Dr. Octagon – "Blue Flowers"
5:36 ‒ 6:29 — Rihanna – "Rude Boy"`,
    'thats-right': `0:00 ‒ 0:19 — Sir Mix-a-Lot – "Posse on Broadway"
0:00 ‒ 0:16 — Boogie Down Productions – "South Bronx"
0:00 ‒ 0:18 — Whodini – "I'm a Ho"
0:00 ‒ 0:18 — Rihanna – "Rude Boy"
0:02 ‒ 0:41 — Fabolous featuring Nate Dogg – "Can't Deny It"
0:18 ‒ 0:21 — Jay-Z featuring Swizz Beatz – "On to the Next One"
0:20 ‒ 0:29 — DMX – "What's My Name?"
0:20 ‒ 1:38 — Peter Gabriel – "In Your Eyes"
0:21 ‒ 1:51 — Slim featuring Red Café – "Break U Down" (Remix)
0:22 ‒ 1:05 — Foxy Brown – "Hot Spot"
0:42 ‒ 1:03 — Nine Inch Nails – "Closer"
1:04 ‒ 1:51 — OMG Girlz featuring New Boyz – "Haterz"
1:09 ‒ 1:17 — Swizz Beatz featuring Bounty Killer – "Guilty"
1:10 ‒ 2:36 — Amaze – "I Wanna Rock Party Break"
1:19 ‒ 1:41 — Kid Cudi featuring Kanye West and Common – "Make Her Say"
1:21 ‒ 1:21 — 50 Cent – "Window Shopper"
1:22 ‒ 1:22 — E-40 featuring Shawty Lo – "Break Ya Ankles"
1:23 ‒ 1:24 — Cassidy – "B-Boy Stance"
1:24 ‒ 1:25 — Nas – "Got Ur Self A..."
1:26 ‒ 1:26 — Nicki Minaj – "Your Love"
1:41 ‒ 2:34 — Spacehog – "In the Meantime"
1:51 ‒ 2:13 — Terror Squad – "Lean Back"
2:18 ‒ 2:41 — Ester Dean featuring Chris Brown – "Drop It Low"
2:42 ‒ 2:44 — Uncle Louie – "I Like Funky Music"
2:44 ‒ 2:44 — Beastie Boys – "Paul Revere"
2:44 ‒ 3:34 — MC Shan – "The Bridge"
2:44 ‒ 4:03 — Beyoncé – "Single Ladies (Put a Ring on It)"
2:52 ‒ 5:21 — M.O.P. – "Ante Up (Robbing-Hoodz Theory)"
3:53 ‒ 5:22 — Miley Cyrus – "Party in the U.S.A."
3:53 ‒ 5:22 — Whodini – "Friends"
5:21 ‒ 5:22 — Dr. Dre featuring Snoop Dogg – "The Next Episode"`,
    'jump-on-stage': `0:00 ‒ 0:08 — Miley Cyrus – "Party in the U.S.A."
0:00 ‒ 1:08 — Portishead – "Sour Times"
0:08 ‒ 0:09 — Naughty by Nature – "Everything's Gonna Be Alright"
0:09 ‒ 1:23 — Big Boi featuring Cutty – "Shutterbugg"
0:09 ‒ 1:18 — Amerie – "Why R U"
1:09 ‒ 2:41 — Talking Heads – "Take Me to the River"
1:13 ‒ 1:24 — Ice Cube – "We Be Clubbin'"
1:14 ‒ 1:27 — V.I.C. – "Wobble"
1:14 ‒ 1:26 — 50 Cent – "Get Up"
1:16 ‒ 1:28 — Diddy featuring Christina Aguilera – "Tell Me"
1:18 ‒ 1:33 — The Edgar Winter Group – "Frankenstein"
1:31 ‒ 1:34 — 50 Cent – "Disco Inferno"
1:33 ‒ 2:41 — Skee-Lo – "I Wish"
1:33 ‒ 2:41 — The Notorious B.I.G. – "Hypnotize"
1:41 ‒ 2:47 — T'Pau – "Heart and Soul"
2:42 ‒ 3:08 — Jadakiss featuring Swizz Beatz and OJ da Juiceman – "Who's Real"
2:46 ‒ 2:47 — Janet Jackson – "Love Will Never Do (Without You)"
2:50 ‒ 2:52 — New Edition – "If It Isn't Love"
2:52 ‒ 4:26 — Radiohead – "Creep"
3:04 ‒ 4:10 — Ol' Dirty Bastard – "Shimmy Shimmy Ya" (Extended Version)
3:09 ‒ 3:11 — Public Enemy – "Public Enemy No. 1"
3:51 ‒ 4:08 — Cypress Hill – "How I Could Just Kill a Man"
4:21 ‒ 4:30 — Busta Rhymes – "Dangerous"
4:24 ‒ 5:04 — Prince – "Delirious"
4:30 ‒ 5:14 — Master P featuring 5th Ward Weebie and Krazy – "Rock It"
5:08 ‒ 5:08 — Prince and The New Power Generation – "Gett Off"
5:09 ‒ 6:22 — Iggy Pop – "Lust for Life"
5:09 ‒ 6:17 — Beastie Boys – "Hey Ladies"
5:16 ‒ 5:17 — White Town – "Your Woman"
5:17 ‒ 5:18 — Rob Base and DJ E-Z Rock – "Joy and Pain"
5:18 ‒ 6:22 — Lady Gaga – "LoveGame"`,
    'this-is-the-remix': `0:00 ‒ 0:42 — Lady Gaga – "LoveGame"
0:00 ‒ 0:04 — Herbie Hancock – "Rockit"
0:00 ‒ 0:04 — Mr. Cheeks featuring Missy Elliott, P. Diddy, and Petey Pablo – "Lights, Camera, Action!" (Remix)
0:04 ‒ 0:54 — Bananarama – "Cruel Summer"
0:05 ‒ 0:40 — Justin Timberlake featuring Timbaland – "SexyBack"
0:09 ‒ 0:41 — Diddy and Dirty Money featuring Nicki Minaj and Rick Ross – "Hello Good Morning" (Remix)
0:41 ‒ 1:52 — Snoop Dogg featuring The-Dream – "Gangsta Luv"
0:43 ‒ 1:54 — Lil' Kim featuring Mr. Cheeks – "The Jump Off"
0:55 ‒ 0:59 — Genesis – "Tonight, Tonight, Tonight"
0:58 ‒ 2:06 — The Jackson 5 – "I Want You Back"
1:06 ‒ 1:08 — N.W.A – "Straight Outta Compton"
1:54 ‒ 1:58 — Busta Rhymes featuring Swizz Beatz – "Stop the Party (Iron Man)"
1:56 ‒ 3:39 — Billy Squier – "The Big Beat"
1:56 ‒ 2:15 — Gang Starr featuring Nice & Smooth – "DWYCK"
1:58 ‒ 2:07 — DMX – "Party Up (Up in Here)"
2:05 ‒ 2:07 — Beastie Boys – "Intergalactic"
2:08 ‒ 3:45 — Toadies – "Possum Kingdom"
2:15 ‒ 2:17 — Luke featuring 2 Live Crew – "Banned in the U.S.A."
2:16 ‒ 2:35 — B.o.B featuring Bruno Mars – "Nothin' on You"
2:35 ‒ 2:53 — Method Man & Redman – "Tear It Off"
2:56 ‒ 3:25 — DJ Jubilee – "Get Ready, Ready!"
3:29 ‒ 4:43 — Lil Jon & the East Side Boyz featuring Ying Yang Twins – "Get Low"
3:42 ‒ 4:43 — Simon & Garfunkel – "Cecilia"
3:57 ‒ 4:23 — U2 – "Sunday Bloody Sunday"
4:23 ‒ 4:25 — Third Eye Blind – "Semi-Charmed Life"
4:25 ‒ 4:47 — Kid 'n Play – "Rollin' with Kid 'n Play"
4:43 ‒ 5:51 — Fabolous – "Young'n (Holla Back)"
4:47 ‒ 4:47 — Heavy D & the Boyz – "We Got Our Own Thang"
4:48 ‒ 4:52 — Grateful Dead – "Casey Jones"
4:51 ‒ 4:51 — Ice Cube – "The N*gga Ya Love to Hate"
4:52 ‒ 5:52 — INXS – "Need You Tonight"
5:36 ‒ 5:53 — Main Source – "Looking at the Front Door"
5:36 ‒ 6:02 — The Clash – "Should I Stay or Should I Go"
5:37 ‒ 5:53 — LL Cool J – "Jingling Baby (Remixed but Still Jingling)"
5:38 ‒ 5:56 — Marva Whitney – "Unwind Yourself"
5:53 ‒ 6:02 — Lisa Lisa and Cult Jam – "Let the Beat Hit 'Em"
5:55 ‒ 5:57 — The Notorious B.I.G. featuring Diddy, Nelly, Jagged Edge, and Avery Storm – "Nasty Girl"`,
    'on-and-on': `0:00 ‒ 1:27 — Lisa Lisa and Cult Jam – "Let the Beat Hit 'Em"
0:00 ‒ 1:14 — Cream – "Sunshine of Your Love"
0:03 ‒ 0:04 — The Notorious B.I.G. featuring Diddy, Nelly, Jagged Edge, and Avery Storm – "Nasty Girl"
0:07 ‒ 1:06 — The Notorious B.I.G. – "Nasty Boy"
1:09 ‒ 2:36 — Trina featuring Kase and Duece Poppi – "Pull Over" (Remix)
1:14 ‒ 1:30 — Kesha – "Tik Tok"
1:27 ‒ 1:29 — Grand Funk Railroad – "We're an American Band"
1:29 ‒ 2:37 — New Order – "Bizarre Love Triangle"[A]
1:31 ‒ 1:54 — Birdman featuring Lil Wayne and Kevin Rudolf – "I Want It All"
2:11 ‒ 2:29 — Chubb Rock – "Treat 'Em Right"
2:36 ‒ 2:37 — Britney Spears – "Circus"
2:37 ‒ 4:02 — White Zombie – "Thunder Kiss '65"
2:38 ‒ 3:57 — Ying Yang Twins featuring Da Muzicianz – "Wild Out"
3:35 ‒ 3:57 — Ludacris featuring Lil Scrappy – "Everybody Drunk"
3:47 ‒ 3:49 — De La Soul – "Me Myself and I"
3:49 ‒ 5:06 — Daft Punk – "Television Rules the Nation"
3:57 ‒ 5:07 — U2 – "With or Without You"
4:04 ‒ 4:51 — Twista featuring Erika Shevon – "Wetter"
4:37 ‒ 4:53 — Robert Palmer – "Addicted to Love"
4:52 ‒ 4:54 — DJ OGB featuring Francisco and Gemeni – "Hands Up"
4:59 ‒ 5:09 — Aphex Twin – "Windowlicker"
5:01 ‒ 5:09 — Lady Gaga – "Bad Romance"`,
    'get-it-get-it': `0:00 ‒ 1:31 — Aphex Twin – "Windowlicker"
0:00 ‒ 0:09 — Lady Gaga – "Bad Romance"
0:08 ‒ 1:16 — Soulja Boy – "Pretty Boy Swag"
0:47 ‒ 0:47 — George Clinton – "Atomic Dog"
1:16 ‒ 1:45 — Big Kap and Fatman Scoop – "Party Anthem"
1:17 ‒ 1:30 — Kraftwerk – "It's More Fun to Compute"
1:29 ‒ 1:54 — Black Eyed Peas – "Boom Boom Pow"
1:32 ‒ 1:54 — Daft Punk – "One More Time"
1:32 ‒ 2:38 — Rye Rye featuring M.I.A. – "Bang"
1:47 ‒ 2:24 — Rage Against the Machine – "Killing in the Name"
2:24 ‒ 2:37 — Gucci Mane featuring Usher – "Spotlight"
2:24 ‒ 2:32 — Steve Miller Band – "Jungle Love"
2:28 ‒ 2:32 — Jibbs featuring Lloyd – "The Dedication (Ay DJ)"
2:32 ‒ 3:47 — Depeche Mode – "Just Can't Get Enough"
2:38 ‒ 3:47 — Pitbull – "Hotel Room Service"
2:39 ‒ 3:07 — Lyn Collins – "Think (About It)"
3:09 ‒ 3:09 — Steve Winwood – "Roll with It"
3:40 ‒ 3:54 — Kid Cudi and Crookers – "Day 'n' Nite" (Remix)
3:41 ‒ 4:10 — Starpoint – "Object of My Desire"
3:51 ‒ 3:54 — The Who – "Won't Get Fooled Again"
3:53 ‒ 3:55 — Katy Perry featuring Snoop Dogg – "California Gurls"
3:55 ‒ 4:09 — Frankie Smith – "Double Dutch Bus"
3:55 ‒ 5:10 — Outkast featuring Sleepy Brown – "The Way You Move"
4:00 ‒ 5:28 — Daft Punk – "Digital Love"
4:10 ‒ 4:41 — Missy Elliott featuring Ludacris – "Gossip Folks"
4:40 ‒ 5:30 — Young Jeezy – "Bottom of the Map"
4:41 ‒ 4:53 — Free School featuring Kelis and apl.de.ap – "Grey Goose (Whatcha' Sippin' On)"
4:42 ‒ 5:25 — DJ Laz featuring Flo Rida, Casely, and Pitbull – "Move Shake Drop" (Remix)
5:25 ‒ 5:30 — Afro-Rican – "Give It All You Got (Doggy Style)"
5:25 ‒ 5:33 — MGMT – "Kids"
5:31 ‒ 5:33 — The Grass Roots – "Let's Live for Today"
5:32 ‒ 5:33 — Luke featuring 2 Live Crew – "Banned in the U.S.A."`,
    'down-for-the-count': `0:00 ‒ 1:54 — Afro-Rican – "Give It All You Got (Doggy Style)"
0:00 ‒ 0:22 — Belinda Carlisle – "Heaven Is a Place on Earth"
0:00 ‒ 0:18 — Run-DMC – "It's Tricky"
0:00 ‒ 0:18 — Young Jeezy – "Bottom of the Map"
0:03 ‒ 0:11 — Black Box – "Everybody Everybody"
0:07 ‒ 0:15 — Krave featuring Lil Jon, Pitbull, and Flo Rida – "Go Crazy" (Remix)
0:18 ‒ 1:49 — Derek and the Dominos – "Layla"
0:31 ‒ 1:49 — B.o.B featuring Wes Fif – "Haterz Everywhere"
1:49 ‒ 1:50 — Mandrill – "Honey-Butt"
1:50 ‒ 1:51 — Alanis Morissette – "You Oughta Know"
1:53 ‒ 1:54 — Mandrill – "Positive Thing"
1:53 ‒ 1:54 — Warrant – "Cherry Pie"
1:54 ‒ 1:56 — Michael Jackson – "Black or White"
1:56 ‒ 2:40 — DJ Class – "I'm the Ish"
1:56 ‒ 2:04 — Flo Rida featuring Kesha – "Right Round"
2:04 ‒ 2:34 — Crystal Waters – "Gypsy Woman (She's Homeless)"
2:19 ‒ 3:41 — Dominique Young Unique – "Show My Ass"
2:34 ‒ 3:42 — Madness – "Our House"[B]
2:41 ‒ 3:40 — Love and Rockets – "So Alive"
3:27 ‒ 3:33 — Janet Jackson – "Someone to Call My Lover"
3:27 ‒ 3:33 — LL Cool J featuring Jennifer Lopez – "Control Myself"
3:42 ‒ 3:49 — Federico Franchi – "Cream"
3:42 ‒ 5:54 — Mstrkrft featuring N.O.R.E. and Isis – "Bounce"
3:45 ‒ 4:44 — T. Rex – "20th Century Boy"
3:56 ‒ 4:32 — Pitbull featuring Lil Jon – "Krazy"
4:33 ‒ 6:01 — The Rapture – "House of Jealous Lovers"
4:46 ‒ 4:47 — Chelley – "Took the Night"
4:47 ‒ 5:44 — Young MC – "Bust a Move"
4:47 ‒ 5:32 — Kylie Minogue – "Can't Get You Out of My Head"
5:21 ‒ 5:41 — Shorty Long – "Function at the Junction"
5:34 ‒ 5:46 — Trick Daddy featuring The Slip-n-Slide Express – "Take It to da House"
5:44 ‒ 5:47 — Dennis Coffey and the Detroit Guitar Band – "Scorpio"
5:46 ‒ 5:55 — Usher featuring will.i.am – "OMG"
5:55 ‒ 6:35 — The Temptations – "Get Ready"
5:56 ‒ 6:37 — Trick Daddy featuring Duece Poppi, Trina, and Co – "Shut Up"
6:02 ‒ 6:35 — Billy Idol – "Mony Mony"
6:14 ‒ 6:16 — Duke Williams and the Extremes – "Chinese Chicken"
6:16 ‒ 6:35 — 2 Live Crew – "Get It Girl"
6:30 ‒ 6:37 — Ghost Town DJ's – "My Boo"
6:37 ‒ 6:37 — Johnny Kemp – "Just Got Paid"`,
    'make-me-wanna': `0:00 ‒ 1:17 — Ghost Town DJ's – "My Boo"
0:00 ‒ 1:11 — Cyndi Lauper – "Time After Time"
0:00 ‒ 1:24 — T.I. featuring Keri Hilson – "Got Your Back"
0:04 ‒ 1:09 — Young Dro featuring T.I. and Gucci Mane – "Freeze Me" (Remix)
0:06 ‒ 1:21 — Johnny Kemp – "Just Got Paid"
0:42 ‒ 1:25 — Pet Shop Boys – "Opportunities (Let's Make Lots of Money)"
1:02 ‒ 2:20 — Basement Jaxx – "Where's Your Head At"
1:18 ‒ 2:23 — Rick Ross featuring Styles P – "B.M.F. (Blowin' Money Fast)"
1:28 ‒ 1:39 — Beastie Boys – "Root Down"
2:21 ‒ 4:39 — Ginuwine – "Pony"
2:21 ‒ 3:38 — B.o.B featuring T.I. and Playboy Tre – "Bet I"
2:25 ‒ 3:44 — Waka Flocka Flame – "Hard in da Paint"
2:27 ‒ 3:37 — Mr. Oizo – "Flat Beat"
3:39 ‒ 4:38 — Arcade Fire – "Wake Up"
3:46 ‒ 4:41 — Birdman featuring Drake and Lil Wayne – "Money to Blow"
4:14 ‒ 4:34 — Party Boyz featuring Dorrough and Chalie Boy – "Flex" (Remix)
4:40 ‒ 4:41 — Baby Bash featuring Lloyd – "Good for My Money"
4:41 ‒ 4:48 — Van Halen – "Eruption"
4:42 ‒ 5:56 — Radiohead – "Idioteque"
4:44 ‒ 5:54 — The Isley Brothers – "Shout"
4:48 ‒ 6:22 — DJ Funk – "Pop Those Thangs"
4:48 ‒ 5:02 — Yeah Yeah Yeahs – "Heads Will Roll"
5:01 ‒ 5:02 — The Ting Tings – "That's Not My Name"
5:25 ‒ 6:23 — J. Cole – "Blow Up"
5:27 ‒ 5:29 — Jordan Knight – "Give It to You"
5:29 ‒ 6:22 — Travis Porter – "Go Shorty Go"`,
    'steady-shock': `0:00 ‒ 0:13 — J. Cole – "Blow Up"
0:00 ‒ 0:13 — Travis Porter – "Go Shorty Go"
0:06 ‒ 0:56 — Blue Öyster Cult – "(Don't Fear) The Reaper"
0:13 ‒ 0:54 — Usher featuring Nicki Minaj – "Lil Freak"
0:36 ‒ 0:37 — T-Pain featuring Young Jeezy – "Reverse Cowgirl"
0:54 ‒ 1:01 — Young T featuring Treal Lee – "Work Dat Lumba"
0:55 ‒ 1:44 — Soulja Boy – "Bird Walk"
0:56 ‒ 1:02 — The Cars – "Moving in Stereo"
0:59 ‒ 1:00 — J-Kwon – "Yeah"
1:02 ‒ 1:59 — Bruce Springsteen – "Dancing in the Dark"
1:06 ‒ 1:31 — N.E.R.D. – "Everyone Nose (All the Girls Standing in the Line for the Bathroom)"
1:19 – 3:31 — Omega Red featuring Detail – "Endz"
1:43 ‒ 2:10 — Party Boyz featuring Dorrough and Chalie Boy – "Flex" (Remix)
2:10 ‒ 3:25 — Supergrass – "Alright"
2:14 ‒ 3:20 — Bone Thugs-n-Harmony – "1st of tha Month"
2:54 ‒ 3:18 — George Harrison – "Got My Mind Set on You"
3:20 ‒ 4:40 — Drake – "Over"
3:25 ‒ 3:26 — Harvey Danger – "Flagpole Sitta"
3:26 ‒ 3:26 — Collective Soul – "Shine"
3:27 ‒ 4:30 — A Flock of Seagulls – "I Ran (So Far Away)"
4:30 ‒ 5:34 — Outkast – "B.O.B"
4:30 ‒ 5:47 — Nirvana – "Aneurysm"
4:32 ‒ 5:46 — Three 6 Mafia – "Who Run It"
5:34 ‒ 5:47 — Phoenix – "1901"
5:47 ‒ 5:47 — Ludacris featuring Nicki Minaj – "My Chick Bad"`,
    'triple-double': `0:00 ‒ 1:28 — Phoenix – "1901"
0:00 ‒ 0:12 — Beyoncé – "Diva"
0:07 ‒ 0:53 — Ludacris – "How Low"
0:10 ‒ 0:13 — Diamond – "Lotta Money"
0:53 ‒ 1:19 — Devo – "Whip It"
0:53 ‒ 1:39 — Supastaar featuring Gorilla Zoe and Yung Joc – "Head n' Shoulders"
0:56 ‒ 1:20 — Public Enemy – "Bring the Noise"
1:29 ‒ 1:31 — Keri Hilson featuring Lil Wayne – "Turnin Me On"
1:31 ‒ 1:32 — Blondie – "Dreaming"
1:31 ‒ 2:55 — Lil Wayne – "A Milli"
1:32 ‒ 2:43 — Joe Jackson – "Steppin' Out"
2:42 ‒ 2:43 — Nirvana – "In Bloom"
2:54 ‒ 3:44 — Crooked I – "Everythang"
2:55 ‒ 3:36 — Neil Diamond – "Cherry, Cherry"
3:25 ‒ 3:47 — Lil Jon featuring E-40 and Sean Paul – "Snap Yo Fingers"
3:36 ‒ 3:37 — 50 Cent – "Wanksta"
3:36 ‒ 5:01 — Devo – "Gates of Steel"
3:48 ‒ 4:57 — Pat Benatar – "Heartbreaker"
3:48 ‒ 5:00 — The Go-Go's – "We Got the Beat"
3:48 ‒ 4:46 — Ice Cube – "It Was a Good Day"
4:46 ‒ 5:03 — J-Kwon – "Tipsy '09"
5:01 ‒ 6:25 — Willow – "Whip My Hair"
5:01 ‒ 5:05 — Drake, Kanye West, Lil Wayne, and Eminem – "Forever"
5:05 ‒ 5:53 — The Bangz featuring New Boyz – "Found My Swag"
5:07 ‒ 6:23 — The Rolling Stones – "Paint It Black"
5:08 ‒ 6:27 — Wiz Khalifa – "Black and Yellow"
5:17 ‒ 5:17 — The Young Rascals – "Good Lovin'"
6:23 ‒ 6:26 — Van Halen – "Jump"
6:26 ‒ 6:27 — Fine Young Cannibals – "Good Thing"`,
    'every-day': `0:00 ‒ 0:00 — Gucci Mane – "Making Love to the Money"
0:00 ‒ 1:18 — Fine Young Cannibals – "Good Thing" (Prince Paul Remix)
0:02 ‒ 1:11 — Gucci Mane featuring Swizz Beatz – "Gucci Time"
0:46 ‒ 0:46 — Darude – "Sandstorm"
0:46 ‒ 0:46 — Miami Sound Machine – "Words Get in the Way"
1:11 ‒ 2:43 — Jay-Z – "Dirt off Your Shoulder"
1:11 ‒ 1:13 — T-No featuring MC Slick Rick – "Got Me Fucked Up"
1:16 ‒ 1:21 — Mims – "Move (If You Wanna)"
1:21 ‒ 2:45 — Modern English – "I Melt with You"
1:21 ‒ 2:44 — A-ha – "Take On Me"
1:21 ‒ 2:42 — Billy Idol – "Dancing with Myself"
2:33 ‒ 2:42 — Keri Hilson – "Pretty Girl Rock"
2:36 ‒ 4:59 — Gucci Mane – "I'm the Shit"
2:39 ‒ 5:00 — Rich Boy – "Drop"
2:45 ‒ 2:45 — Cassidy – "Face 2 Face"
2:46 ‒ 5:00 — Lil' Wil – "Bust It Open"
2:46 ‒ 2:54 — Hotstylz featuring Yung Joc – "Lookin Boy"
2:55 ‒ 2:55 — Hall & Oates – "You Make My Dreams"
2:55 ‒ 2:58 — Bobby Valentino featuring Yung Joc – "Beep"
2:58 ‒ 2:58 — Mann featuring Sneed – "Fight Come wit It"
2:58 ‒ 5:09 — John Lennon – "Imagine"
3:11 ‒ 4:07 — UGK – "One Day"
4:05 ‒ 4:05 — Chick da Flyest featuring Travis Porter – "Marvelous"
4:13 ‒ 4:33 — Barbee featuring Trina – "Come See Bout Me"
4:20 ‒ 5:00 — DMX featuring Sheek Louch – "Get at Me Dog"
4:20 ‒ 4:44 — T.I. – "Rubber Band Man"
4:23 ‒ 4:25 — Rosalind Rice featuring French Montana – "Hustler"
4:40 ‒ 4:40 — Freeway featuring Peedi Crakk – "Flipside"
4:51 ‒ 4:52 — Master P featuring 5th Ward Weebie – "Ooohhhwee"`,
}

// maybe add special scripts for this to direct people to the wiki.
const rawUnknownSamples = {
    unkown: `8Ball & MJG featuring P. Diddy – "You Don't Want Drama"
    Art of Noise – "Moments in Love"
    Artz & Kraftz – "Surely"
    Beyoncé – "Sweet Dreams"
    Big Daddy Kane – "Smooth Operator"
    James Brown – "Funky Drummer"
    Bush – "Glycerine"
    Cals featuring Styles P – "See Through Walls" (Remix)
    Clipse – "Champion"
    Crime Mob featuring Lil Scrappy – "Knuck If You Buck"
    Dem Boyz featuring Baby Boi Nate – "Supa Dupa"
    Digital Underground – "The Humpty Dance"
    Dirtbag – "Here We Go"
    Disco Four – "Move to the Groove"
    The D.O.C. – "It's Funky Enough"
    Exposé – "Point of No Return"
    Four Tops – "Reach Out I'll Be There"
    Sean Garrett featuring Drake – "Feel Love"
    Ginuwine featuring Timbaland and Missy Elliott – "Get Involved"
    Honorebel featuring Pitbull – "I Wanna"
    Jodeci – "It's Alright"
    Joe Public – "Live and Learn"
    Juice – "Catch a Groove"
    The Lemon Pipers – "Green Tambourine"
    George Michael – "Freedom! '90"
    Eric Prydz – "Pjanoo"
    Ray J featuring Ludacris – "Celebration"
    Run-DMC – "It's Like That"
    The Showboys – "Drag Rap"
    Edwin Starr – "Twenty-Five Miles"
    Swizz Beatz – "It's Me Bitches"
    Torch featuring Busta Rhymes, Rick Ross, Waka Flocka Flame, Yo Gotti, and N.O.R.E. – "Bang Yo City" (Remix)
    Unk – "Futuristic Slide"
    will.i.am and Nicki Minaj – "Check It Out"
    Zapp – "Doo Wa Ditty (Blow That Thing)"`,
}

const trackList = `"Oh No" – 5:39
"Let It Out" – 6:29
"That's Right" – 5:22
"Jump on Stage" – 6:22
"This Is the Remix" – 6:02
"On and On" – 5:09
"Get It Get It" – 5:33
"Down for the Count" – 6:37
"Make Me Wanna" – 6:23
"Steady Shock" – 5:47
"Triple Double" – 6:27
"Every Day" – 5:10]`;

/**
 * Prepares solution object upon initial load of page
 */
let solutions = {};
for (let songHTML in rawSolutions) {
    //console.log(rawSolutions[songHTML]);
    let songData = transformWikiData(rawSolutions[songHTML]);
    solutions[songHTML] = formatSolutions(songData);
}

console.log(solutions['oh-no']);

let tracks = trackList.split('\n');
tracks = tracks.map((track) => trackToHTML(track));
console.log('tracks??');
console.log(tracks);

const youtubeLinks = {
    'oh-no': "https://www.youtube.com/embed/4bMM7tGV9MI",
    'let-it-out': "https://www.youtube.com/embed/FtsxfquYHf0",
    'thats-right': "https://www.youtube.com/embed/xVmXXWcfitw",
    'jump-on-stage': "https://www.youtube.com/embed/Ka3GznTXur8",
    'this-is-the-remix': "https://www.youtube.com/embed/DZu_lLGFDtM",
    'on-and-on': "https://www.youtube.com/embed/lzf8NNF1Af4",
    'get-it-get-it': "https://www.youtube.com/embed/MRCEgD1nRRM",
    'down-for-the-count': "https://www.youtube.com/embed/Nr2cfwR0roU",
    'make-me-wanna': "https://www.youtube.com/embed/9DBmMoW5lSs",
    'steady-shock': "https://www.youtube.com/embed/p1pd69r1Il8",
    'triple-double': "https://www.youtube.com/embed/i0yY0zxk-18",
    'every-day': "https://www.youtube.com/embed/Bo5bBq2j2EE",
};

console.log("db finished loading");