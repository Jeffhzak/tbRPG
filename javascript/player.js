class Warrior {
    constructor(lvl = 1) {
        this.name = "Jargo";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(50*lvl/2), maxHp: Math.floor(50*lvl/2)};
        this.atk = Math.floor(10*lvl/2);
        this.imgSrc = "images/placeholder.jpg"
    }
}

class Mage {
    constructor(lvl = 1) {
        this.name = "Riz";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(40*lvl/2), maxHp: Math.floor(40*lvl/2)};
        this.atk = Math.floor(10*lvl/2);
        this.imgSrc = "images/placeholder.jpg"
    }
}

class Thief {
    constructor(lvl = 1) {
        this.name = "Hood";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(40*lvl/2), maxHp: Math.floor(40*lvl/2)};
        this.atk = Math.floor(10*lvl/2);
        this.imgSrc = "images/placeholder.jpg"
    }
}

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
        console.log(`player console log: ${x}`);
        let $newPlayerDiv = $("<div>").attr("class", "playermodel").attr("id", `${x}`);
        players[x].displayElement = $newPlayerDiv; // updates data with linked html element
        $newPlayerDiv.append("<h5>").text(`${players[x].name}`);
        $playerContainer.append($newPlayerDiv);
        renderPartyUI(x);
    }
}

const renderPartyUI = (partymember) => {
    const $uiPlayerInfo = $("#uiplayerinfo");
    const $newPartyMemberDiv = $("<div>").attr("class", "partymemberdiv");
    // render UI elements such as HP, MP and portrait
    let $newPortrait = $("<img>").attr("alt", `${players[partymember].name}'s portrait'`).attr("src", "images/placeholderimage.jpg").attr("class", "playerportrait").attr("id", `${players[partymember].name}portrait`);
    $newPartyMemberDiv.append($newPortrait);
    $newPartyMemberDiv.append($("<p5>").text(`HP: ${players[partymember].hp.currentHp}/${players[partymember].hp.maxHp}`));
    $uiPlayerInfo.append($newPartyMemberDiv);

}