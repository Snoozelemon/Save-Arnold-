const wordEl = document.getElementById("word");
const incorrectEl = document.getElementById("incorrect-letters");
const playAgainBtn = document.getElementById("play-again");
const notify = document.getElementById("notify-msg");
const figure = document.getElementById("figure");
const words = [
	"number",
	"flute",
	"earth",
	"brake",
	"feather",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

//-------------------------------- Displaying the word ------------------------------------------

function displayWord(){
	wordEl.innerHTML = 
	`${selectedWord.split("").map(
		(letter) => `<span class="letter">
		${correctLetters.includes(letter)? letter:""}</span>`).join("")}
	`;
const innerWord = wordEl.innerText.replace(/\n/g,"")
if(innerWord === selectedWord){
	notify.style.display = 'flex'; 
}
};

//--------------------------------- Displaying Incorrect letter -----------------------------------------------

function updateWrongLetterEl(){
	incorrectEl.innerHTML = `
	${
		wrongLetters.length > 0? "<p>Incorrect Words:</p>" : ""
	}
	${wrongLetters.map(
		(letter) => `<span>${letter}</span>`)}
	`;

	//--------------------------------displaying body-parts---------------------------------------------------

	const errors = wrongLetters.length;
	switch(errors){
		case 1:
			document.getElementById("image").src = 'assests/stage1.png';
			break;
		case 2:
			document.getElementById("image").src = 'assests/stage2.png';
			break;
		case 3:
			document.getElementById("image").src = 'assests/stage3.png';
			break;
		case 4:
			document.getElementById("image").src = 'assests/stage4.png';
			break;
		case 5:
			document.getElementById("image").src = 'assests/stage5.png';
			break;
		case 6:
			document.getElementById("image").src = 'assests/stage6.png';
			break;
	}
	if(errors === 6){
		document.getElementById("win-msg").innerHTML = "You couldn't save Arnold :(";
		notify.style.display = "flex";
	}
	
};

//----------------------------------- Input from user ----------------------------------------------------------

window.addEventListener("keydown", (e) =>{
	if(e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;
		if(selectedWord.includes(letter)){
			if(!correctLetters.includes(letter)){
				correctLetters.push(letter);
				displayWord();
			}
		}
	else{
		if(!wrongLetters.includes(letter)){
			wrongLetters.push(letter);
			updateWrongLetterEl();
			}
		}
	}
});

// ------------------------------------- play again function---------------------------------------------------
playAgainBtn.addEventListener("click",()=>{
	correctLetters.splice(0);
	wrongLetters.splice(0);
	selectedWord = words[Math.floor(Math.random()* words.length)];
	displayWord();
	updateWrongLetterEl();
	notify.style.display='none';
	document.getElementById("image").src = "assests/pillar.png"; 
})

displayWord();