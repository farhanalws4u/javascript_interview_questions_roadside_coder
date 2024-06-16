// ===> QUESTIONS RELATED TO MAP, FILTER AND REDUCE
console.log("===== MAP, FILTER AND REDUCE =====");

// polyfills:  A polyfill in JavaScript is a script that adds modern features to older browsers that do not natively support them. for example if we dont have the map function in the browser api. then we can add our own map function to the Array prototype.

// -> polyfill for map function:

Array.prototype.myMap = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    // this refers to working arr of map function . arr.map <-- this arr.

    temp.push(cb(this[i], i, this));
  }
  return temp;
};

let arr = [1, 2, 3];
arr.myMap((e) => console.log(e * 2));

// -> polyfill for filter function:

Array.prototype.myFilter = function (cb) {
  // a filter function returns the element if callback condition is true;
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) temp.push(cb(this[i]));
  }
  return temp;
};
let newArr = [1, 2, 3];
newArr.myFilter((e) => console.log(Number.isInteger(e)));

// -> Polyfill for Reduce function.

Array.prototype.myReduce = function (cb, initialValue) {
  let accumulator = initialValue;

  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};

let reducedValue = newArr.myReduce((acc, curr, i, arr) => (curr = curr + acc));
console.log({ reducedValue });

// ===> QUESTIONS RELATED TO FUNCTIONS:
console.log("===== FUNCTIONS =====");

//-> what is the output?

// case 1:
for (let i = 0; i < 5; i++) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, i * 1000);
}
// output will be: 0,1,2,3,4 Explanation: because here let is blocked scoped and it is creating different scope again and again each time for loop runs and each time unique value of i is getting stored in each created scope. --> The execution context (which includes the call stack, variable environment, and lexical environment) remains the same for the entire execution of the loop. However, the lexical environment (which includes the scope chain, variables, and their values) is updated with each iteration of the loop due to the block scoping of let.

// case 2:
for (var i = 0; i < 5; i++) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, i * 1000);
}
// output will be: 5,5,5,5,5 but here var is global scoped so each time the same lexical environment is used and value of at the end of loop is 5 and then timeout starts running.

// -> performance optimization using closures:

// not optimized version
function highComputationNotOptimized(num) {
  let arr = [];
  for (let i = 0; i < 1000000; i++) {
    arr[i] = i * i;
  }

  console.log("num :", num);
}
console.time("not optimized");
highComputationNotOptimized(5);
console.timeEnd("not optimized");

// optimized version
function highComputationOptimized(num) {
  let arr = [];
  for (let i = 0; i < 1000000; i++) {
    arr[i] = i * i;
  }
  return function () {
    console.log("num :", num);
  };
}
console.time("optimized");
const closure = highComputationOptimized(5);
closure();
console.timeEnd("optimized");

// -> Implementation of private counter using the closures.

function add() {
  // it is similar to Encapsulation in oops.
  var counter = 0;

  function increment(num) {
    counter += num;
  }

  function get() {
    return counter;
  }

  return {
    increment,
    get,
  };
}

let c = add();
// c.increment(5);
// c.increment(5);
// console.log(c.get());

// -> What is the module pattern.

var Module = (function () {
  function privateMethod() {
    console.log("this is the private method");
  }

  return {
    publicMethod: function () {
      console.log("Calling private method from public method");
      privateMethod();
    },
  };
})();

Module.publicMethod(); // gives the output
// Module.privateMethod(); // gives the error

// -> Make it run a function only once. using polyfill.

function once(func, context) {
  let ran;

  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }
    return ran;
  };
}

const hello = once((a, b) => console.log("hello", a, b));

hello(1, 2);
hello(1, 2);
hello(1, 2);
hello(1, 2);

//===> QUESTIONS ON CURRYING

console.log("===== CURRYING =====");

// -> Q. implement sum function like sum(2)(6)(1)

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log("currying", sum(2)(3)(4));

// -> Q. Implement the following:
// evaluate("sum")(3)(2)
// evaluate("multiply")(3)(2)
// evaluate("divide")(3)(2)

function evaluate(operation) {
  return function (a) {
    return function (b) {
      if (operation === "sum") return a + b;
      if (operation === "multiply") return a * b;
      else return a / b;
    };
  };
}

