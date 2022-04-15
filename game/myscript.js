
const gameboard = document.getElementById('gameboard');
var audioTheme = new Audio('sounds/theme.mp3');
audioTheme.volume = 0.1;
var audioBubble = new Audio('sounds/bubble.mp3');
var wrongHit = new Audio('sounds/auch.mp3');
var badEndViolin = new Audio('sounds/badEnd.mp3')
badEndViolin.volume = 0.2;
var footer = document.getElementById('footer')

var parameters = {
    player: 0,
    background: 0,
    difficulty: 0,
    score: 0,
    lifes: 3,
    cUrl: 0
}

var timeLeft = 10;

var mousePos = {
    mouseX: 0,
    mouseY: 0
}
//Get Mouseclick Position am Gameboard

var eList = new enemyList();

function getClickPos(event) {
    mousePos.mouseX = event.clientX;
    mousePos.mouseY = event.clientY;
    console.log('click  x: ' + mousePos.mouseX + 'y: ' + mousePos.mouseY);
    eList.checkClick(mousePos);
}
gameboard.addEventListener('click', getClickPos);

function choosePlayer(player) {
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    let p3 = document.getElementById("p3");

    switch (player) {
        case 1:
            parameters.player = "Spongebob";
            parameters.cUrl = "url('spieler/spong_small.png'),auto";
            p1.className = "spieler selected";
            p2.className = "spieler";
            p3.className = "spieler";
            break;
        case 2:
            parameters.player = "Patrick";
            parameters.cUrl = "url('spieler/patrick_small.png'),auto"
            p1.className = "spieler";
            p2.className = "spieler selected";
            p3.className = "spieler";
            break;
        case 3:
            parameters.player = "Thaddäus";
            parameters.cUrl = "url('spieler/taddl_small.png'),auto";
            p1.className = "spieler ";
            p2.className = "spieler";
            p3.className = "spieler selected";
            break;
        default:
            parameters.player = null;
    }
    console.log(parameters.player + ' is selected');
}

