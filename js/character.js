class Character extends Phaser.Physics.Arcade.Sprite {
    
    constructor(posx, posy, tex, frame){
        super(game, posx, posy, tex, frame);
        
        this.setOrigin(0.5, 0.5);
        
        game.add.existing(this);
        game.physics.world.enable(this);
        
        this.alive = true;
        
        if (this.maxHealth == null) { this.maxHealth = 1; }
        
        this.curHealth = this.maxHealth; //Default value of 1.
    }
    
    onHurt() {
        //To be overridden.
        console.log("Hi");
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