/* The Gameplay Manager performs actions related to the state of the game.
** Records data like wave number and score.
** Communicates the data with other classes.
*/

class GameplayManager {
    constructor(world) {
        this.level = 1; //Wave number
        this.enemyCount = 10;
        
        this.spawnDelay = 20;
        this.spawnTimer = 0;
        
        this.score = 0;
        
        //Updates UI with initial values.
        game.UI.score(this.score);
        game.UI.remainingEnemies(this.enemyCount);
        game.UI.level(this.level);
    }
    
    addScore(score) {
        this.score += score;
        game.UI.score(this.score);
    }
    
    //Called when an enemy is defeated.
    enemyDefeated() {
        this.enemyCount--;
        this.spawnTimer -= 5; //Reduces time until the next enemy appears.
        game.UI.remainingEnemies(this.enemyCount);
        
        //If the last enemy was defeated, moves to the next wave.
        if(this.enemyCount == 0)
            {
                this.nextLevel();
            }
    }
    
    //Advances the wave.
    nextLevel() {
        this.level++;
        this.enemyCount = 10 + ((this.level - 1) * 5);
        this.spawnTimer = 0;
        game.UI.remainingEnemies(this.enemyCount);
        game.UI.level(this.level);
    }
    
    //Time until the next set of enemies appears.
    nextSpawnTimer() {
        this.spawnTimer -= 1/60;
        if (this.spawnTimer <= 0)
            { this.spawnTimer = this.spawnDelay; this.createRandomSet(game.world); }
    }
    
    gameOver() {
        game.UI.gameOver(this.score);
    }
    
    update() {
        this.nextSpawnTimer();
    }
    
    //Create a random set of enemies
    
    createRandomSet(ref) {
        
        //Only creates sets dependant on the wave value for the purpose of difficulty curve.
        var maxType = 1;
        if (this.level >= 3) { maxType = 2; }
        if (this.level >= 5) { maxType = 3; }
        
        var enemyType = Phaser.Math.Between(1, maxType);
        
        var bounds = game.physics.world.bounds;
        
        if (enemyType == 1) { 
            var rndx = Math.random() * bounds.width;
            var rndy = Math.random() * bounds.height;
            var length = Phaser.Math.Between(3 + Math.floor((this.level - 1) / 2), 5 + Math.floor((this.level - 1) / 2));
            length = Math.min(length, this.enemyCount - ref.enemyGroup.getLength());
            ref.createBasicSet(rndx, rndy, length);
        }
        
        if (enemyType == 2) { 
            var rndx = Math.random() * bounds.width;
            var rndy = Phaser.Math.Between(bounds.height * 0.2, bounds.height * 0.8);
            var length = Phaser.Math.Between(3 + Math.floor((this.level - 1) / 2), 5 + Math.floor((this.level - 1) / 2));
            length = Math.min(length, this.enemyCount - ref.enemyGroup.getLength());
            ref.createWaverSet(rndx, rndy, length);
        }
        
        if (enemyType == 3) {
            var length = 2 + Math.floor((this.level - 3) / 3);
            length = Math.min(length, this.enemyCount - ref.enemyGroup.getLength());
            ref.createDiverSet(length);
        }
        
    }
}