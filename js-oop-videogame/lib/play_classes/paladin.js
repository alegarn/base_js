import Human from "./human";

export default class Paladin extends Human {
	constructor(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance) {
    super(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance);
    this.name = "Ulder";
    this.type = "paladin"
		this.hp = 16;
		this.damage = 3;
		this.mana = 160;
    this.manaDmg = 4;
    this.nameSpeAtt = "Healing Lighting";
	}

  specialAttack(mana) {
    this.hp = this.hp + 5;
    console.log(`${this.nameSpeAtt}: ${this.name} +5 hp!`);
    this.mana = mana - 40;
    return(this.manaDmg)
  }
};