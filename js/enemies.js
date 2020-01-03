class Enemy extends Character {
    
    constructor(posx, posy, tex, frame, followTarget, followDelay) {        
        super(posx, posy, tex, frame);
        this.followTarget = followTarget;

        followDelay = 1;
                
        this.followDelay = followDelay;
        if (this.followDelay > 1)
            { this.followDelay = 1; }
        else if (this.followDelay < 0)
            { this.followDelay = 0; }
        
        this.followDistance = 50;
        
        this.instructionNo = 0;
        
        this.followerVelocity = new Phaser.Math.Vector2(this.body.velocity);
        this.curFolDelay = this.followDelay;
        
        this.hazard = false;
        this.hazardTimer = 2;
    }
    
    onHurt(source) {
        console.log("Ouch");
        this.recieveDamage(source.damage);
    }
    
    onDeath() {
        this.alive = false;
        game.gpManager.enemyDefeated();
        this.destroy();
    }
    
    update() {        
        this.move();

        if (this.hazardTimer > 0) { this.hazardTimer -= 1/60; } else { this.hazard = true; }
        if (this.curFolDelay > 0) { this.curFolDelay -= 1/60; }
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
    
    changeInstruction(newInstruction) {
        this.curFolDelay = 1;
        this.instructionNo = newInstruction;
    }
        
}

class GenericEnemy extends Enemy {
    
    constructor(posx, posy, followTarget, followDelay) {
        super(posx, posy, 'enemy', 2, followTarget);
        this.body.immovable = true;
        
        this.speed = 200 * (1 + (game.gpManager.level - 1) * 0.1);
        this.body.setMaxSpeed(this.speed);
        
        this.setCollideWorldBounds(true, 1, 1);
        
        this.maxHealth = 3;
        this.curHealth = this.maxHealth;
        this.updateTexture();
        
        this.firstAction = false;
    }
    
    myInstruction() {
        //Something
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
        if (healthiness <= (1/3)) { this.setFrame(0); }
        else if (healthiness <= (2/3)) { this.setFrame(1); }
        else { this.setFrame(2); }
    }
    
    update() {
        super.update();
        var facingRight = true;
        if (this.body.velocity.x >= 0) { facingRight = true; } else { facingRight = false; }
        if (facingRight) { this.setFlipX(true); } else { this.setFlipX(false); }
    }

}