
// next tasks
// create winning sequence in the .win class on css (animation of rainbow color for SIMON logo)
// build in strict mode - to reset if you get it wrong
// Notify of winning - build in css flashin !! in count section when you make an error (animation of display: none)
    // User Story: If I press the wrong button, I am notified that I have done so, and that series
    // of button presses starts again to remind me of the pattern so I can try again.
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
  return Math.floor(Math.random()*4)
}

function updateCounter(){
  console.log("Sequence = ", gameState.sequence)

  let count = gameState.sequence.length.toString()
  if (count.length == 1){
    count = "0" + count
  }

  $(".counterText").text(count)
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

function checkEntry (input){

  // console.log("checking entry of ", input)

  let seqPlace = gameState.sequencePlace
  let expected = gameState.sequence[seqPlace]

  // player input correct
  if (input === expected){

    if (seqPlace + 1 < gameState.sequence.length){
      gameState.sequencePlace++
      gameState.gameButtonsDisable = false
    } else {


      if (gameState.sequence.length == 2){
        winSequence()
        reset()
        $(".counterText").text("00")
      } else {
        gameState.sequence.push(nextEntry())
        updateCounter()
        playSequence()
      }
    }

  //player input incorrect
  } else {

    setTimeout(function (){
      gameState.sequencePlace = 0
      playSequence()
    }, 200)
  }
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
  gameState.sequence = []
  gameState.btnDownTime = 750
  gameState.btnPauseTime = 100
  gameState.gameButtonsDisable = false

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
      console.log("Started game")
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
