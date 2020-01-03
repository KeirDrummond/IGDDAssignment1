var scoreText;
var enemiesRemainingText;
var levelText;

class UserInterface {
    constructor() {
        
        scoreText = game.add.text(10, 10, 'Score: ?', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        scoreText.setDepth(1);
        
        enemiesRemainingText = game.add.text(800, 900, 'Enemies remaining: ?', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        enemiesRemainingText.setOrigin(0.5, 0.5);
        enemiesRemainingText.setDepth(1);
        
        levelText = game.add.text(1590, 10, 'Level: ?', { font: '48px Arial', fill: '#000000' }).setScrollFactor(0);
        levelText.setOrigin(1, 0);
        levelText.setDepth(1);
    }
    
    score(score) {
        scoreText.setText('Score: ' + score);
    }
    
    remainingEnemies(enemies) {
        enemiesRemainingText.setText('Enemies remaining: ' + enemies);
    }
    
    level(level) {
        levelText.setText('Level: ' + level);
    }
}