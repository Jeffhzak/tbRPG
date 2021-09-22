let monsterFactory = [
    class Slime {
        constructor(lvl = 1) {
            this.name = "Slime";
            this.level = lvl;
            this.hp = {currentHp: Math.floor(10 * Math.floor(Math.sqrt(lvl))), maxHp: Math.floor(10 * Math.floor(Math.sqrt(lvl)))};
            this.atk = Math.floor(5 * Math.floor(Math.sqrt(lvl)));
            this.spd = Math.floor(10 * Math.floor(Math.sqrt(lvl)));
            this.target = {};
            this.skills = {
                "Attack": () => {
                    currentTarget = this.target;
                    enemySkills.Attack();
                },
                "Bounce": () => {
                    console.log("The slime splashes around.");
                },
            };

            this.aiTarget = () => {
                this.target = randomPlayerTarget();
            }

            // this.Attack = (e) => {
            //     targetUpdate(e);
            //     playerSkills.Attack();
            //     updateGameState();
            // };
        }
    },
    class Goblin {
        constructor(lvl = 1) {
            this.name = "Goblin";
            this.level = lvl;
            this.hp = {currentHp: Math.floor(10 * Math.floor(Math.sqrt(lvl))), maxHp: Math.floor(10 * Math.floor(Math.sqrt(lvl)))};
            this.atk = Math.floor(5 * Math.floor(Math.sqrt(lvl)));
            this.spd = Math.floor(14 * Math.floor(Math.sqrt(lvl)));
            this.target = {};
            this.skills = {
                "Attack": () => {
                    currentTarget = this.target;
                    enemySkills.Attack();
                },
                "Taunt": () => {
                    console.log("The goblin laughs at your weakness.");
                },
            };

            this.aiTarget = () => {
                this.target = randomPlayerTarget();
            }

            // this.Attack = (e) => {
            //     targetUpdate(e);
            //     enemySkills.Attack();
            //     updateGameState();
            // };
        }
    }
]

const enemySkills = {
    Attack: () => {
        attackModded = randomPercentMod(currentTurn.atk, 15)
        currentTarget.hp.currentHp -= attackModded;
        console.log(`${currentTurn.name} attacked for ${attackModded} damage!`);
    }
}
//! !!!!!!!!!!!!!!!!!!!!!! STILL CAN TARGET DEAD PLAYERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //! use filter method
const randomPlayerTarget = () => {
    const playersArray = [];
    for (key in players) {
        playersArray.push(players[key]);
    }
    const alivePlayersArray = playersArray.filter(character => (character.hp.currentHp > 0)) 
    let rng1000 = Math.floor(Math.random() * 1000); 
    let step = Math.floor(1000 / alivePlayersArray.length);
    for (let i=0; i < alivePlayersArray.length; i++) {
        stepTarget = alivePlayersArray[i];
        if (rng1000 <= ((step*(i+1))+1)) {
            return stepTarget;
        }
    }

}

const randomMonsterSkill = (currentMonster) => {
    if (currentMonster != null) {
        let rng1000 = Math.floor(Math.random() * 1000);
        let step = Math.floor(1000 / Object.keys(currentMonster.skills).length);
        //! cycles through all the monster's skills and decides on one based on what rng1000 rolled
        for (i=0; i<Object.keys(currentMonster.skills).length; i++) {
            skillToUse = currentMonster.skills[Object.keys(currentMonster.skills)[i]]
            if (rng1000 <= (step*(i+1))+1) {
                skillToUse();
                return
            }
        }
    }
}

const generateMonsters = (lvl) => {
    let enemies = null;
    enemies = {
        monster1: new monsterFactory[rng(monsterFactory.length)](lvl),
        monster2: new monsterFactory[rng(monsterFactory.length)](lvl),
        monster3: new monsterFactory[rng(monsterFactory.length)](lvl)
    }
    return enemies;
}

const renderMonsters = () => {
    // target and clear the containers for enemy-related things
    const $enemyContainer = $("#enemycontainer");
    $enemyContainer.empty();
    const $enemyHpContainer = $("#enemyHPcontainer");
    $enemyHpContainer.empty();
    // re-render everything enemy related by iterating over the "enemies" object
    for (x in enemies) {
        // render models and names
        // console.log(`enemy console log: ${x}`);
        //! WORK ON RENDERING SPRITESHEET VIA CSS
        let $newEnemyDiv = $("<div>").attr("class", "enemymodel").attr("id", `${x}`);
        let $enemyModelImage = $("<div>").addClass(`${enemies[x].name}`);
        $newEnemyDiv.append($enemyModelImage);
        enemies[x].displayElement = $newEnemyDiv; // updates data with linked html element
        let $enemyNamePlate = $("<h5>").text(`${enemies[x].name}`).css("margin", "0");
        $newEnemyDiv.append($enemyNamePlate); 
        $enemyContainer.append($newEnemyDiv);
        // render UI elements such as HP bar and current target (?)
        $newEnemyHpBarBg = $("<div>").attr("class", "healthbarbg");
        $newEnemyHpBarFg = $("<div>").attr("class", "healthbarfg").attr("id", `${x}hp`).css("width", `${enemies[x].hp.currentHp/enemies[x].hp.maxHp*100}%`);
        $newEnemyHpBarBg.append($newEnemyHpBarFg);
        $enemyHpContainer.append($newEnemyHpBarBg);
        if (enemies[x].hp.currentHp <= 0) {
            $newEnemyDiv.addClass("dead");
            $newEnemyHpBarBg.addClass("dead");
            $newEnemyHpBarFg.addClass("dead");
        }
    }
}