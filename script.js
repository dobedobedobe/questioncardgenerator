var length = questions.length;
var tochoose = []
var letters = ["A", "B", "C", "D"]

var index = 2;
var enabled = false;
var paused = false;

var API_KEY = "";

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
	document.getElementById("min").innerHTML = "??";
	document.getElementById("sec").innerHTML = "??";
	enabled = true;
	nextQuestion();
	index = 0;
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
	document.getElementById("image1").src = "";  
	document.getElementById("image2").src = "";  
	document.getElementById("image3").src = "";  
	document.getElementById("image4").src = "";  
	document.getElementById("word1").innerHTML = "";
	document.getElementById("word2").innerHTML = "";
	document.getElementById("word3").innerHTML = "";
	document.getElementById("word4").innerHTML = "";
	document.getElementById("min").innerHTML = "??";
	document.getElementById("sec").innerHTML = "??";
	enabled = false;
}

function chooseLetter() {
	return letters[Math.floor(Math.random()*letters.length)];
}

function nextQuestion() {
	if (index < 10 && enabled) {
		document.getElementById("question1").innerHTML = document.getElementById("question2").innerHTML; 	
		document.getElementById("question2").innerHTML = questions[tochoose[index]];
		document.getElementById("image1").src = document.getElementById("image3").src;  
		document.getElementById("image2").src = document.getElementById("image4").src;  
		document.getElementById("image3").src = "";  
		document.getElementById("image4").src = "";  
		document.getElementById("word1").innerHTML = document.getElementById("word3").innerHTML;
		document.getElementById("word2").innerHTML = document.getElementById("word4").innerHTML;
		document.getElementById("word3").innerHTML = "";
		document.getElementById("word4").innerHTML = "";
		document.getElementById("fix").disabled = false;
		// enabled = false;
		// setTimeout(function() {
		// 	enabled = true;
		// }, 1002)
		// setTimeout(stopwatch, 1005);
		index++;
	}
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function changeBackground(tags, image) {
	console.log(tags);
	listtags = tags.split(" ")
	tags = tags.trim();

	var url1 = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + API_KEY + "&tags=" + tags + "&format=json&nojsoncallback=1";
	var mystr = JSON.parse(httpGet(url1));
	var mystr = mystr.photos;
	mystr = mystr.photo;
	console.log(mystr.length);
	if (mystr.length == 0) {
		for (var i = 0; i < listtags.length; i++) {
			var isTrue = changeBackground(listtags[i], image);
			if (isTrue) {
				return true;
			} 
		}
		return false;
	}
	var rnd = Math.floor(Math.random()*mystr.length);
	console.log(mystr[rnd]);
	if (mystr[rnd] == undefined) {
		return false;
	}

	var url = "http://farm" + mystr[rnd].farm + ".staticflickr.com/" + mystr[rnd].server + "/"+ mystr[rnd].id + "_" + mystr[rnd].secret + ".jpg";
	console.log(url);
	image.src = url;
	return true;
}

function fixClick() {
	var num1 = document.getElementById("num1").value; 
	var num2 = document.getElementById("num2").value; 
	var letter1 = chooseLetter();
	var letter2 = chooseLetter();
	if (num1 == "" || num2 == "") {
		alert("Please Enter Something in both inputs")

	}
	if (num1 >= 34) {	
		alert("Please enter a value Less than 34 in both inputs")
		return;
	}

	if (num2 >= 34) {
		alert("Please enter a value Less than 34 in both inputs")
		return;
	}

	if (num1.length == 1) {
		num1 = "0" + num1;
	}
	if (num2.length == 1) {
		num2 = "0" + num2;
	}

	console.log(letter1 + num1, letter2 + num2);
	console.log(words[letter1 + num1]);
	console.log(words[letter2 + num2]);
	document.getElementById("word3").innerHTML = letter1 + num1 + " " + words[letter1 + num1];
	document.getElementById("word4").innerHTML = letter2 + num2 + " " + words[letter2 + num2];
	document.getElementById("fix").disabled = true;
	changeBackground(words[letter1 + num1], document.getElementById("image3"))
	changeBackground(words[letter2 + num2], document.getElementById("image4"))
	enabled = false;
	setTimeout(function() {
		enabled = true;
	}, 1002)	
	setTimeout(stopwatch, 1005);
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

/*  Just change the value of decrement under the
	index to change the stopwatch time. Also if 
	you want a random number change it to:
	decrement(Math.floor(Math.random()*(TimeSpan)) + LowerLimit);
	this will change decrement value to random number 
	between [LowerLimit, LowerLimit + TimeSpan]
*/
function stopwatch() {
	console.log("Stopwatch called");
	if (index == 0){
		nextQuestion();
		return;
	} 
	if (index == 1)  {
		decrement(10);
		return;
	}
	if (index == 2) {
		decrement(10);
		return;
	}
	if (index == 3) {
		decrement(10);
		return;
	}
	if (index == 4) {
		decrement(10);
		return;
	}
	if (index == 5) {
		decrement(10);
		return;
	}
	if (index == 6) {
		decrement(10);
		return;
	}
	if (index == 7) {
		decrement(10);
		return;
	}
	if (index == 8) {
		decrement(10);
		return;
	}
	if (index == 9) {
		decrement(10);
		return;
	}
	if (index == 10) {
		decrement(10);
		return;
	}
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

document.getElementById("fix").disabled = true;
