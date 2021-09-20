let monsterFactory = [
    class Slime {
        constructor(lvl = 1) {
            this.name = "Slime";
            this.level = lvl;
            this.hp = {currentHp: Math.floor(10*lvl/2), maxHp: Math.floor(10*lvl/2)};
            this.atk = Math.floor(5*lvl/2);
        }
    },
    class Goblin {
        constructor(lvl = 1) {
            this.name = "Goblin";
            this.level = lvl;
            this.hp = {currentHp: Math.floor(10*lvl/2), maxHp: Math.floor(10*lvl/2)};
            this.atk = Math.floor(5*lvl/2);
        }
    }
]

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
        let $newEnemyDiv = $("<div>").attr("class", "enemymodel").attr("id", `${x}`);
        enemies[x].displayElement = $newEnemyDiv;
        $newEnemyDiv.append("<h5>").text(`${enemies[x].name}`);
        $enemyContainer.append($newEnemyDiv);
        ////////////////////////////////////////////////// temp stuff 
        // $newEnemyDiv.on("click", (event) => {
        //     console.log(event.target.id);
        //   });
        //////////////////////////////////////////////////  
        // render UI elements such as HP bar and current target (?)
        $newEnemyHpBarBg = $("<div>").attr("class", "healthbarbg");
        $newEnemyHpBarFg = $("<div>").attr("class", "healthbarfg").attr("id", `${x}hp`).css("width", `${enemies[x].hp.currentHp/enemies[x].hp.maxHp*100}%`);
        $newEnemyHpBarBg.append($newEnemyHpBarFg);
        $enemyHpContainer.append($newEnemyHpBarBg);
    }
}