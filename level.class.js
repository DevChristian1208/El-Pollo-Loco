class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 4000;

    constructor(enemies, clouds, backgroundObjects, bottles, coins, fullScreenIcon ){
       this.enemies = enemies;
       this.clouds = clouds;
       this.backgroundObjects = backgroundObjects;
       this.bottles = bottles;
       this.coins = coins;

    }
}