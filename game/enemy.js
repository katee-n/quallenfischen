class Enemy {
    constructor(enemy) {
        this.enemy = enemy;
        if (enemy) {
            switch (randomNum(1, 3)) {
                case 1:
                    this.pic = "enemies/enemy_1.png";
                    this.points = 20;
                    break;
                case 2:
                    this.pic = "enemies/enemy_2.png";
                    this.points = 10;
                    break;
                case 3:
                    this.pic = "enemies/enemy_3.png";
                    this.points = 50;
                    break;
                default:
                    this.pic = null;
            }
        } else {
            switch (randomNum(4, 6)) {
                case 4:
                    this.pic = "friends/pearl.png";
                    break;
                case 5:
                    this.pic = "friends/sandy.png";
                    break;
                case 6:
                    this.pic = "friends/mrsPuff.png";
                    break;
                default:
                    this.pic = null;
            }
        }
        this.mpNum = randomNum(1, 4);
        this.speed = 1;
        this.respawn();

        this.img = document.createElement("img");
        this.img.setAttribute("src", this.pic);
        this.img.setAttribute("class", "enemy-img");

        this.div = document.createElement('div');
        gameboard.appendChild(this.div);
        this.div.setAttribute("class", "enemy-div");
        this.div.appendChild(this.img);
    }



    move() {
        switch (this.mpNum) {
            case 1:
                this.posY += parseInt(this.speed);
                if (0 <= x && x <= 200) {
                    x += 2;
                    this.posX += 2;
                }
                if (x > 200) {
                    x = -200;
                }
                if (x < 0) {
                    this.posX += -2;
                    x = x + 2;
                }
                break;
            case 2:
                this.posY += parseInt(this.speed);
                if (0 <= x && x <= 200) {
                    x += 2;
                    this.posX += 2;
                }
                if (x > 200) {
                    x = -200;
                }
                if (x < 0) {
                    this.posX += -2;
                    x = x + 2;
                }
                break;
            case 3:
                this.posX += parseInt(this.speed);
                if (0 <= x && x <= 200) {
                    x += 2;
                    this.posY += 2;
                }
                if (x > 200) {
                    x = -200;
                }
                if (x < 0) {
                    this.posY += -2;
                    x = x + 2;
                }
                break;
            case 4:
                this.posX -= parseInt(this.speed);
                if (0 <= x && x <= 200) {
                    x += 2;
                    this.posY += 2;
                }
                if (x > 200) {
                    x = -200;
                }
                if (x < 0) {
                    this.posY += -2;
                    x = x + 2;
                }
                break;
            default:
        }

        if (this.posX < gameboard.offsetLeft || this.posX > gameboard.offsetWidth + gameboard.offsetLeft - 50 || this.posY < gameboard.offsetTop || this.posY > gameboard.offsetHeight + gameboard.offsetTop - 50) {
            this.respawn();
        }

        this.div.style.left = this.posX + 'px';
        this.div.style.top = this.posY + 'px';
    }

    respawn() {
        this.posX = randomNum(gameboard.offsetLeft, gameboard.offsetLeft + gameboard.offsetWidth);
        this.posY = randomNum(gameboard.offsetTop, gameboard.offsetTop + gameboard.offsetHeight);
    }

    checkClick(mousePos) {
        let xDiff = Math.abs(this.posX - mousePos.mouseX);
        let yDiff = Math.abs(this.posY - mousePos.mouseY);

        if (xDiff < 50 && yDiff < 50) {
            this.respawn();

            if (this.enemy) {
                updateScore(this.points);
                audioBubble.play();
            } else {
                updateLifes(-1);
                wrongHit.play();
            }

        }

        // console.log('diff  x: ' + xDiff + ' y: ' + yDiff);
    }

    getFaster() {
        this.speed++;
    }
}

var x = 0;