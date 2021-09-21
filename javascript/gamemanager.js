//! ======== Global Variables ========
let difficulty = 1;
let level = 1;
let currentTurn = {};
let currentTarget = {};
let turnOrder = [];

// ! ======== Math Stuff ========

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
const InitializeRender = () => {
    renderWebsite();
}



// ! -- Render Website elements --

const renderWebsite = () => {
    const $body = $("body");
    const $overAllBackground = $("<div>").attr("id", "overallbackground");
    const $menu = $("<div>").attr("id", "menu");
    const $mainInterface = $("<div>").attr("id", "maininterface");
    const $turnOrder = $("<div>").attr("id", "turnorder");

    $overAllBackground.append($menu).append($mainInterface).append($turnOrder);

    $body.append($overAllBackground);
    //! ---> need to add feature to start at x difficulty here but its not important
    const $levelInputField = $("<input>").attr("type", "number");
    const $startButton = $("<button>").on("click", startGame).text("GO!");
    $mainInterface.append($levelInputField);
    $mainInterface.append($startButton);
}

// ! -- Render Game elements --
const startGame = () => {
    console.log("Game is starting");
    $("#maininterface").empty();
    renderGameBaseElements();
    players = generatePlayers(level);
    enemies = generateMonsters(level);
    renderParty();
    renderMonsters();
    renderUI();
    updateTurnOrder(players, enemies);
    //? temporary testing scenario
    // currentTurn = players.warrior;
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
    //! change attack button here
    //* change attack button here
    //? change attack button here
    const $attackButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsattack").text("Attack").on("click", basicAttack);
    const $skillButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsskills").text("Skill");
    const $itemButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsitems").text("Item");
    const $runButton = $("<button>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsrun").text("Run");
    $uiCommands.append($attackButton);
    $uiCommands.append($skillButton);
    $uiCommands.append($itemButton);
    $uiCommands.append($runButton);

}

// ! ======== Game-State Section ========

const updateGameState = () => {
    renderParty();
    renderMonsters();
    updateTurnOrder(players, enemies);
}

const updateTurnOrder = (players, enemies) => {
    if (turnOrder.length === 0) {
        for (x in players) {
            if (players[x].hp.currentHp > 0) {
                turnOrder.push(players[x]);
            }
        }
        for (x in enemies) {
            if (enemies[x].hp.currentHp > 0) {
                turnOrder.push(enemies[x]);
            }
        }
        //sort turnOrder array by speed, lowest to highest
        //speed +/- 15%?
        turnOrder.sort( (a, b) => {
            let moddedSpeedA = randomPercentMod(a.spd, 15);
            let moddedSpeedB = randomPercentMod(b.spd, 15)
            if (moddedSpeedA > moddedSpeedB) {return 1}
            else if (moddedSpeedA < moddedSpeedB) {return -1}
            else return 0;
        })
    }
    console.log(turnOrder);
    currentTurn = turnOrder.pop();
    if (currentTurn === players.warrior || currentTurn === players.mage || currentTurn === players.thief) {
        $(currentTurn.displayElement).toggleClass("infocus");
    }

}
//! ?????????????????????????????????????????????

const targetUpdate = (e) => {
    currentTarget = enemies[`${e.target.id}`];
}
//! -> I need to make a function that accepts an argument of what skill to fire, but where to get that argument? use the same way I got the currentTarget^ ???
const basicAttack = () => {
    for (x in enemies) {
        $(`#${x}`).on("click", currentTurn.Attack);
        $(`#${x}`).toggleClass("infocus");
    }
}
//! ?????????????????????????????????????????????
// ! ======== Main Section ========

const main = () => {

    
    InitializeRender();
}



$(main);