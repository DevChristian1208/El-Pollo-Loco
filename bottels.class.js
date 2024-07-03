class Bottles extends MovableObject {

    Images_Bottle = ['./img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];


    constructor() {
        super();
        this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 50 + Math.random() * 3500;
        this.y = 340;
        this.height = 90;
        this.width = 90;
    }
}