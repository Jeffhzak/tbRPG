let monsterFactory = [
    class Slime {
        constructor(lvl = 1) {
            this.name = "Slime";
            this.level = lvl;
            this.hp = {currentHp: Math.floor(10*lvl/2), maxHp: Math.floor(10*lvl/2)};
            this.atk = Math.floor(5*lvl/2);
        }
    }
]