console.log("conditional currying", evaluate("sum")(2)(5));
console.log("conditional currying", evaluate("multiply")(2)(5));

// Q. Infinite currying:

// we have to implement something like sum(a)(b)(c).... (n);

function add(a) {
  return function (b) {
    if (b) return add(a + b); // some sort of recursion we are using here and check the b value not to be empty.
    return a;
  };
}

console.log("infinite currying", add(5)(3)(4)(4)(1)(2)()); // here while calling this last empty argument is necessary to break the loop of the recursion.

// -> Real world example of currying.. Manipulating DOM.

function updateElementText(tagName) {
  return function (content) {
    document.getElementsByTagName(tagName).textContent = content;
  };
}

const updateText = updateElementText("h1");
updateText("by farhan khan");

// ===> QUESTIONS BASED ON OBJECTS

console.log("===== OBJECTS =====");

// -> delete keyword to delete the properties of object

let person = { name: "farhan", age: "22", mail: "farhan@gmail.com" };
delete person.mail;
console.log(person);

// if we do something like
function fun(a) {
  delete a; // it will not going to effect this local variable because it is only used for object properties.
  return a;
}

// -> defining and accessing the properties named with spaces

let obj = {
  "key with space": 20, // defining the key with space
};
console.log(obj["key with space"]); // accessing the key with space.

// -> Iterate through keys of an object using for-in loop.

for (key in person) console.log(key);

// -> if we have two keys with same name in object, then the last added key will be considered or it will replace the previous one.

let newObj = { a: 1, b: 2, a: 3 };
console.log(newObj);

// -> what would be the output.

const a = {};
const b = { key: "b" };
const cc = { key: "c" };

a[b] = 123;
a[cc] = 456;

console.log(a);

// -> spread operator on string

console.log([..."farhan"]); // it spreads all the characters in array of characters.

// -> JSON.stringify with only certain keys of object.

const cat = { name: "oggy", color: "brown", age: 10 };
console.log(JSON.stringify(cat, ["name", "color"]));

// -> Object destructuring with rename variable

let { name: catName } = cat;
console.log(catName);

// -> Nested Destructuring with objects.

let car = { name: "porsche", specs: { color: "black", engine: "v8" } };

let {
  specs: { color },
} = car;
console.log(color);

// -> question on referencing

let personNew = { name: "farhan", age: 22 };
let member = [personNew];
personNew = null;
console.log(member);

// -> Re assigning an object does not effect the reference of that object.

function changeReference(person) {
  person.age = 25;
  person = {
    name: "farhan ",
    age: 10,
  };
  return person;
}

let personObjOne = { name: "alex", age: 29 };

const personObjTwo = changeReference(personObjOne);

console.log(personObjOne);
console.log(personObjTwo);

// -> Shallow copy and Deep copy;

// Shallow copy: when the copied object still have the reference of original object, it is called a shallow copy.
// Deep copy: When the copied object does not have the reference of the original object then it is called the deep copy.

// Ways to create Deep copy:

// 1. using Object.assign()

let movie = { name: "harry potter", partsLength: 8 };

let newMovie = Object.assign({}, movie);

// 2. JSON stringify and parse

let newPSMovie = JSON.parse(JSON.stringify(movie));

// 3. using the object destructuring

let newDMovie = { ...movie };

// ===> QUESTIONS ON 'THIS' KEYWORD

console.log("===== THIS KEYWORD =====");

// -> arrow function and normal function with this keyword

let user = {
  name: "farhan",
  age: 22,

  // for normal function
  childObj: {
    newName: "farhan khan",
    getDetails() {
      console.log(this.newName, "and", this.name);
    },
  },

  // for arrow function
  arrowFun: () => {
    console.log(this.newName, "and", this.name);
  },
};

user.childObj.getDetails();
user.arrowFun();

// explanation: normal function looks for the variable accessed by this keyword in the parent that is user object here.thats why it is printing newName variable value but it does not lookup to nested parents. only one level of parent it can lookup.
// Arrow functions on the other hand does not have their own this keyword and they always lookup to the parent scope or parent function and for arrow function the parent scope is global window object because user object literals does not create a scope here.

