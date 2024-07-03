class CoinBar extends DrawableObject{

    Images_Coins = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',

    ];


    constructor(){
        super();
        this.loadImages(this.Images_Coins);
        this.x = 20;
        this.y = 120;
        this.width = 200;
        this.height = 65;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Coins[this.resolveImageIndex()]
        this.img = this.imageCache[path];
        
    }

    resolveImageIndex() {
        if (this.percentage >= 80) {
            return 0;
        } else if (this.percentage >= 60) {
            return 1;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 3;
        } else if (this.percentage > 0) {
            return 4;
        } else {
            return 5;
        }
    }

    collectCoin() {
        this.percentage += 20;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }
}