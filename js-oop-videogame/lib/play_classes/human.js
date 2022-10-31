export default class Human {
	constructor(name="",type="human", hp=1, damage=1, mana=0, status="alive", manaDmg=0, nameSpeAtt="",resistance=0) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.damage = damage;
    this.mana = mana;
    this.status = status;
    this.manaDmg = manaDmg;
    this.nameSpeAtt = nameSpeAtt;
    this.resistance = resistance;
    this.choice = "";
	}

  takeDamage(damage) {
    
    let hp = this.hp;
    let resistance = this.resistance;
    let damages = (damage - resistance);
    if (damages > 0) {
      this.hp  = hp - (damages);
      this.isDead(this.hp);
      return(damages)
    };
    if (damages <= 0) {
      return(0)
    };

  }

  chooseAttack(mana) {
    const prompt = require("prompt-sync")();
    do {
      this.choice = prompt(`Slash (${this.damage} dmg): choose 1 \n ${this.nameSpeAtt} (-10 mana : ${this.manaDmg} dmg): choose 2 \n >`)
      switch (this.choice) {
        case "1":
          console.log('punch!');
          return(this.damage);

        case "2":
          if (mana >= 10) {
            let playerMagic = this.specialAttack(mana);
            return(playerMagic);
          } else {
            console.log('not enough mana!');
            console.log('punch!');
            return(this.damage);
          };
          
      }
      
    } while (this.choice != 0);
    
  }

  specialAttack(mana) {
    
    console.log(`${this.nameSpeAtt} !`);
    this.mana = mana - 10;
    return (this.manaDmg)
  
  }
//____________________________________________________________________
  dealDamage(victim, damage) {
    if (victim == Object.name) {
      Object.name.hp = Object.name.hp - damage;
    };
  }
//____________________________________________________________________
  backToNormal() {
    this.resistance = 0;
  }

  isDead(hp) {
    if (hp <= 0) {
      console.log(`${(this.name)} fell on the ground.`);
      this.status = "ground";
    } else {
      console.log(`${(this.name)} has ${hp}.`);
    };
  }
};
