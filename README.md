# Review Matthijs Perik

Het eindproduct voldoet zeker aan de eisen, en Lars is al goed op weg.
Het deelproduct bevat alleen nog niet alle programmeerprincipes. De singleton en strategy patterns ontbreken nog (Singleton heb ik erbij geschreven als toevoeging).

# EndGame Lars Broer

### UML
Onderstaand is een UML te vinden.

![UML](UML.png?raw=true "UML")

Wat op dit moment af is:
- Alles, alleen is er geen Human meer gemaakt.

# Installatie instructies
In mijn project is als Library Isomer gebruikt. Hier hoef je geen extra dingen voor te doen. Dus het is een kwestie van forken en openen. Ook is hij te spelen via de live omgeving van Github.

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

# Programmeerprincipes toegepast

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
