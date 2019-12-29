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
        
        this.alive = true;
    }
    
    onHurt(source) {
        console.log("Ouch");
        this.recieveDamage(source.damage);
    }
    
    onDeath() {
        this.alive = false;
        this.destroy();
    }
    
    update() {        
        this.move();

        if (this.curFolDelay > 0)
            {
                this.curFolDelay -= 1/60;
            }
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
        if (distance > this.followDistance) {
            if (this.x > tar.x) { this.body.setVelocity(-this.speed, this.body.velocity.y); }
            if (this.x < tar.x) { this.body.setVelocity(this.speed, this.body.velocity.y); }
            if (Math.abs(this.x - tar.x) < 10 && Math.abs(this.x - tar.x) > -10) { this.body.setVelocity(0, this.body.velocity.y); }
            if (this.y > tar.y) { this.body.setVelocity(this.body.velocity.x, -this.speed); }
            if (this.y < tar.y) { this.body.setVelocity(this.body.velocity.x, this.speed); }
            if (Math.abs(this.y - tar.y) < 10 && Math.abs(this.y - tar.y) > -10) { this.body.setVelocity(this.body.velocity.x, 0); }
        }
        else { this.body.setVelocity(0, 0); }
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
        
        this.speed = 100;        
        
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
    
    randomDirection() {
        var rndx = (Math.random() - 0.5);
        if (rndx > 0) { rndx = 1; } else { rndx = -1; }
        var rndy = (Math.random() - 0.5) * 2;
        this.body.setVelocity(rndx * this.speed, rndy * this.speed);
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
    }

}