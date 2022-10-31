import Human from "./human";

export default class Fighter extends Human {
	constructor(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance) {
    super(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance);
		this.name = "Grace";
    this.type = "fighter";
    this.hp = 12;
    this.damage = 4;
    this.mana = 40;
    this.manaDmg = 5;
    this.nameSpeAtt = "Dark Vision";
	}

	specialAttack(mana) {
    console.log(`${this.name} uses ${this.nameSpeAtt} !`);
    this.resistance = 2;
    this.mana = mana - 20;
    return (this.manaDmg)
	}

  
};