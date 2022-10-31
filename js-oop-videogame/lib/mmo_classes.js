class Human {
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


class Assassin extends Human{
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


class Berzerker extends Human{
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


class Fighter extends Human {
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

class Monk extends Human {
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

class Paladin extends Human {
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

module.exports.Assassin = Assassin;
module.exports.Berzerker = Berzerker;
module.exports.Fighter = Fighter;
module.exports.Monk = Monk;
module.exports.Paladin = Paladin;
module.exports.Human = Human;