class Player extends Entity {
    constructor() {
        super();

        const playerSprite = game.physics.add.sprite(200, 250, 'player');
        playerSprite.setOrigin(0.5, 0.5);
        playerSprite.setCollideWorldBounds(true);

        this.sprite = playerSprite;
        this.facingRight = true;
        
        this.maxSpeed = 5;
        
        this.accelerationRate = 1;
        this.deccelerationRate = 0.4;
        
        this.bulletSpeed = 6;
        
        console.log(game.world);
    }

    right() {
        this.facingRight = true;
        
        this.velx += this.accelerationRate;
        this.sprite.setScale(1, 1);
    }
    
    left() {
        this.facingRight = false;
        
        this.velx += this.accelerationRate;
        this.sprite.setScale(-1, 1);
    }

    up() {
        this.vely -= this.accelerationRate;
    }
    
    down() {
        this.vely += this.accelerationRate;
    }
    
    fire() {
        if (this.facingRight) {
            world.spawnBullet(this.sprite.x, this.sprite.y, this.bulletSpeed);
        }
        else {
            world.spawnBullet(this.sprite.x, this.sprite.y, -this.bulletSpeed);
        }
            
    }
    
    onDeath(callback) {
        //this.sprite.events.onKilled.add(callback);
    }

    update() {
        
        this.velx = Math.max(this.velx - this.deccelerationRate, 0);
        
        this.velx = Math.min(this.velx, this.maxSpeed);
        
        if (this.facingRight) {
            this.sprite.x += this.velx;
        }
        else {
            this.sprite.x -= this.velx;
        }
        
        if (this.vely < 0)
            { this.vely = Math.min(this.vely + this.deccelerationRate, 0) }
        else if (this.vely > 0)
            { this.vely = Math.max(this.vely - this.deccelerationRate, 0) }
        
        this.vely = Math.max(this.vely, -this.maxSpeed);
        this.vely = Math.min(this.vely, this.maxSpeed);        
        
        this.sprite.y += this.vely;
        
    }
    
}