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
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },        
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