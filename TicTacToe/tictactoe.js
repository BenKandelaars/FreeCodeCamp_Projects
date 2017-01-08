console.log("#############")

var gameBoard =
  [
    ["x", " ", "x"],
    [" ", "o", "o"],
    [" ", "x", "o"]
  ]

function findWinner(gameBoard){

  let result = {
    winner: "",
    how: ""
  }

  let pieces = {x: 0, o: 0};
  let checkCoords = []

  function checkSquare (square, pieces){

    switch (square){
      case "x":
        pieces.x += 1
        break

      case "o":
        pieces.o += 1
        break
    }

  }

  function resetVar(){
    pieces = {x: 0, o: 0};
    checkCoords = []
  }

  function updateResult(result, pieces, checkCoords){
    if (pieces.x === 3){
      result.winner = "x"
      result.how = checkCoords
    }

    if (pieces.o === 3){
      result.winner = "o"
      result.how = checkCoords
    }

  }

  function checkAcross(){
    gameBoard.map(function (row, rowIndex){

      resetVar()

      row.map(function (square, columnIndex){
        checkSquare(square, pieces)
        checkCoords.push([rowIndex, columnIndex])
      })

      updateResult(result, pieces, checkCoords)
    })
  }

  function checkDown(){
    gameBoard[0].map(function (_, columnIndex){

      resetVar()

      gameBoard.map(function (row, rowIndex){
        square = row[columnIndex]
        checkSquare(square, pieces)
        checkCoords.push([rowIndex, columnIndex])
      })

      updateResult(result, pieces, checkCoords)
    })
  }

  function checkDiag(){

    resetVar()

    for (i = 0; i < 3; i++){
      square = gameBoard[i][i]
      checkSquare(square, pieces)
      checkCoords.push([i], [i])
    }

    updateResult(result, pieces, checkCoords)

    resetVar()

    for (i = 0; i < 3; i++){
      square = gameBoard[i][(2 - i)]
      checkSquare(square, pieces)
      checkCoords.push([i, (2 - i)])
    }

    updateResult(result, pieces, checkCoords)

  }

  checkAcross()
  checkDown()
  checkDiag()

  return result
}

function possibleMoves(gameBoard){

  let result = []

  gameBoard.map(function (row, rowIndex){

    row.map(function (square, columnIndex){

      if (square != "x" && square != "o"){
        result.push([rowIndex, columnIndex])
      }
    })
  })

  console.log("potential moves = ", JSON.stringify(result))

  return result
}

function winningNextMove(gameBoard){

  let moveOptions = possibleMoves(gameBoard)
  let result = {}
  let players = ["x", "o"]

  moveOptions.map(function (option){

    players.forEach(function (player){

      let hypotheticalGameBoard = JSON.parse(JSON.stringify(gameBoard))

      let x = option[0]
      let y = option[1]

      hypotheticalGameBoard[x].splice(y, 1, player)

      if (findWinner(hypotheticalGameBoard).winner == player){
        result[player] = [x, y]
      }

    })
  })

  console.log(JSON.stringify(result))
  return result
}

winningNextMove(gameBoard)
