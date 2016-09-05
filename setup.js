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
    timesH.id = "timelabel-" + i
    if (i % 2 === 0) {
      timesH.style = "border-top: none; border-left: 2px solid black; border-right: 2px solid black; background-color: #FFFFFF"
    } else {
      timesH.style = "border-top: none; border-left: 2px solid black; border-right: 2px solid black; background-color: #D3D3D3"
    }

    timesRow.appendChild(timesH)
    timesTable.appendChild(timesRow)

    var schedRow = document.createElement("tr")

    for (var j = 0; j < 6; j++) {
      var timeslot = document.createElement("td")
      timeslot.setAttribute('id', 'timeslot-' + i + '-' + j)
      timeslot.setAttribute('class', 'timeslot')
      if (i % 2 === 0) {
        timeslot.style = "background-color: #FFFFFF"
      } else {
        timeslot.style = "background-color: #D3D3D3"
      }
      schedRow.appendChild(timeslot)
    }

    schedTable.appendChild(schedRow)
  }
  document.getElementById("timelabel-31").style = "border-top: none; border-left: 2px solid black; border-right: 2px solid black; border-bottom: 2px solid black; background-color: #D3D3D3"

  var startTimeSelect = document.getElementById("start-time-select")
  var endTimeSelect = document.getElementById("end-time-select")

  for (var i = 0; i < 32; i++) {
    var soption = document.createElement("option")
    var eoption = document.createElement("option")

    soption.value = i
    eoption.value = i+1

    soption.id = "soption-" + soption.value
    eoption.id = "eoption-" + eoption.value

    if (i === 3) {
      eoption.selected = "selected"
    }

    soption.innerHTML = toTime(i)
    eoption.innerHTML = toTime(i+(2/3))

    startTimeSelect.appendChild(soption)
    endTimeSelect.appendChild(eoption)
  }




}
