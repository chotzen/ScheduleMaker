var letters = ["A", "B", "C", "D", "E", "F"];

function toTime(period) {
  var min = (period * 15) + 450
  var leftside = min % 60
  if (leftside == 0) {
    leftside = '00'
  }
  return Math.floor(min / 60) + ":" + leftside
}
// Copy below this line:
/*---------------------------------------------------------------*/

setup();
function setup() {
  var timesTable = document.getElementById("times-table")
  var schedTable = document.getElementById("sched-table")

  for (var i = 0; i < 32; i++) {
    var timesRow = document.createElement("tr")
    var timesH = document.createElement("th")
    timesH.innerHTML = toTime(i)
    timesH.style = "border-top: none; border-left: 2px solid black; border-right: 2px solid black"
    timesH.id = "timelabel-" + i

    timesRow.appendChild(timesH)
    timesTable.appendChild(timesRow)

    var schedRow = document.createElement("tr")

    for (var j = 0; j < 6; j++) {
      var timeslot = document.createElement("td")
      timeslot.setAttribute('id', 'timeslot-' + i + '-' + j)
      timeslot.setAttribute('class', 'timeslot')
      schedRow.appendChild(timeslot)
    }

    schedTable.appendChild(schedRow)
  }
  document.getElementById("timelabel-31").style = "border-top: none; border-left: 2px solid black; border-right: 2px solid black; border-bottom: 2px solid black"

}
