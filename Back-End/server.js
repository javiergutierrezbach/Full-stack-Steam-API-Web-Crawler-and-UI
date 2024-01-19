const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('steamFriends.sqlite');


app.get('/getQuery0', (req, res) => {

    let {player,num} = req.query;
  
    command = `SELECT Games.Name, [Time Played (minutes)]/60 
    AS [Playtime in Hours] FROM Games JOIN Players JOIN Friends 
    ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID 
    WHERE Friends.[Display Name] = ${player} 
    ORDER BY [Playtime in Hours] DESC LIMIT ${num}`;
    // Execute your SQLite query
    db.all(command, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      
      res.json(rows);
    }
  });
});

app.get('/getQuery1', (req, res) => {

  let numusers = req.query.numusers;

  command = `SELECT [Display Name], [Game Count]
  FROM Friends
  WHERE [Display Name] IS NOT NULL
  ORDER BY [Game Count] DESC LIMIT ${numusers}`;
  // Execute your SQLite query
  db.all(command, (err, rows) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    
    res.json(rows);
  }
});
});

app.get('/getQuery2', (req, res) => {

  let numgames = req.query.numgames;

  command = `SELECT Games.Name, Count([Player ID]) AS [Number of Users]
  FROM Games JOIN Players JOIN Friends
  ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID 
  GROUP BY Name
  ORDER BY [Number of Users] DESC LIMIT ${numgames}`;
  // Execute your SQLite query
  db.all(command, (err, rows) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    
    res.json(rows);
  }
});
});

app.get('/getQuery3', (req, res) => {

  let {game,numplayers} = req.query;

  command = `SELECT Friends.[Display Name], [Time Played (minutes)]/60 AS [Playtime in Hours]
  FROM Games JOIN Players JOIN Friends
  ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID
  WHERE Games.name = ${game} AND [Display Name] IS NOT NULL
  ORDER BY [Playtime in Hours] DESC LIMIT  ${numplayers}`;
  // Execute your SQLite query
  db.all(command, (err, rows) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    
    res.json(rows);
  }
});
});

app.get('/getQuery4', (req, res) => {

  let numgametimes = req.query.numgametimes;

  command = `SELECT Games.Name, Sum([Time Played (minutes)])/60 AS [Playtime in Hours]
  FROM Games JOIN Players JOIN Friends
  ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID 
  GROUP BY Name
  ORDER BY [Playtime in Hours] DESC LIMIT ${numgametimes}`;
  // Execute your SQLite query
  db.all(command, (err, rows) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    
    res.json(rows);
  }
});
});

app.get('/getQuery5', (req, res) => {

  let numplaytimes = req.query.numplaytimes;

  command = `SELECT [Display Name], Name, [Time Played (minutes)]/60 AS [Playtime in Hours]
  FROM Games JOIN Players JOIN Friends
  ON Players.[Player ID] = Friends.ID AND Players.[Game ID] = Games.ID
  WHERE [Display Name] IS NOT NULL
  ORDER BY [Time Played (minutes)] DESC LIMIT ${numplaytimes}`;
  // Execute your SQLite query
  db.all(command, (err, rows) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    
    res.json(rows);
  }
});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});