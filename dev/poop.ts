/// <reference path="gameObject.ts"/>

namespace PoopObject {
    export class Poop extends GameObject implements Observer {

        private speed:number;
        private g : number = 0;
        
        private bird : Bird;
                            
        constructor(x : number, y : number, bird : Bird) {
            super("poop", document.getElementById("container"));

            this.speed = 4;
            this.x = x;
            this.y = y;
            this.move();

            this.bird = bird;

            this.bird.subscribe(this);
        }

        public move():void {

            if(this.speed == 0) {
                this.bird.unsubscribe(this)
            }

            this.x -= this.speed;
            this.y += this.g;
            this.g = 9.81;

            if (this.y + 150 > document.getElementById("container").clientHeight){
                this.speed = 0;
                this.g = 0;
            } 

            //teken de div op de juiste positie
            this.div.style.transform ="translate("+ this.x +"px,"+ this.y +"px)";     
        }

        public notify() {
            //Notify
            this.speed = 50;
            console.log('Notified');
        }
    }
}