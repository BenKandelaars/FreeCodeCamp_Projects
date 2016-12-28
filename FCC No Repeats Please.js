
function permAlone(str) {

//noprotect

  // for a given counter increment it by with each index only able to go to maximum of its value.

  function incrementByOne (counter) {

    counter[0] += 1;

    for (i = 0; i < counter.length; i++){

    if (counter[i] > i){
      counter[i] = 0;
      counter[(i+1)] += 1;
     }
   }

    return counter;
  }


// for a given counter and array return the sequence

  function counterToCombination(counter, arr){

   var str = "";
   var prevValue = [];
   var newValue = [];
   var meetCriteria = true;
   var arrMutate = arr.map(function (x){return x;});

   // get the position of the right most element in the counter. The value of this index is the position of the element to extract in the array.

   var len = counter.length;

   // loop through each of the entries in both the counter and array. Do this by counting backward in counter.

   for (i = len - 2; i >= 0; i--){

   newValue = arrMutate.splice(counter[i], 1);

    if (newValue.join("") == prevValue.join("")){
     meetCriteria = false;
   }

   prevValue = newValue;

   str += newValue;

   }

  //combinations.push(str);
  //combinations.push(meetCriteria);
  // console.log("combinations = ", combinations);

    return meetCriteria;

  }

   console.log("###############");
  // console.log("~~~~~~~~~~~~~~~");

  // split string into individual digits
 //str = "aab";
 var arr = str.split("");
 var checkObj = {};

    // map string to object and return if string only has one or no unique characters

  arr = arr.map(function (prop){

    if (checkObj.hasOwnProperty(prop)){
     checkObj[prop] += 1;
     } else {checkObj[prop] = 1;}
   return prop;
  });

    //console.log(checkObj);

  if(arr.length === 1){return 1;}

  if(Object.keys(checkObj).length <= 1){return 0;}


   // counter initialise and update
   // counter is prepopulated at 0 and has one extra index to service as marker that the limit of the counter has been reached.

  var counter = new Array((arr.length)+1).fill(0, 0, (arr.length)+1);

  // to track progress, not necessary to the solution
  var counterLog = [];
  var combinations = [];
  var solution = 0;

  // loop. Take the first counter, generate the string permentation.

  do{

    counterLog.push(counter.map(function(x){return x;}));

    if(counterToCombination(counter, arr)){
      solution++;}

    counter = incrementByOne(counter);

  } while (counter[arr.length] === 0);

  //console.log("counterLog = ", JSON.stringify(counterLog));
  console.log("arr =", str);
  console.log("Solution = ", solution);
  return solution;
}

permAlone('aab');
