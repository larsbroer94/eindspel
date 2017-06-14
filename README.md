# Review Matthijs Perik

Het eindproduct voldoet zeker aan de eisen, en Lars is al goed op weg.
Het deelproduct bevat alleen nog niet alle programmeerprincipes. De singleton en strategy patterns ontbreken nog (Singleton heb ik erbij geschreven als toevoeging).

# EndGame Lars Broer

### UML
Onderstaand is een UML te vinden.

![UML](UML.png?raw=true "UML")

Wat op dit moment af is:
- Alles, alleen is er geen Human meer gemaakt.

# Vereisten
- [x] Klassendiagram
- [x] Speelbare game met begin en eind, zonder bugs
- [x] Gebruik een Library
- [x] encapsulation, composition, inheritance (PRG 4)
- [x] Singleton
- [x] Observer
- [x] Strategy
- [x] interface
- [x] static
- [x] abstract
- [x] namespaces
- [x] polymorphism
- [x] enumeraties
- [x] Game Loop
- [x] Readme.md file waarin bovenstaande wordt toegelicht 

# Installatie instructies
In mijn project is als Library Isomer gebruikt. Hier hoef je geen extra dingen voor te doen. Dus het is een kwestie van forken en openen. Ook is hij te spelen via de live omgeving van Github.

