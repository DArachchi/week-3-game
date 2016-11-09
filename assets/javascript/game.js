var currentWordIndex;
var currentState = [];
var currentWord = "Press any key to get started!";
var currentWordArray = [];
var guessesRemaining;
var hits;
var incorrectGuesses = [];
var letters = /^[a-zA-Z]+$/; 
var wins = 0;

var game = {

	carChoices: [
		acura = {
			Make: "ACURA",
			Model: "NSX ALEX ZANARDI EDITION",
			src: "assets/images/Acura.jpg"
		},
		audi = {
			Make: "AUDI",
			Model: "R8",
			src: "assets/images/Audi.jpg"
		},
		bmw = {
			Make: "BMW",
			Model: "M2 COUPE",
			src: "assets/images/BMW.jpg"
		},
		bentley = {
			Make: "BENTLEY",
			Model: "CONTINENTAL GT SPEED",
			src: "assets/images/Bentley.jpg"
		},
		chevrolet = {
			Make: "CHEVROLET",
			Model: "CORVETTE Z06 C7.R EDITION",
			src: "assets/images/Chevrolet.jpg"
		},
		dodge = {
			Make: "DODGE",
			Model: "VIPER ACR",
			src: "assets/images/Dodge.jpg"
		},
		ferrari = {
			Make: "FERRARI",
			Model: "F40",
			src: "assets/images/Ferrari.jpg"
		},
		ford = {
			Make: "FORD",
			Model: "GT",
			src: "assets/images/Ford.jpg"
		},
		honda = {
			Make:"HONDA",
			Model: "S2000 CR",
			src: "assets/images/Honda.jpg"
		},
		jaguar = {
			Make: "JAGUAR",
			Model: "F-TYPE",
			src: "assets/images/Jaguar.jpg"
		},
		lamborghini = {
			Make: "LAMBORGHINI",
			Model: "COUNTACH",
			src: "assets/images/Lamborghini.jpg"
		},
		lexus = {
			Make: "LEXUS",
			Model: "LFA NURBURGRING PACKAGE",
			src: "assets/images/Lexus.jpg"
		},
		lotus = {
			Make: "LOTUS",
			Model: "EXIGE CUP 260",
			src: "assets/images/Lotus.jpg"
		},
		maserati = {
			Make: "MASERATI",
			Model: "GRANTURISMO SPORT",
			src: "assets/images/Maserati.jpg"
		},
		mazda = {
			Make: "MAZDA",
			Model: "MIATA",
			src: "assets/images/Mazda.jpg"
		},
		mclaren = {
			Make: "MCLAREN",
			Model: "F1",
			src: "assets/images/McLaren.jpg"
		},
		mini = {
			Make: "MINI",
			Model: "COOPER JOHN COOPER WORKS",
			src: "assets/images/Mini.jpg"
		},
		mitsubishi = {
			Make: "MITSUBISHI",
			Model: "LANCER EVOLUTION FINAL EDITION",
			src: "assets/images/Mitsubishi.jpg"
		},
		nissan = {
			Make: "NISSAN",
			Model: "GT-R NISMO",
			src: "assets/images/Nissan.jpg"
		},
		porsche = {
			Make: "PORSCHE",
			Model: "991 GT3 RS",
			src: "assets/images/Porsche.jpg"
		},
		subaru = {
			Make: "SUBARU",
			Model: "WRX STI",
			src: "assets/images/Subaru.jpg"
		},
		tesla = {
			Make: "TESLA",
			Model: "ROADSTER 2.5",
			src: "assets/images/Tesla.jpg"
		},
		toyota = {
			Make: "TOYOTA",
			Model: "SUPRA",
			src: "assets/images/Toyota.jpg"
		}
	],

	addWin: function() {
		console.log("Adding win");
		wins++;
		document.getElementById("caption").innerHTML = currentWord + " " + game.carChoices[currentWordIndex].Model;
		document.getElementById("imageId").src = game.carChoices[currentWordIndex].src;	
		game.setNewWord();
	},

	checkGuess: function() {
		console.log("Checking guess");
		document.onkeyup = function(event) {
			var guess = String.fromCharCode(event.keyCode).toUpperCase();
			if ((guess.match(letters))) {
				hits = 0;
				for (var i = 0; i < currentWordArray.length; i++) {
					if (currentWordArray[i] === guess) {
						hits++;
						currentState[i] = guess;
						document.getElementById("state").innerHTML = currentState.join(" ");
					}
				}
				if (hits > 0) {
					game.checkState();
				} else if (incorrectGuesses.includes(guess)) {
					game.checkGuess();
				} else {
					incorrectGuesses.push(guess);
					guessesRemaining--;
					document.getElementById("guessed").innerHTML = incorrectGuesses.join(" ");
					document.getElementById("remaining").innerHTML = guessesRemaining;
				}
			}
			game.checkState();
		}
	},

	checkState: function() {
		console.log("Checking state");
		if (guessesRemaining == 0) {
			game.setNewWord();
		}
		if (currentState.includes("_")) {
			game.checkGuess();
		} else {
			game.addWin();
		}
	},

	setNewWord: function() {
		console.log("Setting new word");
		currentState = []
		guessesRemaining = 12;
		incorrectGuesses = [];
		currentWordIndex = Math.floor(Math.random()*game.carChoices.length)
		currentWord = game.carChoices[currentWordIndex].Make;
		currentWordArray = currentWord.split("");
		for (var i = 0; i < currentWordArray.length; i++) {
			currentState.push("_");
		}
		document.getElementById("guessed").innerHTML = incorrectGuesses;
		document.getElementById("remaining").innerHTML = guessesRemaining;
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("state").innerHTML = currentState.join(" ");
	},
}

document.getElementById("caption").innerHTML = "Press any key to get started!"
document.getElementById("imageId").src = ("assets/images/StartingImage.jpg")
game.setNewWord();
game.checkGuess();

