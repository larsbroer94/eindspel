/// <reference path="bird.ts"/>
/// <reference path="trafficObject.ts"/>

class Game {
    private bird : Bird;
    private trafficObject : TrafficObject;
    private randomNumber : number;

    private score : number = 0;
    private activeGame : boolean = true;

    public static instance : Game;

    public static getInstance() : Game {

        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    private constructor() {
        this.bird = new Bird(); // 'this' niet meer meegegeven, werd niet gebruikt.
        this.signCreator();
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.bird.update();
        this.trafficObject.move();

        // CollisionCheck
        if(this.collisionCheck(this.trafficObject, this.bird)) this.endGame();

        // Score add
        if (this.activeGame == true) {
            this.score ++;
            document.getElementById("score").innerHTML = "Score : "+ this.score;
        }

        // Gameloop
        requestAnimationFrame(() => this.gameLoop());

    }

    public endGame(){
        this.activeGame = false;
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : "+ this.score +" Game over!";
    }

    public signCreator() {
        
        this.randomNumber = Math.round(Math.random() * 10);
        console.log(this.randomNumber);

        if (this.randomNumber <= 5) 
        {
            this.trafficObject = new TrafficSign(this);
        } 
        
        else if (this.randomNumber > 5)
        {
            this.trafficObject = new TrafficLight(this);
        }
    }

    // Changed type to GameObject, so you can check any object against any other object.
    // Also moved width/height properties to GameObject class.
    collisionCheck(c1:GameObject, c2:GameObject): boolean {
        return !(c2.x > c1.x + c1.width || 
                 c2.x + c2.width < c1.x || 
                 c2.y > c1.y + c1.height || 
                 c2.y + c2.height < c1.y);
    }
} 


// load
window.addEventListener("load", function() {
    Game.getInstance();
});