import Player from './entities/Player';
import Enemy from './entities/Enemy';
import TerrainGenerator from './entities/TerrainGenerator';

let lastPress = null;
let pressingKeys =[];
let mouse  = { click : false, position : {x : 0,y : 0}};
//matter namespaces
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Body = Matter.Body,
    Bounds = Matter.Bounds,
    Events = Matter.Events,
    Bodies = Matter.Bodies,
    Vertices = Matter.Vertices,
    Vector = Matter.Vector;
const SCALE = 100;
const keys = {
  KEY_ENTER : 13,
  KEY_LEFT : 37,
  KEY_UP  : 38,
  KEY_RIGHT : 39,
  KEY_DOWN : 40,
  KEY_SPACE : 32,
  A : 65,
  S : 83,
  D : 68,
  W : 87
};

export default class WorldGame {

  constructor(surface) {
    //basic usefull vars to handle the game logic
    this.canvas = surface;
    this.canvas.width = window.innerWidth-4;
    this.canvas.height = window.innerHeight-4;
    this.WIDHT = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    this.player = null;
    this.cam = null;
    this.socket = null;

    //matter stuffs
    this.world = null;
    this.engine = null;

    //listeners
    this.loadListeners();
  }

  loadListeners() {
    document.addEventListener('keydown',(evt) => {
      //console.log(evt.keyCode);
      lastPress = evt.keyCode;
      pressingKeys[evt.keyCode] = true;
    }, false);

    document.addEventListener('keyup',(evt) => {
      pressingKeys[evt.keyCode] = false;
    }, false);

    /* ---Mobile Disabled---
    document.addEventListener('touchdown',(evt) => {
      mouse.click = true;
      mouse.position = { x : evt.clientX, y : evt.clientY };
    }, false);

    document.addEventListener('touchup',(evt) => {
      mouse.click = false;
    }, false);*/

    document.addEventListener('mousedown',(evt) => {
      mouse.click = true;
    }, false);

    document.addEventListener('mouseup',(evt) => {
      mouse.click = false;
    }, false);

    document.addEventListener('mousemove',(evt) => {
      mouse.position = { x : evt.clientX, y : evt.clientY };
    }, false);
  }

  init(socket) {
    //@socket handles all needed to comunicate with the server
    // create engine
    this.engine = Engine.create();
    this.world =  this.engine.world;
    this.socket = socket;
    //let self = this;
    // create renderer
    this.render = Render.create({
        canvas: this.canvas,
        engine: this.engine,
        options: {
            width: this.WIDHT,
            height: this.HEIGHT,
            //showVelocity: true, this flag shows a blue line highlighting velocity
            wireframes: false
        }
    });
    //this runner handles the main loop of the game
    Render.run(this.render);
    let runner = Runner.create();
    Runner.run(runner, this.engine);

    //Setting up the basic configuration that comes from the server
    this.player = new Player(this.socket.player.body);

    World.add(this.world, this.player.getBody());

    Events.on(this.engine, 'beforeUpdate', event => {
      //every tick update everything
      this.gameLoop();
    });

  }
  //This method is called by socket and updated every tick
  updateBodies(body) {
    this.addBody(body);
  }

  gameLoop() {

    //Player actions
    if(pressingKeys[keys.KEY_UP] || pressingKeys[keys.W]){
      this.socket.emitAction('player-jump');
    } else if(pressingKeys[keys.KEY_RIGHT] || pressingKeys[keys.D]){
      this.socket.emitAction('player-moveLeft');
    } else if(pressingKeys[keys.KEY_LEFT] || pressingKeys[keys.A]){
      this.socket.emitAction('player-moveRight');
    }

    if(mouse.click) {
      this.player.attemptShoot(mouse.position);
    }

  }

  getLastBody() {
    return this.world.bodies[this.world.bodies.length-1];
  }

  addBody(body) {
    //Validates if the current body from the server appears inside the world's array bodies
    //and if the body doesn't appear put it inside the world and if this body appears update it
    let isEquals = false;

    if(Array.isArray(this.world.bodies)) {
      for(let localBody of this.world.bodies) {
        if(body.id === localBody.id) {
          isEquals = true;
        }
      }
      if(!isEquals) {
        console.log('NEW');
        World.add(this.world, body);
      } else{
        console.log('UPDATE ONE ',body);
        body.force.x += 1;
      }
    }

  }

}
