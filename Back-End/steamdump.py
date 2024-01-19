import sqlite3

conn = sqlite3.connect('steamFriends.sqlite')
cur = conn.cursor()

print('')
usernum = input('How many users?')
gamenum = input('How many games (for users)?')
gamehournum = input('How many games (for hours)?')
playtimes = input('How many playtimes?')

cur.execute('''SELECT [Display Name], [Game Count]
     FROM Friends
     WHERE [Display Name] IS NOT NULL
     ORDER BY [Game Count] DESC LIMIT ?''', (usernum, ))

print('')
print('Top ' + str(usernum) + ' Players with the most games owned')

Count = 0
for row in cur :
    Count += 1
    print(Count)
    print(row)

print('')
print('Top ' + str(gamenum) + ' Games with the most users')

cur.execute('''SELECT Games.Name, Count([Player ID]) AS [Number of Users]
    FROM Games JOIN Players JOIN Friends
    ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID 
    GROUP BY Name
    ORDER BY [Number of Users] DESC LIMIT ?''', (gamenum, ))


Count = 0
for row in cur :
    Count += 1
    print (Count)
    print(row)

print('')
print('Top ' + str(gamehournum) + ' Games with the greatest playtimes in hours')

cur.execute('''SELECT Games.Name, Sum([Time Played (minutes)])/60 AS [Playtime in Hours]
    FROM Games JOIN Players JOIN Friends
    ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID 
    GROUP BY Name
    ORDER BY [Playtime in Hours] DESC LIMIT ?''', (gamehournum, ))


Count = 0
for row in cur :
    Count += 1
    print (Count)
    print(row)

print('')
print('Top ' + str(playtimes) + ' Player/Game relationships (greatest play times) in hours')

cur.execute('''SELECT [Display Name], Name, [Time Played (minutes)]/60
    FROM Games JOIN Players JOIN Friends
    ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID
    WHERE [Display Name] IS NOT NULL
    ORDER BY [Time Played (minutes)] DESC LIMIT ?''', (playtimes, ))


Count = 0
for row in cur :
    Count += 1
    print (Count)
    print(row)

cur.close()
