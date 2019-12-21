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
        //Holds data about world
    }
    
    createBullet(x, y, facingRight) {
        var bullet = new Bullet(x, y, facingRight);
        this.bulletGroup.add(bullet);
    }
    
    update() {
        //Update all world entities
        this.player.update();
        this.bulletGroup.children.each(function (bullet){
            bullet.update();}, this);
    }
}