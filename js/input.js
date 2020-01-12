//Reads the input of the player and tells the player class to perform those actions.

function input(player){
    
    //Input for when the player uses a computer keyboard.
    if (keys.up.isDown) { player.up(); }
    if (keys.down.isDown) { player.down(); }
    if (keys.left.isDown) { player.left(); }
    if (keys.right.isDown) { player.right(); }
    
    if (keys.space.isDown) { player.attack(); }
    
    
    //Input for when the player attempts to control the player using a cursor.
    //Either using a mouse on a computer or using touch commands on a mobile device.
    
    var pointer = game.input.activePointer;
    var camera = game.cameras.main;
    
    var xDistance = Math.abs((pointer.x + camera.scrollX) - player.x);
    var yDistance = Math.abs((pointer.y + camera.scrollY) - player.y);
    
    if (pointer.isDown) {
        if (xDistance > 30) {
            if (pointer.x + camera.scrollX < player.x) { player.left(); }
            if (pointer.x + camera.scrollX > player.x) { player.right(); }}
        if (yDistance > 30) {
            if (pointer.y + camera.scrollY < player.y) { player.up(); }
            if (pointer.y + camera.scrollY > player.y) { player.down(); }}
        player.attack();
    }
}