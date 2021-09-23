//! ======= Player related Data =======
class Warrior {
    constructor(lvl = 1) {
        this.name = "Jargo";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(50 * Math.sqrt(lvl)), maxHp: Math.floor(50 * Math.sqrt(lvl))};
        this.mp = {currentMp: Math.floor(20 * Math.sqrt(lvl)), maxMp: Math.floor(20 * Math.sqrt(lvl))};
        this.atk = Math.floor(25 * Math.sqrt(lvl));
        this.spd = Math.floor(15 * Math.sqrt(lvl));
        this.skills = {
            "Brutal Strike": () => {targetEnemyHighlightUpdate("Brutal Strike", 10)},
            "Howl": () => {playerSkills["Howl"](20)}
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
        this.hp = {currentHp: Math.floor(40 * Math.sqrt(lvl)), maxHp: Math.floor(40 * Math.sqrt(lvl))};
        this.mp = {currentMp: Math.floor(50 * Math.sqrt(lvl)), maxMp: Math.floor(50 * Math.sqrt(lvl))};
        this.atk = Math.floor(10 * Math.sqrt(lvl));
        this.spd = Math.floor(12 * Math.sqrt(lvl));
        this.skills = {
            "Firebolt": () => {targetEnemyHighlightUpdate("Firebolt", 15)}
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
        this.hp = {currentHp: Math.floor(40 * Math.sqrt(lvl)), maxHp: Math.floor(40 * Math.sqrt(lvl))};
        this.mp = {currentMp: Math.floor(20 * Math.sqrt(lvl)), maxMp: Math.floor(20 * Math.sqrt(lvl))};
        this.atk = Math.floor(20 * Math.sqrt(lvl));
        this.spd = Math.floor(20 * Math.sqrt(lvl));
        this.skills = {
            "Steal Health": () => {targetEnemyHighlightUpdate("Steal Health", 10)},
            // "Poison Strike": () => {targetEnemyHighlightUpdate("Poison Strike", )},
            "Multi-Stab": () => {targetEnemyHighlightUpdate("Multi-Stab", 10)}
        };
        this.Attack = (e) => {
            targetUpdate(e);
            playerSkills.Attack();
            updateGameState();
        };
    }
}


//! ======= Player SKILL related functions =======

//applies targeting UI to enemies
const targetEnemyHighlightUpdate = (skillName, mpCost) => {
    for (x in enemies) {
        $(`#${x}`).on("click", skillUse(skillName, mpCost));
        $(`#${x}`).toggleClass("infocus");
    }
}

//searches PlayerSkills Object to fire the right skill function
const skillUse = (skillName, mpCost) => (e) => {
    targetUpdate(e);
    console.log(currentTarget);

    for (objectKey in playerSkills) {
        if (objectKey === skillName) {
            playerSkills[skillName](mpCost);
        }
    }
    updateGameState();
}

const basicAttack = () => {
    for (x in enemies) {
        $(`#${x}`).on("click", currentTurn.Attack);
        $(`#${x}`).toggleClass("infocus");
    }
}

//? list of player skills available
const playerSkills = {
    Attack: () => {
        let attackModded = randomPercentMod(currentTurn.atk, 15)
        currentTarget.hp.currentHp -= attackModded;

        let damageText = `${currentTurn.name} attacked ${currentTarget.name} for ${attackModded} damage!`
        let onKillText = `${currentTurn.name} attacked and killed ${currentTarget.name}!`
        appendToCombatLog(damageText, onKillText);
    },
    "Steal Health": (mpCost) => {
        console.log("calc Steal Health fired");
        let attackModded = randomPercentMod(currentTurn.atk, 15);
        attackModded = Math.floor(attackModded*0.8);
        calcHpMpChanges("HP", attackModded, currentTarget);

        calcHpMpChanges("HP", (attackModded*(-1)), currentTurn)
        calcHpMpChanges("MP", mpCost, currentTurn);

        let damageText = `${currentTurn.name} stole ${attackModded} health from ${currentTarget.name}!`
        let onKillText = `${currentTurn.name} killed ${currentTarget.name}!`
        appendToCombatLog(damageText, onKillText);

    },
    "Multi-Stab": (mpCost) => {
        console.log("calc Multi-Stab fired");
        for (let i = 0; i < 3; i++) {
            let attackModded = randomPercentMod(currentTurn.atk, 15);
            attackModded = Math.floor(attackModded * 0.66);
            calcHpMpChanges("HP", attackModded, currentTarget);
            let damageText = `${currentTurn.name} rapidly stabbed ${currentTarget.name} for ${attackModded} damage!`
            $("#menu").prepend(($("<h5>").text(damageText)));
        }
        let onKillText = `${currentTurn.name} killed ${currentTarget.name}!`
        if (currentTarget.hp.currentHp <= 0) {
            $("#menu").prepend(($("<h5>").text(onKillText)));
        }
        calcHpMpChanges("MP", mpCost, currentTurn);
    },
    "Firebolt": (mpCost) => {
        console.log("calc Firebolt fired");
        let attackModded = randomPercentMod(currentTurn.atk, 15);
        attackModded = attackModded*3;
        calcHpMpChanges("HP", attackModded, currentTarget);
        calcHpMpChanges("MP", mpCost, currentTurn);

        let damageText = `${currentTurn.name} burned ${currentTarget.name} for ${attackModded} damage!`
        let onKillText = `${currentTurn.name} incinerated ${currentTarget.name}!`
        appendToCombatLog(damageText, onKillText);
    },
    "Brutal Strike": (mpCost) => {
        console.log("calc Brutal Strike fired");
        let attackModded = randomPercentMod(currentTurn.atk, 15);
        attackModded = attackModded*2;
        calcHpMpChanges("HP", attackModded, currentTarget);
        calcHpMpChanges("MP", mpCost, currentTurn);

        let damageText = `${currentTurn.name} savaged ${currentTarget.name} for ${attackModded} damage!`
        let onKillText = `${currentTurn.name} tore into ${currentTarget.name}!`
        appendToCombatLog(damageText, onKillText);
    },

    "Howl": (mpCost) => {
        calcHpMpChanges("HP", -50, currentTurn);
        calcHpMpChanges("MP", mpCost, currentTurn);
        appendToCombatLog(`${currentTurn.name} healed himself for 50 HP!`);
        updateGameState();
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
        let $newPlayerNamePlate = $("<h5>").text(`${players[x].name}`);
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
    const $MpBarDiv = $("<div>").attr("class", "playermpbar").attr("id", `${partymember}mpbar`);
    // render UI elements such as HP, MP and portrait
    // Appending Portrait
    let $newPortraitDiv = $("<div>").attr("class", "playerportrait").attr("id", `${players[partymember].name}portrait`);
    $newPartyMemberDiv.append($newPortraitDiv);
    //Appending HP bar
    const $newPlayerHpBarBg = $("<div>").attr("class", "playerhealthbarbg");
    const $newPlayerHpBarFg = $("<div>").attr("class", "playerhealthbarfg").attr("id", `${partymember}hp`).css("width", `${players[partymember].hp.currentHp/players[x].hp.maxHp*100}%`);
    $newPlayerHpBarBg.append($newPlayerHpBarFg);
    $HpBarDiv.append($newPlayerHpBarBg);
    // Appending HP text
    $HpBarDiv.append($("<h5>").text(`HP: ${players[partymember].hp.currentHp}/${players[partymember].hp.maxHp}`));
    $uiPlayerInfo.append($newPartyMemberDiv);
    //Append block to Status Screen
    $newPartyMemberDiv.append($HpBarDiv);
    //Appending MP bar
    const $newPlayerMpBarBg = $("<div>").attr("class", "playermanabarbg");
    const $newPlayerMpBarFg = $("<div>").attr("class", "playermanabarfg").attr("id", `${partymember}mp`).css("width", `${players[partymember].mp.currentMp/players[x].mp.maxMp*100}%`);
    $newPlayerMpBarBg.append($newPlayerMpBarFg);
    $MpBarDiv.append($newPlayerMpBarBg);
    // Appending MP text
    $MpBarDiv.append($("<h5>").text(`MP: ${players[partymember].mp.currentMp}/${players[partymember].mp.maxMp}`));
    $uiPlayerInfo.append($newPartyMemberDiv);
    //Append block to Status Screen
    $newPartyMemberDiv.append($MpBarDiv);
    // Appending status box?
    // -------------------------------------

}