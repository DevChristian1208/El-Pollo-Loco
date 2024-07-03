class SmallChicken extends MovableObject {
    y = 380;
    width = 50;
    height = 40;
    Images_Walking_Chicken_Small = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    Images_Dead_Chicken_Small = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    isDead = false;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.Images_Walking_Chicken_Small);
        this.loadImages(this.Images_Dead_Chicken_Small);
        this.x = 500 + Math.random() * 3500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.Images_Walking_Chicken_Small);
            }
        }, 200);
    }

    die() {
        this.isDead = true;
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.Images_Dead_Chicken_Small[0]);
        setTimeout(() => {
            this.markForRemoval();
        }, 1000); // Setzen Sie die Verzögerung zurück auf 1000, um das Bild anzuzeigen
    }

    markForRemoval() {
        this.toBeRemoved = true; 
    }
}
