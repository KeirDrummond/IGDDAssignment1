class Player extends Phaser.Physics.Arcade.Sprite {
    constructor() {
        super(game, 200, 250, 'player');
        game.add.existing(this);
        
        game.physics.world.enable(this);
        
        //super.refreshBody();
        //console.log(super.this.body);
        super.setCollideWorldBounds(true);
        
        this.velx = 0;
        this.vely = 0;
        
        this.facingRight = true;
        
        this.maxSpeed = 5;
        
        this.accelerationRate = 1;
        this.deccelerationRate = 0.4;
        
        this.bulletSpeed = 6;
        this.attackSpeed = 0.5;
        this.nextShot = 0;
        
    }

    right() {
        this.facingRight = true;
        
        this.velx += this.accelerationRate;
        this.setScale(1, 1);
    }
    
    left() {
        this.facingRight = false;
        
        this.velx += this.accelerationRate;
        this.setScale(-1, 1);
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
            world.createBullet(this.x, this.y, true);
        }
        else {
            world.createBullet(this.x, this.y, false);
        }
        
        this.nextShot = this.attackSpeed;
    }
    
    onDeath(callback) {
        //this.sprite.events.onKilled.add(callback);
    }

    update() {
        this.velx = Math.max(this.velx - this.deccelerationRate, 0);
        
        this.velx = Math.min(this.velx, this.maxSpeed);
        
        if (this.facingRight) {
            this.x += this.velx;
        }
        else {
            this.x -= this.velx;
        }
        
        if (this.vely < 0)
            { this.vely = Math.min(this.vely + this.deccelerationRate, 0) }
        else if (this.vely > 0)
            { this.vely = Math.max(this.vely - this.deccelerationRate, 0) }
        
        this.vely = Math.max(this.vely, -this.maxSpeed);
        this.vely = Math.min(this.vely, this.maxSpeed);        
        
        this.y += this.vely;
        
        this.nextShot = Math.max(this.nextShot - (1/60), 0);
    }
    
}