// Unit tests
// ################

// f. gameWinner

var tOutcome = {}
var tGameWinner = {}

var testGameArray =
  [
    ["x", "x", "x"],
    [" ", "x", " "],
    ["o", "o", " "]
  ]

if(typeof(gameWinner(testGameArray)) === "object"){
  tGameWinner.test1 = "Pass"
  } else {
  tGameWinner.test1 = "Fail"
  }

if((gameWinner(testGameArray)).winner === "x"){
  console.log ("Test 2 - Pass", gameWinner(testGameArray))
  } else {
  console.log ("Test 2 - Fail")
  }

if(typeof(gameWinner(testGameArray).how) == "object"){
  console.log ("Test 3 - Pass")
  } else {
  console.log ("Test 3 - Fail", typeof(gameWinner(testGameArray).how))
  }

  testGameArray =
    [
      ["x", " ", " "],
      [" ", "x", " "],
      ["o", "o", "x"]
    ]

  testGameArray =
    [
      ["x", " ", " "],
      ["o", "o", "o"],
      ["o", "x", "x"]
    ]

  tOutcome.gameWinner = tGameWinner

console.log(JSON.stringify(tOutcome))
