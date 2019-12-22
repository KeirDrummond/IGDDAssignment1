var keys;
var player;
var game;
var world;

function main() {
    console.log("main()");

    var config = {
        type: Phaser.AUTO,
        parent: 'my-game',
        width: 1000,
        height: 800,
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
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
    
    this.load.image('player', 'assets/images/tiny_ship.png');
    this.load.image('laser', 'assets/images/laser.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.audio('music', 'assets/audio/music.mp3');
}

function create() {
    console.log("create");
    
    world = new World(game);
    
    keys = this.input.keyboard.createCursorKeys();
    
    //this.sound.play('music');
}

function update() {
    input(world.player);
    world.update();
}