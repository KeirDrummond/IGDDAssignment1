//Game Scene that appears after clicking the start game button.

var keys;

class GameScreen extends Phaser.Scene {
    constructor() {
        super('GameScreen');
    }

    preload() {
        this.load.spritesheet('player', 'assets/images/tiny_ship.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('laser', 'assets/images/laser.png');
        this.load.image('background', 'assets/images/bg.png');
        //this.load.image('fullscreen', 'assets/images/fullscreen.png');
        this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy2', 'assets/images/enemy2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy3', 'assets/images/enemy3.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('music', 'assets/audio/music.wav');
        this.load.audio('laser', 'assets/audio/laser.wav');
        this.load.audio('enemyDeath', 'assets/audio/eDeath.wav');
        this.load.audio('playerDeath', 'assets/audio/pDeath.wav');
        this.load.audio('damage', 'assets/audio/pDamage.wav');
        
        game = this;
    }
    
    create() {
        //Properties of the scene to make them easily referencable in other classes.
        this.world = new myWorld();
        this.UI = new UserInterface();
        this.gpManager = new GameplayManager();

        //Enables use of the keyboard.
        keys = this.input.keyboard.createCursorKeys();

        //Looping music
        var musicConfig = {
            loop: true
        }
        this.music = this.sound.add('music', musicConfig);
        this.music.play();
    }

    update() {
        //Calls update methods of parts of the game.
        input(game.world.player);
        this.world.update();
        this.gpManager.update();
    }
}