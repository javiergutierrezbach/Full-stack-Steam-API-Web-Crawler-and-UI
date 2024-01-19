# Steam-API-Crawler

------  Back-End Context and Instructions  ------

Personal full-stack project that accesses the Steam public API to make a database on information about your Steam friends and the games played by said social network. 

I have always been interested in video games, and I love looking at data that has to do with the world around me or the hobbies I enjoy for leisure. I wanted to create some python scripts that could tell you how many games a network of steam friends owns, and which games are owned by the most people, or who owns the most games, and information of the sort.

In order to run this project you might need to get a Key to access the Steam API which is easy to access after filling out a single form. You can insert your API key in the hiddenkey.py file where the key is initialized in the constructor. Additionally, you will need to input your own Steam ID so that the crawler has a place to start when making queries to the API. For privacy reasons, I did not include my Key or Steam ID, but if you do not want to get a Key or do not have a Steam account, a sample SQLite database will be provided so that you can run the other scripts on them. A sample json data file product will also be provided.

If you have a Key, the first file to run is steamcrawler.py which will get all the information by making queries to the public API, and accessing even more of these pages with the information it gets. The program will prompt you for how many users you want to extract friends from, from which it does queries to all of them. From this, it makes a relational database in a sqlite file to open the database in SQLite3. Then, to get general information, you can run steamdump.py. It will give you a leaderboard of games with most players, players with most games, games with longest additive play times, and longest player/game relationships, meaning the amount of time any player has played any game. Again, you can tell it how long you want your leaderboard for all of these. There is another script, steamjson.py, which writes the information of which games have the most players by giving them each a scaled weight. It writes this information in a json format and makes the information easy to access if the data were to be visualized from an html or matplotlib/pandas python scripts for instance. There are two more scripts, one ‘playerAsk.py’ for which will ask for a steam username, and then you can ask it the most played games for said player and how many hours they devoted to those games; the other script is very similar, ‘gamePlayers.py’, which will prompt you for a game and then it will tell you the players that have played the game the most with the amount of hours.

------  Front-End Context and Instructions  ------

I built a front-end GUI for the user to access this data from the database more easily, rather than running the scripts. With that in mind, I created an application for the browser which tries to emulate the styling of the actual Steam webpage. The page is built in HTML, CSS and javascript. The HTML can be run on its own to open it on the browser, but the queries won't work. There is also javascript that needs to run in the backend with the Node.js framework. It needs to make a server on the local host with express. Once you run this using 'node server.js', you can access all of the queries in the web page.

Software and modules for js that you need to install before running this are Node.js, cors, sqlite3.

The page has a simple description, then a bar with the 6 different queries you can make to the database which you can scroll through by using the two arrow buttons. These are the same queries that you can make by running the python scripts. Below that, the appropriate inputs that the SQL query requires will be prompted in a box below, which is usually just the quantity of records you want to see or the specific player or game you want to know about. After clicking the 'submit' button, the js script will connect using the fetch API to the Node.js server, which takes these parameters from the user and injects them in the query to retrieve the correct data, and then sends it back. The javascript then creates the table using the DOM by making the html elements and using the data retrieved.

The page is overall very easy to use and provides and pleasant and simple user experience.


Hopefully, with this user directed application you can see how your steam social network tends to use their platform. Maybe you will learn unexpected trends about the kind of games your friends play or notice which friend is still obsessed with Terraria.
