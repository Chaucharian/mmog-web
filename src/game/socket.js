import jsonEncode from 'circular-json';

export default class Socket {

  constructor(game) {
    this.game = game;
    this.socket = io();
    this.player = null;
    this.sessionId = null;

    this.init();
  }

  init() {
    //Observers from socket's server
    this.socket.on('getPlayer', (player) => {
      //unserialize the session to handle like a true json
      this.player =  jsonEncode.parse(player);
      this.sessionId = this.player.id;

      this.game.init(this);
    });

    this.socket.on('updateBodies', (bodiesServer) => {
      //let's parse the bodies to unserialize and get the data inside them
      let bodies = jsonEncode.parse(bodiesServer);

      if(Array.isArray(bodies)) {
        bodies.map(body => {
          this.game.updateBodies(body);
        });
      }
    });
  }

  //Emit events to the server
  emitAction(event) {
    switch (event) {
      case 'player-jump':
          this.socket.emit('player-jump', this.sessionId);
      break;
      case 'player-moveLeft':
          this.socket.emit('player-moveLeft', this.sessionId);
      break;
      case 'player-moveRight':
          this.socket.emit('player-moveRight', this.sessionId);
      break;
      default:

    }
  }

}
