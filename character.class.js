class Character extends MovableObject {
    height = 250;
    y = 80;
    speed = 5;
    bottles = 0;
    coins = 0;
    energy = 100; 
    soundPlayed = false;

    Images_Walking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    Images_Jumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    Images_Dead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    Images_Hurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    currentImage = 0;
    keyboard;
    world;
    walking_sound = new Audio('./audio/698584_13033730-lq.mp3');
    jumping_sound = new Audio('./audio/350905_5450487-lq.mp3');
    dead_sound = new Audio('./audio/518307_2402876-lq.mp3');
    animationInterval;
    checkInterval;

    constructor(){
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png'); 
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);
        this.applyGravity();
        this.animate();
    }

    animate(){
        this.animationInterval = setInterval(() => {
            if (!this.isDead()) {
                this.walking_sound.pause();
                if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.walking_sound.play();
                }
                if(this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.walking_sound.play();
                }

                if(this.world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                    this.jumping_sound.play();
                }

                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);

        this.checkInterval = setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.Images_Dead);
                if (!this.soundPlayed) {
                    this.dead_sound.play();
                    this.soundPlayed = true;
                    this.world.stopAllSounds(); 
                    showGameOverImage();
                }
            } else {
                if(this.isHurt()) {
                    this.playAnimation(this.Images_Hurt);
                } else if(this.isAboveGround()) {
                    this.playAnimation(this.Images_Jumping);
                } else {
                    if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.playAnimation(this.Images_Walking);
                    }
                }
            }
        }, 50);
    }

    jump(){
        this.speedY = 30;
    }

    isDead() {
        return this.energy <= 0;
    }

isJumpingOn(enemy) {
    const verticalTolerance = 60; 
    const isFalling = this.speedY < 0;
    const horizontalOverlap = this.x + this.width > enemy.x && this.x < enemy.x + enemy.width;
    const verticalOverlap = this.y + this.height < enemy.y + verticalTolerance;

    return isFalling && horizontalOverlap && verticalOverlap;
}

}
