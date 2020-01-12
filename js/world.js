class myWorld extends Phaser.Physics.Arcade.World {
    constructor() {
        super(game);
        
        this.isGameOver = false;
        
        //2400, 1600
        var xBound = 1920;
        var yBound = 1200;
        
        game.physics.world.setBounds(0, 0, xBound, yBound);
        game.cameras.main.setBounds(0, 0, xBound, yBound);
        
        this.bulletGroup = game.add.group();
        this.enemyGroup = game.add.group();
        
        //Set up background
        let bg = game.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(xBound, yBound);
        
        //Set up player
        this.player = new Player();
        
        game.cameras.main.startFollow(this.player, true, 0.09, 0.09);
            
        game.physics.add.overlap(this.enemyGroup, this.player, this.player.onHurt);
        game.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.bulletCollision);        

        //Holds data about world
    }
    
    createBullet(x, y, facingRight, speed) {
        var bullet = new Bullet(x, y, facingRight, speed);
        this.bulletGroup.add(bullet);
    }
    
    createBasicSet(x, y, length) {
        
        var firstEnemy;
        var enemies = new Array(length);
        for (var i = 0; i < length; i++) {
            if (i == 0){
                enemies[i] = new Basic(x, y, null);
            }
            else {
                enemies[i] = new Basic(x, y, enemies[i-1]);                        
            }
            this.enemyGroup.add(enemies[i]);
        }
    }
    
    createDiverSet(length) {
        var enemies = new Array(length);
        for (var i = 0; i < length; i++) {
            enemies[i] = new Diver();
            this.enemyGroup.add(enemies[i]);
        }
    }
    
    createWaverSet(x, y, length) {
        
        var firstEnemy;
        var enemies = new Array(length);
        for (var i = 0; i < length; i++) {
            if (i == 0){
                enemies[i] = new Waver(x, y, null);
            }
            else {
                enemies[i] = new Waver(x, y, enemies[i-1]);                        
            }
            this.enemyGroup.add(enemies[i]);
        }
    }
    
    bulletCollision(bullet, enemy)
    {
        bullet.hit(enemy);
    }
    
    gameOver() {
        this.isGameOver = true;
        game.physics.pause();
        game.gpManager.gameOver();
    }
    
    update() {
        //Update all world entities
        if (!this.isGameOver) {
            this.player.update();
            this.bulletGroup.children.each(function (bullet){
                bullet.update();}, this);
            this.enemyGroup.children.each(function (enemy){
                enemy.update();}, this);

            game.physics.world.collide(this.player, this.enemy);
            game.physics.world.overlap(this.bulletGroup, this.enemyGroup);
        }
    }
}