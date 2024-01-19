import sqlite3

conn = sqlite3.connect('steamFriends.sqlite')
cur = conn.cursor()

while True:

    game = input('Which game do you want to research? ')

    if len(game) < 1: break

    cur.execute('SELECT * FROM Games WHERE Name = ?', (game, ))
    if cur.fetchone() is None:
        print('Game was not found')
        print('')
        continue

    num = input('How many players? ')

    cur.execute('''SELECT Friends.[Display Name], [Time Played (minutes)]/60 AS [Playtime in Hours]
                FROM Games JOIN Players JOIN Friends
                ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID
                WHERE Games.name = ? AND [Display Name] IS NOT NULL
                ORDER BY [Playtime in Hours] DESC LIMIT ?''', (game, num))

    print('')
    Count = 0
    for row in cur :
        Count += 1
        print (Count)
        print(row)
    print('')

cur.close()
