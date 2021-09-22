//! ======= Player related Data =======
class Warrior {
    constructor(lvl = 1) {
        this.name = "Jargo";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(50 * Math.floor(Math.sqrt(lvl))), maxHp: Math.floor(50 * Math.floor(Math.sqrt(lvl)))};
        this.mp = {currentMp: Math.floor(20 * Math.sqrt(lvl)), maxMp: Math.floor(20 * Math.sqrt(lvl))};
        this.atk = Math.floor(10 * Math.floor(Math.sqrt(lvl)));
        this.spd = Math.floor(15 * Math.floor(Math.sqrt(lvl)));
        this.skills = {
            "Defend Ally": () => {console.log("warrior defended ally")}
        };
        this.Attack = (e) => {
            targetUpdate(e);
            playerSkills.Attack();
            updateGameState();
        };
    }
}

class Mage {
    constructor(lvl = 1) {
        this.name = "Riz";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(40 * Math.floor(Math.sqrt(lvl))), maxHp: Math.floor(40 * Math.floor(Math.sqrt(lvl)))};
        this.mp = {currentMp: Math.floor(50 * Math.sqrt(lvl)), maxMp: Math.floor(50 * Math.sqrt(lvl))};
        this.atk = Math.floor(10 * Math.floor(Math.sqrt(lvl)));
        this.spd = Math.floor(12 * Math.floor(Math.sqrt(lvl)));
        this.skills = {
            "Defend Ally": () => {console.log("warrior defended ally")}
        };
        this.Attack = (e) => {
            targetUpdate(e);
            playerSkills.Attack();
            updateGameState();
        };
    }
}

class Thief {
    constructor(lvl = 1) {
        this.name = "Hood";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(40 * Math.floor(Math.sqrt(lvl))), maxHp: Math.floor(40 * Math.floor(Math.sqrt(lvl)))};
        this.mp = {currentMp: Math.floor(20 * Math.sqrt(lvl)), maxMp: Math.floor(20 * Math.sqrt(lvl))};
        this.atk = Math.floor(10 * Math.floor(Math.sqrt(lvl)));
        this.spd = Math.floor(20 * Math.floor(Math.sqrt(lvl)));
        this.skills = {
            "Defend Ally": () => {console.log("warrior defended ally")}
        };
        this.Attack = (e) => {
            targetUpdate(e);
            playerSkills.Attack();
            updateGameState();
        };
    }
}

const playerSkills = {
    Attack: () => {
        attackModded = randomPercentMod(currentTurn.atk, 15)
        currentTarget.hp.currentHp -= attackModded;
        console.log(`${currentTurn.name} attacked for ${attackModded} damage!`);
    }
}

//! ======= Player related functions =======

const generatePlayers = (lvl) => {
    let players = null;
    players = {
        warrior: new Warrior(lvl), 
        mage:  new Mage(lvl), 
        thief: new Thief(lvl)
    };
    return players;
}

const renderParty = () => {
    // target and clear the containers for player-related things
    const $playerContainer = $("#playercontainer");
    $playerContainer.empty();
    const $uiPlayerInfo = $("#uiplayerinfo");
    $uiPlayerInfo.empty();
    // re-render everything player related by iterating over the "players" object
    for (x in players) {
        // render models and names
        let $newPlayerDiv = $("<div>").attr("class", "playermodel").attr("id", `${x}`);
        players[x].displayElement = $newPlayerDiv; // updates data with linked html element
        if (players[x].hp.currentHp <= 0) {
            $newPlayerDiv.addClass("dead");
        }
        let $newPlayerNamePlate = $("<h5>").text(`${players[x].name}`).css("margin", "0");
        let $newPlayerModelImage = $("<div>").attr("class", `${x}`)
        $newPlayerDiv.append($newPlayerModelImage);
        $newPlayerDiv.append($newPlayerNamePlate);
        $playerContainer.append($newPlayerDiv);
        if (players[x].hp.currentHp <= 0) { //remove character model if player is dead
            players[x].hp.currentHp = 0;
            $newPlayerDiv.addClass("dead");
        }
        renderPartyUI(x);
    }
}

const renderPartyUI = (partymember) => {
    const $uiPlayerInfo = $("#uiplayerinfo");
    const $newPartyMemberDiv = $("<div>").attr("class", "partymemberdiv");
    const $HpBarDiv = $("<div>").attr("class", "playerhpbar").attr("id", `${partymember}hpbar`);
    // render UI elements such as HP, MP and portrait
    // Appending Portrait
    let $newPortraitDiv = $("<div>").attr("class", "playerportrait").attr("id", `${players[partymember].name}portrait`);
    $newPartyMemberDiv.append($newPortraitDiv);
    //Appending HP bar?
    $newPlayerHpBarBg = $("<div>").attr("class", "playerhealthbarbg");
    $newPlayerHpBarFg = $("<div>").attr("class", "playerhealthbarfg").attr("id", `${partymember}hp`).css("width", `${players[partymember].hp.currentHp/players[x].hp.maxHp*100}%`);
    $newPlayerHpBarBg.append($newPlayerHpBarFg);
    $HpBarDiv.append($newPlayerHpBarBg);
    // Appending HP text
    $HpBarDiv.append($("<p5>").text(`HP: ${players[partymember].hp.currentHp}/${players[partymember].hp.maxHp}`));
    $uiPlayerInfo.append($newPartyMemberDiv);
    $newPartyMemberDiv.append($HpBarDiv);
    // Appending MP text
    $newPartyMemberDiv.append($("<p5>").text(`MP: ${players[partymember].mp.currentMp}/${players[partymember].mp.maxMp}`));
    $uiPlayerInfo.append($newPartyMemberDiv);
    // Appending status box?
    // -------------------------------------

}