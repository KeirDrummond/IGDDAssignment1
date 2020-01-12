// The player class controls the avatar character that the player controls.

class Player extends Character {
    constructor() {
        super(200, 250, 'player', 2);

        super.setCollideWorldBounds(true);

        this.facingRight = true;
        
        this.maxSpeed = 350;
        
        this.velocity = new Phaser.Math.Vector2(0, 0);
        
        //Manually setup acceleration/decceleration rates to have better control over the movement mechanics.
        this.accelerationRate = 100;
        this.deccelerationRate = 40;
        
        this.bulletSpeed = 15; //Speed of the projectile.
        
        this.attackSpeed = 0.4; //Attacks per second.
        this.nextShot = 0; //Time until a shot can be fired.
        
        //Health setup.
        this.maxHealth = 3;
        this.curHealth = this.maxHealth;
        
        //Invulnerability time at the start of the game.
        this.invulTime = 3;

        this.updateTexture();
    }

    //Move Right
    right() {
        this.facingRight = true;
        this.velocity.x += this.accelerationRate;
        this.setFlipX(false);
    }
    
    //Move Left
    left() {
        this.facingRight = false;
        this.velocity.x += this.accelerationRate;
        this.setFlipX(true);
    }

    //Move Up
    up() {
        this.velocity.y -= this.accelerationRate;
    }
    
    //Move Down
    down() {
        this.velocity.y += this.accelerationRate;
    }
    
    //Attempt to fire a laser (If successful, calls fire method)
    attack() {
        if (this.nextShot <= 0 && this.alive)
            { this.fire(); }
    }
    
    //Fire a laser
    fire() {
        if (this.facingRight) {
            game.world.createBullet(this.x, this.y, true, this.bulletSpeed);
        }
        else {
            game.world.createBullet(this.x, this.y, false, this.bulletSpeed);
        }
        
        this.nextShot = this.attackSpeed;
        game.sound.play('laser');
    }
    
    //When player's health reaches 0.
    onDeath() {
        this.alive = false;
        game.sound.play('playerDeath');
        game.music.stop();
        this.disableBody(true, true);
        
        game.world.gameOver();
    }
    
    //When the player overlaps with something that deals damage.
    onHurt(other, me) {
        if (me.invulTime <= 0) { 
            if (other instanceof Enemy) { if (other.hazard) { me.recieveDamage(1); }} //Specifically if the player overlaps with an enemy (Currently only way to take damage).
            me.invulTime = 2;
        }
    }
    
    //The player recieves damage.
    recieveDamage(damage) {
        super.recieveDamage(damage);
        game.sound.play('damage');
        this.updateTexture();
        if (this.curHealth <= 0) { this.onDeath(); }
    }
    
    //Updates the player texture to reflect health.
    updateTexture() {
        var healthiness = this.curHealth / this.maxHealth;
        if (healthiness <= (1/3)) { this.setFrame(0);  }
        else if (healthiness <= (2/3)) { this.setFrame(1); }
        else { this.setFrame(2); }
    }
    
    //Calculates what the expected movement of the player is for the next update.
    movement() {
        this.velocity.x = Math.max(this.velocity.x - this.deccelerationRate, 0);
        this.velocity.x = Math.abs(this.velocity.x);
        
        this.velocity.x = Math.min(this.velocity.x, this.maxSpeed);
        
        if (this.velocity.y < 0)
            { this.velocity.y = Math.min(this.velocity.y + this.deccelerationRate, 0) }
        else if (this.velocity.y > 0)
            { this.velocity.y = Math.max(this.velocity.y - this.deccelerationRate, 0) }
        
        this.velocity.y = Math.max(this.velocity.y, -this.maxSpeed);
        this.velocity.y = Math.min(this.velocity.y, this.maxSpeed);

        if (this.facingRight) {
            this.body.setVelocity(this.velocity.x, this.velocity.y);
        }
        else {
            this.body.setVelocity(-this.velocity.x, this.velocity.y);
        }
    }

    //Calls every frame
    update() {
        this.movement(); //Player movement
        this.nextShot = Math.max(this.nextShot - (1/60), 0); //Time when the player can fire again.
        if (this.invulTime > 0) { this.invulTime -= 1/60; } //Time until the player can take damage again.
    }
    
}