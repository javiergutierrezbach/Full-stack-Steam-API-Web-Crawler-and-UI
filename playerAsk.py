import sqlite3

conn = sqlite3.connect('steamFriends.sqlite')
cur = conn.cursor()


while True:
    player = input('Which player do you want to research? ')

    if len(player) < 1: break

    cur.execute('SELECT * FROM Friends WHERE [Display Name] = ?', (player, ))
    if cur.fetchone() is None:
        print('Player was not found')
        print('')
        continue

    num = input('How many games? ')
    
    cur.execute('''SELECT Games.Name, [Time Played (minutes)]/60 AS [Playtime in Hours]
                FROM Games JOIN Players JOIN Friends
                ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID
                WHERE Friends.[Display Name] = ?
                ORDER BY [Playtime in Hours] DESC LIMIT ?''', (player, num))

    print('')
    Count = 0
    for row in cur :
        Count += 1
        print (Count)
        print(row)
    print('')

cur.close()
