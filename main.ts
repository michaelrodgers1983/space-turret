namespace SpriteKind {
    export const Flame = SpriteKind.create()
    export const Asteroid = SpriteKind.create()
    export const Lava_Bot = SpriteKind.create()
    export const Fireball = SpriteKind.create()
    export const Enemy_Projectile = SpriteKind.create()
    export const Spike_bot = SpriteKind.create()
}
function Level_restart () {
    if (Level == 1) {
        Game_start()
        Level_1()
    }
    if (Level == 2) {
        Game_start()
        Level_2()
    }
    if (Level == 3) {
        Game_start()
        Level_3()
    }
    if (Level == 4) {
        Game_start()
        Level_4()
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Lava_Bot, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    music.smallCrash.play()
    info.changeScoreBy(10)
})
function Level_1 () {
    game.splash("Level One")
    Level = 1
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
        tiles.placeOnTile(value, tiles.getTileLocation(randint(0, 5), randint(0, 35)))
        value.setVelocity(randint(30, 60), 0)
        value.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Spike_bot, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser_death()
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Turret_laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . 3 a a 3 . . . . . . 
        . . . . . . a 2 2 a . . . . . . 
        . . . . . . 3 a a 3 . . . . . . 
        . . . . . . . 3 3 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Turret, Turret_VX, Turret_VY)
    music.playMelody("C5 C5 B A G G G G ", 2000)
    pause(200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Asteroid, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    music.smallCrash.play()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Fireball, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser_death()
})
sprites.onOverlap(SpriteKind.Lava_Bot, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser_death()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile21`, function (sprite, location) {
    game.splash("Level three complete")
    game.splash("Now entering level four")
    Level_4()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    game.splash("Level One complete")
    game.splash("Now entering level two")
    Level_2()
})
function Level_4 () {
    Level = 4
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    game.splash("Level two complete")
    game.splash("Now entering level three")
    Level_3()
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += 10
})
sprites.onOverlap(SpriteKind.Flame, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser_death()
})
scene.onOverlapTile(SpriteKind.Asteroid, assets.tile`myTile18`, function (sprite, location) {
    sprite.destroy()
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Repeated, function () {
    Turret_Angle += -10
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Fireball, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    music.smallCrash.play()
    info.changeScoreBy(10)
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    Turret_Angle += -10
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    Cruiser_laser = sprites.createProjectileFromSprite(img`
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
    music.playMelody("F F F E D C C C ", 2000)
    pause(1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy_Projectile, function (sprite, otherSprite) {
    Cruiser_death()
})
function Game_start () {
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
    Turret_Angle = 0
    Turret_VY = -200
    Turret_VX = 0
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Flame, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    music.smallCrash.play()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Asteroid, SpriteKind.Player, function (sprite, otherSprite) {
    Cruiser_death()
})
function Level_3 () {
    game.splash("Level Three")
    Level = 3
    for (let value of sprites.allOfKind(SpriteKind.Lava_Bot)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Fireball)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Spike_bot)) {
        value.destroy()
    }
    tiles.setTilemap(tilemap`level4`)
    tiles.placeOnTile(Cruiser, tiles.getTileLocation(7, 58))
    for (let index = 0; index < 40; index++) {
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
}
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Repeated, function () {
    Turret_Angle += 10
})
function Level_2 () {
    game.splash("Level Two")
    Level = 2
    for (let value of sprites.allOfKind(SpriteKind.Asteroid)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Flame)) {
        value.destroy()
    }
    tiles.setTilemap(tilemap`level2`)
    tiles.placeOnTile(Cruiser, tiles.getTileLocation(7, 58))
    for (let index = 0; index < 10; index++) {
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
            `, SpriteKind.Lava_Bot)
    }
    for (let value of sprites.allOfKind(SpriteKind.Lava_Bot)) {
        tiles.placeOnTile(value, tiles.getTileLocation(4, 44))
        value.setVelocity(randint(-30, 30), randint(-30, 30))
        value.setBounceOnWall(true)
    }
    for (let index = 0; index < 10; index++) {
        Fireballer = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            5 . . . . 5 . . . . 5 . . . . 5 
            . . . 5 . 5 5 5 . 5 5 5 5 . . . 
            . . 5 5 5 5 5 5 5 4 4 5 5 5 5 . 
            . 5 5 5 5 5 4 4 5 4 4 4 4 4 5 . 
            . . . 5 5 4 4 4 4 4 4 4 4 5 5 . 
            . . 5 5 5 4 4 2 2 2 2 4 4 5 . . 
            . . 5 5 4 4 2 2 2 2 4 4 4 5 5 . 
            . . . 5 5 4 2 2 2 2 4 4 4 5 5 . 
            . 5 5 5 4 4 2 2 2 2 2 4 4 4 5 5 
            . 5 5 4 4 4 4 2 2 4 4 4 4 4 5 5 
            . . 5 5 5 4 4 4 4 4 4 4 4 5 5 . 
            . . . . 5 4 4 4 4 4 5 5 5 5 5 . 
            . . . . 5 5 5 5 5 5 5 5 . . . . 
            . . 5 . . . . 5 5 5 5 . . . . . 
            . . . . . . . . . . . . . 5 . . 
            `, SpriteKind.Fireball)
    }
    for (let value of sprites.allOfKind(SpriteKind.Fireball)) {
        tiles.placeOnTile(value, tiles.getTileLocation(randint(1, 8), randint(16, 34)))
    }
    for (let index = 0; index < 10; index++) {
        Fireballer = sprites.create(img`
            . . . . b b b b b b b b . . . . 
            . . . b 4 4 4 4 4 4 4 4 b . . . 
            . . b 4 4 b b 4 4 b b 4 4 b . . 
            . b 4 4 b 5 5 b b 5 5 b 4 4 b . 
            . b 4 b 4 b b 4 4 b b 4 b 4 b . 
            b 4 4 b 4 4 4 4 4 4 4 4 b 4 4 b 
            b 4 b . b 4 4 4 4 4 4 b . b 4 b 
            b 4 b . . b b b b b b . . b 4 b 
            . b 4 b . . . . . . . . b 4 b . 
            . . b 4 b . . . . . . b 4 b . . 
            . . . b . . . . . . . . b . . . 
            . . b b b . . . . . . b b b . . 
            . . b d b . . . . . . b d b . . 
            . . . d . . . . . . . . d . . . 
            . . . d . . . . . . . . d . . . 
            . . . d . . . . . . . . d . . . 
            `, SpriteKind.Spike_bot)
    }
    for (let value of sprites.allOfKind(SpriteKind.Spike_bot)) {
        tiles.placeOnTile(value, tiles.getTileLocation(5, 4))
        value.setVelocity(randint(10, 50), 0)
        value.setBounceOnWall(true)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Spike_bot, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    music.smallCrash.play()
    info.changeScoreBy(10)
})
function Cruiser_death () {
    Cruiser.destroy(effects.fire, 500)
    Turret.destroy(effects.fire, 500)
    music.bigCrash.play()
    scene.cameraShake(4, 500)
    pause(1000)
    Level_restart()
}
let Fire: Sprite = null
let Fireballer: Sprite = null
let Lava_Bot: Sprite = null
let Cruiser_laser: Sprite = null
let Turret_Angle = 0
let Turret_VY = 0
let Turret_VX = 0
let Turret: Sprite = null
let Turret_laser: Sprite = null
let Asteroid: Sprite = null
let Cruiser: Sprite = null
let Level = 0
Game_start()
Level_1()
game.onUpdateInterval(1000, function () {
    if (Level == 2) {
        for (let value of sprites.allOfKind(SpriteKind.Fireball)) {
            Fire = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 2 4 4 2 . . . . . . 
                . . . . . 2 4 5 5 4 2 . . . . . 
                . . . . 2 4 5 5 5 4 2 . . . . . 
                . . . . . 2 4 4 5 4 2 . . . . . 
                . . . . . . 2 2 4 2 . . . . . . 
                . . . . . . . . 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, value, randint(-30, 30), randint(-30, 30))
            Fire.setKind(SpriteKind.Enemy_Projectile)
        }
    }
})
forever(function () {
    if (Turret_Angle == 0) {
        Turret_VX = 0
        Turret_VY = -200
    }
    if (Turret_Angle == 10) {
        Turret_VX = 20
        Turret_VY = -180
    }
    if (Turret_Angle == 20) {
        Turret_VX = 40
        Turret_VY = -160
    }
    if (Turret_Angle == 30) {
        Turret_VX = 60
        Turret_VY = -140
    }
    if (Turret_Angle == 40) {
        Turret_VX = 80
        Turret_VY = -120
    }
    if (Turret_Angle == 50) {
        Turret_VX = 100
        Turret_VY = -100
    }
    if (Turret_Angle == 60) {
        Turret_VX = 120
        Turret_VY = -80
    }
    if (Turret_Angle == 70) {
        Turret_VX = 140
        Turret_VY = -60
    }
    if (Turret_Angle == 80) {
        Turret_VX = 160
        Turret_VY = -40
    }
    if (Turret_Angle == 90) {
        Turret_VX = 200
        Turret_VY = -20
    }
})
forever(function () {
    if (Turret_Angle == 0) {
        Turret_VX = 0
        Turret_VY = -200
    }
    if (Turret_Angle == -10) {
        Turret_VX = -20
        Turret_VY = -180
    }
    if (Turret_Angle == -20) {
        Turret_VX = -40
        Turret_VY = -160
    }
    if (Turret_Angle == -30) {
        Turret_VX = -60
        Turret_VY = -140
    }
    if (Turret_Angle == -40) {
        Turret_VX = -80
        Turret_VY = -120
    }
    if (Turret_Angle == -50) {
        Turret_VX = -100
        Turret_VY = -100
    }
    if (Turret_Angle == -60) {
        Turret_VX = -120
        Turret_VY = -80
    }
    if (Turret_Angle == -70) {
        Turret_VX = -140
        Turret_VY = -60
    }
    if (Turret_Angle == -80) {
        Turret_VX = -160
        Turret_VY = -40
    }
    if (Turret_Angle == -90) {
        Turret_VX = -200
        Turret_VY = -20
    }
})
forever(function () {
    scene.centerCameraAt(0, Cruiser.y - 30)
    Cruiser.setVelocity(0, -20)
    Turret.setPosition(Cruiser.x, Cruiser.y - -20)
    transformSprites.rotateSprite(Turret, Turret_Angle)
})
forever(function () {
	
})
