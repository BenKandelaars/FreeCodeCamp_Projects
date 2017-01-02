console.log("#############")

var gameArray =
  [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]

function gameWinner (gameArray){
  let winner = {}
  let players =["x", "o"]
  //console.log(JSON.stringify(gameArray))

  // PseudoCode: check if player x has won by 3 across

  for (rowIndex = 0; rowIndex <= 2; rowIndex++){

    let winnerPlace = []
    let checkWinner = ""
    let square = ""

    for (i = 0; i <= 2; i++){
      square = gameArray[rowIndex][i]

      //console.log("square =", rowIndex, ",", i, " ", square)

      if(square != "x" && square != "o"){
        console.log ("break")
        break
      }

      if(i === 0){
        checkWinner = square
        winnerPlace[i] = [rowIndex, i]

      } else if (square == checkWinner){
        winnerPlace.push([rowIndex, i])

      } else {
        winnerPlace = []
        break
      }
    }

    if (winnerPlace.length === 3){

      winner.winner = checkWinner
      winner.how = winnerPlace
      break
    }

  }


  return winner
}

//gameWinner(gameArray);

// Unit tests
// ################

// f. gameWinner

var testGameArray =
  [
    ["x", "x", "x"],
    [" ", "x", " "],
    ["o", "o", " "]
  ]

if(typeof(gameWinner(testGameArray)) === "object"){
  console.log ("Test 1 - Pass")
  } else {
  console.log ("Test 1 - Fail")
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
