class Player extends Character {
    constructor() {
        super(200, 250, 'player');

        super.setCollideWorldBounds(true);

        this.facingRight = true;
        
        this.maxSpeed = 5;
        
        this.accelerationRate = 1;
        this.deccelerationRate = 0.4;
        
        this.bulletSpeed = 10; //Speed of the projectile.
        
        this.attackSpeed = 0.4; //Attacks per second.
        this.nextShot = 0;
        
    }

    right() {
        this.facingRight = true;
        this.velx += this.accelerationRate;
        this.setFlipX(false);
    }
    
    left() {
        this.facingRight = false;
        this.velx += this.accelerationRate;
        this.setFlipX(true);
    }

    up() {
        this.vely -= this.accelerationRate;
    }
    
    down() {
        this.vely += this.accelerationRate;
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

    update() {
        this.velx = Math.max(this.velx - this.deccelerationRate, 0);
        this.velx = Math.abs(this.velx);
        
        this.velx = Math.min(this.velx, this.maxSpeed);
        
        if (this.vely < 0)
            { this.vely = Math.min(this.vely + this.deccelerationRate, 0) }
        else if (this.vely > 0)
            { this.vely = Math.max(this.vely - this.deccelerationRate, 0) }
        
        this.vely = Math.max(this.vely, -this.maxSpeed);
        this.vely = Math.min(this.vely, this.maxSpeed);

        if (this.facingRight)
            { this.body.setVelocity(this.velx * 100, this.vely * 100); }
        else
            { this.body.setVelocity(this.velx * -100, this.vely * 100); }
        
        //this.y += this.vely;
        
        this.nextShot = Math.max(this.nextShot - (1/60), 0);
    }
    
}