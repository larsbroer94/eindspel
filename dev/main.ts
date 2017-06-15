/// <reference path="bird.ts"/>
/// <reference path="poop.ts"/>
/// <reference path="trafficObject.ts"/>

        enum GameActive {
            YES,
            PAUZE,
            NO
        }

class Game {
    private bird : Bird;
    private trafficObject : TrafficObject;
    public poop : PoopObject.Poop;
    private randomNumber : number;

    private score : number = 0;
    private activeGame : GameActive = GameActive.YES;

    public static instance : Game;

    public static getInstance() : Game {

        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    private constructor() {
        this.bird = new Bird(this); // 'this' niet meer meegegeven, werd niet gebruikt.
        this.signCreator();
        requestAnimationFrame(() => this.gameLoop());

        if(this.activeGame == GameActive.YES) {
            console.log('The game is now playing');
        } else {
            console.log('The game has not started yet.');
        }
    }

    private gameLoop(){
        this.bird.update();
        this.trafficObject.move();

        // CollisionCheck
        if(this.collisionCheck(this.trafficObject, this.bird)) this.endGame();

        // Score add
        if (this.activeGame == GameActive.YES) {
            this.score ++;
            document.getElementById("score").innerHTML = "Score : "+ this.score;
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    public endGame(){
        
        this.activeGame = GameActive.NO;
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : "+ this.score +" Game over!";
    }

    public signCreator() {
        this.randomNumber = Math.round(Math.random() * 10);
        // console.log(this.randomNumber);

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