# Programmeerprincipes toegepast
[Interface](https://github.com/larsbroer94/eindspel#interface),
[Static](https://github.com/larsbroer94/eindspel#static-utility-method),
[Abstract](https://github.com/larsbroer94/eindspel#abstract-class),
[Singleton](https://github.com/larsbroer94/eindspel#singleton),
[Strategy Pattern](https://github.com/larsbroer94/eindspel#strategy-pattern),
[Observer](https://github.com/larsbroer94/eindspel#observer),
[Namespaces](https://github.com/larsbroer94/eindspel#namespaces),
[Polymorphism](https://github.com/larsbroer94/eindspel#polymorphism),
[Enumerations](https://github.com/larsbroer94/eindspel#enumerations),
[Library](https://github.com/larsbroer94/eindspel#library),
[Game Loop](https://github.com/larsbroer94/eindspel#game-loop),
[Encapsulation](https://github.com/larsbroer94/eindspel#encapsulation),
[Inheritance](https://github.com/larsbroer94/eindspel#inheritance)

### Interface
```
interface BirdBehavior {
    bird : Bird;
    
    birdAction();
    onSpace();
    onRight();
    onLeft();
    onUp();
    onDown();
}
```
Hier is een interface gemaakt, die tegelijkertijd dient als een Strategy Pattern. Ook heb ik nog een interface bij Observer.

### Static Utility Method
```
public static instance : Game;
public static getInstance() : Game {

    if (!Game.instance) {
        Game.instance = new Game();
    }
    return Game.instance;
}
```
Voor mijn Singleton heb ik een static gebruikt.

### Abstract Class
```
abstract class GameObject {

......

}
```
Abstract Class is GameObject, teveel code om alles te kopieren in mijn ReadMe.

### Singleton
```
public static instance : Game;
public static getInstance() : Game {

    if (!Game.instance) {
        Game.instance = new Game();
    }
    return Game.instance;
}
```
```
// load
window.addEventListener("load", function() {
    Game.getInstance();
```
De Singleton in mijn Main.

### Strategy Pattern
```
interface BirdBehavior {
    bird : Bird;
    
    birdAction();
    onSpace();
    onRight();
    onLeft();
    onUp();
    onDown();
}
```
In Bird:
```
this.behavior = new Moving(this);
```

In Moving:
```
onSpace() {
    this.bird.behavior = new Pooping(this.bird);
}
```
Als Strategy Pattern heb ik BirdBehavior gemaakt die kan vliegen of poepen.

### Observer
In Bird:
```
public observers : Array<Observer> = new Array<Observer>();

        if (this.y < 100) {
            for(var i = 0; i < this.observers.length; i++) {
                this.observers[i].notify();
            }
        }

        public subscribe(o : Observer) {
        // console.log('Subscribed!');
        this.observers.push(o);
    }

    public unsubscribe(o : Observer): void {
        for(var i = 0; i < this.observers.length; i++) {
            if(this.observers[i] == o) {
                this.observers.splice(i, 1);
            }
        }
        // console.log('Unsubscribed!');
    }
```
In Poop:
```
public notify() {
    //Notify
    this.speed = 50;
    console.log('Notified');
}
```
Observer in mijn Bird, Notify in mijn poop.

### Namespaces
```
namespace PoopObject {
    export class Poop extends GameObject implements Observer {
```
Poop is een Namespace, genaamd nu 'PoopObject'. Is dus nu ook aan te roepen op de voglende manier:
```
private poop : PoopObject.Poop;
```
### Polymorphism
```
window.addEventListener("keydown", (e) => this.onKeyDown(e)); // ES6 arrow function ipv .bind
window.addEventListener("keyup", (e) => this.onKeyUp(e)); // ES6 arrow function ipv .bind
```
```
   private onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case appVars.keys.UP:
                this.behavior.onUp();
                this.upSpeed = appVars.speeds.UP;
                break;
        [......]
    }
```
Polymorphism gebruikt in het keyboardevent (Bewegen van vogel / poepen).

### Enumerations
```
        enum GameActive {
            YES,
            NO
        }

        private activeGame : GameActive = GameActive.YES;

        if(this.activeGame == GameActive.YES) {
            console.log('The game is now playing');
        } else {
            console.log('The game has not started yet.');
        }
```
Enumerations gebruikt bij het controleren of de game active is of niet. Kan je gebruiken als ik bijv zou willen dat er ook een pause functie komt. 

### Library
Als game library heb ik gekozen voor Isomer, een library gemaakt om objecten te creeëren. 
Links van het speelscherm zie je de 3 blokjes gecreeërd in een canvas m.b.v. Isomer.

Deze waarschuwen de speler dat je of te hoog, of te laag vliegt. In het spel veranderd ook de poepfunctie naar aanleiding van de hoogte van je vogel. 

Voor het gemak heb ik deze blokken getekend in de bird class, bij de update functie.
```
        var iso = new Isomer(document.getElementById("art"));  

        var Shape = Isomer.Shape;
        var Point = Isomer.Point;

        var red = new Isomer.Color(160, 50, 60);
        var green = new Isomer.Color(37, 127, 49);
        var cube = Shape.Prism(Point.ORIGIN);

        if(this.y < 100) {
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
```

Let op: Omdat ik geen defenitions map heb geeft hij aan dat hij Isomer niet herkent, maar dit is niet van toepassing.

### Game Loop
```
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
```
```
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
```
Gameloop gemaakt die zichzelf aanroept.

### Encapsulation
```
class Game {
    private bird : Bird;
    private trafficObject : TrafficObject;
    private randomNumber : number;

    private score : number = 0;
    private activeGame : boolean = true;
```
Private, Public en Protected (zie GameObject voor getters en setters.)

### Inheritance
```
class TrafficLight extends TrafficObject {
                   
    constructor(g : Game) {
        super("trafficlight", 0, g);
        this.width = 149;
        this.height = 200;
    }
}
```
Gebruik maken van extensions (overerving)

# Overige info
- Veel gezeur gehad met de vogel laten bewegen (smooth)
- Collision detection toegepast
- Gameloop gemaakt inclusief scores
- Gamefinish bij collision en score eindigen
- Randomizer signs
- Potentiele speed verhoging voor moeilijkheid

# Uitlichten code
### Collision Detection
```
    collisionCheck(c1:TrafficObject, c2:Bird): boolean {
        return !(c2.x > c1.x + c1.width || 
                 c2.x + c2.width < c1.x || 
                 c2.y > c1.y + c1.height || 
                 c2.y + c2.height < c1.y);
    }
} 
```

### Moving Bird
```
    public update(): void {
        let targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150) this.y = targetY;

        let targetX = this.x + this.rightSpeed - this.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.x = targetX;

        this.draw();
    }
```
