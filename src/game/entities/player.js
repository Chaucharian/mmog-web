export default class Player {

     constructor(body) {
      this.World = Matter.World;
      this.worldGame = null;
      this.world = null;
      this.Bodies = Matter.Bodies;
      this.body = body;
      this.position = this.body.position;
      this.height = ( this.body.height === null ) ? 25 : this.body.height;
      this.width = ( this.body.width === null ) ? 25 : this.body.width;

      //Server helper
      this.name = 'unknow';
    }

    update(delta) {
      this.delta = delta;
      this.bulletCycle();
    }

    collision() {
      console.log("ASD");
    }

    setPosition(body) {
      this.position.x = body.position.x;
      this.position.y = body.position.y;
    }

    getPosition() {
      return this.position;
    }

    getBody() {
      return this.body;
    }

    jump() {
      //if(this.onFloor == true){
        this.socket.emit('player-jump', player);
      //}
    }

    moveLeft() {
      this.socket.emit('player-moveLeft', player);
    }

    moveRight() {
      this.socket.emit('player-moveRight', player);
    }

    shoot(position) {

    }

    bulletCycle() {

    }



}
