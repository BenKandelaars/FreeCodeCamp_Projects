
function t_findWinner (){

  let testOutcomes = {testFunc: findWinner}

  let tGameArray =
    [
      ["x", "x", "x"],
      [" ", "x", " "],
      ["o", "o", " "]
    ]

  if(typeof(findWinner(tGameArray)) === "object"){
    testOutcomes.test1_1 = "Pass"
    } else {
    testOutcomes.test1_1 = "Fail"
    }

  if((findWinner(tGameArray)).winner === "x"){
    testOutcomes.test1_2 = "Pass"
    } else {
    testOutcomes.test1_2 = "Fail"
    }

  if(typeof(findWinner(tGameArray).how) == "object"){
    testOutcomes.test1_3 = "Pass"
    } else {
    testOutcomes.test1_3 = "Fail"
    }

  tGameArray =
    [
      ["x", " ", " "],
      [" ", "o", " "],
      ["o", "o", "x"]
    ]

  if(findWinner(tGameArray).winner == ""){
    testOutcomes.test2_1 = "Pass"
    } else {
    testOutcomes.test2_1 = "Fail"
    }

  tGameArray =
    [
      ["x", " ", " "],
      ["o", "o", "o"],
      ["o", "x", "x"]
    ]

  if(findWinner(tGameArray).winner == "o"){
    testOutcomes.test3_1 = "Pass"
    } else {
    testOutcomes.test3_1 = "Fail"
    }

  if(JSON.stringify(findWinner(tGameArray).how) ==
    JSON.stringify([[1,0], [1,1], [1,2]])){
    testOutcomes.test3_2 = "Pass"
    } else {
    testOutcomes.test3_2 = "Fail"
    }

  tGameArray =
    [
      ["x", "o", " "],
      [" ", "o", "o"],
      ["o", "o", "x"]
    ]

  if(findWinner(tGameArray).winner == "o"){
    testOutcomes.test4_1 = "Pass"
    } else {
    testOutcomes.test4_1 = "Fail"
    }

  tGameArray =
    [
      ["x", " ", "o"],
      [" ", "o", "o"],
      ["o", " ", "x"]
    ]

  if(findWinner(tGameArray).winner == "o"){
    testOutcomes.test5_1 = "Pass"
    } else {
    testOutcomes.test5_1 = "Fail"
    }

  if(JSON.stringify(findWinner(tGameArray).how) ==
    JSON.stringify([[0,2], [1,1], [2,0]])){
    testOutcomes.test5_2 = "Pass"
    } else {
    testOutcomes.test5_2 = "Fail"
    }

  console.log(JSON.stringify(testOutcomes))
}

//t_findWinner()
