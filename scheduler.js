var letters = ["A", "B", "C", "D", "E", "F"]
var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
           "A", "B", "C", "D", "E", "F"]
var dayBoxes = new Array(6)

// Creates schedule table
for (var i = 0; i < 32; i++) {
  var row = document.createElement("tr")
  row.setAttribute('id', 'row-' + i)
  row.setAttribute('class', 'time-period')
  if (i % 2 == 0) {
    row.setAttribute('style', 'background-color:#D3D3D3')
  }
  document.getElementById("table").appendChild(row)

  var time = document.createElement("th")
  time.innerHTML = toTime(i)
  document.getElementById("row-" + i).appendChild(time)

  for (var j = 0; j < 6; j++) {
    var timeslot = document.createElement("td")
    timeslot.setAttribute('id', 'timeslot-' + i + '-' + j)
    timeslot.setAttribute('class', 'timeslot')
    row.appendChild(timeslot)
  }
}

var startTimeSelect = document.getElementById("start-time-select")
var endTimeSelect = document.getElementById("end-time-select")

for (var i = 0; i < 32; i++) {
  var soption = document.createElement("option")
  var eoption = document.createElement("option")

  soption.value = i
  eoption.value = i+(2/3)

  if (i === 3) {
    eoption.selected = "selected"
  }

  soption.innerHTML = toTime(i)
  eoption.innerHTML = toTime(i+(2/3))

  startTimeSelect.appendChild(soption)
  endTimeSelect.appendChild(eoption)
}

for (var i = 0; i < 6; i++) {
  var div = document.createElement("div")
  dayBoxes[i] = document.createElement("input")
  dayBoxes[i].type = "checkbox"
  div.appendChild(dayBoxes[i])
  div.innerHTML = div.innerHTML + " <b>" + letters[i] + "</b>"
  document.getElementById("panel-3").appendChild(div)
}

function toTime(period) {
  var min = (period * 15) + 450
  var leftside = min % 60
  if (leftside == 0) {
    leftside = '00'
  }
  return Math.floor(min / 60) + ":" + leftside
}

var color = ""
for (var i = 0; i < 6; i++) {
  color = color + hex[Math.floor(Math.random() * 16)]
}
var el = document.getElementsByClassName("jscolor")
for (var i = 0; i < el.length; i++) {
  el[i].value = color
}
