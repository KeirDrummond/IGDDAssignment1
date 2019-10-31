function main() {
    console.log("main()");

    var config = {
        type: Phaser.AUTO,
        parent: 'my-game',
        width: 400,
        height: 500,
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
}

function create() {
    var player = phaser.physics.add.sprite(200, 250, 'player');
}

function update() {}