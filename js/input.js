function input(player){
    if (keys.up.isDown) { player.up(); }
    if (keys.down.isDown) { player.down(); }
    if (keys.left.isDown) { player.left(); }
    if (keys.right.isDown) { player.right(); }
    
    if (keys.space.isDown) { player.attack(); }
}