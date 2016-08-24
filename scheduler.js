for (var i = 0; i < 32; i++) {
  var row = document.createElement("tr")
  row.setAttribute('id', 'row-' + i)
  row.setAttribute('class', 'time-period')
  if (i % 2 == 0) {
    row.setAttribute('style', 'background-color:#D3D3D3')
  }
  document.getElementById("table").appendChild(row)

  var time = document.createElement("th")
  var min = (i * 15) + 450
  var leftside = min % 60
  if (leftside == 0) {
    leftside = '00'
  }
  time.innerHTML = Math.floor(min / 60) + ":" + leftside
  document.getElementById("row-" + i).appendChild(time)

  for (var j = 0; j < 6; j++) {
    var timeslot = document.createElement("td")
    timeslot.setAttribute('id', 'timeslot-' + i + '-' + j)
    timeslot.setAttribute('class', 'timeslot')
    row.appendChild(timeslot)
  }
}
