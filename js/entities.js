class Entity {
    
    constructor(game) {
        this.x = 0.0;
        this.y = 0.0;
        this.velx = 0;
        this.vely = 0;
    }
    
    update() {
        console.log("Hello");
    }
}

class EntityFactory {
    constructor(spriteName){
        const group = game.physics.add.group({
            defaultKey: spriteName
        });
        
        this.group = group;
    }
    
    spawnAsBullet(x, y) {
        const sprite = this.group.create(x, y);
        this.setUpEntity(sprite);
        //let bullet = new Bullet(game, x, y, speed);
    }
    
    setUpEntity(sprite) {
        sprite.controls = [];
        sprite.addControl = (control) => { sprite.controls.push(control); }
        sprite.updateControls = () => { sprite.controls.forEach(control => control.onUpdate(sprite)); }
    }
    
    updateAllExists() {
        this.group.children.iterate(function (sprite) {
            if (sprite)
                sprite.update();
        })
    }
    
}

class World {
    constructor(game) {
        //Set up background
        let bg = game.add.sprite(0, 0, 'background');
        bg.setDisplaySize(2000, 1600);
        
        //Set up player
        this.player = new Player(game);
        
        //Setup factories for entities which are grouped together. Entity factories are used to execute quick functions for them.
        this.bulletFactory = new EntityFactory('laser');
        this.enemyFactory = new EntityFactory('enemy');
        
        //Holds data about world
    }
    
    spawnBullet(x, y, speed) {
        this.bulletFactory.spawnAsBullet(x, y);
    }
    
    update() {
        //Update all world entities
        this.player.update();
        this.bulletFactory.updateAllExists();
    }
}