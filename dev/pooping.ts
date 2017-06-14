class Pooping implements BirdBehavior {
    bird: Bird;
    
    constructor(b : Bird) {
        this.bird = b;
    }

    birdAction() {  
        // for (var i = 0; i < this.bird.poops.length; i++) {
        //     this.bird.poops[i].move();
        // }
    }

    onSpace() {
        this.bird.poops.push(new PoopObject.Poop(this.bird.x, this.bird.y, this.bird));
    }
    onRight() {
        this.bird.behavior = new Moving(this.bird);
    }
    onLeft() {
        this.bird.behavior = new Moving(this.bird);
    }
    onUp() {
       this.bird.behavior = new Moving(this.bird); 
    }
    onDown() {
        this.bird.behavior = new Moving(this.bird);
    }
}