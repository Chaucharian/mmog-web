import WorldGame from './worldGame';
import Socket from './socket';

class Main {

  constructor() {
    //connect to the server socket and run the game
    this.game = new WorldGame(document.getElementById('surface'));
    this.socket = new Socket(this.game);
  }
}

//once the window load run the game
window.onLoad = new Main();
