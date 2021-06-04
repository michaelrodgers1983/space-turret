controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += 10
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += -10
})
let Cruiser = sprites.create(assets.image`-`, SpriteKind.Player)
let Turret = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . c c c c . . . . . . 
    . . . . . . c a a c . . . . . . 
    . . . . . c a b b a c . . . . . 
    . . . . . c a b b a c . . . . . 
    . . . . . . c a a c . . . . . . 
    . . . . . . . c c . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.player1.moveSprite(Cruiser, 70, 0)
tiles.setTilemap(tilemap`level1 -`)
tiles.placeOnTile(Cruiser, tiles.getTileLocation(5, 59))
let Turret_Angle = 0
forever(function () {
    scene.centerCameraAt(0, Cruiser.y - 30)
    Cruiser.setVelocity(0, -20)
    Turret.setPosition(Cruiser.x, Cruiser.y - -20)
    transformSprites.rotateSprite(Turret, Turret_Angle)
})
