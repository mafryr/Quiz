//load the JS after pressing any key
window.addEventListener("keypress", showQuestion);
//initiate the timer
window.addEventListener("keypress", countDownInit);
//show the highest score
window.addEventListener("keypress", priorhighScore);
//show the current question
window.addEventListener("keypress", currentQuestion);

// //counter of array starts at zero
var counter = 0;
//# of correct answers at zero  
var correct = 0;
//initialize global object/value 
var gameQuestion = {};
//initialize question counter
var qcounter = 0;
//initialize time score
var tscore = 0;
//initialize playername
var playername = 'MR';
//game result initialization
var gameResult = {};
//high score list initialization
var highscoreList = [];
//stored score initialization
var storedHscore = [];

//Question Array database
var questionsArray = [
    [ "What is the capital of Colombia?", "Medellin", "Bogota", "Madrid", "B" ],
	[ "What is the capital of Iran?", "Tehran", "Jerusalem", "Beirut", "A" ],
	[ "What is the capital of Canada?", "Ottawa", "Vancouver", "Alaska", "A" ],
	[ "What is the capital of Bolivia?", "El Alto", "Trinidad", "La Paz", "C" ],
	[ "What is the capital of Cambodia?", "Krong Kampot", "Phnom Penh", "Krong Kampong Cham", "B" ],
	[ "What is the capital of Nigeria?", "Abuja", "Enugu", "New Delhi", "A" ],
	[ "What is the capital of Serbia?", "Subotica", "Belgrade", "Indija", "B" ],
	[ "What is the capital of Croatia?", "Zadar", "Sinj", "Zagreb", "C" ],
	[ "What is the capital of Bosnia?", "Mostar", "Sarajevo", "Zenica", "B" ],
	[ "What is the capital of Jordan?", "Ammir", "Ammon", "Amman", "C" ],
	[ "What is the capital of Singapore?", "Singapore", "Yishun", "Yangshan", "A" ],
	[ "What is the capital of Tanzania?", "Dodoma", "Fiji", "Tanga", "A" ],
	[ "What is the capital of Sudan?", "Kassala", "Port Sudan", "Khartoum", "C" ],
	[ "What is the capital of Uruguay?", "Paraguay", "Rivera", "Montevideo", "C" ],
	[ "What is the capital of Poland?", "Wroclaw", "Warsaw", "Lublin", "B" ],
	[ "What is the capital of Vietnam?", "Ho Chi Min City", "Saigon", "Hanoi", "C" ],
	[ "What is the capital of North Korea?", "Pyongyang", "Pangan", "Seoul", "A" ]
];

//get Element function to be used later
function getElement(x){
	return document.getElementById(x);
}

//timer for game
function countDownInit() {
	countDownNumber = Object.keys(questionsArray).length * 15;
    countDownTrigger();
}

//timer for game
function countDownTrigger(){
   if(countDownNumber > 0){
        countDownNumber--;
        document.getElementById('timer').textContent = countDownNumber + " seconds left";
        	setTimeout(countDownTrigger, 1000);
        //if timer runs out call noTime function
    	}else if (countDownNumber <=0){
    		noTime();
    		alert("Time has run out! Better luck next time :)");
    }
}

//random selection of question from questionsArray
var randomQuestion = function (){
	gameQuestion = Math.floor(Math.random() * questionsArray.length);
	return gameQuestion;
};

