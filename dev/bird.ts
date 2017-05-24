/// <reference path="gameObject.ts"/>
/// <reference path="config/appVars.ts"/>

class Bird extends GameObject {

    private downSpeed: number = 0;
    private upSpeed: number = 0;
    private leftSpeed: number = 0;
    private rightSpeed: number = 0;

    constructor() {
        super("bird", document.getElementById("container"));
        this.x = 50;
        this.y = 100;

        this.width = 150;
        this.height = 120;

        // hier een keypress event listener toevoegen. een keypress zorgt dat braking true wordt
        window.addEventListener("keydown", (e) => this.onKeyDown(e)); // ES6 arrow function ipv .bind
        window.addEventListener("keyup", (e) => this.onKeyUp(e)); // ES6 arrow function ipv .bind

        this.div.style.transform = "translate(" + this.x + "px,100px)";

    }

    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case appVars.keys.UP:
                this.upSpeed = appVars.speeds.UP;
                break;
            case appVars.keys.DOWN:
                this.downSpeed = appVars.speeds.DOWN;
                break;
            case appVars.keys.LEFT:
                this.leftSpeed = appVars.speeds.LEFT;
                break;
            case appVars.keys.RIGHT:
                this.rightSpeed = appVars.speeds.RIGHT;
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
        let targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150) this.y = targetY;

        let targetX = this.x + this.rightSpeed - this.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.x = targetX;

        this.draw();
    }

    public draw(): void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
    }
}

