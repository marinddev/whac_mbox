`use strict`;

let currMoleTile;
let currmBoxTile;
let score = 0;
let gameOver = false;

const playBtn = document.getElementById('play');
const gameSec = document.getElementById('game-section');

window.onload = function() {
    playBtn.addEventListener('click', function() {
        playBtn.classList.toggle('hidden');
        gameSec.classList.toggle('hidden');
        playGun();
        playMusic();

        setGame();
    })
}



function playMusic() {
    let audio = new Audio("./assets/striker.mp3");
    audio.volume = 0.01;
    audio.play()
}

function playGun() {
    let audio = new Audio("./assets/gunshot.mp3");
    audio.volume = 0.09;
    audio.play()
}

function playMbox() {
    let audio = new Audio("./assets/cheeseburger1.mp3");
    audio.volume = 0.05;
    audio.play()
}

function playMoan() {
    let audio = new Audio("./assets/moan.mp3");
    audio.volume = 0.05;
    audio.play()
}


function setGame() {
    //set up the grid for the game board in html
    for (let i = 0; i < 9; i++) {

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setInterval(setMole, 1500);
    setInterval(setMbox, 800);

}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {

    if (gameOver) {
        currMoleTile.innerHTML = "";
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./assets/ang.jpg";

    let num = getRandomTile();
    if (currmBoxTile && currmBoxTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setMbox() {

    if (gameOver) {
        currmBoxTile.innerHTML = "";
        return;
    }

    if (currmBoxTile) {
        currmBoxTile.innerHTML = "";
    }

    let mbox = document.createElement("img");
    mbox.src = "./assets/mbox.jpg";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currmBoxTile = document.getElementById(num);
    currmBoxTile.appendChild(mbox);
}

function selectTile() {

    if (gameOver) {
        return;
    }

    if (this == currmBoxTile) {
        playMbox();
        score += 10;
        document.getElementById("score").innerText = score.toString()
    } else if (this == currMoleTile) {
        playMoan();
        document.getElementById("score-element").innerText = "GAME OVER! FINAL SCORE: " + score.toString();
        gameOver = true;
    }
}