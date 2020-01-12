// The user interface includes the score, wave number, enemies remaining and the fullscreen button.
// In the event of a game over, a button appears to return to the main menu.

var scoreText;
var enemiesRemainingText;
var levelText;
var fullscreenBtn;

class UserInterface {
    constructor() {
        
        var camera = game.cameras.main;
        
        scoreText = game.add.text(10, 10, 'Score: ?', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        scoreText.setDepth(1);
        
        enemiesRemainingText = game.add.text(camera.width / 2, camera.height - 10, 'Enemies remaining: ?', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        enemiesRemainingText.setOrigin(0.5, 1);
        enemiesRemainingText.setDepth(1);
        
        levelText = game.add.text(10, 60, 'Wave: ?', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        levelText.setDepth(1);
        
        //Full screen button
        fullscreenBtn = game.add.sprite(camera.width - 10, 10, 'fullscreen').setScrollFactor(0);
        fullscreenBtn.setScale(2);
        fullscreenBtn.setOrigin(1, 0);
        fullscreenBtn.setInteractive();
        fullscreenBtn.on('pointerdown', () => { 
            if (game.scale.isFullscreen) {
                game.scale.stopFullscreen();
            } else {
                game.scale.startFullscreen();
            }
        });
    
    }
    
    //Updates the displayed score
    score(score) {
        scoreText.setText('Score: ' + score);
    }
    
    //Updates the remaining enemies text
    remainingEnemies(enemies) {
        enemiesRemainingText.setText('Enemies remaining: ' + enemies);
    }
    
    //Updates the wave text
    level(level) {
        levelText.setText('Wave: ' + level);
    }
    
    //Shows final score and back to menu button in the event of a game over
    gameOver(score) {        
        var camera = game.cameras.main;
        var newScoreText = game.add.text(camera.width / 2, (camera.height / 2) - 20, 'Final Score: ' + score, { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        newScoreText.setOrigin(0.5, 0);
        newScoreText.setDepth(1);
        
        var retryButton = game.add.text(camera.width / 2, (camera.height / 2) + 20, 'Back to Menu', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        retryButton.setOrigin(0.5, 0);
        retryButton.setDepth(1);
        retryButton.setInteractive();
        retryButton.on('pointerdown', () => {
            game.scene.start('MainMenu');
        });
    }
}