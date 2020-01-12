/* Base class for all enemies.
** The properties of enemies changes dependant on the wave number.
** Enemies will speed up and appear with a higher maximum health on later waves.
*/

class Enemy extends Character {    
    constructor(posx, posy, tex, frame) {        
        super(posx, posy, tex, frame);
    }
    
    onHurt(source) {
        this.recieveDamage(source.damage);
    }
    
    onDeath() {
        this.alive = false;
        game.sound.play('enemyDeath');
        game.gpManager.enemyDefeated();
        this.destroy();
    }
    
    update() {        
        this.move();
    }
    
    move() {
        //To be overwritten
    }
    
    myInstruction() {
        //To be overwritten
    }
    
    followInstruction() {        
        var tar = new Phaser.Geom.Point(this.followTarget.x, this.followTarget.y);
        var distance = Phaser.Math.Distance.Between(this.x, this.y, tar.x, tar.y);
        game.physics.moveToObject(this, this.followTarget, this.speed);
        if (distance < this.followDistance) {
            this.body.setVelocity(0, 0);
        }
    }
        
}

/* The basic enemy class.
** Appears in a designated position with a velocity and bounces against the bounds of the world.
** If following another enemy in its set, will choose a random direction to split off into if the enemy being followed is defeated.
** Is not a hazard immediately after being created.
*/

class Basic extends Enemy {
    constructor(posx, posy, followTarget) {
        super(posx, posy, 'enemy', 2, followTarget);
        this.body.immovable = true;
        
        this.speed = 200 * (1 + (game.gpManager.level - 1) * 0.2);
        this.body.setMaxSpeed(this.speed);
        
        this.setCollideWorldBounds(true, 1, 1);
        
        this.maxHealth = Math.max(Math.floor((game.gpManager.level / 3) + 1), 1);
        this.curHealth = this.maxHealth;
        this.updateTexture();
        
        this.firstAction = false;
        
        this.followTarget = followTarget;
        
        this.followDistance = 50;
        
        this.hazard = false;
        this.hazardTimer = 2;
    }
    
    move() {
        if (this.followTarget != null) {
            if (!this.followTarget.alive) { this.followTarget = null; }
        }
        
        if (this.followTarget == null)
            {
                this.myInstruction();
            }
        else
            {
                this.followInstruction();
            }
    }
    
    myInstruction() {
        if (!this.firstAction) { this.randomDirection(); this.firstAction = true; }
    }
    
    onDeath() {
        game.gpManager.addScore(10);
        super.onDeath();
    }
    
    randomDirection() {
        var angle = Phaser.Math.RND.angle();
        game.physics.velocityFromAngle(angle, this.speed, this.body.velocity);
    }
    
    recieveDamage(damage) {
        super.recieveDamage(damage);
        this.updateTexture();
    }
    
    updateTexture() {
        var healthiness = this.curHealth / this.maxHealth;
        if (healthiness <= (1/3) || this.curHealth == 1) { this.setFrame(0); }
        else if (healthiness <= (2/3) || this.curHealth == 2) { this.setFrame(1); }
        else { this.setFrame(2); }
    }
    
    update() {
        super.update();
        var facingRight = true;
        
        if (this.hazardTimer > 0) { this.hazardTimer -= 1/60; } else { this.hazard = true; }
        
        if (this.body.velocity.x >= 0) { facingRight = true; } else { facingRight = false; }
        if (facingRight) { this.setFlipX(true); } else { this.setFlipX(false); }
    }

}


/* The diver enemy.
** Appears at a random side of the world and shoots off towards the player's position at the time of launch.
** Appears in a set but does not move like a snake. Instead all enemies function independently from each other.
** If a diver hits the edge of the world, turns around and launches again.
** Is a hazard immediately after being created.
*/

class Diver extends Enemy {
    constructor() {
        super(0, 0, 'enemy2', 2);
        
        var rnd = Math.random();
        if (rnd < 0.5) { this.leftSide = true; } else { this.leftSide = false; }
        
        this.body.immovable = true;
        
        this.speed = 400 * (1 + (game.gpManager.level - 5) * 0.2);
        this.body.setMaxSpeed(this.speed);
        
        this.maxHealth = Math.max(Math.floor(1 + (game.gpManager.level / 6) - 5), 1);
        
        this.curHealth = this.maxHealth;
        this.updateTexture();

        this.charged = false;
        
        this.hazard = true;
    }
    
    move() {
        this.myInstruction();
    }
    
