class Player extends Character {
    constructor() {
        super(200, 250, 'player', 2);

        super.setCollideWorldBounds(true);

        this.facingRight = true;
        
        this.maxSpeed = 500;
        
        this.accelerationRate = 100;
        this.deccelerationRate = 40;
        
        this.bulletSpeed = 10; //Speed of the projectile.
        
        this.attackSpeed = 0.4; //Attacks per second.
        this.nextShot = 0;
        
        this.velocity = new Phaser.Math.Vector2(0, 0);
        
        this.maxHealth = 3;
        this.curHealth = this.maxHealth;
        
        this.updateTexture();
    }

    right() {
        this.facingRight = true;
        this.velocity.x += this.accelerationRate;
        this.setFlipX(false);
    }
    
    left() {
        this.facingRight = false;
        this.velocity.x += this.accelerationRate;
        this.setFlipX(true);
    }

    up() {
        this.velocity.y -= this.accelerationRate;
    }
    
    down() {
        this.velocity.y += this.accelerationRate;
    }
    
    attack() {
        if (this.nextShot <= 0)
            { this.fire(); }
    }
    
    fire() {
        if (this.facingRight) {
            world.createBullet(this.x, this.y, true, this.bulletSpeed);
        }
        else {
            world.createBullet(this.x, this.y, false, this.bulletSpeed);
        }
        
        this.nextShot = this.attackSpeed;
    }
    
    onDeath() {
        //Game Over
    }
    
    recieveDamage(damage) {
        super.recieveDamage(damage);
        this.updateTexture();
    }
    
    updateTexture() {
        var healthiness = this.curHealth / this.curHealth;
        if (healthiness <= (1/3)) { this.setFrame(0);  }
        else if (healthiness <= (2/3)) { this.setFrame(1); }
        else { this.setFrame(2); }
    }
    
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

    update() {
        this.movement();        
        this.nextShot = Math.max(this.nextShot - (1/60), 0);
    }
    
}