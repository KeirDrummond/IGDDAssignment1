var keys;
var player;
var game;
var world;
var UI;

function main() {
    console.log("main()");

    var config = {
        type: Phaser.AUTO,
        parent: 'my-game',
        width: 1600,
        height: 1000,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    game = new Phaser.Game(config);
}

function preload() {
    console.log("preload");
    
    game = this;
    
    this.load.spritesheet('player', 'assets/images/tiny_ship.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('laser', 'assets/images/laser.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 32, frameHeight: 32 });
    //this.load.audio('music', 'assets/audio/music.mp3');
}

function create() {
    console.log("create");
   
    game.UI = new UserInterface();
    game.gpManager = new GameplayManager();
    game.world = new World(game); 
    
    keys = this.input.keyboard.createCursorKeys();
    
    //this.sound.play('music');
}

function update() {
    input(this.world.player);
    this.world.update();
    this.gpManager.update();
}