    myInstruction() {
        
        var bounds = game.physics.world.bounds;
        
        if (this.leftSide) {
            if (this.x > bounds.width + 200 || this.y < -200 || this.y > bounds.height + 200) { this.charged = false; this.leftSide = false; }
        }
        else {
            if (this.x < -200 || this.y < -200 || this.y > bounds.height + 200) { this.charged = false; this.leftSide = true; }
        }
        
        var playerPoint = new Phaser.Geom.Point(game.world.player.x, game.world.player.y);
        
        if (this.charged == false) {
            this.charged = true;
            this.body.setVelocity(0, 0);
            
            var posx = 0;
            if (this.leftSide) { posx = -200; } else { posx = bounds.width + 200; }
            var posy = Math.random() * bounds.height;
        
            this.x = posx;
            this.y = posy;
            
            game.physics.moveTo(this, playerPoint.x, playerPoint.y, this.speed);
            var angle = Phaser.Math.Angle.Between(playerPoint.x, playerPoint.y, this.x, this.y);
            this.setRotation(angle);
            if (this.leftSide) { this.setFlipX(true); this.setAngle(this.angle + 180); }
            else { this.setFlipX(false); }
        }
    }
    
    recieveDamage(damage) {
        super.recieveDamage(damage);
        this.updateTexture();
    }
    
    onDeath() {
        game.gpManager.addScore(20);
        super.onDeath();
    }
    
    updateTexture() {
        var healthiness = this.curHealth / this.maxHealth;
        if (healthiness <= (1/3) || this.curHealth == 1) { this.setFrame(0); }
        else if (healthiness <= (2/3) || this.curHealth == 2) { this.setFrame(1); }
        else { this.setFrame(2); }
    }
    
    update() {
        super.update();
    }    
}

/* The waver enemy.
** Appears in a designated position and moves left/right in a sine wave pattern.
** Appears in a set where the followers will follow the enemy in front of them.
** If the enemy being followed is defeated, changes movement to move independantly.
** Is not a hazard immediately after being created.
*/

class Waver extends Enemy {
    constructor(posx, posy, followTarget) {
        super(posx, posy, 'enemy3', 2, followTarget);
        this.body.immovable = true;
        
        this.speed = 200 * (1 + (game.gpManager.level - 3) * 0.2);
        this.body.setMaxSpeed(this.speed);
        
        this.maxHealth = Math.max(Math.floor(1 + (game.gpManager.level / 4) - 3), 1);
        this.curHealth = this.maxHealth;
        this.updateTexture();
        
        var rnd = Math.random();
        if (rnd < 0.5) { this.leftSide = true; } else { this.leftSide = false; }
        
        this.followTarget = followTarget;
        
        this.followDistance = 50;
        
        this.hazard = false;
        this.hazardTimer = 2;
        
        this.aliveTime = 0;
        
        this.facingRight = true;
        
        var rnd = Math.random();
        if (rnd < 0.5) { this.facingRight = true; } else { this.facingRight = false; }
    }
    
    move() {
        if (this.followTarget != null) {
            if (!this.followTarget.alive) { this.followTarget = null; }
        }
        
        if (this.followTarget == null)
            {
                this.myInstruction();
            }
        else
            {
                this.followInstruction();
            }
    }
    
    myInstruction() {
        var angle = Math.sin(this.aliveTime) * 90;
        var bounds = game.physics.world.bounds;

        if (this.x > bounds.width && this.facingRight) { this.facingRight = false; } 
        else { if (this.x < 0 && !this.facingRight) { this.facingRight = true; }}
        
        if (!this.facingRight) { angle += 180; }
        game.physics.velocityFromAngle(angle, this.speed, this.body.velocity);
        if (this.y < -50 || this.y > bounds.height + 100) { game.physics.moveTo(this, this.x, bounds.height * 0.5, this.speed); }
    }
    
    recieveDamage(damage) {
        super.recieveDamage(damage);
        this.updateTexture();
    }
    
    onDeath() {
        game.gpManager.addScore(15);
        super.onDeath();
    }
    
    updateTexture() {
        var healthiness = this.curHealth / this.maxHealth;
        if (healthiness <= (1/3) || this.curHealth == 1) { this.setFrame(0); }
        else if (healthiness <= (2/3) || this.curHealth == 2) { this.setFrame(1); }
        else { this.setFrame(2); }
    }
    
    update() {
        super.update();
        this.aliveTime += 1/60;
        if (this.hazardTimer > 0) { this.hazardTimer -= 1/60; } else { this.hazard = true; }
    }
}