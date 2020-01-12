class GameplayManager {
    constructor(world) {
        this.level = 1;
        this.enemyCount = 10;
        
        this.spawnDelay = 20;
        this.spawnTimer = 0;
        
        this.score = 0;
        
        game.UI.score(this.score);
        game.UI.remainingEnemies(this.enemyCount);
        game.UI.level(this.level);
    }
    
    addScore(score) {
        this.score += score;
        game.UI.score(this.score);
    }
    
    enemyDefeated() {
        this.enemyCount--;
        this.spawnTimer -= 5;
        game.UI.remainingEnemies(this.enemyCount);
        
        if(this.enemyCount == 0)
            {
                this.nextLevel();
            }
    }
    
    nextLevel() {
        this.level++;
        this.enemyCount = 10 + ((this.level - 1) * 5);
        this.spawnTimer = 0;
        game.UI.remainingEnemies(this.enemyCount);
        game.UI.level(this.level);
    }
    
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
    
    createRandomSet(ref) {
        var maxType = 1;
        if (this.level >= 3) { maxType = 2; }
        if (this.level >= 5) { maxType = 3; }
        
        var enemyType = Phaser.Math.Between(1, maxType);
        
        if (enemyType == 1) { 
            var rndx = Math.random() * game.world.bounds.width;
            var rndy = Math.random() * game.world.bounds.height;
            var length = Phaser.Math.Between(3 + Math.floor((this.level - 1) / 2), 5 + Math.floor((this.level - 1) / 2));
            length = Math.min(length, this.enemyCount - ref.enemyGroup.getLength());
            ref.createBasicSet(rndx, rndy, length);
        }
        
        if (enemyType == 2) { 
            var rndx = Math.random() * game.world.bounds.width;
            var rndy = Phaser.Math.Between(game.physics.world.bounds.height * 0.2, game.physics.world.bounds.height * 0.8);
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