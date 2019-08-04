var length = questions.length;
var tochoose = []

var index = 2;
var enabled = false;

function initialize() {
	var i = 0;
	tochoose = [];
	while(i < 10) {
		var randomnumber = Math.floor(Math.random() * length);
		if (tochoose.includes(randomnumber)) {
			continue;
		}
		else {
			tochoose[i] = randomnumber;
			i++;
		}
	}
	tochoose = tochoose.sort(function(a, b){return a-b});
	console.log(tochoose);
	document.getElementById("question1").innerHTML = questions[tochoose[0]];
	document.getElementById("question2").innerHTML = questions[tochoose[1]];
	document.getElementById("min").innerHTML = "??";
	document.getElementById("sec").innerHTML = "??";
	enabled = true;
	index = 2;
}
function reset() {
	document.getElementById("question1").innerHTML = "";
	document.getElementById("question2").innerHTML = "";
	document.getElementById("min").innerHTML = "??";
	document.getElementById("sec").innerHTML = "??";
	enabled = false;
}

function nextQuestion() {
	if (index < 10 && enabled) {
		document.getElementById("question1").innerHTML = questions[tochoose[index - 1]]; 	
		document.getElementById("question2").innerHTML = questions[tochoose[index]];
		index++;
	}
}



function decrement(time) {
	if (time < 0) {
		// nextQuestion();
	}
	else {
		var minutes = Math.floor(time/60);
		var seconds = time%60;
		
		document.getElementById("min").innerHTML = "??";
		document.getElementById("sec").innerHTML = "??";
	}
}


function stopwatch() {
	document.getElementById("timer").innerHTML = "00:00";
	
}


function previousQuestion() {
	if (index > 1 && enabled) {
		index--;
		document.getElementById("question1").innerHTML = questions[tochoose[index - 1]]; 	
		document.getElementById("question2").innerHTML = questions[tochoose[index]];
	}
}

document.body.addEventListener("keydown", function (event) {
    if (event.which === 39) {
    	nextQuestion();
    }
    else if (event.which === 37) {
    	previousQuestion();
    }
});



document.body.addEventListener("keypress", function (event) {
    if (event.key === 'i') {
    	initialize();
    	console.log("Inititalized");
    }
    else if (event.key === 'r') {
    	reset();
    	console.log("Reset");
    }
});

