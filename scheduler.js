// Abandon all hope, all ye who enter here

var letters = ["A", "B", "C", "D", "E", "F"]
var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
           "A", "B", "C", "D", "E", "F"]

var dayBoxes = new Array(6)
var classList = [];

setInterval(saveData, 100);

var selClass = undefined;


function Class(name, location, days, color, startTime, endTime) {
  this.name = name;
  this.location = location;
  // days is an array of integers
  this.days = days;
  this.color = color;
  this.startTime = startTime;
  this.endTime = endTime;
  this.timeSlots = function() {
    var timeSlotList = [];
    for (var i = 0; i < days.length; i++){
      for (var j = startTime; j < endTime; j++) {
        timeSlotList.splice(0, 0, document.getElementById("timeslot-" + j + "-" + days[i]))
      }
    }
    return timeSlotList
  }
}


function reload() {
  // reset all cells
  for (var i = 0; i < 32; i++) {
    for (var j = 0; j < 6; j++) {
      if (i % 2 == 0) {
        document.getElementById("timeslot-" + i + "-" + j).style.backgroundColor = "#D3D3D3"
      } else {
        document.getElementById("timeslot-" + i + "-" + j).style.backgroundColor = "white"
      }
      document.getElementById("timeslot-" + i + "-" + j).innerHTML = "";
      document.getElementById("timeslot-" + i + "-" + j).class = undefined;

    }
  }

  for (var i = 0; i < classList.length; i++) {
    for (var d = 0; d < classList[i].days.length; d++) {
      for (var s = classList[i].startTime; s < classList[i].endTime; s++) {
        var timeSlot = document.getElementById("timeslot-" + s + "-" + classList[i].days[d])
        timeSlot.style.backgroundColor = "#" + classList[i].color;
        timeSlot.class = classList[i]
      }
      if (classList[i].endTime - classList[i].startTime === 1) {
        document.getElementById("timeslot-" + classList[i].startTime + "-" + classList[i].days[d]).innerHTML = classList[i].name + " - " + classList[i].location
      } else {
        var topMiddle = Math.floor((classList[i].startTime + classList[i].endTime) / 2) - 1
        document.getElementById("timeslot-" + topMiddle + "-" + classList[i].days[d]).innerHTML = classList[i].name
        document.getElementById("timeslot-" + (topMiddle + 1) + "-" + classList[i].days[d]).innerHTML = classList[i].location
      }
    }
  }
}



var selectedTimeSlot = undefined;

document.addEventListener('click', function(e) {
  var id = event.target.id
  if (id.indexOf("timeslot") !== -1) {
    selectedTimeSlot = document.getElementById("timeslot-" + getPeriod(event.target) + "-" + getDay(event.target))
    prepInfo(getDay(event.target), getPeriod(event.target))
  }
}, false)

function prepInfo(day, period) {
  selClass = document.getElementById("timeslot-" + period + "-" + day).class
  console.log(selClass)
  if (selClass !== undefined) {
    document.getElementById("classname").value = selClass.name;
    document.getElementById("location").value = selClass.location;
    for (var i = 0; i < 6; i++) {
      document.getElementById("daybox-" + i).checked = false;
    }
    for (var i = 0; i < selClass.days.length; i++) {
      document.getElementById("daybox-" + selClass.days[i]).checked = true;
    }
    for (var i = 0; i < 32; i++) {
      document.getElementById("soption-" + i).selected = ""
      document.getElementById("eoption-" + (i+1)).selected = ""
    }
    document.getElementById("soption-" + selClass.startTime).selected = "selected"
    document.getElementById("eoption-" + selClass.endTime).selected = "selected"

    document.getElementById("colorpicker").value = selClass.color;
    document.getElementById("colorpicker").style.backgroundColor = "#" + selClass.color;

  } else {
    newColor();
    for (var i = 0; i < 32; i++) {
        document.getElementById("soption-" + i).selected = ""
        document.getElementById("eoption-" + (i+1)).selected = ""
    }

    document.getElementById("soption-" + period).selected = "selected"
    if (period < 28) {
      document.getElementById("eoption-" + (period + 4)).selected = "selected"
    } else {
      document.getElementById("eoption-32").selected = "selected"
    }


    for (var i = 0; i < 6; i++) {
      if (i === day)
        document.getElementById("daybox-" + i).checked = true;
      else
        document.getElementById("daybox-" + i).checked = false;
    }

    document.getElementById("classname").value = ""
    document.getElementById("location").value = ""

    selClass = new Class("", "", [day], document.getElementById("colorpicker").value, period, period+4)

    classList.splice(0,0,selClass)


  }
  setDisabled(false);
}

function saveData() {
  if (selClass !== undefined) {
    selClass.name = document.getElementById("classname").value
    selClass.location = document.getElementById("location").value
    var newDays = []
    for (var i = 0; i < 6; i++) {
      if (document.getElementById("daybox-" + i).checked) {
        newDays.splice(0,0,i)
      }
    }
    selClass.days = newDays
    selClass.color = document.getElementById("colorpicker").value
    selClass.startTime = document.getElementById("start-time-select").selectedIndex;
    selClass.endTime = document.getElementById("end-time-select").selectedIndex + 1;
  }
  //console.log(selClass)
  reload()
}

document.getElementById("delete").addEventListener("click", function() {
  var index = classList.indexOf(selClass)
  classList.splice(index, 1)
  setDisabled(true)
  console.log("triggered")
})
function deleteClass() {

}

/*function getClass(timeSlot) {
  for (var x in classList) {
    for (var y in x.timeSlots) {
      if (getDay(timeSlot) === getDay(y) && getPeriod(timeSlot) === getPeriod(y)) {
        return x;
      }
    }
  }
  return undefined;
}*/

function getPeriod(timeSlot) {
  var id = timeSlot.id;
  if (id.charAt(10) === "-") {
    return parseInt(id.charAt(9))
  } else {
    return parseInt(10 * id.charAt(9)) + parseInt(id.charAt(10))
  }
}

function getDay(timeSlot) {
  var id = timeSlot.id
  if (id.charAt(10) === "-") {
    return parseInt(id.charAt(11))
  } else {
    return parseInt(id.charAt(12))
  }
}


function toTime(period) {
  var min = (period * 15) + 450
  var leftside = min % 60
  if (leftside == 0) {
    leftside = '00'
  }
  return Math.floor(min / 60) + ":" + leftside
}


function newColor() {
  var color = ""
  for (var i = 0; i < 6; i++) {
    color = color + hex[Math.floor(Math.random() * 16)]
  }
  var el = document.getElementsByClassName("jscolor")
  for (var i = 0; i < el.length; i++) {
    el[i].value = color
  }
  document.getElementById("colorpicker").style.backgroundColor = "#" + color;
}

function setDisabled(val) {
  document.getElementById("classname").disabled = val;
  document.getElementById("location").disabled = val;
  document.getElementById("start-time-select").disabled = val;
  document.getElementById("end-time-select").disabled = val;
  document.getElementById("delete").disabled = val;
  for (var i = 0; i < 6; i++) {
    document.getElementById("daybox-" + i).disabled = val;
  }
}


setup();
function setup() {
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

  for (var i = 0; i < 6; i++) {
    var div = document.createElement("div")
    dayBoxes[i] = document.createElement("input")
    dayBoxes[i].type = "checkbox"
    dayBoxes[i].id = "daybox-" + i
    dayBoxes[i].disabled = true;
    div.appendChild(dayBoxes[i])
    div.innerHTML = div.innerHTML + " <b>" + letters[i] + "</b>"
    document.getElementById("panel-3").appendChild(div)
  }

  //newColor();
}