//display Question from question database
function showQuestion(){
	//call randomQuestion and set the random # to arrayIndex variable
	var arrayIndex = randomQuestion();

	//grab questionArea on DOM
	questionArea = getElement("questionArea");
	
	//checks counter to length of array to display completion
	if (counter >= questionsArray.length) {
		alert("Quiz Completed!");
		playername = prompt("Please Enter Your Initials:");

		questionArea.innerHTML = "<h2 color: #000000> Great Job " + playername + "!<BR/>You got " + correct + " of " + questionsArray.length + " questions correct with " + countDownNumber + " seconds left!</h2>";
		getElement("test_status").textContent = "Test Completed";
		tscore = countDownNumber;

		savescore();	

		//stops the function
 		return false;
 	}

	//assign array content to variables 
	var question = questionsArray[arrayIndex][0];
	var choiceA = questionsArray[arrayIndex][1];
	var choiceB = questionsArray[arrayIndex][2];
	var choiceC = questionsArray[arrayIndex][3];

	//grab DOM element and assign content to DOM
	questionArea.innerHTML = "<h2 color: #000000>"+question+"</h2>";
	questionArea.innerHTML += "<input type='radio' name='choices' value='A'> "+choiceA+"<br>";
	questionArea.innerHTML += "<input type='radio' name='choices' value='B'> "+choiceB+"<br>";
	questionArea.innerHTML += "<input type='radio' name='choices' value='C'> "+choiceC+"<br><br>";
	questionArea.innerHTML += "<button id = 'submitButton'>Submit Answer</button>";

	//count# for question appearance
	counter++;

	//flip animation
	//flip();

	//reset button
	reset();
}

//checkAnswer function
function checkAnswer(){
	//select "choices" from DOM after being set in showQuestion function
	var choices = document.getElementsByName("choices");
	for (var i = 0; i < choices.length; i++){
		if (choices[i].checked){
			selectedAnswer=choices[i].value;
		}
	}
	//compare answers and selected radio button while increasing count of correct answers
	if (selectedAnswer == questionsArray[gameQuestion][4]) {
		correct++;
		currentScore();
	}
	else {
		countDownNumber = countDownNumber - 15;
	}
	showQuestion();
	currentQuestion();
}


function currentQuestion() {
	qcounter = qcounter + 1;
	if (qcounter <= questionsArray.length) {
		getElement('question').innerHTML = "Question: " + qcounter + "/" + questionsArray.length;
	}
}

function currentScore(){
	//grab DOM element and pushing in score
	getElement('score').innerHTML = "Current Score: " + correct;
	//update localStorage score if need to
	if (correct >= localStorage.getItem('existingScore')){
		localStorage.setItem('existingScore', correct);
	 }
}

//set prior score
function priorhighScore(){
	if (localStorage.getItem('exisitingScore') === null){
		localStorage.setItem('existing', 0);
	}else
		currentScore();
		getElement('priorScores').innerHTML = "High Score: " +localStorage.getItem('existingScore');
}

//reset button function
function reset(){
	var reset = document.getElementById('StartOver');
		reset.addEventListener('click', startOver);
}
//reset function - location.reload
function startOver(){
	location.reload();
}

//jquery function for stopping eventHandler for click on submitButton
function noTime(){
	//console.log('no time');
	$('div.stage').off('click', "#submitButton");
}

//jQuery for flipping area animation
function flip(){
	$('#submitButton').on('click', function() {
		$('.flashcard').toggleClass('flipped');
	});
}

//jQuery for click submitButton calling checkAnswer function
$(document).ready(function() {
	$('div.stage').on('click', "#submitButton", function(){
		// console.log('test');
		checkAnswer();
	});
});


//Score keeping
function savescore() {
	localStorage.setItem('User', playername);
	localStorage.setItem('Score', correct);
	localStorage.setItem('Time Score', tscore);

	storedHscore = JSON.parse(localStorage.getItem('High Scores'));
	highscoreList.push(storedHscore);
	gameResult = { Player: localStorage.getItem('User'), score: localStorage.getItem('Score'), Time_Remaining: localStorage.getItem('Time Score') };
	highscoreList.push(gameResult);
	highscoreList.sort(function (a, b) { return (b.timescore - a.timescore) });

	localStorage.setItem('High Scores', JSON.stringify(highscoreList));
	storedHscore = JSON.parse(localStorage.getItem('High Scores'));
}