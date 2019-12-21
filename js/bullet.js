class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    constructor(posx, posy, facingRight) {
        super(game, posx, posy, 'laser');

        this.facingRight = facingRight;
        
        this.lifetime = 1;
        this.velx = 0;
        
        game.add.existing(this);
        
        if (facingRight == true)
            this.velx = 10; else this.velx = -10;
    }
    
    
    update() {
        this.x += this.velx;
        
        this.lifetime -= (1/60);
        if (this.lifetime <= 0)
            { this.clearMask(); this.destroy(); }
    }
}