var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, parent) {
        this._x = 0;
        this._y = 0;
        this.width = 0;
        this.height = 0;
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var appVars = (function () {
    function appVars() {
    }
    return appVars;
}());
appVars.keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
};
appVars.speeds = {
    UP: 7,
    DOWN: 7,
    LEFT: 10,
    RIGHT: 5,
    IDLE: 0,
};
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird(g) {
        var _this = _super.call(this, "bird", document.getElementById("container")) || this;
        _this.poops = new Array();
        _this.downSpeed = 0;
        _this.upSpeed = 0;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.observers = new Array();
        _this.x = 50;
        _this.y = 100;
        _this.game = g;
        _this.width = 150;
        _this.height = 120;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        _this.div.style.transform = "translate(" + _this.x + "px,100px)";
        _this.behavior = new Moving(_this);
        return _this;
    }
    Bird.prototype.onKeyDown = function (event) {
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
                break;
        }
    };
    Bird.prototype.onKeyUp = function (event) {
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
    };
    Bird.prototype.update = function () {
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
    };
    Bird.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
        this.drawHeight();
    };
    Bird.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Bird.prototype.unsubscribe = function (o) {
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i] == o) {
                this.observers.splice(i, 1);
            }
        }
    };
    Bird.prototype.drawHeight = function () {
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
        }
        else if (this.y >= 100 && this.y < 250) {
            console.log('Tussen 100 en 250');
            iso.add(cube);
            iso.add(cube.translate(0, 0, 1.1), green);
            iso.add(cube.translate(0, 0, 2.2));
        }
        else if (this.y > 250) {
            console.log('Groter dan 250');
            iso.add(cube.translate(0, 0, 0.0), red);
            iso.add(cube.translate(0, 0, 1.1));
            iso.add(cube.translate(0, 0, 2.2));
        }
    };
    return Bird;
}(GameObject));
var PoopObject;
(function (PoopObject) {
    var Poop = (function (_super) {
        __extends(Poop, _super);
        function Poop(x, y, bird) {
            var _this = _super.call(this, "poop", document.getElementById("container")) || this;
            _this.g = 0;
            _this.speed = 4;
            _this.x = x;
            _this.y = y;
            _this.move();
            _this.bird = bird;
            _this.bird.subscribe(_this);
            return _this;
        }
        Poop.prototype.move = function () {
            if (this.speed == 0) {
                this.bird.unsubscribe(this);
            }
            this.x -= this.speed;
            this.y += this.g;
            this.g = 9.81;
            if (this.y + 150 > document.getElementById("container").clientHeight) {
                this.speed = 0;
                this.g = 0;
            }
            this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
        };
        Poop.prototype.notify = function () {
            this.speed = 50;
            console.log('Notified');
        };
        return Poop;
    }(GameObject));
    PoopObject.Poop = Poop;
})(PoopObject || (PoopObject = {}));
var TrafficObject = (function (_super) {
    __extends(TrafficObject, _super);
    function TrafficObject(tag, yPos, g) {
        var _this = _super.call(this, tag, document.getElementById("container")) || this;
        _this.speed = 0;
        _this.yPos = 0;
        _this.tag = tag;
        _this.speed = 4;
        _this.y = _this.yPos = yPos;
        _this.g = g;
        _this.x = 800;
        _this.move();
        return _this;
    }
    TrafficObject.prototype.move = function () {
        this.x -= this.speed;
        this.div.style.transform = "translate(" + this.x + "px," + this.yPos + "px)";
        if (this.x <= -400) {
            this.g.signCreator();
            this.div.remove();
        }
    };
    return TrafficObject;
}(GameObject));
var GameActive;
(function (GameActive) {
    GameActive[GameActive["YES"] = 0] = "YES";
    GameActive[GameActive["NO"] = 1] = "NO";
})(GameActive || (GameActive = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.activeGame = GameActive.YES;
        this.bird = new Bird(this);
        this.signCreator();
        requestAnimationFrame(function () { return _this.gameLoop(); });
        if (this.activeGame == GameActive.YES) {
            console.log('The game is now playing');
        }
        else {
            console.log('The game has not started yet.');
        }
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bird.update();
        this.trafficObject.move();
        if (this.collisionCheck(this.trafficObject, this.bird))
            this.endGame();
        if (this.activeGame == GameActive.YES) {
            this.score++;
            document.getElementById("score").innerHTML = "Score : " + this.score;
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.endGame = function () {
        this.activeGame = GameActive.NO;
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : " + this.score + " Game over!";
    };
    Game.prototype.signCreator = function () {
        this.randomNumber = Math.round(Math.random() * 10);
        if (this.randomNumber <= 5) {
            this.trafficObject = new TrafficSign(this);
        }
        else if (this.randomNumber > 5) {
            this.trafficObject = new TrafficLight(this);
        }
    };
    Game.prototype.collisionCheck = function (c1, c2) {
        return !(c2.x > c1.x + c1.width ||
            c2.x + c2.width < c1.x ||
            c2.y > c1.y + c1.height ||
            c2.y + c2.height < c1.y);
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Moving = (function () {
    function Moving(b) {
        this.bird = b;
    }
    Moving.prototype.birdAction = function () {
        var targetY = this.bird.y - this.bird.upSpeed + this.bird.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150)
            this.bird.y = targetY;
        var targetX = this.bird.x + this.bird.rightSpeed - this.bird.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50)
            this.bird.x = targetX;
    };
    Moving.prototype.onSpace = function () {
        this.bird.behavior = new Pooping(this.bird);
    };
    Moving.prototype.onRight = function () {
    };
    Moving.prototype.onLeft = function () {
    };
    Moving.prototype.onUp = function () {
    };
    Moving.prototype.onDown = function () {
    };
    return Moving;
}());
var Pooping = (function () {
    function Pooping(b) {
        this.bird = b;
    }
    Pooping.prototype.birdAction = function () {
    };
    Pooping.prototype.onSpace = function () {
        this.bird.poops.push(new PoopObject.Poop(this.bird.x, this.bird.y, this.bird));
    };
    Pooping.prototype.onRight = function () {
        this.bird.behavior = new Moving(this.bird);
    };
    Pooping.prototype.onLeft = function () {
        this.bird.behavior = new Moving(this.bird);
    };
    Pooping.prototype.onUp = function () {
        this.bird.behavior = new Moving(this.bird);
    };
    Pooping.prototype.onDown = function () {
        this.bird.behavior = new Moving(this.bird);
    };
    return Pooping;
}());
var TrafficLight = (function (_super) {
    __extends(TrafficLight, _super);
    function TrafficLight(g) {
        var _this = _super.call(this, "trafficlight", 0, g) || this;
        _this.width = 149;
        _this.height = 200;
        return _this;
    }
    return TrafficLight;
}(TrafficObject));
var TrafficSign = (function (_super) {
    __extends(TrafficSign, _super);
    function TrafficSign(g) {
        var _this = _super.call(this, "trafficsign", 310, g) || this;
        _this.width = 204;
        _this.height = 204;
        return _this;
    }
    return TrafficSign;
}(TrafficObject));
//# sourceMappingURL=main.js.map