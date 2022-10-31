import Human from "./human";

export default class Monk extends Human {
	constructor(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance) {
    super(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance);
    this.name = "Moana";
    this.type = "monk";
		this.hp = 8;
		this.damage = 2;
		this.mana = 200;
    this.nameSpeAtt = "Heal";
    this.manaDmg = 0;
	}

  specialAttack(mana) {
    this.hp = this.hp + 8;
    this.mana = mana - 25;
    return(0)
  }
};