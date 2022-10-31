var human = require("./mmo_classes");
var fighter = require("./mmo_classes");
var paladin = require("./mmo_classes");
var monk = require("./mmo_classes");
var berzerker = require("./mmo_classes");
var assassin = require("./mmo_classes");
var classTurn = require("./turn");

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
		let player1 = new fighter.Fighter("Henri","human",1,1,0,"alive",0, "",0);
		let player2 = new paladin.Paladin("Henri","human",1,1,0,"alive",0, "",0);
		let player3 = new human.Human("Louis","human", 10, 1, 10, "alive", 5, "manchette", 0);
		let player4 = new monk.Monk("Henri","human",1,1,0,"alive",0, "",0);
		let player5 = new berzerker.Berzerker("Louis","human", 10, 1, 10, "alive", 5, "manchette", 0);
		let player6 = new assassin.Assassin("Louis","human", 10, 1, 10, "alive", 5, "manchette", 0);
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
		let theNewTurn = new classTurn.Turn(this.turn);
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

module.exports.Game = Game;