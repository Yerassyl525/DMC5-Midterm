const MAX_HP = 100;
const MIN_DAMAGE = 10;
const MAX_DAMAGE = 20;

let danteHP = MAX_HP;
let demonHP = MAX_HP;
let gameOver = false;

const danteText = document.getElementById("danteHP");
const demonText = document.getElementById("demonHP");
const danteBar = document.getElementById("danteBar");
const demonBar = document.getElementById("demonBar");
const message = document.getElementById("message");
const attackButton = document.getElementById("attack");
const restartButton = document.getElementById("restart");

function updateScreen() {
    danteText.textContent = danteHP;
    demonText.textContent = demonHP;

    danteBar.style.width = danteHP + "%";
    demonBar.style.width = demonHP + "%";
}

function randomDamage() {
    return Math.floor(Math.random() * (MAX_DAMAGE - MIN_DAMAGE + 1)) + MIN_DAMAGE;
}

function finishGame() {
    gameOver = true;
    attackButton.disabled = true;
}

attackButton.addEventListener("click", function() {
    if (gameOver) {
        return;
    }

    const damage = randomDamage();
    demonHP = Math.max(0, demonHP - damage);

    if (demonHP === 0) {
        message.textContent = "Dante wins! Press Restart to play again.";
        finishGame();
    } else {
        const demonDamage = randomDamage();
        danteHP = Math.max(0, danteHP - demonDamage);

        if (danteHP === 0 && demonHP === 0) {
            message.textContent = "It's a draw! Press Restart.";
            finishGame();
        } else if (danteHP === 0) {
            message.textContent = "Dante is defeated! Press Restart.";
            finishGame();
        } else {
            message.textContent = "Dante dealt " + damage +
                " damage. Demon dealt " + demonDamage + " damage.";
        }
    }

    updateScreen();
});

restartButton.addEventListener("click", function() {
    danteHP = MAX_HP;
    demonHP = MAX_HP;
    gameOver = false;

    attackButton.disabled = false;
    message.textContent = "The battle begins!";

    updateScreen();
});

updateScreen();