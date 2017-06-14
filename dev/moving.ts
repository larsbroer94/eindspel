class Moving implements BirdBehavior {
    bird: Bird;
    
    constructor(b : Bird) {
        this.bird = b;
    }

    birdAction() {
        let targetY = this.bird.y - this.bird.upSpeed + this.bird.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150) this.bird.y = targetY;

        let targetX = this.bird.x + this.bird.rightSpeed - this.bird.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.bird.x = targetX;

    }

    onSpace() {
        this.bird.behavior = new Pooping(this.bird);
    }
    onRight() {

    }
    onLeft() {

    }
    onUp() {

    }
    onDown() {

    }
}