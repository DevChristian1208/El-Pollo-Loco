class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -10;

    Images_Endboss = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    Images_Walking_Endboss = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    isDead = false;
    walking = false;
    speed = 1.5; 

    constructor(){
        super().loadImage('./img/4_enemie_boss_chicken/2_alert/G5.png'); 
        this.loadImages(this.Images_Endboss);
        this.loadImages(this.Images_Walking_Endboss);
        this.x = 3900; 
        this.animate();
    }

    animate(){
        this.walkingInterval = setInterval(() => {
            if (!this.isDead && this.walking) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                if (this.walking) {
                    this.playAnimation(this.Images_Walking_Endboss);
                } else {
                    this.playAnimation(this.Images_Endboss);
                }
            }
        }, 200); 
    }

    moveLeft() {
        this.x -= this.speed;
    }

    startWalking() {
        this.walking = true;
    }

    die() {
        this.isDead = true;
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        setTimeout(() => {
            this.markForRemoval();
        }, 1000); 
    }

    markForRemoval() {
        this.toBeRemoved = true; 
    }
}
