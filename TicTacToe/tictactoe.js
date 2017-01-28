console.log("#############")

var gameBoardEg =
  [
    ["X", "X", " "],
    [" ", " ", "O"],
    [" ", " ", " "]
  ]

let game = {

  board: document.getElementById("board"),
  elements: this.board.getElementsByClassName('square'),
  playerOne: "X",
  computerPiece: "O",
  singlePlayer: true,
  playerTurn: true,

  newGameBoard: function(){
    this.gameBoard =
      [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
      ]
  },

  resetGameBoard: function(){

    for(i=0; i < elements.length; i++){
        elements[i].innerHTML = "";
    }

    this.newGameBoard()
  },


  findWinner: function(gameBoard){

    // returns an object that includes the winner, if there is one and
    // the three places they have won by.

    let result = {
      winner: "",
      how: ""
    }

    let pieces = {X: 0, O: 0};
    let checkCoords = []

    checkSquare = function (square, pieces){
      switch (square){
        case "X":
          pieces.X += 1
          break

        case "O":
          pieces.O += 1
          break
      }
    }

    resetVar = function(){
      pieces = {X: 0, O: 0};
      checkCoords = []
    }

    updateResult = function (result, pieces, checkCoords){
      if (pieces.X === 3){
        result.winner = "X"
        result.how = checkCoords
      }

      if (pieces.O === 3){
        result.winner = "O"
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
  },

  possibleMoves: function(gameBoard){

    // returns an array of all the possible moves available to either
    // player

    let result = []

    gameBoard.map(function (row, rowIndex){

      row.map(function (square, columnIndex){
        if (square != "X" && square != "O"){
          result.push([rowIndex, columnIndex])
        }
      })
    })

    return result
  },

  winningNextMove: function(gameBoard){

    // returns an object with the winning next move for either or
    // both players

    let moveOptions = this.possibleMoves(gameBoard)
    let result = {}
    let players = ["X", "O"]

    callback = function (option, player){

      let hypotheticalGameBoard = JSON.parse(JSON.stringify(gameBoard))
      let y = option[0]
      let x = option[1]

      hypotheticalGameBoard[y].splice(x, 1, player)

      let winner =  game.findWinner(hypotheticalGameBoard)

      if (winner.winner == player){
        result[player] = [y, x]
      }
    }

    moveOptions.map(function(option){
      players.forEach(function (player){
        callback(option, player)
      })
    })

    console.log("Winning Next move fn = ", JSON.stringify(result))
    return result
  }
}

game.listeners = function () {
  for(i=0; i < this.elements.length; i++){
    this.elements[i].addEventListener("click", function (event){
      let el = event.target

      if (game.singlePlayer && game.playerTurn){
        el.innerHTML = game.playerOne

        let cellRef = el.dataset.pos
        let y = parseInt(cellRef.slice(0,1))
        let x = parseInt(cellRef.slice(2,3))

        game.playerTurn = false
        game.gameBoard[y][x] = game.playerOne

        game.checkGameEnd()
      }
    })
  }
}

game.startPlayer = function (){
  let startPlayer = Math.ceil(Math.random()*2)
  startPlayer === 1 ? this.playerTurn = true : this.playerTurn = false;
}

game.computerTurn = function (){

  console.log("Gameboard = ", this.gameBoard)

  let moves = this.possibleMoves(this.gameBoard)
  let winningMove = game.winningNextMove(this.gameBoard)
  let moveY = 5
  let moveX = 5

  console.log("moves available = ", JSON.stringify(moves))
  console.log("winning next move = ", winningMove)

  if (winningMove.hasOwnProperty(this.computerPiece)){

    console.log("someone can win = ", JSON.stringify(winningMove))
    moveY = winningMove[this.computerPiece][0]
    moveX = winningMove[this.computerPiece][1]

    } else

    if (winningMove.hasOwnProperty(this.playerOne)){

    moveY = winningMove[this.playerOne][0]
    moveX = winningMove[this.playerOne][1]

    } else {

    let computerMoveNo = Math.floor(Math.random()*moves.length)
    moveY = moves[computerMoveNo][0]
    moveX = moves[computerMoveNo][1]

  }

  //console.log("Random computer move = ", moves[computerMoveNo])

  this.gameBoard[moveY][moveX] = this.computerPiece

  //console.log("Gameboard = ", this.gameBoard)

  for (i = 0; i < this.elements.length; i++){
    let el = this.elements[i]
      if (el.dataset.pos == (moveY + "," + moveX)){
      el.innerHTML = this.computerPiece
    }
  }

  console.log("computer go finished")
  this.playerTurn = true;

  this.checkGameEnd()

}


game.checkGameEnd = function (){

  let winner = game.findWinner(this.gameBoard)

  console.log("winner = ", winner)
  if (winner.winner){
    console.log("Winner is = ", winner.winner)
    return
  }

  if (this.possibleMoves(this.gameBoard).length == 0){
    console.log("Out of moves")
    return
  }

  if (this.playerTurn === true){
    return
    } else {

    let timer = Math.random()*3000
    setTimeout(function(){ return game.computerTurn()}, timer)
  }
}

game.init = function () {

  this.newGameBoard()
  this.listeners()
  this.startPlayer()

  console.log("Player turn at start = ", game.playerTurn)

  if (this.playerTurn === false){this.computerTurn()}
}

game.init()
