class Coin extends MovableObject {

    Images_Coin = ['./img/8_coin/coin_1.png'];


    constructor() {
        super();
        this.loadImage('./img/8_coin/coin_1.png');
        this.x = 10 + Math.random() * 3500;
        this.y = 150 + Math.random() * 50;
        this.height = 130;
        this.width = 130;
    }
}