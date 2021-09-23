//! ======== Global Variables ========
//* ======== Global Variables ========
//? ======== Global Variables ========
const difficulty = {
    easy: 1,
    normal: 7,
    hard: 15,
    die: 30,        
}
let level = 1;
let currentTurn = {};
let currentTarget = {};
let turnOrder = [];

// ! ======== Math Stuff ========
// * ======== Math Stuff ========
// ? ======== Math Stuff ========

const rng = (x) => {
    return Math.floor(Math.random()*x)
}

const randomPercentMod = (value, mod) => {
    let moddedValue = 0;
    if (Math.random() > 0.5) {
        moddedValue = Math.floor(value + (value/100 * (Math.random() * mod)));
    } else {
        moddedValue = Math.floor(value - (value/100 * (Math.random() * mod)));
    }
    return moddedValue;
}

// ! ======== Rendering Section ========
// * ======== Rendering Section ========
// ? ======== Rendering Section ========

const InitializeRender = () => {
    renderWebsite();
}



// ! -- Render Website elements --

const renderWebsite = () => {
    const $body = $("body");
    $body.empty();
    const $overAllBackground = $("<div>").attr("id", "overallbackground");
    const $menu = $("<div>").attr("id", "menu");
    const $mainInterface = $("<div>").attr("id", "maininterface");
    const $turnOrder = $("<div>").attr("id", "turnorder");
    const $textForTurnOrder = $("<div>").text("- Turn Order -").css("text-align", "center");
    $turnOrder.append($textForTurnOrder);
    const $turnOrderContainer = $("<div>").addClass("turnordercontainer");
    $turnOrder.append($turnOrderContainer);

    $overAllBackground.append($menu).append($mainInterface).append($turnOrder);

    $body.append($overAllBackground);
    //! --->  start at x difficulty here
    
    const $startButton = $("<button>").on("click", startGame(difficulty.easy)).text("Easy").addClass("startgamebutton");
    const $startButton1 = $("<button>").on("click", startGame(difficulty.normal)).text("Normal").addClass("startgamebutton");
    const $startButton2 = $("<button>").on("click", startGame(difficulty.hard)).text("Hard").addClass("startgamebutton");
    const $startbutton3 = $("<button>").on("click", startGame(difficulty.die)).text("Insane").addClass("startgamebutton");
    $mainInterface.append($startButton);
    $mainInterface.append($startButton1);
    $mainInterface.append($startButton2);
    $mainInterface.append($startbutton3);
}

// ! -- Render Game elements --
const startGame = (diff) => () => {
    // console.log(`current difficulty is set to: ${diff}`);
    $("#menu").append(($("<h5>").text(`current difficulty is set to: ${diff}`)));
    // console.log("Game is starting");
    $("#menu").append(($("<h5>").text("Game is starting!")));
    $("#maininterface").empty();
    renderGameBaseElements();
    players = generatePlayers(level);
    enemies = generateMonsters(diff);
    renderParty();
    renderMonsters();
    renderUI();
    updateTurnOrder(players, enemies);
    renderTurnOrder();
}

const renderGameBaseElements = () => {
    const $mainInterface = $("#maininterface");
    const $background = $("<div>").addClass("container").attr("id", "background");
    const $enemyHpContainer = $("<div>").addClass("characters").attr("id", "enemyHPcontainer");
    const $enemyContainer = $("<div>").addClass("characters").attr("id", "enemycontainer");
    const $arrowContainer = $("<div>").addClass("characters").attr("id", "arrowcontainer");
    const $playerContainer = $("<div>").addClass("characters").attr("id", "playercontainer");
    const $uiContainer = $("<div>").addClass("characters").attr("id", "uicontainer")
    const $uiCommands = $("<div>").addClass("uimenu").attr("id", "uicommands");
    const $uiPlayerInfo = $("<div>").addClass("uimenu").attr("id", "uiplayerinfo");

    $uiContainer.append($uiCommands).append($uiPlayerInfo);
    $background.append($enemyHpContainer).append($enemyContainer).append($arrowContainer).append($playerContainer).append($uiContainer);
    $mainInterface.append($background);

}

