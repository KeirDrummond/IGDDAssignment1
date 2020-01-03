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
        this.spawnTimer -= 2;
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
            { this.spawnTimer = this.spawnDelay; this.createRandomSnake(game.world); }
    }
    
    update() {
        this.nextSpawnTimer();
    }
    
    createRandomSnake(ref) {
        var rndx = Math.random() * 1600;
        var rndy = Math.random() * 1000;
        var length = Phaser.Math.Between(3, 5 + this.level - 1);
        length = Math.min(length, this.enemyCount - ref.enemyGroup.getLength());
        ref.createSnake(GenericEnemy, rndx, rndy, length);
    }
}