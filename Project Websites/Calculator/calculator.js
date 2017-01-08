// new comments to add to the git repo

var state = {
  // default value to display is "0" in both current & display memory.
  displayCur: "0",
  maxDisplayCurLen: 10,
  displayMem: "0",
  activeMem: "0",
  operator: "",
  decimalPoint: false,

  memUpdate: function (){
    // this updatest the display memory string. String will only
    // ever contain the activeMem + operator + displayCur at most
    if (state.activeMem !== "0") {
      state.displayMem = state.activeMem + state.operator

      if (state.displayCur !== "0") {
      state.displayMem += state.displayCur
      }

    } else {
      state.displayMem = state.displayCur + state.operator
    }
  }
}

function displayUpdate(){
  // Update the display using state variable.

  var displayCur = document.getElementById("displayCur")
  displayCur.innerHTML = state.displayCur

  var displayMem = document.getElementById("displayMem")
  displayMem.innerHTML = state.displayMem
}

function calculate(){
  // performs calculation on the state values and mutates that
  // object to reflect this

  // calculation is peformed
  switch (state.operator){
    case "+":
      state.displayCur =
        parseFloat(state.activeMem) + parseFloat(state.displayCur)
      break

    case "-":
      state.displayCur =
        parseFloat(state.activeMem) - parseFloat(state.displayCur)
      break

    case "x":
      state.displayCur =
        parseFloat(state.activeMem) * parseFloat(state.displayCur)
      break

    case "÷":
       state.displayCur =
        parseFloat(state.activeMem) / parseFloat(state.displayCur)
       break
  }
  console.log(state.displayCur.toString().length)
  if(state.displayCur.toString().length > state.maxDisplayCurLen){
    state.displayCur = "Maxed out"
  }

  // active memory and the operator is cleared
  state.activeMem = "0"
  state.operator = ""

  // unsure if needed in program
  //state.canCalc = false
  //state.newNum = true
}

function isNumber(){
  // Takes the number input and updates the display state

  // If an operator has been entered, transfer number to memory
  // and start afresh. Also if text is "Maxed out"
  startOver()

  // If the display has default "0" then match input, otherwise
  // build the number
  if (state.displayCur == "0"){
    state.displayCur = el
  } else if (state.displayCur.length < state.maxDisplayCurLen){
    state.displayCur += el
  }

}

function isDecimalPoint(){
  // Adds a decimal point if one is not already used

  if(state.decimalPoint){
    return
  }

  // If an operator has been entered, transfer number to memory
  // and start afresh. Also if text is "Maxed out"
  startOver()

  if (state.displayCur.length < state.maxDisplayCurLen){
    state.displayCur += el
  }

  state.decimalPoint = true
}

function startOver(){
  // If an operator has been entered, transfer number to memory
  // and start afresh.

  if (state.operator !== "" && state.activeMem == "0" ){
    state.activeMem = state.displayCur
    state.displayCur = "0"
  }

  if (state.displayCur == "Maxed out"){
    state.displayCur = "0"
  }

  state.decimalPoint = false
}

function isEquals(){
  // Process state when equals is pressed

  // If there is a number in memory & current & stored operator
  // complete a calculation first before updating operator.
  if (state.activeMem !== "0" && state.operator
    && state.displayCur !== "0"){
      console.log("calculate fired")
    calculate()
    }

  // If there is a current number and operator but no second number
  // then just remove the operator.
  if (state.activeMem == "0"){
    state.operator = ""
  }
}

// Updates state object whenever an input is recevied and prints is on the display.

function setListener (){
  // Sets up the listener on the inputs container. Once and input
  // is received then it cascades the response. Input is only ever
  // a single button press.

  document.getElementById("inputs")
    .addEventListener("click", function(e){

    el = e.srcElement.name

    // For error checking purposes record button pressed
    state.keypress = el

    // user clicked outside a button
    if (el === undefined){return}

    // input by button type
    if(el >= 0 && el <= 9){
      isNumber()
    }

    if(el == "."){
      isDecimalPoint()
    }

    if (el == "+" || el == "-" || el == "x" || el == "÷"){

      // if there is a number in memory & current & stored operator
      // complete a calculation first before updating operator
      if (state.activeMem !== "0" && state.operator
        && state.displayCur !== "0"){
        calculate()
        }

      // Update operator
      state.operator = el
    }

    if (el == "="){
      isEquals()
    }

    if (el == "AC"){
      // Button "AC" clears the entire memory, resenting the
      // calculator
      state.displayCur = "0"
      state.activeMem = "0"
      state.operator = ""
    }

    if (el == "CE"){
      // Button "CE" clears the last numbers that were entered
      state.displayCur = "0"
    }

    console.log("Before update = ", JSON.stringify(state))
    state.memUpdate()
    displayUpdate()
    console.log("After update = ", JSON.stringify(state))

  })
}

// starts calculator running
setListener()
state.memUpdate()
displayUpdate()
