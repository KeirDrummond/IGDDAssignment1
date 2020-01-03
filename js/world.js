class World {
    constructor(game) {
        
        this.bulletGroup = game.add.group();
        this.enemyGroup = game.add.group();
        
        //Set up background
        let bg = game.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.setDisplaySize(2400, 1600);
        
        //Set up player
        this.player = new Player();
        
        //game.gpManager.createRandomSnake(this);
        //this.createSnake(GenericEnemy, 400, 500, 5);
            
        game.physics.add.overlap(this.enemyGroup, this.player, this.player.onHurt);
        game.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.bulletCollision);
        
        game.physics.world.setBounds(0, 0, 2400, 1600);
        game.cameras.main.setBounds(0, 0, 2400, 1600);
        game.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        //Holds data about world
    }
    
    createBullet(x, y, facingRight, speed) {
        var bullet = new Bullet(x, y, facingRight, speed);
        this.bulletGroup.add(bullet);
    }
    
    createSnake(enemy, x, y, length) {
        
        var firstEnemy;
        
        switch(enemy) {
            case GenericEnemy: {
                var enemies = new Array(length);
                for (var i = 0; i < length; i++) {
                    if (i == 0){
                        enemies[i] = new GenericEnemy(x, y, null);
                    }
                    else {
                        enemies[i] = new GenericEnemy(x, y, enemies[i-1]);                        
                    }
                    this.enemyGroup.add(enemies[i]);
                }
        }
                break;

        }
    }
    
    bulletCollision(bullet, enemy)
    {
        bullet.hit(enemy);
    }
    
    update() {
        //Update all world entities
        this.player.update();
        this.bulletGroup.children.each(function (bullet){
            bullet.update();}, this);
        this.enemyGroup.children.each(function (enemy){
            enemy.update();}, this);
        
        game.physics.world.collide(this.player, this.enemy);
        game.physics.world.overlap(this.bulletGroup, this.enemyGroup);
    }
}