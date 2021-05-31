let Cruiser = sprites.create(assets.image`-`, SpriteKind.Player)
controller.player1.moveSprite(Cruiser, 70, 0)
tiles.setTilemap(tilemap`level1 -`)
tiles.placeOnTile(Cruiser, tiles.getTileLocation(5, 59))
Cruiser.setVelocity(0, -20)
forever(function () {
    scene.centerCameraAt(0, Cruiser.y - 45)
})
