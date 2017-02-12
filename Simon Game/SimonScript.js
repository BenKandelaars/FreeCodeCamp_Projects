


function init (){

  var buttons = $(".pushButtons button")
  var audio = $("audio")

  $("#slideThree").on("click", function(e){

    // toggle push buttons
    buttons.toggleClass("turnOn")

    // game switched on
    if(e.target.checked){

      // sounds on
      buttons.on("click", function(e){
        audio[e.target.value].play()
      })

      var counter = $(".counterText")
      counter.text("00")

      $("#strictMode").off()

      // start button pressed
      $(".btn-start").on("click", function(){

        var strict = $("#strictMode")[0].checked
        console.log(strict)
      })

    } else {

      // turn off
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
