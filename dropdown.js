var startTimeSelect = document.getElementById("start-time-select")

for (var i = 0; i < 32; i++) {
  var option = document.createElement("option")
  option.value = i
  option.innerHTML = toTime(i)
  startTimeSelect.appendChild(option)
}

function toTime(period) {
  var min = (period * 15) + 450
  var leftside = min % 60
  if (leftside == 0) {
    leftside = '00'
  }
  return Math.floor(min / 60) + ":" + leftside
}