// we can do something like this to provide arrow function a parent function's this keyword.

let userArrow = {
  name: "farhan",
  age: 22,
  // for arrow function
  parent() {
    const arrowFun = () => {
      console.log(this.name);
    };
    arrowFun();
  },
};
userArrow.parent();
// now this arrow function have the this keyword from its parent that is 'parent' in this case. and this 'parent' function getting its this value from the userArrow object.

// -> this keyword inside a class.

class userClass {
  constructor(n) {
    this.name = n;
  }
  getName() {
    console.log(this.name);
  }
}
const userObj = new userClass("farhan Khan");
console.log(userObj.getName());

// -> Q. what is the output

const u = {
  name: "farhan!",
  getName() {
    const name = "farhan khan";
    return this.name;
  },
};
console.log(u.getName());

// -> Q. Result of accessing the ref of an function/object.

function refFun() {
  return {
    temp: "temp",
    ref: this,
  };
}
// fix -> function refFun() {
//   return {
//     temp: "temp",
//    ref(){
//     return this;
//   }
//   }
// }
let data = refFun();
console.log(data.ref.name);

// explanation: here ref would be point to window object because for function when we are calling it, it is pointing to window object and this inside the function would also point to window object.

// -> Q. what would be the output.

const _user = {
  name: "farhan khan",
  logMessage() {
    console.log(this.name);
  },
};

setTimeout(() => {
  _user.logMessage;
}, 1000);

// here because we are directly passing the logMessage as a callback, it is creating a new context scope and it does not know anything about name variable. to fix this we can pass another callback into settimeout and in that callback we can call logMessage .
// fix ->
setTimeout(function () {
  _user.logMessage();
}, 1000);

// -> what is the output.

var length = 4;

function callback() {
  console.log(this.length);
}

const object = {
  length: 5,
  method(fn) {
    fn();
  },
};

object.method(callback);

// ===> Call, Bind and Apply

console.log("===== CALL, BIND AND APPLY =====");

// -> Explicit Object Binding: Explicit binding refers to the process of explicitly setting the value of this for a function. This can be done by using the call , bind , or apply methods provided by JavaScript.

// -> Call: The call() method calls the function directly and sets this to the first argument passed to the call method and if any other sequences of arguments preceding the first argument are passed to the call method then they are passed as an argument to the function.

var bindObj = { name: "Farhan khan" };

function sayHello(age) {
  return "hello " + this.name + " age " + age;
}

console.log("Call:", sayHello.call(bindObj, 22));

// -> Apply: it works same as call() but it takes the arguments as an array.

console.log("Apply:", sayHello.apply(bindObj, [22]));

// -> Bind: The bind() method creates a new function and when that new function is called it set this keyword to the first argument which is passed to the bind method, and if any other sequences of arguments preceding the first argument are passed to the bind method then they are passed as an argument to the new function when the new function is called.
// A very useful example of bind keyword we can see in the class based React component when we bind this keyword of class to any function such as Event handler function to access the state variable of that class.

const bindFun = sayHello.bind(bindObj);

console.log("Bind:", bindFun(23));

// -> what is the output ?

const personObj = { name: "John" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(personObj, 24));
console.log(sayHi.bind(personObj, 24));

// -> what is the output?

const age = 10;

var newPerson = {
  name: "farhan",
  age: 22,
  getAge: function () {
    return this.age;
  },
};

var person2 = { age: 28 };
console.log(newPerson.getAge.call(person2));
console.log(newPerson.getAge.apply(person2)); // works same as call.
const n = newPerson.getAge.bind(person2);
n();

// -> What is the output ?

var status = "happy";

setTimeout(() => {
  const status = "sad";

  const data = {
    status: "cool",
    getStatus() {
      return this.status;
    },
  };
  console.log(data.getStatus()); // logs -> cool
  console.log(data.getStatus.call(this)); // logs -> happy // because every function which is not inside any object, refers to the global this.
}, 0);

// -> Call printAnimals such that it prints all the animals in object ?

// const animals = [
//   { species: "lion", name: "king" },
//   { species: "whale", name: "queen" },
// ];

// function printAnimals(i) {
//   this.print = function () {
//     console.log("#" + i + " " + this.species + ":" + this.name);
//   };
//   this.print();
// }   --> part of the questions

