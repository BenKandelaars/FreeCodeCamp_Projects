console.log("########################")

let obj = new Object()

obj.orig = 5,
obj.origSecond = 10,

console.log(obj)

//obj.prototype.first = "first prototype"
//obj.prototype.second = function(x){}

var test = {}
test.inside = "testinside"

console.log(test)

//console.log(obj.first)
//console.log(obj.second)


var Person = function() {
  this.canTalk = true;
};

console.log(Person)

Person.prototype.first = function(x){console.log("a = 1")}


Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

console.log(Person)

var bob = new Person()

bob.name = "Joe"

bob.first()
