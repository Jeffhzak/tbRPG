class Warrior {
    constructor(lvl = 1) {
        this.name = "Jargo";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(50*lvl/2), maxHp: Math.floor(50*lvl/2)};
        this.atk = Math.floor(10*lvl/2);
    }
}

class Mage {
    constructor(lvl = 1) {
        this.name = "Riz";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(50*lvl/2), maxHp: Math.floor(50*lvl/2)};
        this.atk = Math.floor(10*lvl/2);
    }
}

class Thief {
    constructor(lvl = 1) {
        this.name = "Hood";
        this.level = lvl;
        this.hp = {currentHp: Math.floor(50*lvl/2), maxHp: Math.floor(50*lvl/2)};
        this.atk = Math.floor(10*lvl/2);
    }
}

let playerArray = [new Warrior, new Mage, new Thief];

console.log(playerArray);