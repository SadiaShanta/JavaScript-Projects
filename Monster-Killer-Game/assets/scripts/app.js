const ATTACK_VALUE = 10;
const MONSTER_ATTACK_Value = 12;
const STRONG_ATTACK_VALUE = 14;
const HEAL_VALUE = 13;
const MODE_ATTACK = 'ATTACK';
const STRONG_MODE_ATTACK = 'STRONG_ATTACK'; 
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';



let chosenMaxLife;
let battleLog = [];
//take user input
function getMaxLifeValues(){
    const enteredHealth = prompt("Please enter maximum health for player and monster", "100");
    const parsedValue = parseInt(enteredHealth);
    //check user input is valid or not
    if(isNaN(parsedValue) || parsedValue <= 0){
        throw { message: 'Invalid user input, not a number! '};
    }
    return parsedValue;
}
//if try block is failed then catch block will execute 
try{
    chosenMaxLife = getMaxLifeValues();
} catch(error){
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value 100 is used')
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

//all the events values are setted 
function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry; //It's an object
    logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    }else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER';
    }else if (ev === LOG_EVENT_MONSTER_ATTACK){
        logEntry.target = 'PLAYER';
    }else if (ev === LOG_EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER';
    }
    battleLog.push(logEntry); 
}

//reset the player and monster health 
function reset()
{
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    //monster attack the player
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_Value);
    currentPlayerHealth =  currentPlayerHealth - playerDamage; 
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    //give a bonus life to the player if he has any
    if(currentPlayerHealth <= 0 && hasBonusLife){
        removeBonusLife();
        hasBonusLife =false;
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You are using your Bonus Life!');

    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You WON!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Player Won', currentMonsterHealth, currentPlayerHealth);
    }else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You LOST!');  
        writeToLog(LOG_EVENT_GAME_OVER, 'Player Lost', currentMonsterHealth, currentPlayerHealth);
    }else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert('DRAW!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Draw', currentMonsterHealth, currentPlayerHealth);
    }
    if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
        reset();
    }
}

//Player attack the monster
function attackMonster(mode){
    let damageType;
    let logEvent;
    if(mode === MODE_ATTACK){
        damageType = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    }else if(mode === STRONG_MODE_ATTACK){
        damageType = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const monsterDamage = dealMonsterDamage( damageType);
    currentMonsterHealth = currentMonsterHealth - monsterDamage; 
    writeToLog(logEvent, monsterDamage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(STRONG_MODE_ATTACK);
}
function healHealthHandler(){
    let healValue;
    if((currentPlayerHealth + HEAL_VALUE) >= chosenMaxLife){
        healValue = (chosenMaxLife-currentPlayerHealth);
        alert('You cannot heal more than your basic health.');
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth = currentPlayerHealth + healValue; 
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler(){
    console.log(battleLog);

    // for (let i=0; i < battleLog.length; i++){
    //     console.log(battleLog[i]);
    // }

    // let i = 0;
    // for(const logEntry of battleLog){
    //     console.log(logEntry);
    //     console.log(i);
    //     i++;
    // }
// Good to have while loop if some condition changes inside the loop and you don't know 
//  in advance how often you want to execute the loop
    let j = 3;
    do{
        console.log(j);
        j++;
    } while(j<3)

    let i = 0;
    for(const logEntry of battleLog){
        console.log('#s{i}');
        for (const key in logEntry){
            //key values are event value finalMonsterHealth finalPlayerHealth
            //console.log(key);
            // js extract the value stored in this constant "key" and then access the property with that name on logEntry
            //console.log(logEntry[key]);
            console.log(`${key} => ${logEntry[key]}`);
        }
       i++; 
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHealthHandler);
logBtn.addEventListener('click' , printLogHandler);