class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    constructor(posx, posy, facingRight, speed) {
        super(game, posx, posy, 'laser');

        this.facingRight = facingRight;
        
        this.lifetime = 1; //Length of time in seconds of a bullet until it is destroyed. Necessary to clear up memory.
        this.velx = 0;
        
        game.add.existing(this);
        
        if (facingRight == true)
            this.velx = speed; else this.velx = -speed;
    }
    
    
    update() {
        this.x += this.velx;
        
        this.lifetime -= (1/60);
        if (this.lifetime <= 0)
            { this.clearMask(); this.destroy(); }
    }
}