function chooseLevel(background) {
    let l1 = document.getElementById("l1");
    let l2 = document.getElementById("l2");
    let l3 = document.getElementById("l3");
    switch (background) {
        case 1:
            parameters.background = "Bikini Bottom";
            parameters.difficulty = 1;
            l1.className = "level selected";
            l2.className = "level";
            l3.className = "level";
            break;
        case 2:
            parameters.background = "die Goo Lagoon";
            parameters.difficulty = 2;
            l1.className = "level ";
            l2.className = "level selected";
            l3.className = "level";
            break;
        case 3:
            parameters.background = "unser Zuhause";
            parameters.difficulty = 3;
            l1.className = "level";
            l2.className = "level";
            l3.className = "level selected";
            break;
        default:
            parameters.background = null;
    }
    console.log(parameters.background + ' is selected');
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//Game

function prepareGameboard() {
    audioTheme.play();

    footer.children[0].innerHTML = "<img src='mr_krabs/krabs_3.png' alt='krabs_3'></img>"
    footer.children[1].innerHTML = "<h2>Mr. Krabs</h2><p> Danke <b>" + parameters.player + "</b>, dass du uns hilft <b>" + parameters.background + "</b> zu retten!</p> <p> Die Spielregeln sind einfach: Fange in der angegebenen Zeit so viele Quallen wie möglich und lass unsre Freunde in Ruhe! <b>Viel Glück!</b></p>"

    gameboard.style.backgroundImage = "url('scenes/" + parameters.background + ".png')";
    gameboard.innerHTML = "<div class='stats'>                                                        <div id = 'score'> Score: 0 Pkt. </div><div id = 'lifes' > Leben: " + parameters.lifes + " ❤" + "</div> <div id='timer'> Zeit: 00:00</div>";
    gameboard.className = "gameboard-2"
    changeCursor();

    switch (parameters.difficulty) {
        case 1:
            //easy level
            eList.addEnemy();
            timeLeft = 5 * 60;
            break;
        case 2:
            //moderate level
            eList.addEnemy();
            eList.addEnemy();
            eList.addFriend();
            timeLeft = 2 * 60;
            break;
        case 3:
            //hard level
            eList.addEnemy();
            eList.addEnemy();
            eList.addEnemy();
            eList.addFriend();
            eList.addFriend();
            eList.addFriend();
            timeLeft = 20;
            break;
        default:
    }

    setInterval(loop, 20);
    setInterval(updateTimer, 1000);


}

function updateScore(points) {
    parameters.score += points;
    document.getElementById("score").innerHTML = "Score: " + parameters.score + " Pkt.";

    if (parameters.score >= 500) {
        happyEnd();
    } else if (parameters.score >= 400) {
        eList.addEnemy();
        eList.getFaster();
    } else if (parameters.score >= 300) {
        eList.addEnemy();
        eList.addFriend();
    } else if (parameters.score >= 200) {
        eList.addEnemy();
        eList.addFriend();
    } else if (parameters.score >= 100) {
        eList.addEnemy();
    }



}

function updateLifes(lifes) {
    parameters.lifes += lifes;
    document.getElementById("lifes").innerHTML = "Leben: " + parameters.lifes + " ❤";

    switch (parameters.lifes) {
        case 0:
            badEnd();

            break;
        case 1:
            footer.children[0].innerHTML = "<img src='mr_krabs/krabs_2.png' alt='krabs_2'></img>";
            footer.children[1].innerHTML = "<h2>Mr. Krabs</h2><p>" + parameters.player + " du machst mich ein wenig nevös!</b>!!!.</p> <p> Du hast nur mehr ein Leben... </p> <p><b>Verlierst du es ist es vorbei!</b></p>";
            eList.getFaster();
            break;
        case 2:
            footer.children[0].innerHTML = "<img src='mr_krabs/krabs_1.png' alt='krabs_2'></img>";
            footer.children[1].innerHTML = "<h2>Mr. Krabs</h2><p>" + parameters.player + " pass gefälligst auf wenn du da fängst!!!</p> <p> Willst du, dass die Quallen Marmelade aus uns machen?</p> <p><b>Verliere nicht zu viele Leben!</b></p>";
            eList.getFaster();
            eList.getFaster();
            break;
        default:

    }
}

function loop() {
    eList.move();
}

function changeCursor() {
    gameboard.style.cursor = parameters.cUrl;
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerHTML = "Zeit: " + minutes + ":" + seconds;
    timeLeft--;

    if (minutes == 0 && seconds == 0) {
        badEnd();
    }

}


function badEnd() {
    gameboard.className = "gameboard-2 gameboard-lose"
    gameboard.innerHTML = "<div class='message'> <p> Game Over! </p></div><button class='button1' onclick='reload()'>Try again</button> ";
    footer.children[0].innerHTML = "<img src='mr_krabs/krabs_violin.gif' alt='badEnd'></img>";
    footer.children[1].innerHTML = "<h2>Mr. Krabs</h2><p>Du konntest " + parameters.background + " leider nicht retten " + parameters.player + ".";
    badEndViolin.play();
    audioTheme.pause();

}

function happyEnd() {
    gameboard.style.backgroundImage = "none";
    gameboard.innerHTML = "<video autoplay> <source src='videos/happyEnd.mp4' type='video/mp4'></video> <div class='message-1'> <p> YOU WON! </p></div></div><button class='button1 free' onclick='reload()'>Play again</button>";
    footer.children[0].innerHTML = "<img src='mr_krabs/krabs_party.gif' alt='goodEnd'></img>";
    footer.children[1].innerHTML = "<h2>Mr. Krabs</h2><p>" + parameters.player + ", du hast es geschafft! </p> <p> Du hast " + parameters.background + " gerettet! <b> DANKE! </b>";


}

function reload() {
    window.location.reload(false);
}

