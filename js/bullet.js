class Bullet extends Entity {
    
    constructor(game, posx, posy, velx) {
        super(game);
        const bulletSprite = game.physics.add.sprite(posx, posy, 'laser');
        
        this.sprite = bulletSprite;
        this.velx = velx;
    }
    
    
    update() {
        this.sprite.x += velx;
    }
}