const renderUI = () => {
    const $uiCommands = $("#uicommands");
    $uiCommands.empty();
    const $attackButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsattack").text("Attack").on("click", basicAttack);
    const $skillButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsskills").text("Skill").on("click", renderSkillsUI);
    const $itemButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsitems").text("Item");
    const $runButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsrun").text("Run").on("click", renderLoseState);
    $uiCommands.append($attackButton);
    $uiCommands.append($skillButton);
    $uiCommands.append($itemButton);
    $uiCommands.append($runButton);
    
}

const renderSkillsUI = (e) => {
    const $newSkillsDiv = $("<div>").attr("class", "skillsdiv");
    const $newBackButton = $("<button>").attr("class", "backbutton").text("x").on("click", unRenderSkillsUI);
    const $skillButton = $(e.target);
    $skillButton.append($newSkillsDiv);
    $skillButton.append($newBackButton);
    $skillButton.off();
    for (key in currentTurn.skills) {
        const $newSkill = $("<div>").text(key).on("click", currentTurn.skills[key]).on("click", renderUI).addClass("skillbox");
        $newSkillsDiv.append($newSkill);
    }
}

const unRenderSkillsUI = () => {
    $("#uibuttonsskills").empty();
    $("#uibuttonsskills").text("Skill").on("click", renderSkillsUI);
}


const renderWinState = () => {
    const $background = $("#background");
    $background.empty();
    $background.append($("<h1>").text("YOU WIN!").css("color", "white"));
    $tryAgainButton = $("<button>").text("Go again!").on("click", renderWebsite).addClass("startgamebutton");
    $background.append($tryAgainButton);
}

const renderLoseState = () => {
    const $background = $("#background");
    $background.empty();
    $background.append($("<h1>").text("YOU LOSE!").css("color", "white"))
    $tryAgainButton = $("<button>").text("Retry?").on("click", renderWebsite).addClass("startgamebutton");
    $background.append($tryAgainButton);
}

const renderTurnOrder = () => {
    setTimeout(() => {
        const $turnOrderContainer = $(".turnordercontainer");
        $turnOrderContainer.empty();
        for (objectWithin of turnOrder) {
            const $turnOrderCurrent = $("<div>").addClass("followingturndisplay");
            const $turnOrderCurrentPortrait = $("<div>").addClass(`${objectWithin.name}portrait`);
            const $turnOrderCurrentName = $("<h5>").text(`${objectWithin.name}`);
            $turnOrderCurrent.append($turnOrderCurrentPortrait).append($turnOrderCurrentName);
            $turnOrderContainer.prepend($turnOrderCurrent);
        }
        const $turnOrderCurrent = $("<div>").addClass("currentturndisplay");
        const $turnOrderCurrentPortrait = $("<div>").addClass(`${currentTurn.name}portrait`);
        const $turnOrderCurrentName = $("<h5>").text(`${currentTurn.name}`);
        $turnOrderCurrent.append($turnOrderCurrentPortrait).append($turnOrderCurrentName);
        $turnOrderContainer.prepend($turnOrderCurrent);
    }, 500)
}

const appendToCombatLog = (damageText, onkillText) => {
    setTimeout(() => {
    $("#menu").prepend(($("<h5>").text(damageText)));
    if (currentTarget.hp.currentHp <= 0) {
        $("#menu").prepend(($("<h5>").text(onkillText)));
    }
}, 500)
}
// ! ======== Game-State Section ========
// * ======== Game-State Section ========
// ? ======== Game-State Section ========

const updateGameState = () => {
    setTimeout(() => {
        if (checkWinState() === "WIN") {
            renderWinState();
        }
        else if (checkWinState() === "LOSE") {
            renderLoseState();
        } else {
            renderParty();
            renderMonsters();
            updateTurnOrder(players, enemies);
            renderTurnOrder();
        }
    }, 400)
}

