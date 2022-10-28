class Human {
	constructor(name, hp, damage, mana, status, manaDmg, nameSpeAtt) {
    this.name = name;
    this.hp = hp;
    this.damage = damage;
    this.mana = mana;
    this.type = "human";
    this.status = status;
    this.manaDmg = manaDmg;
    this.nameSpeAtt = nameSpeAtt;
	}

  takeDamage(damage) {
    let hp = this.hp;
    this.hp  = hp - damage;
    console.log(`${this.name} has ${this.hp} left!`);
    this.isDead(this.hp);

  }

  chooseAttack(mana) {
    const prompt = require("prompt-sync")();
    do {
      this.choice = prompt(`Slash (${this.damage} dmg): choose 1 /n ${this.nameSpeAtt} (-10 mana : ${this.manaDmg} dmg): choose 2`)
      switch (this.choice) {
        case "1":
          console.log('punch!');
          return(this.damage);

        case "2":
          if (mana >= 10) {
            this.specialAttack(mana);
            return(this.manaDmg);
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

  isDead(hp) {
    if (hp <= 0) {
      console.log(`${(this.name)} fell on the ground.`);
      this.status = "ground";
    } else {
      console.log(`${(this.name)} has ${hp}.`);
    };
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
          console.log('Players to target: \n');
          players.map((playerTarget) => {
            console.log(`${playerTarget.name}: ${playerTarget.hp} hp left, ${playerTarget.mana} mana left, ${playerTarget.type} type.`);
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
    

  fights(turnPlayer, characters, game) {


    function whosThere(characters) {
      let onGoingCharacters = characters.filter(character => character.status == "alive");
      return(onGoingCharacters);
    };
    

    turnPlayer.map((player) => {
      let onGoingCharacters = whosThere(characters);
      let lenght = Object.keys(onGoingCharacters).length;
      if (lenght > 1) {
        if (player.status == "alive") {
          console.log(`It's time for ${player.name} to play.`);
          let targetName = this.chooseTarget(player, game, onGoingCharacters);
          let target = onGoingCharacters.filter(playerTarget => (playerTarget.status == "alive") && (playerTarget.name == targetName));
          let playerAttack = player.chooseAttack(player.mana)
          target[0].takeDamage(player.damage);
          console.log(`${player.name} is attacking ${target[0].name}. 
          He deals him ${player.damage} damages. 
          ${target[0].name} got ${target[0].hp} lifepoints left`);
        };
      };
      if (lenght == 1) {
        return(onGoingCharacters)
      };
    });

    let aliveCharacters = whosThere(characters);
    return(aliveCharacters);
  }

  nextPerson() {
    
  }


};

class Game {
  constructor(turn=10, status) {
    this.turn = turn;
    this.status = status;
  }

  startTurn(turn) {
    console.log(`It's turn ${turn}.`);
    this.turnLeft(turn);
  }

  turnLeft(turn) {
    console.log(`${turn} turn left.`);
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
      console.log(player)
    });
  }

  whoWon(players) {
console.log('====================================');
console.log(players);
console.log('====================================');
    console.log(`${players.name} on his feet!`);
  }

};




let game = new Game(11, "ongoing");

let player1 = new Human(name="Henri", hp=10, damage=1, mana=10, status="alive", manaDmg=5, "balayette");
let player2 = new Human(name="Louis", hp=10, damage=1, mana=10, status="alive", manaDmg=5, "manchette");
let characters = [player1, player2];

while (game.turn > 0 | game.status != "ongoing") {
  let theNewTurn = game.newTurn(game.turn, "0");
  game.startTurn(game.turn);
  let onGoingCharacters = characters.filter(player => player.status == "alive");
  let turnPlayer = theNewTurn.chooseOrder(onGoingCharacters);
  let players = theNewTurn.fights(turnPlayer, characters, game);

  let playersLenght = Object.keys(players).length;

  if (playersLenght <= 1) {
    game.whoWon(players[0]);
    break} ;

};

//  swtch-cse clss spe mna html