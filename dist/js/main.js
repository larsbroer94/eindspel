var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    appVars.keys = {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
    };
    appVars.speeds = {
        UP: 7,
        DOWN: 7,
        LEFT: 10,
        RIGHT: 5,
        IDLE: 0,
    };
    return appVars;
}());
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = this;
        _super.call(this, "bird", document.getElementById("container"));
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.x = 50;
        this.y = 100;
        this.width = 150;
        this.height = 120;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this.div.style.transform = "translate(" + this.x + "px,100px)";
    }
    Bird.prototype.onKeyDown = function (event) {
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
        var targetY = this.y - this.upSpeed + this.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight - 150)
            this.y = targetY;
        var targetX = this.x + this.rightSpeed - this.leftSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50)
            this.x = targetX;
        this.draw();
    };
    Bird.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
    };
    return Bird;
}(GameObject));
var TrafficObject = (function (_super) {
    __extends(TrafficObject, _super);
    function TrafficObject(tag, yPos, g) {
        _super.call(this, tag, document.getElementById("container"));
        this.speed = 0;
        this.yPos = 0;
        this.tag = tag;
        this.speed = 4;
        this.y = this.yPos = yPos;
        this.g = g;
        this.x = 800;
        this.move();
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
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.activeGame = true;
        this.bird = new Bird();
        this.signCreator();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bird.update();
        this.trafficObject.move();
        if (this.collisionCheck(this.trafficObject, this.bird))
            this.endGame();
        if (this.activeGame == true) {
            this.score++;
            document.getElementById("score").innerHTML = "Score : " + this.score;
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        this.activeGame = false;
        console.log('collision');
        document.getElementById("score").innerHTML = "Score : " + this.score + " Game over!";
    };
    Game.prototype.signCreator = function () {
        this.randomNumber = Math.round(Math.random() * 10);
        console.log(this.randomNumber);
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
    new Game();
});
var TrafficLight = (function (_super) {
    __extends(TrafficLight, _super);
    function TrafficLight(g) {
        _super.call(this, "trafficlight", 0, g);
        this.width = 149;
        this.height = 200;
    }
    return TrafficLight;
}(TrafficObject));
var TrafficSign = (function (_super) {
    __extends(TrafficSign, _super);
    function TrafficSign(g) {
        _super.call(this, "trafficsign", 310, g);
        this.width = 204;
        this.height = 204;
    }
    return TrafficSign;
}(TrafficObject));
//# sourceMappingURL=main.js.map