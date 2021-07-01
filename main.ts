namespace SpriteKind {
    export const Flame = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const Lava_Bot = SpriteKind.create()
}
function Level_1 () {
    tiles.setTilemap(tilemap`level1 -`)
    tiles.placeOnTile(Cruiser, tiles.getTileLocation(5, 59))
    for (let index = 0; index < 30; index++) {
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
            `, SpriteKind.Asteroid)
    }
    for (let value of sprites.allOfKind(SpriteKind.Asteroid)) {
        tiles.placeOnTile(value, tiles.getTileLocation(randint(0, 10), randint(19, 50)))
        value.setVelocity(randint(0, 10), randint(40, 50))
        value.setBounceOnWall(true)
    }
    for (let index = 0; index < 30; index++) {
        Asteroid = sprites.create(img`
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
            `, SpriteKind.Flame)
    }
    for (let value of sprites.allOfKind(SpriteKind.Flame)) {
        tiles.placeOnTile(value, tiles.getTileLocation(randint(0, 10), randint(0, 50)))
        value.setVelocity(randint(30, 60), 0)
        value.setBounceOnWall(true)
    }
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . 1 3 3 1 . . . . . . 
        . . . . . 1 3 a a 3 1 . . . . . 
        . . . . 1 3 a 2 2 a 3 1 . . . . 
        . . . . 1 3 a 2 2 a 3 1 . . . . 
        . . . . . 1 3 a a 3 1 . . . . . 
        . . . . . . 1 3 3 1 . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        `, Turret, Turret_VX, Turret_VY)
    pause(200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Asteroid, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(10)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    game.splash("Level one complete")
    game.splash("Now entering level two")
    Level_2()
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += 10
    Turret_VX += 22
    Turret_VY += -22
})
sprites.onOverlap(SpriteKind.Flame, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser.destroy(effects.fire, 500)
    Turret.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    pause(1000)
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Asteroid, assets.tile`myTile18`, function (sprite, location) {
    sprite.destroy()
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += -10
    Turret_VX += -22
    Turret_VY += 22
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
    pause(1000)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Flame, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Asteroid, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser.destroy(effects.fire, 500)
    Turret.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    pause(1000)
    game.over(false)
})
function Level_2 () {
    tiles.setTilemap(tilemap`level2`)
}
let Laser: Sprite = null
let projectile: Sprite = null
let Asteroid: Sprite = null
let Turret_VX = 0
let Turret_VY = 0
let Turret: Sprite = null
let Cruiser: Sprite = null
Cruiser = sprites.create(assets.image`-`, SpriteKind.Player)
Turret = sprites.create(img`
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
Turret_VY = -200
Turret_VX = 0
Level_1()
forever(function () {
    scene.centerCameraAt(0, Cruiser.y - 30)
    Cruiser.setVelocity(0, -20)
    Turret.setPosition(Cruiser.x, Cruiser.y - -20)
    transformSprites.rotateSprite(Turret, Turret_Angle)
})