const animals = [
  { species: "lion", name: "king" },
  { species: "whale", name: "queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ":" + this.name);
  };
  this.print();
}

animals.forEach((animal, i) => {
  printAnimals.call(animal, i);
});

// -> Append an array to another array. (restrict to use concat)

const array = ["a", "b"];
const elements = [0, 1, 2];

array.push.apply(array, elements);

// -> what is the output ?

function f() {
  console.log(this);
}

let userN = {
  g: f.bind(null), // because we are making the local this of f() to null, it will point to global this.
};

userN.g(); // outputs the window object.

// -> Bind chaining.

// Binding chaining in javascript does not exist. event if we do something like this f.bind(this).bind({}) it will only consider first binding.

// Q. Fix the code to work properly.

function checkPassword(success, failed) {
  let password = prompt("Password ?");
  if (password === "farhan") success();
  else failed();
}

let user2 = {
  name: "farhan Khan",

  loginSuccessful() {
    console.log(`${this.name} logged in`);
  },

  loginFailed() {
    console.log(`${this.name} failed to log in`);
  },
};

// checkPassword(user2.loginSuccessful, user2.loginFailed); error here
// fix->
// checkPassword(user2.loginSuccessful.bind(user2), user2.loginFailed.bind(user2));

// Note:- here we can clearly see that the value of this keyword for a function is defined as where the is being called. in this example success and failed methods are called inside checkPassword method and checkPassword method does not have name in its this scope. so we have to bind user2 object to function calls to provide this keyword content to the success and failed methods.

// -> Polyfill for Call Method.

// const age = 10;

// var newPerson = {
//   name: "farhan",
//   age: 22,
//   getAge: function () {
//     return this.age;
//   },
// };

// var person2 = { age: 28 };
// console.log(newPerson.getAge.call(person2));  <-- REFERENCE

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") throw new Error("It is not callable");

  context.fn = this;
  context.fn(...args);
};

// -> polyfill for apply

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") throw new Error("It is not callable");

  if (Array.isArray(args))
    throw new Error("Passed arguments are not in the form of an array.");

  context.fn = this;
  context.fn(...args);
};

// -> Polyfill for Bind

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") throw new Error("It is not callable");

  context.fn = this;
  return function () {
    return context.fn(...args);
  };
};

// ===> QUESTIONS ON PROMISES

console.log("===== PROMISES =====");

// -> an example of how callback can be implemented along with callback hell implementation.

function important(username, cb) {
  setTimeout(() => {
    cb(`welcome ${username}`);
  }, 1000);
}

function sit(message, cb) {
  setTimeout(() => {
    cb(message);
  }, 1000);
}

function askForEat(message, cb) {
  setTimeout(() => {
    cb(message);
  }, 1000);
}

important("farhan khan", function (message) {
  console.log(message);
  sit("come here and sit", function (message) {
    console.log(message);
    askForEat("what would you like to eat", function (message) {
      console.log(message);
      important("farhan khan", function (message) {
        console.log(message);
        sit("come here and sit", function (message) {
          console.log(message);
          askForEat("what would you like to eat", function (message) {
            console.log(message);
          });
        });
      });
    });
  });
}); // continuing in the same manner will result into a callback hell.

// -> Promises: Promise is the solution for callback hell.A Promise is an object representing the eventual completion or failure of an asynchronous operation.

// "Producing code" is code that can take some time

// "Consuming code" is code that must wait for the result

// A Promise is an Object that links Producing code and Consuming code

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) resolve("Promise is fulfilled...");
    else reject(new Error("promise is not fulfilled..."));
  }, 2000);
});

myPromise
  .then((result) => {
    console.log("promise result:", result);
  })
  .catch((error) => console.log("error while fulfilling promise:", error));

// -> Now converting callback hell into chain of promises which is better than callback hell.

function important(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`welcome ${username}`);
    }, 1000);
  });
}

function sit(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
}

function askForEat(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, 1000);
  });
}

important("Welcome guest!").then((res) => {
  console.log(res);
  sit("Come and sit here").then((res) => {
    console.log(res);
    askForEat("What would you like to have").then((res) => {
      console.log(res);
    });
  });
});

