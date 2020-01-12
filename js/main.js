//Main function that sets up the game.

function main() {
    var config = {
        type: Phaser.AUTO,
        parent: 'my-game',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        //Plays in a 16:9 aspect ratio.
        width: 1280,
        height: 720,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [MainMenu, GameScreen]
    };

    game = new Phaser.Game(config);
}