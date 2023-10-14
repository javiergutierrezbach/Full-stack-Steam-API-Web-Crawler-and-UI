import ssl
import sqlite3
import urllib.error
from urllib.parse import urljoin
from urllib.parse import urlparse
from urllib.request import urlopen
from hiddenKey import Key
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

conn = sqlite3.connect('steamFriends.sqlite')
cur = conn.cursor()

cur.execute('''CREATE TABLE IF NOT EXISTS Friends
    (ID INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT NOT NULL,
    SteamID INTEGER UNIQUE NOT NULL,
    [Display Name] TEXT,
    [Game Count] INTEGER,
    Error Text,
    Privacy Text)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Games
    (ID INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
    GameID INTEGER UNIQUE NOT NULL,
    Name TEXT)''')

cur.execute('''CREATE TABLE IF NOT EXISTS Players
    ([Player ID] INTEGER, [Game ID] INTEGER,
    [Time Played (minutes)] INTEGER,
    PRIMARY KEY ([Player ID], [Game ID]))''')

cur.execute('SELECT SteamID FROM Friends WHERE Error is NULL ORDER BY RANDOM() LIMIT 1')

row = cur.fetchone()
if row is not None:
    print("Restarting existing crawl. Remove steamFriends.sqlite to start a fresh crawl.")
    cur.execute('SELECT SteamID FROM Friends WHERE ID = 1')
    steamID = cur.fetchone()[0]
else:
    steamID = input('Enter your Steam ID or enter:')
    if (len(steamID) < 1):
        steamID = '76561198080394649'
    if (len(steamID) > 1):
        cur.execute('INSERT OR IGNORE INTO Friends (steamID) VALUES (?)', (steamID, ))
    conn.commit()
    
startfriendlisturl = 'https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key='
key = Key()
friendlistUrl = key.addKeyToUrl(startfriendlisturl) + '&relationship=friend'

startplayerurl = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='
playerurl = key.addKeyToUrl(startplayerurl) + '&steamids='

startgameurl = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='
gameurl = key.addKeyToUrl(startgameurl) + '&format=json&include_appinfo=true&include_played_free_games=true&steamid='

friendNum = 0
while True:
    if (friendNum < 1) :
        sval = input('How many friends:')
        if (len(sval) < 1): break
        friendNum = int(sval)
        total = friendNum
    friendNum -= 1
    
    print(str(total - friendNum) + ' Investigating a new user ' + str(steamID) + '...')
    
    cur.execute('SELECT SteamID FROM Friends WHERE Error is NULL ORDER BY RANDOM() LIMIT 1')
    try:
        row = cur.fetchone()
        steamID = row[0]
    except:
        print('No friends are left to retrieve')
        friendNum = 0
        break

    url = friendlistUrl + '&steamid=' + str(steamID)

    cur.execute('UPDATE Friends SET Error = "NA" WHERE SteamID = ?', (steamID, ))
    
    try:
        document = urlopen(url, context=ctx)
        data = document.read()
        js = json.loads(data)
    except KeyboardInterrupt:
        print('')
        print('Program interrupted by user...')
        break
    except:
        print('Cannot retrieve the json for this user')
        cur.execute("UPDATE Friends SET Error = 'No Json' WHERE steamID = (?)", (steamID, ))
        continue
    
    friendList = js['friendslist']['friends']
    friendnum = len(friendList)
    friends = list()
    friends.clear()
    friends.append(str(steamID))
    
    for entry in friendList:
        friendID = entry['steamid']
        friends.append(friendID)
        cur.execute('INSERT OR IGNORE INTO Friends (SteamID) VALUES (?)', (friendID, ))

    conn.commit()

    print("Investigating the games owned by the user's friends...")
    print(str(friendnum) + ' friends to search.')
    
    friendstring = ''
    for entry in friends:
        friendstring += ',' + entry
        url = gameurl + entry
        
        try:
            document = urlopen(url, context=ctx)
            data = document.read()
            js = json.loads(data)
            response = js['response']
            if 'game_count' not in response:
                cur.execute('UPDATE Friends SET Privacy = "Private Account" WHERE SteamID = ?', (entry, ))
            gamecount = response['game_count']
            cur.execute('UPDATE Friends SET [Game Count] = ? WHERE SteamID = ?', (gamecount, entry))

            gamelist = response['games']
            cur.execute('SELECT ID FROM Friends WHERE SteamID = ?', (entry, ))
            thisID = cur.fetchone()[0]
            
            for game in gamelist:
                gameid = game['appid']
                name = game['name']
                cur.execute('INSERT OR IGNORE INTO Games (GameID, Name) VALUES (?, ?)', (gameid, name))
                cur.execute('SELECT ID FROM Games WHERE GameID = ?', (gameid, ))
                try:
                    gamepkid = cur.fetchone()[0]
                    playtime = game['playtime_forever']
                    cur.execute('INSERT OR IGNORE INTO Players ([Player ID], [Game ID], [Time Played (minutes)]) VALUES (?, ?, ?)', (thisID, gamepkid, playtime))
                except:
                    pass
        except:
            pass

        conn.commit()
        
    friendstring = friendstring[1:]

    print('Giving the friends a name...')
    
    url = playerurl + friendstring
    
    try:
        document = urlopen(url, context=ctx)
        data = document.read()
        js = json.loads(data)
        flist = js['response']['players']
        for friend in flist:
            displayname = friend['personaname']
            friendId = friend['steamid']
            cur.execute('UPDATE Friends SET [Display Name] = ? WHERE SteamID = ?', (displayname, friendId))
    except:
        pass
    print('')
    conn.commit()
print('')
cur.close()
