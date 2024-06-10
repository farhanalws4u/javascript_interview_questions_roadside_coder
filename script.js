// ===> QUESTIONS RELATED TO MAP, FILTER AND REDUCE
console.log("Javascript interview questions");

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
c.increment(5);
c.increment(5);
console.log(c.get());

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
Module.privateMethod(); // gives the error

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

// -> caching or memoizing in javascript using polyfills
