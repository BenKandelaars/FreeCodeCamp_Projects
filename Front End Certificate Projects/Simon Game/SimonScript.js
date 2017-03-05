
// next tasks
// temp of game speeds up on the 5th, 9th and 13th step



console.log("##########")
//console.log("@@@@@@@@@@")

let buttons, audio
let gameState = {}

function winSequence(){
  console.log("Win sequence")
  $("#title").toggleClass("win")
}

function nextEntry(){
  let randomNum = Math.floor(Math.random()*4)

  if (gameState.sequence.length == 1) {

    let calledOnce = false
    if(gameState.sequence[0] == randomNum && calledOnce == false) {
        calledOnce == true
      return nextEntry()
    } else {
      return randomNum
    }

  } else {
    return randomNum
  }
}

function updateCounter(){
//  console.log("Sequence = ", gameState.sequence)

  let count = gameState.sequence.length.toString()
  if (count.length == 1){
    count = "0" + count
  }

  $(".counterText").text(count)
}

function counterFlash (){
  let counter = $(".counterText")
  let currentCounter = counter.text()

  counter.text("--")
  let flashCounter = 0

  let flashInterval = setInterval(function(){

    (counter.text() == "--") ? counter.text("  ") : counter.text("--")

    if (flashCounter == 4){
      counter.text(currentCounter)
      clearInterval(flashInterval)
    }

    flashCounter++

  }, 200)
}

function playSequence(){

  let i = 0
  let btnDownTime = gameState.btnDownTime
  let btnPauseTime = gameState.btnPauseTime

  function sequenceCallback(i){

  //console.log("callback call. i =", i, " length = ", gameState.sequence.length, "sequence = ", gameState.sequence[i])
   return function (){
      if (i < gameState.sequence.length-1){
        i++
        playGameButton(gameState.sequence[i], sequenceCallback(i), btnDownTime, btnPauseTime)
      } else {
        // Enable buttons once sequence has been played
        gameState.gameButtonsDisable = false
      }
    }
  }

  playGameButton(gameState.sequence[i], sequenceCallback(i), btnDownTime, btnPauseTime)
}

function start (){
  gameState.gameButtonsDisable = true

  gameState.sequence.push(nextEntry())
  updateCounter()
  playSequence()
  // then await a response from the user
}

function updateSpeed(){
  let seq = gameState.sequence;

  if (seq.length > 13){
    gameState.btnDownTime = 400
    gameState.btnPauseTime = 50
    return
  }

  if (seq.length > 9){
    gameState.btnDownTime = 500
    gameState.btnPauseTime = 80
    return
  }

  if (seq.length > 2){
    gameState.btnDownTime = 600
    gameState.btnPauseTime = 90
    return
  }

}

function checkEntry (input){

  // console.log("checking entry of ", input)
  let seqPlace = gameState.sequencePlace
  let expected = gameState.sequence[seqPlace]

  //console.log("input = ", input)
  //console.log("expected = ", expected)
  //console.log("seqPlace = ", seqPlace)

  function inputCorrect (){

    let seq = gameState.sequence;

    if (seqPlace + 1 < seq.length){
      gameState.sequencePlace++
      gameState.gameButtonsDisable = false

    } else if (seq.length == 20){

        winSequence()
        reset()
        $(".counterText").text("00")

      } else {

        setTimeout(function () {
          seq.push(nextEntry())
          gameState.sequencePlace = 0
          console.log (gameState.sequence)

          updateSpeed()
          updateCounter()

          playSequence()

        }, 500)
    }

  }

  function inputWrong () {

    if (gameState.strictMode == true || gameState.gameErrors == 2){
      $(".counterText").text("00")
      counterFlash()
      reset()
    } else {

      counterFlash()
      gameState.gameErrors++

      setTimeout(function (){
        gameState.sequencePlace = 0
        playSequence()
      }, 1000)
    }
  }

  (input === expected) ? inputCorrect() : inputWrong()

}


function playGameButton (buttonNo, callback, btnDownTime, btnPauseTime) {
  // runs animation and sound for button pressed with custom action (callback after each operation)
  // & custom button play time and pause after play

  //console.log("playing button = ", buttonNo)
  //console.log(typeof(callback))

  $(gameButtons[buttonNo]).toggleClass("btn-active")

  audio[buttonNo].currentTime = 0
  audio[buttonNo].play()

  setTimeout(function(){

    gameButtons.removeClass("btn-active")
    setTimeout(function (){
      callback()
    }.bind(null,callback), btnPauseTime)

  }.bind(null,callback) , btnDownTime)
}

function reset (){
  $(".counterText").text("")
  gameState.start = false

  gameState.btnDownTime = 750
  gameState.btnPauseTime = 100
  gameState.gameButtonsDisable = false
  gameState.gameErrors = 0
  gameState.sequence = []
  gameState.sequencePlace = 0

}

function init (){

  gameButtons = $(".gameBtns button")
  audio = $("audio")

  gameState = {
    strictMode: $("#strictMode")[0].checked,
    sequence: [],
    sequencePlace: 0
  }

  function setupGame(){
    reset()
    $(".counterText").text("00")

    // Strict mode - remove current event handler and
    // add new one to record states
    $("#strictMode").off()
    $("#strictMode").on("click", function(e){
      gameState.strictMode = e.target.checked
      console.log(gameState)
    })

    // start Button add event handler
    $(".btn-start").on("click", function(){

      // start game once Start first selected
      if (gameState.start) {
        reset()
      }

      gameState.start = true;
      //console.log("Started game")
      start()
    })

    // game Buttons add event handler
    gameButtons.on("click", function(e){

      // toggle light & sound activations on game buttons
      if (!gameState.gameButtonsDisable){

        let pressed = e.target.value
        gameState.gameButtonsDisable = true

        let callback = () => {
          if (gameState.start){
            checkEntry(parseInt(e.target.value))
          } else {
            gameState.gameButtonsDisable = false
          }
        }

        let btnDownTime = 500
        let btnPauseTime = 50

        playGameButton(pressed, callback, btnDownTime, btnPauseTime)

      }
    })
  }


  function shutGameOff(){
    gameButtons.off()
    $(".btn-start").off()
    strictDisabled()
    reset()
  }

  $("#onSwitch").on("click", function(onSwitch){

    //gameButtons.toggleClass("turnOn");
    (onSwitch.target.checked) ? setupGame() : shutGameOff()

  })
}

function strictDisabled (){

  let strictMode = $("#strictMode")

  strictMode[0].checked = false
  strictMode.on("click", function (e){
    this.checked = false
  })
}

// jQuery, when document ready
$(function(){
  strictDisabled ()
  init()
})
