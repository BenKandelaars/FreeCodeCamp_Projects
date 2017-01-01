
// final solultion using what I learned from the other forum answers

robit = new Robit

var tasks = []

function actionNext (){
      tasks.shift()
      if (tasks.length >= 1){
       tasks[0]()
      }
   }

function addQueue(newTask){
  tasks.push(newTask)
  if (tasks.length == 1){
    newTask()
  }
}

for (prop in Robit.prototype){
  let Prop = prop
  robit[Prop] = function (){
      addQueue(function (){
        return Robit.prototype[Prop](actionNext)
      })
    return robit
  }
}

// Using an IIFE for the last part

for (prop in Robit.prototype){
  (function(){
    robit[Prop] = function (){
        addQueue(function (){
        return Robit.prototype[Prop](actionNext)
      })
      return robit
    }
  })()
}

// First solution which wasn't DRY

robit = new Robit

var methods = ["wakeUp", "findTrash", "pickupTrash", "changeBabyDiapers", "makeDinner", "shutDown"]

var tasks = []

function actionNext (){
      tasks.shift()
      if (tasks.length >= 1){
       tasks[0]()
      }
   }

function addQueue(newTask){
  tasks.push(newTask)
  if (tasks.length == 1){
    newTask()
  }
}

for (prop in Robit.prototype){

  robit[prop] = function (){
    addQueue(function (){
    return Robit.prototype[prop](actionNext)
    })
    return robit
  }
}

robit.wakeUp = function(){

  addQueue(function task(){
    return Robit.prototype.wakeUp(actionNext)
    })

  return robit
}


robit.findTrash = function(){
  addQueue(function(){
    return Robit.prototype.findTrash(actionNext)
    })
  return robit
}

robit.pickupTrash = function(){
  addQueue(function(){
    return Robit.prototype.pickupTrash(actionNext)
    })
  return robit
}

robit.changeBabyDiapers = function(){
  addQueue(function(){
    return Robit.prototype.changeBabyDiapers(actionNext)
    })
  return robit
}

robit.makeDinner = function(){
  addQueue(function(){
    return Robit.prototype.makeDinner(actionNext)
    })
  return robit
}

robit.shutDown = function(){
  addQueue(function(){
    return Robit.prototype.shutDown(actionNext)
    })
  return robit
}
