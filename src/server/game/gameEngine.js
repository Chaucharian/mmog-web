const Matter = require('matter-js');
const Player = require('./entities/player');

const Engine = Matter.Engine,
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

class gameEngine {

  constructor() {
    this.WIDHT = 800;
    this.HEIGHT = 800;
    this.engine = null;
    this.world = null;
    this.render = null;
    this.players = [];
    this.socket = null;

    this.prevPlayerPosition = 150;

  }

  init(socket) {
    this.socket = socket;
    // create engine
    this.engine = Engine.create();
    this.world =  this.engine.world;

    setInterval(() => {
      Engine.update(this.engine, 1000 / 60);
    }, 1000 / 60);

    this.makeFloor();

    Events.on(this.engine, 'beforeUpdate', event => {
      //every tick update everything
      this.gameLoop();
    });

  }

  gameLoop() {
    this.socket.emit('updateBodies', this.getBodies());

    for(let player of this.players) {
        player.update(this.delta);
    }

    this.deltaGeter();
  }

  playerJump(playerId) {
    for(let player of this.players) {
      if(playerId === player.id) {
        player.jump();
        console.log(player.getBody().position);
      }
    }
  }

  addPlayer(playerId) {
    const player = new Player(Bodies.rectangle(200, 300, 25, 25), playerId);
    //adds the player to the list of current players and then to the world
    this.players.push(player);
    World.add(this.world, player.body);
  }

  getLastPlayer() {
    return this.players[this.players.length-1];
  }

  makeFloor() {
    const floor = Bodies.rectangle(300, 400, 600, 40, { isStatic : true });
    World.add(this.world, floor);
  }

  getEngine() {
    return this.engine;
  }

  getBodies() {
    return this.world.bodies;
  }

  deltaGeter() {
    // this method calculete the delta time  of the game
    this.cycle++; //tracks game cycles - I don't know for what it is useful but ...
    //delta is used to adjust forces on game slow down;
    this.delta = (this.engine.timing.timestamp - this.lastTimeStamp) / 16.666666666666;
    this.lastTimeStamp = this.engine.timing.timestamp; //track last engine timestamp
  }

}

module.exports = gameEngine;