const updateTurnOrder = (players, enemies) => {
    if (turnOrder.length === 0) { // if the round isnt over yet...
        for (const x in players) {
            const currentplayer = players[x];
            const isAlive = (currentplayer) => {return currentplayer.hp.currentHp > 0};
            if (isAlive(currentplayer)) { // push players that aren't dead into the turnOrder array
                turnOrder.push(currentplayer);
            }
        }
        for (const x in enemies) {
            if (enemies[x].hp.currentHp > 0) {// push monsters that aren't dead into the turnOrder array
                const currentEnemy = enemies[x];
                turnOrder.push(currentEnemy);
                currentEnemy.aiTarget();
                if (currentEnemy.target.name != null) {
                    // console.log(`${enemies[x].name} is looking at ${enemies[x].target.name}...`);
                    $enemyTargetText = $("<h5>").text(`${currentEnemy.name} is looking at ${currentEnemy.target.name}...`);
                    $("#menu").prepend($enemyTargetText);
                }
            }
        }
        //sort turnOrder array by speed, lowest to highest
        //speed +/- 15% for some variance
        turnOrder.sort( (a, b) => {
            let moddedSpeedA = randomPercentMod(a.spd, 15);
            let moddedSpeedB = randomPercentMod(b.spd, 15)
            if (moddedSpeedA > moddedSpeedB) {return 1}
            else if (moddedSpeedA < moddedSpeedB) {return -1}
            else return 0;
        })
    }
    // before the next guy can take their turn, check for dead people
    checkDeaths();
    // progress turn order
    // console.log(turnOrder);
    currentTurn = turnOrder.pop();
    // if it's the player's turn, highlight them
    if (currentTurn === players.warrior || currentTurn === players.mage || currentTurn === players.thief) {
        $(currentTurn.displayElement).toggleClass("infocus");
    } else { //! if it's not the player's turn, fire off the monster's turn
        randomMonsterSkill(currentTurn);
        updateGameState();
    }

}


const checkDeaths = () => {
//removes dead characters from turn order immediately
    for (x in turnOrder) {
        // console.log(`for-in ${x}`);
        // console.log(turnOrder[x]);
        if (turnOrder[x].hp.currentHp <= 0) {
            turnOrder[x].hp.currentHp = 0;
            turnOrder.splice(x, 1);
        }
    }
}

const checkWinState = () => {
    let enemyDeadCount = 0;
    let playerDeadCount = 0;
    for (x in players) {
        if (players[x].hp.currentHp <= 0) {
            playerDeadCount++;
        }
    }
    for (x in enemies) {
        if (enemies[x].hp.currentHp <= 0) {
            enemyDeadCount++;
        }
    }
    if (playerDeadCount === 3) {
        // console.log("YOU LOSE");
        return "LOSE";
        
    }
    if (enemyDeadCount === 3) {
        // console.log("YOU WIN");
        return "WIN";
    }
}

const targetUpdate = (e) => {
    currentTarget = enemies[`${e.target.id}`];
}

calcHpMpChanges = (HpOrMp, valueToChangeBy, target) => {
    //! don't forget, positive valueToChange = deduction. That's normal.
    if (HpOrMp === "HP") {
        target.hp.currentHp -= valueToChangeBy;
        if (valueToChangeBy >= 0) {
            if (target.hp.currentHp <= 0) {target.hp.currentHp = 0};
        }
        else {
            if (target.hp.currentHp >= target.hp.maxHp) {target.hp.currentHp = target.hp.maxHp};
        }
    }
    
    else if (HpOrMp === "MP") {
        target.mp.currentMp -= valueToChangeBy;
        if (valueToChangeBy >= 0) {
            if (target.mp.currentMp <= 0) {target.mp.currentMp = 0};
        }
        else {
            if (target.mp.currentMp >= target.mp.maxMp) {target.mp.currentMp = target.mp.maxMp};
        } 
    }
}

// ! ======== Main Section ========
// * ======== Main Section ========
// ? ======== Main Section ========

const main = () => {

    
    InitializeRender();
}



$(main);