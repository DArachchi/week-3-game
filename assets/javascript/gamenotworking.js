var currentWordIndex;
var currentState = [];
var currentWord = "Press any key to get started!";
var currentWordArray = [];
var guess;
var guessesRemaining;
var hits;
var incorrectGuesses = [];
var letters = /^[A-Z]+$/; 
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
			Model: "F-Type",
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
			Model: "EXIGE",
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
		toyota = {
			Make: "TOYOTA",
			Model: "SUPRA",
			src: "assets/images/Toyota.jpg"
		}
	],

	addWin: function() {
		wins++;
		document.getElementById("caption").innerHTML = currentWord + " " + game.carChoices[currentWordIndex].Model;
		document.getElementById("imageId").src = game.carChoices[currentWordIndex].src;	
		game.setNewWord();
	},

	checkGuess: function() {
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
			game.getGuess();
		} else {
			incorrectGuesses.push(guess);
			guessesRemaining--;
			document.getElementById("guessed").innerHTML = incorrectGuesses.join(" ");
			document.getElementById("remaining").innerHTML = guessesRemaining;
		}
		game.checkState();
	},

	getGuess: function() {
		document.onkeyup = function(event) {
			var guess = String.fromCharCode(event.keyCode).toUpperCase();
			if ((guess.match(letters))) {  
				game.checkGuess();  
			}  
			else {
				game.getGuess();
			}  			
		}
	},

	checkState: function() {
		if (guessesRemaining == 0) {
			game.setNewWord();
		}
		if (currentState.includes("_")) {
			game.getGuess();
		} else {
			game.addWin();
		}
	},

	setNewWord: function() {
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
document.getElementById("imageId").src = ("assets/images/startingimage.jpg")
game.setNewWord();
game.getGuess();

