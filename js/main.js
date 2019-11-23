var keys;
var player;
var game;

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
    
    this.load.image('player', 'assets/images/tiny_ship.png');
    this.load.image('laser', 'assets/images/laser.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.audio('music', 'assets/audio/music.mp3');
}

function create() {
    console.log("create");
    
    let bg = this.add.sprite(0, 0, 'background');
    bg.setDisplaySize(2000, 1600);
    
    player = new Player(this);
    
    /*player = this.physics.add.sprite(200, 250, 'player');
    player.setScale(2, 2);
    player.angle = 0;
    player.setOrigin(0.5, 0.5);
    
    player.setCollideWorldBounds(true);*/
    
    var thing = this.physics.add.sprite(200, 300, 'laser');

    //this.physics.add.overlap(player, thing, meme, null, this);
    
    keys = this.input.keyboard.createCursorKeys();
    
    //this.sound.play('music');
}

function update() {
    input(player);
    Entity.update();
}