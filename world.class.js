class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    endBossBar = new EndBossBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    throwableObject = [];

    bottle_sound = new Audio('./audio/109796_605248-lq.mp3');
    coin_sound = new Audio('./audio/347174_6324381-lq.mp3');
    colliding_enemy = new Audio('./audio/386651_3905081-lq.mp3');
    background_music = new Audio('./audio/488368_10182789-lq.mp3');
    background_music_Endboss = new Audio ('./audio/493918_781461-lq.mp3');
    isBackgroundMusicPlaying = false;

    // Neu hinzugefügt
    canThrowBottle = true; 
    throwCooldown = 500; // 500 ms Cooldown für Flaschenwurf

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.startBackgroundMusic();
    }

    setWorld() {
        this.character.world = this;
        this.endBoss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    startBackgroundMusic() {
        this.background_music.loop = true;
        this.background_music.play();
        this.isBackgroundMusicPlaying = true;
    }

    run() {
        setInterval(() => {
            if (!gameOver) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkBottles();
                this.checkCoins();
                this.checkEndBossProximity();
                this.removeMarkedObjects();
            }
        }, 10);
    }

    checkEndBossProximity() {
        if (this.character.x > 3000 && this.endBoss) {
            this.endBoss.startWalking();
            if (this.isBackgroundMusicPlaying) {
                this.background_music.pause();
                this.background_music_Endboss.loop = true;
                this.background_music_Endboss.play();
                this.isBackgroundMusicPlaying = false; // Update the flag
            }
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0 && this.canThrowBottle) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.bottles -= 1;
            this.bottleBar.updatePercentage(this.character.bottles); // Aktualisiere die BottleBar
            this.canThrowBottle = false; // Setze das Flag auf false
            setTimeout(() => {
                this.canThrowBottle = true; // Setze das Flag nach der Verzögerung zurück
            }, this.throwCooldown);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.isDead) {
                    return;
                }
    
                if (this.character.isJumpingOn(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                    enemy.die();
                } else {
                    console.log('Taking damage from enemy:', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    if (!this.character.isDead()) {
                        this.colliding_enemy.play();
                    }
                }
            }
        });
    }
    
    checkBottles() {
        this.level.bottles = this.level.bottles.filter(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.bottles += 1;
                if (!this.character.isDead()) {
                    this.bottle_sound.play();
                }
                this.bottleBar.updatePercentage(this.character.bottles); // Aktualisiere die BottleBar
                return false;
            }
            return true;
        });
    }

    checkCoins() {
        this.level.coins = this.level.coins.filter(coins => {
            if(this.character.isColliding(coins)) {
                this.character.coins += 1;
                if (!this.character.isDead()) {
                    this.coin_sound.play();
                }
                if(this.character.coins % 2 === 0) {
                    this.coinBar.collectCoin();
                }
                return false;
            }
            return true;
        });
    }

    draw() {
        if (gameOver) {
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endBossBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    stopAllSounds() {
        this.bottle_sound.pause();
        this.coin_sound.pause();
        this.colliding_enemy.pause();
        this.background_music.pause();
        this.background_music_Endboss.pause(); 
    }

    startAllSounds() {
        this.bottle_sound.play();
        this.coin_sound.play();
        this.colliding_enemy.play();
        this.background_music.play();
        this.background_music_Endboss.play(); 
    }

    removeMarkedObjects() {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.toBeRemoved);
    }
}
