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

module.exports.Turn = Turn;