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

  dealDamage(victim, damage) {
    if (victim == Object.name) {
      Object.name.hp = Object.name.hp - damage;
    };
  }

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

class Paladin extends Human {
	constructor(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance) {
    super(name, type, hp, damage, mana, status, manaDmg, nameSpeAtt,resistance);
    this.name = "Ulder";
    this.type = "paladin"
		this.hp = 16;
		this.damage = 3;
		this.mana = 160;
    this.manaDmg = 4;
    this.nameSpeAtt = "Healing Lighting"
	}

  specialAttack(mana) {
    this.hp = this.hp + 5;
    console.log(`${this.nameSpeAtt}: ${this.name} +5 hp!`);
    this.mana = mana - 40;
    return(this.manaDmg)
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

class Turn {
  constructor(turn, choice) {
    this.turn = turn;
    this.choice = choice;
  }

  chooseOrder(players) {
    let turnPlayer = new Array;
    let arrayLength = Object.keys(players).length;

    while (turnPlayer.length < arrayLength) {
      let randomItem = players[Math.floor(Math.random()*(Object.keys(players).length))];
      if (turnPlayer.includes(randomItem) === false ) {
        turnPlayer.push(randomItem);
      };
    };
    return(turnPlayer)
  }

  chooseTarget(player, game, players) {
    const prompt = require("prompt-sync")();
    console.log(player.name);

    
    do {
      let statsOrFight = prompt('Options: Choose your target (1) - Display stats (2) \n >');
      this.choice = statsOrFight;
      switch(this.choice) {
        case "1":
          console.log('Players to target: \
          ');
          players.map((playerTarget) => {
            console.log(`- ${playerTarget.name}: ${playerTarget.hp} hp left, ${playerTarget.mana} mana left, ${playerTarget.type} type.`);
          });
          let allNames = new Array;
          players.map((player) => allNames.push(player.name));
          const targetName = prompt('Choose your target name: \n');
          if (allNames.includes(targetName)) {
            return(targetName)
          };
          break;
          
        case "2":
          game.watchStats(players);
          break;
      };
    } while (this.choice != "0");
  }

  whosThere(characters) {
    let onGoingCharacters = characters.filter(character => character.status == "alive");
    return(onGoingCharacters);
  }

  resolveDamages(damages, player, target) {
    if (damages > 0) {
      console.log(`${player.name} is attacking ${target[0].name}. 
      He deals him ${damages} damages. 
      ${target[0].name} got ${target[0].hp} lifepoints left`);
    };
    if (damages <= 0) {
      console.log('No damages.');
    };
  }

  fights(turnPlayer, characters, game) {

    turnPlayer.map((player) => {
      let onGoingCharacters = this.whosThere(characters);
      let lenght = Object.keys(onGoingCharacters).length;
      if (lenght > 1) {
        if (player.status == "alive") {
          console.log(`It's time for ${player.name} to play.`);
          let targetName = this.chooseTarget(player, game, onGoingCharacters);
          let target = onGoingCharacters.filter(playerTarget => (playerTarget.status == "alive") && (playerTarget.name == targetName));
          let playerAttack = player.chooseAttack(player.mana);
          let damages = target[0].takeDamage(playerAttack);
          this.resolveDamages(damages, player, target);
        };
      };
      if (lenght == 1) {
        return(onGoingCharacters)
      };
    });

    let aliveCharacters = this.whosThere(characters);
    return(aliveCharacters);
  }

};

class Game {
  constructor(turn=10, status) {
    this.turn = turn;
    this.status = status;

  }

  startGame() {
    let characters = this.buildPlayers();
    this.currentTurn(characters);
  }

  startTurn(turn) {
    console.log(`It's turn ${turn}.`);
    this.turnLeft(turn);
  }

  turnLeft(turn) {
    console.log(`${turn} turn left.`);
  }

  buildPlayers() {
    let player1 = new Fighter("Henri","human",1,1,0,"alive",0, "",0);
    let player2 = new Paladin("Henri","human",1,1,0,"alive",0, "",0);
    let player3 = new Human("Louis","human", 10, 1, 10, "alive", 5, "manchette", 0);
    let player4 = new Monk("Henri","human",1,1,0,"alive",0, "",0);
    let player5 = new Berzerker("Louis","human", 10, 1, 10, "alive", 5, "manchette", 0);
    let player6 = new Assassin("Louis","human", 10, 1, 10, "alive", 5, "manchette", 0);
    let characters = [player1, player2, player3, player4, player5, player6];
    return(characters)
  }

  currentTurn(characters) {

    while (this.turn > 0 | this.status != "ongoing") {
      let theNewTurn = this.newTurn(this.turn, "0");
      this.startTurn(this.turn);
      let onGoingCharacters = characters.filter(player => player.status == "alive");
      let turnPlayer = theNewTurn.chooseOrder(onGoingCharacters);
      let players = theNewTurn.fights(turnPlayer, characters, this);
      players.map((player) => player.backToNormal());
      let playersLenght = Object.keys(players).length;

      if (playersLenght <= 1) {
        this.whoWon(players[0]);
        break} ;
    };

  }

  newTurn(turn) {
    this.turn = turn - 1;
    this.noTurnLeft(this.turn);
    let theNewTurn = new Turn(game.turn);
    console.log(theNewTurn);
    return(theNewTurn)
  }

  noTurnLeft(turn) {
    if (this.turn == 0) {
      console.log(`${turn} turn left. Thanks for playing!`);
      this.whoWon();
    };
  }

  watchStats(players) {
    players.map((player) => {
      console.log(`- ${player.name}: HP: ${player.hp} # Mana: ${player.mana} # Type: ${player.type} # Resistance: ${player.resistance}`);
    });
  }

  whoWon(players) {
    console.log('====================================');
    console.log(players);
    console.log('====================================');
    console.log(`There is ${players.name} !`);
  }

};




let game = new Game(11, "ongoing");
game.startGame();

// html