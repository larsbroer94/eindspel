# EndGame Lars Broer

### UML
Onderstaand is een UML te vinden.

![UML](UML.png?raw=true "UML")

Wat op dit moment af is:
- Game.ts
- GameObject.ts
- Bird.ts
- TrafficObject.ts
- TrafficSign.ts
- TrafficLight.ts

Wat nog gedaan moet worden:
- Human.ts
- Poop.ts
- BirdBehaviour met Poop en Move

# Installatie instructies
Omdat het hier gaat om een simpele typescript game zonder libraries is het een kwestie van forken en openen. Ook is hij te spelen via de live omgeving van Github.

# Programmeerprincipes toegepast

### Interface
Op dit moment is er nog geen interface gebruikt. Dit gaat echter plaatsvinden via het Strategy Pattern (zie UML).

### Static Utility Method
Op dit moment nog geen static utility method. 

### Singleton
Deze is as we speak in de maak, maar nog niet af dus niet mee gepusht. Nog kleine aanpassingen.

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
### peer review week 4

Het spel is een leuk spelletje en begint al goed vorm te krijgen.
En het project ziet er netjes opgebouwd uit. En via de UML is te zien wat je er nog bij gaat maken.

# Interface

Een interface zit er nog niet in maar dat wil je gaan doen bij het gedrag van de vogel.
Of die gaat poepen of vliegen. Dat is een goede optie

Maar je zou ook evt een interface kunnen gebruiken bij de objecten waar je niet tegen aan mag botsen. Omdat er van die object telkens nieuwe worden gemaakt en meerdere.
Daar zou je er ook voor kunnen kiezen om daar een interface te gebruiken.

# Singelthon

Op dit momnet zit er nog geen singelthon in het project. Ik zou er voor kiezen om singelthon te gebruiken bij je game classe zodat je die overal makkelijk kan aan roepen in het hele project. Ook omdat je je game class overal in je project gebruikt lijkt mij dat de beste optie.

# Encapsulation

Encapsulation heb je netjes gebruikt in je class gameObject je doet het nu alleen met 3 variabelen en dat zou met veel meer variabelen kunnen die je gebruikt in dit project. zoals de height en witdh die je in andere classes gebruikt.

# Inheritance
Je bent goed bezig met het extenden van classes maar ik denk dat je je class gameobject kan uit breiden om zo nog maar variballen op die manier te gebruiken. zoals de height, witdh, speed en de tag voor het div elemente. want die gebruik je in alle classes waar je het gameobject extend.

# colision
je colision werkt nu want hij detecteerd of je een object raakt. Je moet er alleen nog voor zorgen dat het spel stop was je iets raakt maar dat komt goed. 

Als je van je colision detectie een aparte class maakt kan je die voor alle botsingen gebruiken die er gebeuren in het spel. zodat je maar een keer een colision dectection hoeft te maken. Daar kan je 2 objecten heen sturen waarvan je wil kijken of ze elkaar rakken. 

# Aangepast in code
Ik heb in gameObject speed height en witdh toegevoegd zodat die ook ge extend worden.

een game.ts gemaakt en een main.ts

In game.ts een de evt code voor singelthon











