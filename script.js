var length = questions.length;
var tochoose = []

var index = 2;
var enabled = false;
var paused = false;
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
	enabled = false;
	setTimeout(function() {
		enabled = true;
	}, 1002)
	setTimeout(stopwatch, 1005);
	index = 2;
}
function play() {
	var minutes = parseInt(document.getElementById("min").innerHTML) * 60;
	var seconds = parseInt(document.getElementById("sec").innerHTML);
	if (isNaN(minutes) || isNaN(seconds)) {
		console.log(minutes, seconds);
	}
	else {
		enabled = true;
		decrement(minutes + seconds);
	}
}

function pause() {
	enabled = false;
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
		document.getElementById("image1").src = document.getElementById("image3").src;  
		document.getElementById("image2").src = document.getElementById("image4").src;  
		enabled = false;
		setTimeout(function() {
			enabled = true;
		}, 1002)
		setTimeout(stopwatch, 1005);
		index++;
	}
}



function decrement(time) {
	if (!enabled) {
		console.log("Not Enabled");
		return;
	}
	if (time < 0) {
		nextQuestion();
	}
	else {
		var minutes = Math.floor(time/60);
		var seconds = time%60;
		var minutes = minutes.toString();
		var seconds = seconds.toString();
		console.log(minutes, seconds);
		if (minutes.length < 2) {
			var str = "";
			minutes = str.concat("0", minutes);
		}

		if (seconds.length < 2) {
			var str = "";
			seconds = str.concat("0", seconds);
		}
		document.getElementById("min").innerHTML = minutes;
		document.getElementById("sec").innerHTML = seconds;
		setTimeout(decrement, 1000, time - 1);
	}
}


function stopwatch() {
	console.log("Stopwatch called");
	decrement(10);
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

