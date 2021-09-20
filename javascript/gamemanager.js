//! ======== Global Variables ========
// let players = {};
// let enemies = {};
let level = 1;
let currentTurn = {};
let currentTarget = {};

// ! ======== Math Stuff ========

const rng = (x) => {
    return Math.floor(Math.random()*x)
}

const coinFlip = () => {return Math.floor(Math.random()*2)}

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
    //? temporary testing scenario
    currentTurn = players.warrior;
    currentTarget = enemies.monster1;
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
    const $attackButton = $("<btn>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsattack").text("Attack").on("click", basicAttack);
    const $skillButton = $("<btn>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsskills").text("Skill");
    const $itemButton = $("<btn>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsitems").text("Item");
    const $runButton = $("<btn>").attr("type", "button").addClass("uibuttons").attr("id", "uibuttonsrun").text("Run");
    $uiCommands.append($attackButton);
    $uiCommands.append($skillButton);
    $uiCommands.append($itemButton);
    $uiCommands.append($runButton);

}

const updateGameState = () => {
    renderParty();
    renderMonsters();
}

const basicAttack = () => {
    console.log(currentTurn["skills"]["Attack"]);
    console.log(currentTurn.skills.Attack);
    currentTarget.hp.currentHp -= currentTurn.atk;
    updateGameState();

}
// ! ======== Main Section ========

const main = () => {

    
    InitializeRender();
}



$(main);