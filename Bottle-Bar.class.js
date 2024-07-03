class BottleBar extends DrawableObject {
    Images_Bottle_Bar = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    ];

    constructor() {
        super();
        this.loadImages(this.Images_Bottle_Bar);
        this.x = 20;
        this.y = 60;
        this.width = 200;
        this.height = 65;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Bottle_Bar[this.resolveImageIndex()];
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

    collectBottle() {
        this.percentage += 20;
        if (this.percentage > 100) {
            this.percentage = 100;
        }
        this.setPercentage(this.percentage);
    }

    // Neue Methode zum Aktualisieren des Prozentsatzes basierend auf der Anzahl der Flaschen
    updatePercentage(bottles) {
        this.setPercentage((bottles / 5) * 100);
    }
}
