//! ======== Global Variables ========
// let players = {};
// let enemies = {};
let level = 1;
let currentPlayer = {};
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

}

// ! ======== Main Section ========

const main = () => {

    
    InitializeRender();
}



$(main);