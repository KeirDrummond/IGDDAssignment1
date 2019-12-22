class EntityFactory {

}

class World {
    constructor(game) {
        
        this.bulletGroup = game.add.group();
        
        //Set up background
        let bg = game.add.sprite(0, 0, 'background');
        bg.setDisplaySize(2000, 1600);
        
        //Set up player
        this.player = new Player();
        
        this.enemy = new GenericEnemy(400, 500);
        
        game.physics.add.collider(this.player, this.enemy);
        //Holds data about world
    }
    
    createBullet(x, y, facingRight, speed) {
        var bullet = new Bullet(x, y, facingRight, speed);
        this.bulletGroup.add(bullet);
    }
    
    update() {
        //Update all world entities
        this.player.update();
        this.bulletGroup.children.each(function (bullet){
            bullet.update();}, this);
        
        game.physics.world.collide(this.player, this.enemy);
    }
}