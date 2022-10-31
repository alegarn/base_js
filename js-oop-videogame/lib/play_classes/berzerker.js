import Human from "./human";

export default class Berzerker extends Human{
	constructor(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance) {
    super(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance);
    this.name = "Draven";
    this.type = "berzerker";
		this.hp = 8;
		this.damage = 4;
		this.mana = 0;
    this.nameSpeAtt = "Rage";
	}

  specialAttack(mana) {
    this.damage = this.damage + 1;
    this.hp = this.hp - 1;
    return(0)
  }
};