robit = new Robit

var methods = ["wakeUp", "findTrash", "pickupTrash", "changeBabyDiapers", "makeDinner", "shutDown"]

var list = []

function callback (){
  list.shift()
  if (list){list[0]()}
}

function queue(futureAction){
  if (!list){
    list.push(futureAction)
  } else {
    list[0] = "x"
    futureAction()
  }
}

for (i=0; i < methods.length; i++){
  robit[methods[i]] = {

    queue(function(){
      return robit["prototype"][methods[i]](callback)
    })

  return robit
 }
}

robit.wakeUp = function(){

  function futureAction(){
    return Robit.prototype.wakeUp(callback)
    }

  queue(futureAction)

  return robit
}

robit.findTrash = function(){
  queue(function(){
    return Robit.prototype.findTrash(callback)
    })
  return robit
}

robit.pickupTrash = function(){
  queue(function(){
    return Robit.prototype.pickupTrash(callback)
    })
  return robit
}

robit.changeBabyDiapers = function(){
  queue(function(){
    return Robit.prototype.changeBabyDiapers(callback)
    })
  return robit
}

robit.makeDinner = function(){
  queue(function(){
    return Robit.prototype.makeDinner(callback)
    })
  return robit
}

robit.shutDown = function(){
  queue(function(){
    return Robit.prototype.shutDown(callback)
    })
  return robit
}
