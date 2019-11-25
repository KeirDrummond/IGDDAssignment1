class Bullet extends Entity {
    
    constructor(game, posx, posy, velx) {
        super(game);
        const bulletSprite = game.physics.add.sprite(posx, posy, 'laser');
        
        this.sprite = bulletSprite;
        this.velx = velx;
        
        this.lifetime = 2;        
    }
    
    
    update() {
        this.sprite.x += velx;
        
        this.lifetime =- 0.1
        if (this.lifetime <= 0)
            { this.destroy(); }
    }
}