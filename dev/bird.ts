/// <reference path="gameObject.ts"/>
/// <reference path="config/appVars.ts"/>

class Bird extends GameObject implements Subject {

    public poops: Array<PoopObject.Poop> = new Array<PoopObject.Poop>();

    public downSpeed: number = 0;
    public upSpeed: number = 0;
    public leftSpeed: number = 0;
    public rightSpeed: number = 0;

    private game: Game;
    private poop: PoopObject.Poop;

    public behavior: BirdBehavior;

    public observers: Array<Observer> = new Array<Observer>();

    constructor(g: Game) {
        super("bird", document.getElementById("container"));
        this.x = 50;
        this.y = 100;

        this.game = g;

        this.width = 150;
        this.height = 120;

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        window.addEventListener("keydown", (e) => this.onKeyDown(e)); // ES6 arrow function ipv .bind
        window.addEventListener("keyup", (e) => this.onKeyUp(e)); // ES6 arrow function ipv .bind

        this.div.style.transform = "translate(" + this.x + "px,100px)";

        this.behavior = new Moving(this);
    }

    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case appVars.keys.UP:
                this.behavior.onUp();
                this.upSpeed = appVars.speeds.UP;
                break;
            case appVars.keys.DOWN:
                this.behavior.onDown();
                this.downSpeed = appVars.speeds.DOWN;
                break;
            case appVars.keys.LEFT:
                this.behavior.onLeft();
                this.leftSpeed = appVars.speeds.LEFT;
                break;
            case appVars.keys.RIGHT:
                this.behavior.onRight();
                this.rightSpeed = appVars.speeds.RIGHT;
                break;
            case appVars.keys.SPACE:
                this.behavior.onSpace();
                console.log('Poepje gemaakt');
                // this.game.poop = new Poop(this.x, this.y); // Poepje aanmaken.
                // this.poops.push(new PoopObject.Poop(this.x, this.y, this));
                break;
        }
    }

    // speed op 0 als de eigen keys zijn losgelaten
    private onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case appVars.keys.UP:
                this.upSpeed = appVars.speeds.IDLE;
                break;
            case appVars.keys.DOWN:
                this.downSpeed = appVars.speeds.IDLE;
                break;
            case appVars.keys.LEFT:
                this.leftSpeed = appVars.speeds.IDLE;
                break;
            case appVars.keys.RIGHT:
                this.rightSpeed = appVars.speeds.IDLE;
                break;
        }
    }

    // bewegen - let op, de update functie wordt door game aangeroepen! niet door de event listener (dat is niet smooth)
    public update(): void {
        // let targetY = this.y - this.upSpeed + this.downSpeed;
        // if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150) this.y = targetY;

        // let targetX = this.x + this.rightSpeed - this.leftSpeed;
        // if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.x = targetX;

        this.behavior.birdAction();

        for (var i = 0; i < this.poops.length; i++) {
            this.poops[i].move();
        }

        this.draw();

        if (this.y < 100) {
            for (var i = 0; i < this.observers.length; i++) {
                this.observers[i].notify();
            }
        }
    }

    public draw(): void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";

        this.drawHeight();
    }

    public subscribe(o: Observer) {
        // console.log('Subscribed!');
        this.observers.push(o);
    }

    public unsubscribe(o: Observer): void {
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i] == o) {
                this.observers.splice(i, 1);
            }
        }
        // console.log('Unsubscribed!');
    }

    private drawHeight() {
        // Draw birds height here

        // Notitie van Lars: Isomer is niet herkenbaar omdat er geen defenition file is. 
        // Werkt verder prima alleen compiler heeft moeite mee!
        var iso = new Isomer(document.getElementById("art"));

        var Shape = Isomer.Shape;
        var Point = Isomer.Point;

        var red = new Isomer.Color(160, 50, 60);
        var green = new Isomer.Color(37, 127, 49);
        var cube = Shape.Prism(Point.ORIGIN);

        if (this.y < 100) {
            console.log('Lager dan 100');
            iso.add(cube);
            iso.add(cube.translate(0, 0, 1.1));
            iso.add(cube.translate(0, 0, 2.2), red);
        } else if (this.y >= 100 && this.y < 250) {
            console.log('Tussen 100 en 250');
            iso.add(cube);
            iso.add(cube.translate(0, 0, 1.1), green);
            iso.add(cube.translate(0, 0, 2.2));
        } else if (this.y > 250) {
            console.log('Groter dan 250');
            iso.add(cube.translate(0, 0, 0.0), red);
            iso.add(cube.translate(0, 0, 1.1));
            iso.add(cube.translate(0, 0, 2.2));
        }

        // iso.add(cube);
        // /* These methods do not modify the
        // original shape/path/point */
        // iso.add(cube.translate(0, 0, 1.1), blue);
        // iso.add(cube.translate(0, 0, 2.2), red);  
    }
}

