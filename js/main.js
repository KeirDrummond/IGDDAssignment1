var keys;
var player;

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

    phaser = new Phaser.Game(config);
}

function preload() {
    this.load.image('player', 'assets/tiny_ship.png');
    this.load.image('laser', 'assets/laser.png');
}

function create() {
    
    player = this.physics.add.sprite(200, 250, 'player');
    player.setCollideWorldBounds(true);
    
    var thing = this.physics.add.sprite(200, 300, 'laser');

    this.physics.add.overlap(player, thing, meme, null, this);
    
    keys = this.input.keyboard.createCursorKeys();
}

function update() {
    if (keys.up.isDown) { player.y = player.y - 1; }
    if (keys.down.isDown) { player.y = player.y + 1; }
    if (keys.left.isDown) { player.x = player.x - 1; }
    if (keys.right.isDown) { player.x = player.x + 1; }
}

function meme() {
    console.log("Meme");
}