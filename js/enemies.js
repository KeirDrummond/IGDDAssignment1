class Enemy extends Character {
    
    constructor(posx, posy, tex) {        
        super(posx, posy, tex);
    }
    
    onHurt() {
        console.log("Ouch");
        super.recieveDamage(1);
    }
    
    onDeath() {
        this.destroy();
    }
}

class GenericEnemy extends Enemy {
    
    constructor(posx, posy) {
        super(posx, posy, 'enemy');
        this.body.immovable = true;
    }

}