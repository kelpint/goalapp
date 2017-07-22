var timers = []
var goals = [
  {goal: 100, url: "https://khanacademy.org", progress: 55},
  {goal: 75, url: "https://google.com", progress: 25},
]

if(localStorage.goals) {
goals = JSON.parse(localStorage.goals)
}
function resetprogress(index) {
var goal2 = goals[index]
  goal2.progress = 0;
updategoals()
}
function addprogress(index) {
var goal2 = goals[index]
if(timers[index]) {
clearInterval(timers[index])
} else {
timers[index] = setInterval(function(){
  goal2.progress = goal2.progress + 1;
updategoals()
}, 60000);
}
}
function deletegoal(index) {
  goals.splice(index, 1)
  updategoals()
}
function updategoals() {
localStorage.goals = JSON.stringify(goals);
var goalsHtml = "";
for (var i = 0; i < goals.length; i++) {
  var goal = goals[i]
  goalsHtml = goalsHtml + '<li><a href="' + goal.url + '">'+goal.url + '</a><span><span>' + goal.progress + '</span>/<span>' + goal.goal + '</span></span><button onclick="deletegoal('+i+')">x</button><button onclick="addprogress('+i+')">start/stop timer</button><button onclick="resetprogress('+i+')">reset progress</button></li>'
}

document.getElementById('goalscontainer').innerHTML = goalsHtml
}

updategoals()

document.getElementById('addgoal').onclick = function () {
  var goalminutes = document.getElementById('newgoal').value
  var goalurl = document.getElementById('newgoalurl').value
  goals.push({
    goal:Number(goalminutes), url:goalurl, progress:0
  })
  updategoals()
}
