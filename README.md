# Steam-API-Crawler

Made in January 2023

Personal project that accesses the Steam public API to make a database on information about your Steam friends and the games played by said social network.

This project was the capstone project I did  for the Python for Everybody Specialization from the University of Michigan in Coursera. 

I have always been interested in video games, and I love looking at data that has to do with the world around me or the hobbies I enjoy for leisure. I wanted to create some python scripts that could tell you how many games a network of steam friends owns, and which games are owned by the most people, or who owns the most games, and information of the sort.

In order to run this project you might need to get a Key to access the Steam API which is easy to access after filling out a single form. Additionally, you will need to input your own Steam ID so that the crawler has a place to start when making queries to the API. For privacy reasons, I did not include my Key or Steam ID, but if you do not want to get a Key or do not have a Steam account, a sample SQLite database will be provided so that you can run the other scripts on them. A sample json data file product will also be provided.

If you have a Key, the first file to run is steamcrawler.py which will get all the information by making queries to the public API, and accessing even more of these pages with the information it gets. The program will prompt you for how many users you want to extract friends from, from which it does queries to all of them. From this, it makes a relational database in a sqlite file to open the database in SQLite3. Then, to get general information, you can run steamdump.py. It will give you a leaderboard of games with most players, players with most games, games with longest additive play times, and longest player/game relationships, meaning the amount of time any player has played any game. Again, you can tell it how long you want your leaderboard for all of these. There is another script, steamjson.py, which writes the information of which games have the most players by giving them each a scaled weight. It writes this information in a json format and makes the information easy to access if the data were to be visualized from an html or matplotlib/pandas python scripts for instance. There are two more scripts, one ‘playerAsk.py’ for which will ask for a steam username, and then you can ask it the most played games for said player and how many hours they devoted to those games; the other script is very similar, ‘gamePlayers.py’, which will prompt you for a game and then it will tell you the players that have played the game the most with the amount of hours.

Hopefully, with these scripts you can see how your steam social network tends to use their platform. Maybe you will learn unexpected trends about the kind of games your friends play or notice which friend is still obsessed with Terraria.
