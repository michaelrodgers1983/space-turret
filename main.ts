controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
	
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += 10
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    pause(1000)
    game.over(false)
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Repeated, function () {
    Turret_Angle += -10
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += -10
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . . 1 . . . . . . . . 1 . . . 
        . . . 9 . . . . . . . . 9 . . . 
        . . . 9 . . . . . . . . 9 . . . 
        . . . 6 . . . . . . . . 6 . . . 
        . . . 6 . . . . . . . . 6 . . . 
        . . . 6 . . . . . . . . 6 . . . 
        . . . 8 . . . . . . . . 8 . . . 
        . . . 8 . . . . . . . . 8 . . . 
        . . . 8 . . . . . . . . 8 . . . 
        . . . 8 . . . . . . . . 8 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Cruiser, 0, -200)
    pause(500)
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Repeated, function () {
    Turret_Angle += 10
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(10)
})
let Laser: Sprite = null
let Asteroid: Sprite = null
let Flamer: Sprite = null
let Lava_Bot: Sprite = null
let Cruiser: Sprite = null
Cruiser = sprites.create(assets.image`-`, SpriteKind.Player)
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
let Turret_Angle = 0
tiles.setTilemap(tilemap`level1 -`)
tiles.placeOnTile(Cruiser, tiles.getTileLocation(5, 59))
for (let index = 0; index < 8; index++) {
    Lava_Bot = sprites.create(img`
        . . . . . f . . . . f . . . . . 
        . . . . f 4 f f f f 4 f . . . . 
        . . . f 4 2 4 4 4 4 2 4 f . . . 
        . . f 4 2 f 2 2 2 2 f 2 4 f . . 
        . f 4 2 f 9 f 2 2 f 9 f 2 4 f . 
        . f 2 f 9 8 9 f f 9 8 9 f 2 f . 
        . f 2 4 f 9 f 4 4 f 9 f 4 2 f . 
        . f 2 2 4 f 4 2 2 4 f 4 2 2 f . 
        . f 4 2 2 4 2 2 2 2 4 2 2 4 f . 
        . . f 4 2 2 2 2 2 2 2 2 4 f . . 
        . . f f 4 4 4 4 4 4 4 4 f f . . 
        . . f . f f f f f f f f . f . . 
        . f f . . . . . . . . . . f f . 
        f 2 f . . . . . . . . . . f 2 f 
        f 2 2 f f . . . . . . f f 2 2 f 
        f f f f f f . . . . f f f f f f 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(Lava_Bot, tiles.getTileLocation(1, 18))
    Lava_Bot.setVelocity(50, 5)
    Lava_Bot.setBounceOnWall(true)
    pause(200)
}
for (let index = 0; index < 4; index++) {
    Flamer = sprites.create(img`
        . . . . . . . . . . f . . . . . 
        . . . f . . . . . f . . . . . . 
        . . . . f . . . f 5 f . . . . . 
        . . . . f f . . . f 5 f . . . . 
        . . . f 5 5 f . f 5 4 5 f . . . 
        . . . f 5 4 5 f 5 4 4 5 f . . . 
        . . f 5 4 4 4 5 4 4 2 4 5 f . . 
        . . f 5 4 2 4 4 4 2 4 4 5 f . . 
        . f 5 4 2 4 4 2 2 2 2 4 4 5 f . 
        . f 5 4 4 2 2 2 2 2 4 2 4 5 f . 
        . f 5 4 2 2 2 2 2 2 2 4 4 5 f . 
        . . f 5 4 2 2 2 2 2 2 4 5 f . . 
        . . f 5 4 2 2 2 2 2 4 4 5 f . . 
        . . . f 4 4 2 2 2 2 4 4 f . . . 
        . . . . f f 2 2 2 2 f f . . . . 
        . . . . . . f f f f . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(Flamer, tiles.getTileLocation(8, 7))
    Flamer.setVelocity(50, 0)
    Flamer.setBounceOnWall(true)
    pause(200)
}
for (let index = 0; index < 10; index++) {
    Asteroid = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f f f . . . . . 
        . . f . . . f f d d d f . . . . 
        . f d f f f d d b b b d f . . . 
        f d b d d d b b b b b d f . . . 
        f d b b b b b b a a b b d f . . 
        f d b b b a a a a a a b b d f . 
        . f d b a a a a c a a a b b d f 
        . f d b a a c c c c a a a b b f 
        . f b b a a c c c c a a b b f . 
        . . f a a a c c c c a a b f . . 
        . . f a c c c c c a f f f . . . 
        . . f a a c c c f f . . . . . . 
        . . . f f f f f . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(Asteroid, tiles.getTileLocation(4, 39))
    Asteroid.setVelocity(randint(30, 60), randint(1, 5))
    Asteroid.setBounceOnWall(true)
    pause(200)
}
forever(function () {
    scene.centerCameraAt(0, Cruiser.y - 30)
    Cruiser.setVelocity(0, -20)
    Turret.setPosition(Cruiser.x, Cruiser.y - -20)
    transformSprites.rotateSprite(Turret, Turret_Angle)
})
