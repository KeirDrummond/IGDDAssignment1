class Character extends Phaser.Physics.Arcade.Sprite {
    
    constructor(posx, posy, tex){
        super(game, posx, posy, tex);
        
        this.setOrigin(0.5, 0.5);
        
        game.add.existing(this);
        game.physics.world.enable(this);
        
        this.velx = 0;
        this.vely = 0;
        
        this.startHealth = 1;
        this.curHealth = this.startHealth; //Default value of 1.
    }
    
    onHurt() {
        //To be overridden.
    }
    
    recieveDamage(damage) {
        this.curHealth -= damage;
        if (this.curHealth <= 0)
            { this.onDeath(); }
    }
    
    onDeath() {
        //To be overridden.
    }
    
}