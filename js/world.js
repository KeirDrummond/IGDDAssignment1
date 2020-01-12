//Information about the game world.

class myWorld {
    constructor() {
        this.isGameOver = false;
        
        //Variables to change the world size.
        //Currently set up be 1.5x the size of the window.
        var xBound = 1920;
        var yBound = 1080;
        
        game.physics.world.setBounds(0, 0, xBound, yBound);
        game.cameras.main.setBounds(0, 0, xBound, yBound);
        
        this.bulletGroup = game.add.group();
        this.enemyGroup = game.add.group();
        
        //Set up background.
        let bg = game.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(xBound, yBound);
        
        //Set up player.
        this.player = new Player();
        
        //Makes the camera follow the player.
        game.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        
        //Checks for overlap collision.
        game.physics.add.overlap(this.enemyGroup, this.player, this.player.onHurt);
        game.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.bulletCollision);        
    }
    
    //Creates a bullet at coordinates.
    createBullet(x, y, facingRight, speed) {
        var bullet = new Bullet(x, y, facingRight, speed);
        this.bulletGroup.add(bullet);
    }
    
    //Basic enemy set.
    //Appears as a snake.
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
    
    //Diver enemy set.
    //Appears seperately.
    createDiverSet(length) {
        var enemies = new Array(length);
        for (var i = 0; i < length; i++) {
            enemies[i] = new Diver();
            this.enemyGroup.add(enemies[i]);
        }
    }
    
    //Waver enemy set.
    //Appears as a snake.
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
    
    //Internal method that deals with bullet collision.
    bulletCollision(bullet, enemy)
    {
        bullet.hit(enemy);
    }
    
    //Called when the player dies.
    gameOver() {
        this.isGameOver = true;
        game.physics.pause();
        game.gpManager.gameOver();
    }
    
    //Update all world entities
    update() {        
        if (!this.isGameOver) {
            this.player.update();
            //Updates all bullets.
            this.bulletGroup.children.each(function (bullet){
                bullet.update();}, this);
            //Updates all enemies.
            this.enemyGroup.children.each(function (enemy){
                enemy.update();}, this);

            //C
            game.physics.world.collide(this.player, this.enemy);
            game.physics.world.overlap(this.bulletGroup, this.enemyGroup);
        }
    }
}