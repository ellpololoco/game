const ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 30;
const STRONG_ATTACK = 50;
const STRONG_MONSTER_ATTACK = 40;
const healValue = 20;

// variables for LOGS
const log_player_attack = 'Player Attack';
const log_player_strong_attack = 'Player Strong Attack';
const log_player_heal = 'Player Heal/Monster Heal';
const log_monster_attack = 'Monster Attack';
const log_strong_monster_attack = 'Monster Strong Attack';
const log_game_over = 'Game Over'

let battleLog = [];

//game rules alert
alert("Game rules:- \n 1. Bonus life will be given only once until you refresh the page. \n 2. There's a heal button but it'll heal monster also.")

// getting user inpput

enteredInput = prompt('Please enter your life and monster life. (Both will be the same)','ex. - 100');
let chosenMaxLife = parseInt(enteredInput);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonusLife = true;

adjustHealthBars(chosenMaxLife);

// resetting game function

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// function for normal attack

function attackHandler(){
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -=damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeLog(log_player_attack,playerDamage,currentPlayerHealth,currentMonsterHealth);
    checkResult();
}

// function for strong attack

function strongAttack (){
    const damage = dealMonsterDamage(STRONG_ATTACK);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(STRONG_MONSTER_ATTACK);
    currentPlayerHealth -= playerDamage;
    writeLog(log_player_strong_attack,playerDamage,currentPlayerHealth,currentMonsterHealth);
    checkResult();
}

//function to heal player

function healingPlayerHandler(){
    if (currentPlayerHealth >= chosenMaxLife) {
        alert("Full health, can't heal more.");
    }
    else{
        increasePlayerHealth(healValue);
        currentPlayerHealth += healValue;
        increaseMonsterHealth(healValue);
        currentMonsterHealth += healValue;
        writeLog(log_player_heal,healValue,currentPlayerHealth,currentMonsterHealth);
    }
}


// Check if you win or lose 

function checkResult(){
    if (currentPlayerHealth <= 0 && bonusLife) {
        currentPlayerHealth = chosenMaxLife;
        bonusLife = false;
        removeBonusLife();
        increasePlayerHealth(chosenMaxLife);
        alert('No extra life left now.')
    }

    if (currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
        alert("You lose the game.");
        writeLog(log_game_over,'You Lose',currentPlayerHealth,currentMonsterHealth);
        reset();
    }
    else if (currentPlayerHealth > 0 && currentMonsterHealth <= 0) {
        alert("You win the game.");
        writeLog(log_game_over,'You Win',currentPlayerHealth,currentMonsterHealth);
        reset();
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("Game draw. Nice Try!");
        writeLog(log_game_over,'Draw',currentPlayerHealth,currentMonsterHealth);
        reset();
    }
}

if (currentPlayerHealth < 0 || currentMonsterHealth < 0) {
    reset();
}

// Write to log function

function writeLog(ev,val,playerHealth,monsterHealth){
    let logEntry = {
        event: ev,
        value: val,
        finalPlayerHealth: playerHealth,
        finalMonsterHealth: monsterHealth
    };
    if (ev === log_player_attack) {
        logEntry.target = 'Monster';
    }
    else if (ev === log_player_strong_attack) {
        logEntry.target = 'Monster 2x damage';
    }
    else if (ev === log_player_heal) {
        logEntry.target = 'Player Healed';
    }
    else if (ev === log_monster_attack) {
        logEntry.target = 'Player'
    }
    else if (ev === log_strong_monster_attack) {
        logEntry.target = 'Player 2x damage';
    }
    else if (ev === log_game_over) {
    }
    battleLog.push(logEntry);
}

function printWriteLog(){
    console.log(battleLog);
}


//button calls
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttack);
healBtn.addEventListener('click',healingPlayerHandler);
logBtn.addEventListener('click',printWriteLog)