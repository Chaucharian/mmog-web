const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const GameEngine = require('./game/gameEngine');
const Socket = require('./game/socket');

//public folders where the user catch dependencies
app.use(express.static(path.resolve(__dirname, '../public')) );
//it returns a main page to play the game|
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

http.listen(3000, () => {
  console.log('listening on: 3000!');
});

gameInstance = new GameEngine();
socket = new Socket(io, gameInstance);
