
// next tasks
// update #slideThree to be onSwitch to make code clearer
// create state object for start, sequence, place in sequence
// refactor active css to be activated through javascript.
// events should then check if current game is underway,
// link to game process code


function init (){

  var buttons = $(".pushButtons button")
  var audio = $("audio")

  $("#slideThree").on("click", function(e){

    // toggle push buttons
    buttons.toggleClass("turnOn")

    // game switched on
    if(e.target.checked){

      // counter on
      var counter = $(".counterText")
      counter.text("00")

      // strictMode check box enabled
      $("#strictMode").off()

      // event handler for start button
      $(".btn-start").on("click", function(){

        // move into state object      
        var strict = $("#strictMode")[0].checked
      })

      // action on click for buttons
      buttons.on("click", function(e){
        audio[e.target.value].play()
      })


    } else {

      // turn game off
      buttons.off()
      $(".counterText").text("")
      strictDisabled()
    }
  })
}

function strictDisabled (){

  var strictMode = $("#strictMode")
  strictMode[0].checked = false
  strictMode.on("click", function (e){
    this.checked = false
  })
}


// $ doc ready
$(function(){
  strictDisabled ()
  init()
})