// But again we are getting that pyramid like structure as in callback hell. what we can do to avoid this, we can use promises chaining.

important("Welcome guest!")
  .then((res) => {
    console.log(res);
    return sit("come here and sit");
  })
  .then((res) => {
    console.log(res);
    return askForEat("what would you like to eat!");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log(error)); // <-- this is called promise chaining

// But it is still so lengthy so we have something called promise combinator that helps us to execute more than one promise at one time.

// -> 1. Promise.all(): executes all the passed promises in parallel and returns an array of all the promises fulfilled but if one of the promise is failed, it fails the complete promise.all function.

Promise.all([
  important("Welcome guest!"),
  sit("come here and sit"),
  askForEat("what would you like to eat!"),
])
  .then((res) => {
    console.log("Promise.all result:", res);
  })
  .catch((err) => console.log("promise.all error:", err));

// -> 2. Promise.race(): returns the first promise that gets fulfilled or rejected.

Promise.race([
  important("Welcome guest!"),
  sit("come here and sit"),
  askForEat("what would you like to eat!"),
])
  .then((res) => {
    console.log("Promise.race result:", res);
  })
  .catch((err) => console.log("promise.race error:", err));

// -> 3. Promise.allSettled(): it is similar to promise.all but even if one of the promises fails it returns the other fulfilled promises and the rejected promises also.

Promise.allSettled([
  important("Welcome guest!"),
  sit("come here and sit"),
  askForEat("what would you like to eat!"),
])
  .then((res) => {
    console.log("Promise.allSettled result:", res);
  })
  .catch((err) => console.log("Promise.allSettled error:", err));

// 4. Promise.any(): It is same as Promise.race but it only returns only the first fulfilled promise and ignores the other fulfilled and rejected promises. if all the promises are rejected then only it returns the error.

Promise.any([
  important("Welcome guest!"),
  sit("come here and sit"),
  askForEat("what would you like to eat!"),
])
  .then((res) => {
    console.log("Promise.any result:", res);
  })
  .catch((err) => console.log("Promise.any error:", err));

// -> More modern approach of handling promises (async/await)

// -> What is the output ?

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});

promise1.then((res) => console.log(res)); // it will be printed after "end" because it represents an asynchronous block.

console.log("end");

// -> What is the output ?

console.log("start again");

const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2); // it will not print this resolve value because it is not yet consumed by then block below.
  console.log(3);
});

promise2.then((res) => console.log(res));
console.log("end again");

// -> What is the output ?

console.log("start 2");

const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });

console.log("middle");

fn().then((res) => console.log(res));

console.log("end 2");

// -> What would be the output ?

function job() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

let promise5 = job();

promise5
  .then(() => console.log("success1"))
  .then(() => console.log("success2"))
  .catch(() => console.log("error"))
  .then(() => console.log("success3")); // after catching rejected result it will also print the last then block because after rejecting the promise, the promise is not returning anything and when promise does not return anything it also can be consumed in the then block.

let myPromise1 = new Promise((resolve, reject) => {
  console.log("==============================test");
  resolve();
});
myPromise1
  .then(() => console.log(".............................test scsdkjfksd"))
  .then(() => console.log("resolve again --------------------------"));

// -> What is the output ?

function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) resolve("success Promise 6");
    else reject("error Promise 6");
  });
}

let promise6 = job(true);

promise6
  .then((data) => {
    console.log(data);
    return job(false);
  })
  .catch((error) => {
    console.log(error);
    return "Error caught"; // although we are passing a simple string here instead of function, it will also be treated as resolve value and will be consumed in the next then block.
  })
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .catch((error) => {
    console.log(error);
  });

// -> Re-write this example using async/await

// function loadJson(url) {
//   return fetch(url).then((response) => {
//     if (response.status == 200) return response.json();
//     else throw new Error(response.status);
//   });
// }
// loadJson("https://fakeurl.com/no-such-user.json").catch((err) =>
//   console.log(err)
// );

// re-write ->

async function loadJsonAsync(url) {
  try {
    let response = await fetch(url);
    if (response.status == 200) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

let resp = loadJsonAsync("https://fakeurl.com/no-such-user.json");
console.log(resp);

// -> Promise Polyfill

// implement later
