// Progressive enhancement
// buzzer and animations for click

// state object set up with default values
var state = {
  break: 1,
  timer: 1,
  running: false,
  startTime: 0,
  timeRemaining: 1,
  refTime: new Date(),
  timerAction: "Start",
  timerState: "Count Down"
}

// Links to update section of the timer
var timerTime = document.getElementById('timerTime')
var timerAction = document.getElementById('timerAction')
var timerBreak = document.getElementById('timerBreak')
var timerLength = document.getElementById('timerLength')

function updateApp() {
  // f. updates all display elements with current state

  timerLength.innerHTML = state.timer
  timerBreak.innerHTML = state.break
  timerAction.innerHTML = state.timerAction
  timerTime.innerHTML = state.timeRemaining

}

// update display to establish javascript working okay
updateApp()

function startCountDown(){
  state.startTime = state.timeRemaining
  state.refTime = Date.now()

  updateApp()
  runTimer()
}

function soundTheAlarm(){
  alarm.currentTime = 0
  alarm.play()
  
  var cur = timerCircle.className
  timerCircle.className += " hvr-buzz"

  setTimeout(function(){
    timerCircle.className = cur
  },2000)
  setTimeout(function(){runTimer()}, 1000*10)
}

function timerToggle (){

  // timer has run to 0, toggle to break / timer
  switch (state.timerAction){

    case "Count Down":
    state.timeRemaining = state.break
    state.timerAction = "On a break"
    break

    case "On a break":
    state.timeRemaining = state.timer
    state.timerAction = "Count Down"
  }

  state.startTime = state.timeRemaining
  state.refTime = Date.now()
}

function runTimer (){

  // pause timer loop if pause toggled
  if(!state.running){
    return
  }

  if(!state.timeRemaining){
    timerToggle()
    updateApp()
  }

  // countdown every 10s. Refresh every 1s.
  // Wait 5s on finish
  var time = Date.now()
  var nextChange = state.refTime + (1000*10) +
  ((state.startTime - state.timeRemaining)*(1000*10))

  console.log(nextChange)

  if (time >= nextChange){
    state.timeRemaining--
    updateApp()
  }
  if (state.timeRemaining){
    setTimeout(function(){runTimer()}, 1000)
  } else {
    soundTheAlarm()
  }
}


// f to store link to audio element
function setAudio (){
  var alarm = document.getElementById('alarm')
}
window.onload="setAudio()"

// Event listeners
var timerAdd = document.getElementById('timerAdd')
timerAdd.addEventListener('click', function(e){
  event.preventDefault()

  state.timer++
  if(!state.running){
    state.timeRemaining++
  }
  updateApp()
})

var timerMinus = document.getElementById('timerMinus')
timerMinus.addEventListener('click', function(e){
  event.preventDefault()

  if(state.timer){
    state.timer--

    if (!state.running){
    state.timeRemaining--
    }
  }
  updateApp()
})

var breakAdd = document.getElementById('breakAdd')
breakAdd.addEventListener('click', function(e){
  event.preventDefault()

  state.break++
  updateApp()
})

var breakMinus = document.getElementById('breakMinus')
breakMinus.addEventListener('click', function(e){
  event.preventDefault()

  if(state.break){
    state.break--
  }
  updateApp()
})

var timerCircle = document.getElementById('timerCircle')
timerCircle.addEventListener('click', function(e){
  event.preventDefault()

  // start the countdown
  if (!state.running){

    state.running = true
    state.timerAction = state.timerState
    startCountDown()

  } else {

    state.running = false
    state.timerState = state.timerAction
    state.timerAction = "Paused"
    updateApp()
  }
})

var timerReset = document.getElementById('timerReset')
timerReset.addEventListener('click', function(e){
  event.preventDefault()

  state.running = false
  state.timeRemaining = state.timer
  state.timerAction = "Start"
  updateApp()
})
