import Human from "./human";


export default class Assassin extends Human{
	constructor(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance) {
    super(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance);
    this.name = "Carl";
    this.type = "assassin";
		this.hp = 6;
		this.damage = 6;
		this.mana = 20;
    this.nameSpeAtt = "Shadow Hit";
    this.manaDmg = 7;
	}
  specialAttack(mana) {
    this.resistance = 999;
    this.mana = mana - 20;
    return(this.manaDmg)
  }
};