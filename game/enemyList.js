class enemyList {
    constructor() {
        this.list = [];
    }
    addEnemy() {
        let temp = new Enemy(true);
        this.list.push(temp);
    }


    addFriend() {
        let temp = new Enemy(false);
        this.list.push(temp);
    }

    move() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].move();
        }
    }

    checkClick(mousePos) {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].checkClick(mousePos);
        }
    }

    getFaster() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].getFaster();
        }
    }

}