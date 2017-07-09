
let goals = [
  {goal: 100, url: "https://khanacademy.org", progress: 55},
  {goal: 75, url: "https://google.com", progress: 25},
]

if(localStorage.goals) {
goals = JSON.parse(localStorage.goals)
}
function deletegoal(index) {
  goals.splice(index, 1)
  updategoals()
}
function updategoals() {
localStorage.goals = JSON.stringify(goals);
let goalsHtml = "";
for (var i = 0; i < goals.length; i++) {
  let goal = goals[i]
  goalsHtml = goalsHtml + '<li><a href="' + goal.url + '">'+goal.url + '</a><span><span>' + goal.progress + '</span>/<span>' + goal.goal + '</span></span><button onclick="deletegoal('+i+')">x</button></li>'
}

document.getElementById('goalscontainer').innerHTML = goalsHtml
}

updategoals()

document.getElementById('addgoal').onclick = function () {
  let goalminutes = document.getElementById('newgoal').value
  let goalurl = document.getElementById('newgoalurl').value
  goals.push({
    goal:Number(goalminutes), url:goalurl, progress:0
  })
  updategoals()
}
