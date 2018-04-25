const jsonEncode = require('circular-json');

class Socket {

  constructor(io, game) {
    this.game = game;
    this.io = io;
    this.playerId = -1;

    this.init();
  }

  init() {
    //init the game and pass socket to comunicate
    this.game.init(this);

    //handle socket connections
    this.io.on('connection', socket => {
      this.playerId += 1;
      console.log('new user ',this.playerId);

      this.game.addPlayer(this.playerId);
      this.io.emit('getPlayer', jsonEncode.stringify( this.game.getLastPlayer() ) );

      socket.on('player-jump', playerId => {
        this.game.playerJump(playerId);
      });
      socket.on('player-moveLeft', playerId => {
        this.game.playerMoveLeft(playerId);
      });
      socket.on('player-moveRight', playerId => {
        this.game.playerMoveRight(playerId);
      });

      socket.on('disconnect', (e) => {
       console.log('user disconnected ',e);
      });
    });

  }

  //Emit events to the server
  emit(event, object) {
    switch (event) {
      case 'updateBodies':
          this.io.emit('updateBodies', jsonEncode.stringify(object) );
      break;
      case 'player-moveLeft':
          this.socket.emit('player-moveLeft', jsonEncode.stringify(player) );
      break;
      case 'player-moveRight':
          this.socket.emit('player-moveRight', jsonEncode.stringify(player) );
      break;
      default:

    }
  }
}

module.exports = Socket;
