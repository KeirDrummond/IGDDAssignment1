//Main Menu Scene that appears when first starting up the game.

class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
        
    preload() {
        this.load.image('fullscreen', 'assets/images/fullscreen.png');
        this.load.image('bg', 'assets/images/menubg.png');
    }
    
    create() {
        //Background
        var bg = this.add.sprite(0, 0, 'bg');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        //Start button
        var startButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Start', { font: '72px Arial', fill: '#000000' });
        startButton.setOrigin(0.5, 0.5);
        startButton.setInteractive();        
        startButton.on('pointerdown', () => {
            this.scene.start('GameScreen');
        });
        
        //Full screen functionality
        const fullscreenBtn = this.add.sprite(this.cameras.main.width - 10, 10, 'fullscreen').setScrollFactor(0);
        fullscreenBtn.setScale(2);
        fullscreenBtn.setOrigin(1, 0);
        fullscreenBtn.setInteractive();
        fullscreenBtn.on('pointerdown', () => { 
            if (game.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        
        //Controls
        var controlsText = [
            "Controls",
            "Arrow Keys: Movement",
            "Space: Fire",
            "Cursor/Touch: Movement & Fire"
        ];        
        var controls = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200, controlsText, { font: '36px Arial', fill: '#000000', align: 'center' });
        controls.setOrigin(0.5, 0.5);
    }
}