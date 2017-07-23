var timers = [];
var goals = [];

if (localStorage.goals) {
	goals = JSON.parse(localStorage.goals);
}
function formattime(time) {
	var min = Math.floor(time / 60);
	var sec = time % 60;
	min = String(min);
	sec = String(sec);
	if (sec.length < 2) {
		sec = "0" + sec;
	}
	return min + ":" + sec;
}
function resetprogress(index) {
	var goal2 = goals[index];
	goal2.progress = 0;
	updategoals();
}
function addprogress(index) {
	var goal2 = goals[index];
	goal2.minutesontimer = 0;
	if (timers[index]) {
		clearInterval(timers[index]);
	} else {
		timers[index] = setInterval(function() {
			goal2.progress = goal2.progress + 1;
			goal2.minutesontimer = goal2.minutesontimer + 1;
			updategoals();
		}, 1000);
	}
}
function deletegoal(index) {
	goals.splice(index, 1);
	updategoals();
}
function updategoals() {
	localStorage.goals = JSON.stringify(goals);
	var goalsHtml = "";
	for (var i = 0; i < goals.length; i++) {
		var goal = goals[i];
		goalsHtml =
			goalsHtml +
			"<li>" +
			'<a href="' +
			goal.url +
			'">' +
			goal.url +
			"</a>    " +
			"<span><span>" +
			Math.floor(goal.progress / 60) +
			"</span>   /   " +
			"<span>" +
			goal.goal / 60 +
			'</span></span><button onclick="deletegoal(' +
			i +
			')">x</button>' +
			formattime(goal.minutesontimer) +
			'<button onclick="addprogress(' +
			i +
			')">start/stop timer</button><button onclick="resetprogress(' +
			i +
			')">reset progress</button></li>';
	}

	document.getElementById("goalscontainer").innerHTML = goalsHtml;
}

updategoals();

document.getElementById("addgoal").onclick = addgoal;

function addgoal() {
	var goalminutes = Number(document.getElementById("newgoal").value) * 60;
	var goalurl = document.getElementById("newgoalurl").value;
	if (goalminutes < 0) {
		alert("error");
		return;
	}
	goals.push({
		goal: goalminutes,
		url: goalurl,
		progress: 0,
		minutesontimer: 0,
	});
	updategoals();
}
