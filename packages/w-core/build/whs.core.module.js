/* WhitestormJS Framework v3.0.0-dev.10 */
import { Clock, Mesh, Scene, WebGLRenderer, REVISION } from 'three';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function (global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;

  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    } // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.


    return;
  } // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.


  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  runtime.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  runtime.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}( // In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this || typeof self === "object" && self;
}() || Function("return this")());
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this || typeof self === "object" && self;
}() || Function("return this")(); // Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.


var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

g.regeneratorRuntime = undefined;
var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

var inherits = _inherits;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;

var ModuleSystem =
/*#__PURE__*/
function () {
  function ModuleSystem(options) {
    var _this = this;

    classCallCheck(this, ModuleSystem);

    this.modules = options.modules || [];
    var data = {};
    var unresolvedWarns = new Map();
    var updateHandlers = {};
    var activeModule = null;
    this.manager = new Proxy(data, {
      set: function set(obj, prop, value) {
        obj[prop] = value; // console.log(prop, updateHandlers[prop]);

        if (updateHandlers[prop]) {
          updateHandlers[prop].forEach(function (cb) {
            return cb(value);
          });
        }

        return true;
      },
      get: function get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        } else {
          var warns = unresolvedWarns.get(activeModule);
          if (warns && warns[prop]) console.warn(warns[prop], activeModule);
          if (activeModule === null) console.error('No active module');else console.error('Active module: ', activeModule);
          throw new Error("manager.".concat(prop, " is required by the active module."));
        }
      }
    });

    var warn = function warn(module) {
      return function (dependency, message) {
        unresolvedWarns.set(module, objectSpread({}, unresolvedWarns.get(module) || {}, defineProperty({}, dependency, message)));
      };
    };

    var onUpdate = function onUpdate(propName, handler) {
      if (updateHandlers[propName]) {
        updateHandlers[propName].push(handler);
      } else {
        updateHandlers[propName] = [handler];
      }

      return function () {
        if (updateHandlers[propName]) {
          updateHandlers[propName].splice(updateHandlers[propName].indexOf(handler), 1);
        }
      };
    };

    this.setupModules = function () {
      if (_this.modules.length === 0) return;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var module = _step.value;

          if ('setup' in module) {
            activeModule = module;
            module.setup(_this, {
              data: data,
              manager: _this.manager,
              warn: warn(module),
              onUpdate: onUpdate
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      activeModule = null;
    };
  }

  createClass(ModuleSystem, [{
    key: "bridge",
    value: function bridge(bridgeName, inputData) {
      var outputData = inputData;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.modules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var module = _step2.value;

          if (module.bridges && bridgeName in module.bridges) {
            outputData = module.bridges[bridgeName](outputData);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return outputData;
    }
  }]);

  return ModuleSystem;
}();

var Component =
/*#__PURE__*/
function (_ModuleSystem) {
  inherits(Component, _ModuleSystem);

  function Component() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    classCallCheck(this, Component);

    var asyncOptions = typeof options === 'function' && options();
    _this = possibleConstructorReturn(this, getPrototypeOf(Component).call(this, asyncOptions ? {
      modules: []
    } : options));

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "isAsync", false);

    _this.isAsync = asyncOptions instanceof Promise;
    _this.native = _this.isAsync ? new Promise(function (resolve) {
      asyncOptions.then(function (options) {
        var native = _this.build(options);

        _this.modules = options.modules || [];

        _this.setupModules();

        resolve(native);
      });
    }) : _this.build(typeof options === 'function' ? options() : options);

    _this.setupModules();

    return _this;
  }

  createClass(Component, [{
    key: "build",
    value: function build() {
      console.error('You should use your own .build()');
      return null;
    }
  }, {
    key: "add",
    value: function () {
      var _add = asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee(component) {
        var selfNative, childNative;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isAsync) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return this.native;

              case 3:
                _context.t0 = _context.sent;
                _context.next = 7;
                break;

              case 6:
                _context.t0 = this.native;

              case 7:
                selfNative = _context.t0;

                if (!component.isAsync) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return component.native;

              case 11:
                _context.t1 = _context.sent;
                _context.next = 15;
                break;

              case 14:
                _context.t1 = component.native;

              case 15:
                childNative = _context.t1;
                selfNative.add(childNative);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return Component;
}(ModuleSystem);

var construct = createCommonjsModule(function (module) {
function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
});

const version = "3.0.0-dev.10";

var system = {
  window: typeof window === 'undefined' ? global : window
};

var DefineModule =
/*#__PURE__*/
function () {
  function DefineModule() {
    classCallCheck(this, DefineModule);

    for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    this.data = data;
  }

  createClass(DefineModule, [{
    key: "setup",
    value: function setup(app, utils) {
      this.data.forEach(function (data) {
        Object.assign(utils.manager, typeof data === 'function' ? data(utils) : data);
      });
    }
  }]);

  return DefineModule;
}();

/**
 * @class Loop
 * @category core
 * @param {Function} func function to execute on each animation frame
 * @param {Boolean} [useClock=true] passes a Clock to the function when called, if true
 * @memberof module:core
 */
var Loop = function Loop(func) {
  classCallCheck(this, Loop);

  this.func = func;
  this.enabled = true;
};

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var Store =
/*#__PURE__*/
function () {
  function Store(loaders) {
    classCallCheck(this, Store);

    this.loaders = loaders;
    this.refs = {};
    this.processors = {};
  }

  createClass(Store, [{
    key: "process",
    value: function process(assetType, processor) {
      if (this.processors[assetType]) {
        this.processors[assetType].push(processor);
      } else {
        this.processors[assetType] = [processor];
      }
    }
  }, {
    key: "load",
    value: function load(assetName, url) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _$exec = /(.*)\./.exec(assetName),
          _$exec2 = slicedToArray(_$exec, 2),
          assetType = _$exec2[1];

      var loader = this.loaders[assetType];
      var processors = this.processors[assetType] || [];
      this.refs[assetName] = new Promise(function (resolve, reject) {
        loader.load(url, function (data) {
          resolve(processors.reduce(function (newData, processor) {
            return processor(newData, options, assetName);
          }, data));
        }, undefined, reject);
      });
      return this.refs[assetName];
    }
  }, {
    key: "ref",
    value: function ref(assetName) {
      return this.refs[assetName];
    }
  }]);

  return Store;
}();

defineProperty(Store, "asyncLoader", {
  load: function load(asyncData, onComplete, onProgress, onError) {
    asyncData().then(onComplete);
  }
});

/**
 * @class App
 * @category core
 * @description This component is used to prepare a world scene, setup physics, camera, renderer and all other things that you usually do before making meshes.
 * @param {Array} [modules=[]] - Array of Modules
 * @extends ModuleSystem
 * @memberof module:core
 */

var App =
/*#__PURE__*/
function (_ModuleSystem) {
  inherits(App, _ModuleSystem);

  /**
   * @description Defines whether the scene should render or not
   * @member {Boolean} module:core.App#enabled
   * @public
   */

  /**
   * Loops in this app
   * @description Array of loops that are executed by this app.
   * @member {Array} module:core.App#loops
   * @public
   */
  function App() {
    var _this;

    var modules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    classCallCheck(this, App);

    console.log("WHS.App ".concat(version));
    _this = possibleConstructorReturn(this, getPrototypeOf(App).call(this, {
      modules: modules
    }));

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "enabled", true);

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "clock", new Clock());

    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "loops", []);

    _this.setupModules();

    return _this;
  } // CONTROLS & UPDATING

  /**
   * @method start
   * @description Start rendering loop and physics simulation (if you use version with physics).
   * @memberof module:core.App
   */


  createClass(App, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var requestAnimFrame = function () {
        return system.window.requestAnimationFrame || system.window.webkitRequestAnimationFrame || system.window.mozRequestAnimationFrame || function (callback) {
          system.window.setTimeout(callback, 1000 / 60);
        };
      }();

      var process = function process() {
        _this2.request = requestAnimFrame(function () {
          return process();
        });
        if (!_this2.enabled) return;

        for (var i = 0, ll = _this2.loops.length; i < ll; i++) {
          var e = _this2.loops[i];
          if (e.enabled) e.func(_this2.clock);
        }
      };

      this.enabled = true;
      if (!this.request) process();
    }
  }, {
    key: "loop",
    value: function loop(loopCallback) {
      var loop = new Loop(loopCallback);
      this.loops.push(loop);
      return loop;
    }
  }]);

  return App;
}(ModuleSystem);

defineProperty(App, "Store", Store);

defineProperty(App, "define", function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return construct(DefineModule, args);
});

/** @module core */

function applyLocalTransform(mathType, data) {
  if (!data) return;
  var assignData = {};

  if (data instanceof Object.getPrototypeOf(mathType).constructor) {
    // THREE.Vector3 === THREE.Vector3
    mathType.copy(data);
    return;
  } else if (Array.isArray(data)) {
    assignData = {
      x: data[0],
      y: data[1],
      z: data[2],
      w: data[3]
    };
  } else {
    assignData = {
      x: data.x,
      y: data.y,
      z: data.z,
      w: data.w
    };
  }

  if (mathType.w === undefined) {
    delete assignData.w;
  }

  Object.assign(mathType, assignData);
}

function applyTransform(native, options) {
  applyLocalTransform(native.position, options.position);
  applyLocalTransform(native.scale, options.scale);
  applyLocalTransform(native.rotation, options.rotation);
}

var MeshComponent =
/*#__PURE__*/
function (_Component) {
  inherits(MeshComponent, _Component);

  function MeshComponent() {
    classCallCheck(this, MeshComponent);

    return possibleConstructorReturn(this, getPrototypeOf(MeshComponent).apply(this, arguments));
  }

  createClass(MeshComponent, [{
    key: "build",
    value: function build(options) {
      var geometry = options.geometry;
      var material = options.material;
      var mesh = this.bridge('mesh', new Mesh(geometry ? this.bridge('geometry', geometry) : undefined, material ? this.bridge('material', material) : undefined));
      applyTransform(mesh, options);
      return mesh;
    }
  }]);

  return MeshComponent;
}(Component);
Component.Mesh = MeshComponent;

var CameraComponent =
/*#__PURE__*/
function (_Component) {
  inherits(CameraComponent, _Component);

  function CameraComponent() {
    classCallCheck(this, CameraComponent);

    return possibleConstructorReturn(this, getPrototypeOf(CameraComponent).apply(this, arguments));
  }

  createClass(CameraComponent, [{
    key: "build",
    value: function build(options) {
      var camera = options.camera;
      applyTransform(camera, options);
      return this.bridge('camera', camera);
    }
  }, {
    key: "autoSizeUpdate",
    value: function autoSizeUpdate(onUpdate) {
      var _this = this;

      onUpdate('size', function (_ref) {
        var _ref2 = slicedToArray(_ref, 2),
            width = _ref2[0],
            height = _ref2[1];

        _this.native.aspect = width / height;

        _this.native.updateProjectionMatrix();
      });
      return this;
    }
  }]);

  return CameraComponent;
}(Component);
Component.Camera = CameraComponent;

var LightComponent =
/*#__PURE__*/
function (_Component) {
  inherits(LightComponent, _Component);

  function LightComponent() {
    classCallCheck(this, LightComponent);

    return possibleConstructorReturn(this, getPrototypeOf(LightComponent).apply(this, arguments));
  }

  createClass(LightComponent, [{
    key: "build",
    value: function build(options) {
      var light = options.light;
      applyTransform(light, options);
      return this.bridge('light', light);
    }
  }]);

  return LightComponent;
}(Component);
Component.Light = LightComponent;

var TreeModule =
/*#__PURE__*/
function () {
  function TreeModule() {
    classCallCheck(this, TreeModule);
  }

  createClass(TreeModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager;
      manager.scene = new Scene();

      app.add =
      /*#__PURE__*/
      function () {
        var _ref2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(component) {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  component = app.bridge('child', component);
                  _context.t0 = manager.scene;

                  if (!component.isAsync) {
                    _context.next = 8;
                    break;
                  }

                  _context.next = 5;
                  return component.native;

                case 5:
                  _context.t1 = _context.sent;
                  _context.next = 9;
                  break;

                case 8:
                  _context.t1 = component.native;

                case 9:
                  _context.t2 = _context.t1;

                  _context.t0.add.call(_context.t0, _context.t2);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
    }
  }]);

  return TreeModule;
}();

var RenderingModule =
/*#__PURE__*/
function () {
  function RenderingModule() {
    var moduleOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rendererOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    classCallCheck(this, RenderingModule);

    this.moduleOptions = moduleOptions;
    this.rendererOptions = rendererOptions;
  }

  createClass(RenderingModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager,
          onUpdate = _ref.onUpdate,
          warn = _ref.warn;
      warn('size', 'manager.size should be an array: [width, height]');
      warn('camera', 'manager.camera should be a WHS.Component.Camera');
      warn('scene', 'manager.scene should be a THREE.Scene');
      warn('container', 'manager.container should be an HTMLElement');
      var container = manager.container,
          camera = manager.camera,
          scene = manager.scene,
          _manager$size = manager.size,
          size = _manager$size === void 0 ? [window.innerWidth, window.innerHeight] : _manager$size;
      var rendererOptions = this.rendererOptions || {};
      var renderer = manager.renderer = new WebGLRenderer(this.prepareRendererOptions(rendererOptions));
      renderer.setSize(size[0], size[1]);
      onUpdate('size', function (value) {
        renderer.setSize(value[0], value[1]);
      });
      container.appendChild(renderer.domElement);

      manager.renderFunc = function () {
        manager.renderer.render(manager.scene, manager.camera.native);
      };

      manager.renderLoop = app.loop(function (clock) {
        manager.renderFunc(clock);
      });
    }
  }, {
    key: "prepareRendererOptions",
    value: function prepareRendererOptions(rendererOptions) {
      var quality = this.moduleOptions.quality || 'medium';

      switch (quality) {
        case 'high':
          rendererOptions.antialias = true;
          break;

        default:
      }

      return rendererOptions;
    }
  }]);

  return RenderingModule;
}();

var ControlsModule =
/*#__PURE__*/
function () {
  function ControlsModule(controlsSetup) {
    classCallCheck(this, ControlsModule);

    this.controlsSetup = controlsSetup;
  }

  createClass(ControlsModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager;
      manager.controls = this.controlsSetup(manager);
      manager.controlsLoop = app.loop(function () {
        manager.controls.update();
      });
    }
  }]);

  return ControlsModule;
}();

var ResizeModule =
/*#__PURE__*/
function () {
  function ResizeModule() {
    classCallCheck(this, ResizeModule);
  }

  createClass(ResizeModule, [{
    key: "setup",
    value: function setup(app, _ref) {
      var manager = _ref.manager;
      window.addEventListener('resize', function () {
        manager.size = [window.innerWidth, window.innerHeight];
      });
    }
  }]);

  return ResizeModule;
}();

/**
 * Namespace containing all classes from all modules. Used as global in UMD pattern.
 * @namespace WHS
 * @example <caption>The use of WHS namespace.</caption>
 * new WHS.App() // core
 * new WHS.PerspectiveCamera() // components
 * new WHS.ResizeModule() // modules
 * WHS.extend() // utils
 */

var warnDeps = function warnDeps() {
  throw new Error('WhitestormJS Framework requires Three.js https://threejs.org/');
};

try {
  if (!REVISION) warnDeps();
} catch (err) {
  warnDeps();
}
// export * from './components/meshes/index';
// export * from './utils/index';
// export * from './modules/index';
// DEPRECATION
// export * from './deprecation';

export { Component, App, Loop, ModuleSystem, MeshComponent, CameraComponent, LightComponent, DefineModule, TreeModule, RenderingModule, ControlsModule, ResizeModule };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hzLmNvcmUubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIi4uL3NyYy9jb3JlL01vZHVsZVN5c3RlbS5qcyIsIi4uL3NyYy9jb3JlL0NvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NvbnN0cnVjdC5qcyIsIi4uL3NyYy9wb2x5ZmlsbC5qcyIsIi4uL3NyYy9tb2R1bGVzL0RlZmluZU1vZHVsZS5qcyIsIi4uL3NyYy9jb3JlL0xvb3AuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hcnJheVdpdGhIb2xlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIi4uL3NyYy9jb3JlL1N0b3JlLmpzIiwiLi4vc3JjL2NvcmUvQXBwLmpzIiwiLi4vc3JjL2NvcmUvaW5kZXguanMiLCIuLi9zcmMvdXRpbHMvYXBwbHlUcmFuc2Zvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9NZXNoLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvQ2FtZXJhLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvTGlnaHQuanMiLCIuLi9zcmMvbW9kdWxlcy9UcmVlTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvUmVuZGVyaW5nTW9kdWxlLmpzIiwiLi4vc3JjL21vZHVsZXMvQ29udHJvbHNNb2R1bGUuanMiLCIuLi9zcmMvbW9kdWxlcy9SZXNpemVNb2R1bGUuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xuICB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG59KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwidmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4vc2V0UHJvdG90eXBlT2ZcIik7XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIHNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW5oZXJpdHM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJleHBvcnQgY2xhc3MgTW9kdWxlU3lzdGVtIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMubW9kdWxlcyA9IG9wdGlvbnMubW9kdWxlcyB8fCBbXTtcblxuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBjb25zdCB1bnJlc29sdmVkV2FybnMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgdXBkYXRlSGFuZGxlcnMgPSB7fTtcbiAgICBsZXQgYWN0aXZlTW9kdWxlID0gbnVsbDtcblxuICAgIHRoaXMubWFuYWdlciA9IG5ldyBQcm94eShkYXRhLCB7XG4gICAgICBzZXQob2JqLCBwcm9wLCB2YWx1ZSkge1xuICAgICAgICBvYmpbcHJvcF0gPSB2YWx1ZTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9wLCB1cGRhdGVIYW5kbGVyc1twcm9wXSk7XG4gICAgICAgIGlmICh1cGRhdGVIYW5kbGVyc1twcm9wXSkge1xuICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BdLmZvckVhY2goY2IgPT4gY2IodmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcblxuICAgICAgZ2V0KG9iaiwgcHJvcCkge1xuICAgICAgICBpZiAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHdhcm5zID0gdW5yZXNvbHZlZFdhcm5zLmdldChhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgaWYgKHdhcm5zICYmIHdhcm5zW3Byb3BdKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5zW3Byb3BdLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgaWYgKGFjdGl2ZU1vZHVsZSA9PT0gbnVsbClcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGFjdGl2ZSBtb2R1bGUnKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBY3RpdmUgbW9kdWxlOiAnLCBhY3RpdmVNb2R1bGUpO1xuXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBtYW5hZ2VyLiR7cHJvcH0gaXMgcmVxdWlyZWQgYnkgdGhlIGFjdGl2ZSBtb2R1bGUuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHdhcm4gPSBtb2R1bGUgPT4gKGRlcGVuZGVuY3ksIG1lc3NhZ2UpID0+IHtcbiAgICAgIHVucmVzb2x2ZWRXYXJucy5zZXQobW9kdWxlLCB7XG4gICAgICAgIC4uLih1bnJlc29sdmVkV2FybnMuZ2V0KG1vZHVsZSkgfHwge30pLFxuICAgICAgICBbZGVwZW5kZW5jeV06IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG9uVXBkYXRlID0gKHByb3BOYW1lLCBoYW5kbGVyKSA9PiB7XG4gICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdKSB7XG4gICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdID0gW2hhbmRsZXJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAodXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdKSB7XG4gICAgICAgICAgdXBkYXRlSGFuZGxlcnNbcHJvcE5hbWVdLnNwbGljZShcbiAgICAgICAgICAgIHVwZGF0ZUhhbmRsZXJzW3Byb3BOYW1lXS5pbmRleE9mKGhhbmRsZXIpLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5zZXR1cE1vZHVsZXMgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5tb2R1bGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGNvbnN0IG1vZHVsZSBvZiB0aGlzLm1vZHVsZXMpIHtcbiAgICAgICAgaWYgKCdzZXR1cCcgaW4gbW9kdWxlKSB7XG4gICAgICAgICAgYWN0aXZlTW9kdWxlID0gbW9kdWxlO1xuXG4gICAgICAgICAgbW9kdWxlLnNldHVwKHRoaXMsIHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBtYW5hZ2VyOiB0aGlzLm1hbmFnZXIsXG4gICAgICAgICAgICB3YXJuOiB3YXJuKG1vZHVsZSksXG4gICAgICAgICAgICBvblVwZGF0ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFjdGl2ZU1vZHVsZSA9IG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGJyaWRnZShicmlkZ2VOYW1lLCBpbnB1dERhdGEpIHtcbiAgICBsZXQgb3V0cHV0RGF0YSA9IGlucHV0RGF0YTtcblxuICAgIGZvciAoY29uc3QgbW9kdWxlIG9mIHRoaXMubW9kdWxlcykge1xuICAgICAgaWYgKG1vZHVsZS5icmlkZ2VzICYmIGJyaWRnZU5hbWUgaW4gbW9kdWxlLmJyaWRnZXMpIHtcbiAgICAgICAgb3V0cHV0RGF0YSA9IG1vZHVsZS5icmlkZ2VzW2JyaWRnZU5hbWVdKG91dHB1dERhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXREYXRhO1xuICB9XG59XG4iLCJpbXBvcnQge01vZHVsZVN5c3RlbX0gZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgTW9kdWxlU3lzdGVtIHtcbiAgaXNBc3luYyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGFzeW5jT3B0aW9ucyA9IHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICYmIG9wdGlvbnMoKTtcblxuICAgIHN1cGVyKGFzeW5jT3B0aW9ucyA/IHttb2R1bGVzOiBbXX0gOiBvcHRpb25zKTtcblxuICAgIHRoaXMuaXNBc3luYyA9IGFzeW5jT3B0aW9ucyBpbnN0YW5jZW9mIFByb21pc2U7XG5cbiAgICB0aGlzLm5hdGl2ZSA9IHRoaXMuaXNBc3luYyA/IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgYXN5bmNPcHRpb25zLnRoZW4ob3B0aW9ucyA9PiB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZSA9IHRoaXMuYnVpbGQob3B0aW9ucyk7XG4gICAgICAgIHRoaXMubW9kdWxlcyA9IG9wdGlvbnMubW9kdWxlcyB8fCBbXTtcbiAgICAgICAgdGhpcy5zZXR1cE1vZHVsZXMoKTtcbiAgICAgICAgcmVzb2x2ZShuYXRpdmUpO1xuICAgICAgfSk7XG4gICAgfSkgOiB0aGlzLmJ1aWxkKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucygpIDogb3B0aW9ucyk7XG5cbiAgICB0aGlzLnNldHVwTW9kdWxlcygpO1xuICB9XG5cbiAgYnVpbGQoKSB7XG4gICAgY29uc29sZS5lcnJvcignWW91IHNob3VsZCB1c2UgeW91ciBvd24gLmJ1aWxkKCknKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGFkZChjb21wb25lbnQpIHtcbiAgICBjb25zdCBzZWxmTmF0aXZlID0gdGhpcy5pc0FzeW5jID8gYXdhaXQgdGhpcy5uYXRpdmUgOiB0aGlzLm5hdGl2ZTtcbiAgICBjb25zdCBjaGlsZE5hdGl2ZSA9IGNvbXBvbmVudC5pc0FzeW5jID8gYXdhaXQgY29tcG9uZW50Lm5hdGl2ZSA6IGNvbXBvbmVudC5uYXRpdmU7XG5cbiAgICBzZWxmTmF0aXZlLmFkZChjaGlsZE5hdGl2ZSk7XG4gIH1cbn1cbiIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcblxuICB0cnkge1xuICAgIERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NvbnN0cnVjdChQYXJlbnQsIGFyZ3MsIENsYXNzKSB7XG4gIGlmIChpc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IFJlZmxlY3QuY29uc3RydWN0O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdCA9IGZ1bmN0aW9uIF9jb25zdHJ1Y3QoUGFyZW50LCBhcmdzLCBDbGFzcykge1xuICAgICAgdmFyIGEgPSBbbnVsbF07XG4gICAgICBhLnB1c2guYXBwbHkoYSwgYXJncyk7XG4gICAgICB2YXIgQ29uc3RydWN0b3IgPSBGdW5jdGlvbi5iaW5kLmFwcGx5KFBhcmVudCwgYSk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICAgIGlmIChDbGFzcykgc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIENsYXNzLnByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfY29uc3RydWN0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbnN0cnVjdDsiLCJleHBvcnQgY29uc3Qgc3lzdGVtID0ge1xuICB3aW5kb3c6IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93XG59O1xuIiwiZXhwb3J0IGNsYXNzIERlZmluZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKC4uLmRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB1dGlscykge1xuICAgIHRoaXMuZGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbih1dGlscy5tYW5hZ2VyLCB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJyA/IGRhdGEodXRpbHMpIDogZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogQGNsYXNzIExvb3BcbiAqIEBjYXRlZ29yeSBjb3JlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZWFjaCBhbmltYXRpb24gZnJhbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNsb2NrPXRydWVdIHBhc3NlcyBhIENsb2NrIHRvIHRoZSBmdW5jdGlvbiB3aGVuIGNhbGxlZCwgaWYgdHJ1ZVxuICogQG1lbWJlcm9mIG1vZHVsZTpjb3JlXG4gKi9cbmNsYXNzIExvb3Age1xuICBjb25zdHJ1Y3RvcihmdW5jKSB7XG4gICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIExvb3Bcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwiZXhwb3J0IGNsYXNzIFN0b3JlIHtcbiAgc3RhdGljIGFzeW5jTG9hZGVyID0ge1xuICAgIGxvYWQoYXN5bmNEYXRhLCBvbkNvbXBsZXRlLCBvblByb2dyZXNzLCBvbkVycm9yKSB7XG4gICAgICBhc3luY0RhdGEoKS50aGVuKG9uQ29tcGxldGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihsb2FkZXJzKSB7XG4gICAgdGhpcy5sb2FkZXJzID0gbG9hZGVycztcbiAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICB0aGlzLnByb2Nlc3NvcnMgPSB7fTtcbiAgfVxuXG4gIHByb2Nlc3MoYXNzZXRUeXBlLCBwcm9jZXNzb3IpIHtcbiAgICBpZiAodGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0pIHtcbiAgICAgIHRoaXMucHJvY2Vzc29yc1thc3NldFR5cGVdLnB1c2gocHJvY2Vzc29yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0gPSBbcHJvY2Vzc29yXTtcbiAgICB9XG4gIH1cblxuICBsb2FkKGFzc2V0TmFtZSwgdXJsLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBbLCBhc3NldFR5cGVdID0gLyguKilcXC4vLmV4ZWMoYXNzZXROYW1lKTtcbiAgICBjb25zdCBsb2FkZXIgPSB0aGlzLmxvYWRlcnNbYXNzZXRUeXBlXTtcbiAgICBjb25zdCBwcm9jZXNzb3JzID0gdGhpcy5wcm9jZXNzb3JzW2Fzc2V0VHlwZV0gfHwgW107XG5cbiAgICB0aGlzLnJlZnNbYXNzZXROYW1lXSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxvYWRlci5sb2FkKFxuICAgICAgICB1cmwsXG4gICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgIHByb2Nlc3NvcnMucmVkdWNlKFxuICAgICAgICAgICAgICAobmV3RGF0YSwgcHJvY2Vzc29yKSA9PiBwcm9jZXNzb3IobmV3RGF0YSwgb3B0aW9ucywgYXNzZXROYW1lKSxcbiAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgcmVqZWN0XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMucmVmc1thc3NldE5hbWVdO1xuICB9XG5cbiAgcmVmKGFzc2V0TmFtZSkge1xuICAgIHJldHVybiB0aGlzLnJlZnNbYXNzZXROYW1lXTtcbiAgfVxufVxuIiwiaW1wb3J0IHtDbG9ja30gZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQge3N5c3RlbX0gZnJvbSAnLi4vcG9seWZpbGwnO1xuaW1wb3J0IHtEZWZpbmVNb2R1bGV9IGZyb20gJy4uL21vZHVsZXMvRGVmaW5lTW9kdWxlJztcbmltcG9ydCB7TW9kdWxlU3lzdGVtfSBmcm9tICcuL01vZHVsZVN5c3RlbSc7XG5pbXBvcnQge0xvb3B9IGZyb20gJy4vTG9vcCc7XG5pbXBvcnQge1N0b3JlfSBmcm9tICcuL1N0b3JlJztcblxuLyoqXG4gKiBAY2xhc3MgQXBwXG4gKiBAY2F0ZWdvcnkgY29yZVxuICogQGRlc2NyaXB0aW9uIFRoaXMgY29tcG9uZW50IGlzIHVzZWQgdG8gcHJlcGFyZSBhIHdvcmxkIHNjZW5lLCBzZXR1cCBwaHlzaWNzLCBjYW1lcmEsIHJlbmRlcmVyIGFuZCBhbGwgb3RoZXIgdGhpbmdzIHRoYXQgeW91IHVzdWFsbHkgZG8gYmVmb3JlIG1ha2luZyBtZXNoZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbbW9kdWxlcz1bXV0gLSBBcnJheSBvZiBNb2R1bGVzXG4gKiBAZXh0ZW5kcyBNb2R1bGVTeXN0ZW1cbiAqIEBtZW1iZXJvZiBtb2R1bGU6Y29yZVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBNb2R1bGVTeXN0ZW0ge1xuICBzdGF0aWMgU3RvcmUgPSBTdG9yZTtcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvbiBEZWZpbmVzIHdoZXRoZXIgdGhlIHNjZW5lIHNob3VsZCByZW5kZXIgb3Igbm90XG4gICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZHVsZTpjb3JlLkFwcCNlbmFibGVkXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGVuYWJsZWQgPSB0cnVlO1xuICBjbG9jayA9IG5ldyBDbG9jaygpO1xuXG4gIC8qKlxuICAgKiBMb29wcyBpbiB0aGlzIGFwcFxuICAgKiBAZGVzY3JpcHRpb24gQXJyYXkgb2YgbG9vcHMgdGhhdCBhcmUgZXhlY3V0ZWQgYnkgdGhpcyBhcHAuXG4gICAqIEBtZW1iZXIge0FycmF5fSBtb2R1bGU6Y29yZS5BcHAjbG9vcHNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgbG9vcHMgPSBbXTtcblxuICBzdGF0aWMgZGVmaW5lID0gKC4uLmFyZ3MpID0+IHtcbiAgICByZXR1cm4gbmV3IERlZmluZU1vZHVsZSguLi5hcmdzKTtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihtb2R1bGVzID0gW10pIHtcbiAgICBjb25zb2xlLmxvZyhgV0hTLkFwcCAke3ZlcnNpb259YCk7XG4gICAgc3VwZXIoe21vZHVsZXN9KTtcblxuICAgIHRoaXMuc2V0dXBNb2R1bGVzKCk7XG4gIH1cblxuICAvLyBDT05UUk9MUyAmIFVQREFUSU5HXG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc3RhcnRcbiAgICogQGRlc2NyaXB0aW9uIFN0YXJ0IHJlbmRlcmluZyBsb29wIGFuZCBwaHlzaWNzIHNpbXVsYXRpb24gKGlmIHlvdSB1c2UgdmVyc2lvbiB3aXRoIHBoeXNpY3MpLlxuICAgKiBAbWVtYmVyb2YgbW9kdWxlOmNvcmUuQXBwXG4gICAqL1xuICBzdGFydCgpIHtcbiAgICBjb25zdCByZXF1ZXN0QW5pbUZyYW1lID0gKCgpID0+IHtcbiAgICAgIHJldHVybiBzeXN0ZW0ud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBzeXN0ZW0ud2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBzeXN0ZW0ud2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBzeXN0ZW0ud2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IHByb2Nlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0QW5pbUZyYW1lKCgpID0+IHByb2Nlc3MoKSk7XG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbGwgPSB0aGlzLmxvb3BzLmxlbmd0aDsgaSA8IGxsOyBpKyspIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMubG9vcHNbaV07XG4gICAgICAgIGlmIChlLmVuYWJsZWQpIGUuZnVuYyh0aGlzLmNsb2NrKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIGlmICghdGhpcy5yZXF1ZXN0KVxuICAgICAgcHJvY2VzcygpO1xuICB9XG5cbiAgbG9vcChsb29wQ2FsbGJhY2spIHtcbiAgICBjb25zdCBsb29wID0gbmV3IExvb3AobG9vcENhbGxiYWNrKTtcbiAgICB0aGlzLmxvb3BzLnB1c2gobG9vcCk7XG5cbiAgICByZXR1cm4gbG9vcDtcbiAgfVxufVxuXG5leHBvcnQge1xuICBBcHBcbn07XG4iLCIvKiogQG1vZHVsZSBjb3JlICovXG5leHBvcnQgKiBmcm9tICcuL0NvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL01lc2hDb21wb25lbnQnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9MaWdodENvbXBvbmVudCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL0NhbWVyYUNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL0FwcCc7XG5leHBvcnQgKiBmcm9tICcuL0xvb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2R1bGVTeXN0ZW0nO1xuIiwiZnVuY3Rpb24gYXBwbHlMb2NhbFRyYW5zZm9ybShtYXRoVHlwZSwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHJldHVybjtcblxuICBsZXQgYXNzaWduRGF0YSA9IHt9O1xuXG4gIGlmIChkYXRhIGluc3RhbmNlb2YgT2JqZWN0LmdldFByb3RvdHlwZU9mKG1hdGhUeXBlKS5jb25zdHJ1Y3RvcikgeyAvLyBUSFJFRS5WZWN0b3IzID09PSBUSFJFRS5WZWN0b3IzXG4gICAgbWF0aFR5cGUuY29weShkYXRhKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIGFzc2lnbkRhdGEgPSB7XG4gICAgICB4OiBkYXRhWzBdLFxuICAgICAgeTogZGF0YVsxXSxcbiAgICAgIHo6IGRhdGFbMl0sXG4gICAgICB3OiBkYXRhWzNdXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBhc3NpZ25EYXRhID0ge1xuICAgICAgeDogZGF0YS54LFxuICAgICAgeTogZGF0YS55LFxuICAgICAgejogZGF0YS56LFxuICAgICAgdzogZGF0YS53XG4gICAgfTtcbiAgfVxuXG4gIGlmIChtYXRoVHlwZS53ID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWxldGUgYXNzaWduRGF0YS53O1xuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihtYXRoVHlwZSwgYXNzaWduRGF0YSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVRyYW5zZm9ybShuYXRpdmUsIG9wdGlvbnMpIHtcbiAgYXBwbHlMb2NhbFRyYW5zZm9ybShuYXRpdmUucG9zaXRpb24sIG9wdGlvbnMucG9zaXRpb24pO1xuICBhcHBseUxvY2FsVHJhbnNmb3JtKG5hdGl2ZS5zY2FsZSwgb3B0aW9ucy5zY2FsZSk7XG4gIGFwcGx5TG9jYWxUcmFuc2Zvcm0obmF0aXZlLnJvdGF0aW9uLCBvcHRpb25zLnJvdGF0aW9uKTtcbn1cbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICcuLi9jb3JlL0NvbXBvbmVudCc7XG5pbXBvcnQge2FwcGx5VHJhbnNmb3JtfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge01lc2h9IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIE1lc2hDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgZ2VvbWV0cnkgPSBvcHRpb25zLmdlb21ldHJ5O1xuICAgIGNvbnN0IG1hdGVyaWFsID0gb3B0aW9ucy5tYXRlcmlhbDtcblxuICAgIGNvbnN0IG1lc2ggPSB0aGlzLmJyaWRnZSgnbWVzaCcsIG5ldyBNZXNoKFxuICAgICAgZ2VvbWV0cnkgPyB0aGlzLmJyaWRnZSgnZ2VvbWV0cnknLCBnZW9tZXRyeSkgOiB1bmRlZmluZWQsXG4gICAgICBtYXRlcmlhbCA/IHRoaXMuYnJpZGdlKCdtYXRlcmlhbCcsIG1hdGVyaWFsKSA6IHVuZGVmaW5lZFxuICAgICkpO1xuXG4gICAgYXBwbHlUcmFuc2Zvcm0obWVzaCwgb3B0aW9ucyk7XG5cbiAgICByZXR1cm4gbWVzaDtcbiAgfVxufVxuXG5Db21wb25lbnQuTWVzaCA9IE1lc2hDb21wb25lbnQ7XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vY29yZS9Db21wb25lbnQnO1xuaW1wb3J0IHthcHBseVRyYW5zZm9ybX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ2FtZXJhQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgYnVpbGQob3B0aW9ucykge1xuICAgIGNvbnN0IGNhbWVyYSA9IG9wdGlvbnMuY2FtZXJhO1xuXG4gICAgYXBwbHlUcmFuc2Zvcm0oY2FtZXJhLCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmJyaWRnZSgnY2FtZXJhJywgY2FtZXJhKTtcbiAgfVxuXG4gIGF1dG9TaXplVXBkYXRlKG9uVXBkYXRlKSB7XG4gICAgb25VcGRhdGUoJ3NpemUnLCAoW3dpZHRoLCBoZWlnaHRdKSA9PiB7XG4gICAgICB0aGlzLm5hdGl2ZS5hc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgIHRoaXMubmF0aXZlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkNvbXBvbmVudC5DYW1lcmEgPSBDYW1lcmFDb21wb25lbnQ7XG4iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnLi4vY29yZS9Db21wb25lbnQnO1xuaW1wb3J0IHthcHBseVRyYW5zZm9ybX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgTGlnaHRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBidWlsZChvcHRpb25zKSB7XG4gICAgY29uc3QgbGlnaHQgPSBvcHRpb25zLmxpZ2h0O1xuXG4gICAgYXBwbHlUcmFuc2Zvcm0obGlnaHQsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuYnJpZGdlKCdsaWdodCcsIGxpZ2h0KTtcbiAgfVxufVxuXG5Db21wb25lbnQuTGlnaHQgPSBMaWdodENvbXBvbmVudDtcbiIsImltcG9ydCB7U2NlbmV9IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUge1xuICBzZXR1cChhcHAsIHttYW5hZ2VyfSkge1xuICAgIG1hbmFnZXIuc2NlbmUgPSBuZXcgU2NlbmUoKTtcblxuICAgIGFwcC5hZGQgPSBhc3luYyAoY29tcG9uZW50KSA9PiB7XG4gICAgICBjb21wb25lbnQgPSBhcHAuYnJpZGdlKCdjaGlsZCcsIGNvbXBvbmVudCk7XG4gICAgICBtYW5hZ2VyLnNjZW5lLmFkZChjb21wb25lbnQuaXNBc3luYyA/IGF3YWl0IGNvbXBvbmVudC5uYXRpdmUgOiBjb21wb25lbnQubmF0aXZlKTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge1dlYkdMUmVuZGVyZXJ9IGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmluZ01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKG1vZHVsZU9wdGlvbnMgPSB7fSwgcmVuZGVyZXJPcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm1vZHVsZU9wdGlvbnMgPSBtb2R1bGVPcHRpb25zO1xuICAgIHRoaXMucmVuZGVyZXJPcHRpb25zID0gcmVuZGVyZXJPcHRpb25zO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlciwgb25VcGRhdGUsIHdhcm59KSB7XG4gICAgd2Fybignc2l6ZScsICdtYW5hZ2VyLnNpemUgc2hvdWxkIGJlIGFuIGFycmF5OiBbd2lkdGgsIGhlaWdodF0nKTtcbiAgICB3YXJuKCdjYW1lcmEnLCAnbWFuYWdlci5jYW1lcmEgc2hvdWxkIGJlIGEgV0hTLkNvbXBvbmVudC5DYW1lcmEnKTtcbiAgICB3YXJuKCdzY2VuZScsICdtYW5hZ2VyLnNjZW5lIHNob3VsZCBiZSBhIFRIUkVFLlNjZW5lJyk7XG4gICAgd2FybignY29udGFpbmVyJywgJ21hbmFnZXIuY29udGFpbmVyIHNob3VsZCBiZSBhbiBIVE1MRWxlbWVudCcpO1xuXG4gICAgY29uc3Qge1xuICAgICAgY29udGFpbmVyLFxuICAgICAgY2FtZXJhLFxuICAgICAgc2NlbmUsXG4gICAgICBzaXplID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdXG4gICAgfSA9IG1hbmFnZXI7XG5cbiAgICBjb25zdCByZW5kZXJlck9wdGlvbnMgPSB0aGlzLnJlbmRlcmVyT3B0aW9ucyB8fCB7fTtcblxuICAgIGNvbnN0IHJlbmRlcmVyID0gbWFuYWdlci5yZW5kZXJlciA9IG5ldyBXZWJHTFJlbmRlcmVyKHRoaXMucHJlcGFyZVJlbmRlcmVyT3B0aW9ucyhyZW5kZXJlck9wdGlvbnMpKTtcbiAgICByZW5kZXJlci5zZXRTaXplKHNpemVbMF0sIHNpemVbMV0pO1xuXG4gICAgb25VcGRhdGUoJ3NpemUnLCAodmFsdWUpID0+IHtcbiAgICAgIHJlbmRlcmVyLnNldFNpemUodmFsdWVbMF0sIHZhbHVlWzFdKTtcbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIG1hbmFnZXIucmVuZGVyRnVuYyA9ICgpID0+IHtcbiAgICAgIG1hbmFnZXIucmVuZGVyZXIucmVuZGVyKG1hbmFnZXIuc2NlbmUsIG1hbmFnZXIuY2FtZXJhLm5hdGl2ZSk7XG4gICAgfTtcblxuICAgIG1hbmFnZXIucmVuZGVyTG9vcCA9IGFwcC5sb29wKGNsb2NrID0+IHtcbiAgICAgIG1hbmFnZXIucmVuZGVyRnVuYyhjbG9jaylcbiAgICB9KTtcbiAgfVxuXG4gIHByZXBhcmVSZW5kZXJlck9wdGlvbnMocmVuZGVyZXJPcHRpb25zKSB7XG4gICAgY29uc3QgcXVhbGl0eSA9IHRoaXMubW9kdWxlT3B0aW9ucy5xdWFsaXR5IHx8ICdtZWRpdW0nO1xuXG4gICAgc3dpdGNoIChxdWFsaXR5KSB7XG4gICAgICBjYXNlICdoaWdoJzpcbiAgICAgICAgcmVuZGVyZXJPcHRpb25zLmFudGlhbGlhcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcblxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlck9wdGlvbnM7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb250cm9sc01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xzU2V0dXApIHtcbiAgICB0aGlzLmNvbnRyb2xzU2V0dXAgPSBjb250cm9sc1NldHVwO1xuICB9XG5cbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICBtYW5hZ2VyLmNvbnRyb2xzID0gdGhpcy5jb250cm9sc1NldHVwKG1hbmFnZXIpO1xuXG4gICAgbWFuYWdlci5jb250cm9sc0xvb3AgPSBhcHAubG9vcCgoKSA9PiB7XG4gICAgICBtYW5hZ2VyLmNvbnRyb2xzLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgUmVzaXplTW9kdWxlIHtcbiAgc2V0dXAoYXBwLCB7bWFuYWdlcn0pIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgbWFuYWdlci5zaXplID0gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdO1xuICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIE5hbWVzcGFjZSBjb250YWluaW5nIGFsbCBjbGFzc2VzIGZyb20gYWxsIG1vZHVsZXMuIFVzZWQgYXMgZ2xvYmFsIGluIFVNRCBwYXR0ZXJuLlxuICogQG5hbWVzcGFjZSBXSFNcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlRoZSB1c2Ugb2YgV0hTIG5hbWVzcGFjZS48L2NhcHRpb24+XG4gKiBuZXcgV0hTLkFwcCgpIC8vIGNvcmVcbiAqIG5ldyBXSFMuUGVyc3BlY3RpdmVDYW1lcmEoKSAvLyBjb21wb25lbnRzXG4gKiBuZXcgV0hTLlJlc2l6ZU1vZHVsZSgpIC8vIG1vZHVsZXNcbiAqIFdIUy5leHRlbmQoKSAvLyB1dGlsc1xuICovXG5cbmltcG9ydCB7UkVWSVNJT059IGZyb20gJ3RocmVlJztcblxuLy8gQ2hlY2sgZm9yIFRocmVlLmpzXG5jb25zdCB3YXJuRGVwcyA9ICgpID0+IHtcbiAgdGhyb3cgbmV3IEVycm9yKCdXaGl0ZXN0b3JtSlMgRnJhbWV3b3JrIHJlcXVpcmVzIFRocmVlLmpzIGh0dHBzOi8vdGhyZWVqcy5vcmcvJyk7XG59O1xuXG50cnkge1xuICBpZiAoIVJFVklTSU9OKSB3YXJuRGVwcygpO1xufSBjYXRjaCAoZXJyKSB7XG4gIHdhcm5EZXBzKCk7XG59XG5cbmV4cG9ydCAqIGZyb20gJy4vY29yZS9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGVzJztcbi8vIGV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9jYW1lcmFzL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy9tZXNoZXMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi91dGlscy9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL21vZHVsZXMvaW5kZXgnO1xuXG4vLyBERVBSRUNBVElPTlxuLy8gZXhwb3J0ICogZnJvbSAnLi9kZXByZWNhdGlvbic7XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwiT3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsInVuZGVmaW5lZCIsIiRTeW1ib2wiLCJTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsIml0ZXJhdG9yIiwiYXN5bmNJdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3IiLCJ0b1N0cmluZ1RhZ1N5bWJvbCIsInRvU3RyaW5nVGFnIiwicnVudGltZSIsInJlZ2VuZXJhdG9yUnVudGltZSIsIm1vZHVsZSIsImluTW9kdWxlIiwiZXhwb3J0cyIsIndyYXAiLCJpbm5lckZuIiwib3V0ZXJGbiIsInNlbGYiLCJ0cnlMb2NzTGlzdCIsInByb3RvR2VuZXJhdG9yIiwiR2VuZXJhdG9yIiwiZ2VuZXJhdG9yIiwiY3JlYXRlIiwiY29udGV4dCIsIkNvbnRleHQiLCJfaW52b2tlIiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwiZm4iLCJvYmoiLCJhcmciLCJ0eXBlIiwiY2FsbCIsImVyciIsIkdlblN0YXRlU3VzcGVuZGVkU3RhcnQiLCJHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkIiwiR2VuU3RhdGVFeGVjdXRpbmciLCJHZW5TdGF0ZUNvbXBsZXRlZCIsIkNvbnRpbnVlU2VudGluZWwiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJnZXRQcm90byIsImdldFByb3RvdHlwZU9mIiwiTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUiLCJ2YWx1ZXMiLCJHcCIsImNvbnN0cnVjdG9yIiwiZGlzcGxheU5hbWUiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImdlbkZ1biIsImN0b3IiLCJuYW1lIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJfX2F3YWl0IiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJ2YWx1ZSIsIlByb21pc2UiLCJ0aGVuIiwidW53cmFwcGVkIiwiZXJyb3IiLCJwcmV2aW91c1Byb21pc2UiLCJlbnF1ZXVlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJhc3luYyIsIml0ZXIiLCJuZXh0IiwiZG9uZSIsInN0YXRlIiwiRXJyb3IiLCJkb25lUmVzdWx0IiwiZGVsZWdhdGUiLCJkZWxlZ2F0ZVJlc3VsdCIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsInJldHVybiIsIlR5cGVFcnJvciIsImluZm8iLCJyZXN1bHROYW1lIiwibmV4dExvYyIsInRvU3RyaW5nIiwicHVzaFRyeUVudHJ5IiwibG9jcyIsImVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJrZXlzIiwib2JqZWN0Iiwia2V5IiwicmV2ZXJzZSIsImxlbmd0aCIsInBvcCIsIml0ZXJhYmxlIiwiaXRlcmF0b3JNZXRob2QiLCJpc05hTiIsImkiLCJza2lwVGVtcFJlc2V0IiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJvb3RFbnRyeSIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwiRnVuY3Rpb24iLCJnIiwiaGFkUnVudGltZSIsImdldE93blByb3BlcnR5TmFtZXMiLCJpbmRleE9mIiwib2xkUnVudGltZSIsInJlcXVpcmUiLCJlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwiX25leHQiLCJfdGhyb3ciLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3MiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydGllcyIsInRhcmdldCIsInByb3BzIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5IiwiX2NyZWF0ZUNsYXNzIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiX3R5cGVvZjIiLCJfdHlwZW9mIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIlJlZmVyZW5jZUVycm9yIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJhc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJfZ2V0UHJvdG90eXBlT2YiLCJvIiwiX3NldFByb3RvdHlwZU9mIiwicCIsIl9pbmhlcml0cyIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsIl9kZWZpbmVQcm9wZXJ0eSIsIl9vYmplY3RTcHJlYWQiLCJzb3VyY2UiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiY29uY2F0IiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiTW9kdWxlU3lzdGVtIiwib3B0aW9ucyIsIm1vZHVsZXMiLCJkYXRhIiwidW5yZXNvbHZlZFdhcm5zIiwiTWFwIiwidXBkYXRlSGFuZGxlcnMiLCJhY3RpdmVNb2R1bGUiLCJtYW5hZ2VyIiwiUHJveHkiLCJzZXQiLCJwcm9wIiwiY2IiLCJnZXQiLCJ3YXJucyIsImNvbnNvbGUiLCJ3YXJuIiwiZGVwZW5kZW5jeSIsIm1lc3NhZ2UiLCJvblVwZGF0ZSIsInByb3BOYW1lIiwiaGFuZGxlciIsInNwbGljZSIsInNldHVwTW9kdWxlcyIsInNldHVwIiwiYnJpZGdlTmFtZSIsImlucHV0RGF0YSIsIm91dHB1dERhdGEiLCJicmlkZ2VzIiwiQ29tcG9uZW50IiwiYXN5bmNPcHRpb25zIiwiaXNBc3luYyIsIm5hdGl2ZSIsImJ1aWxkIiwiY29tcG9uZW50Iiwic2VsZk5hdGl2ZSIsImNoaWxkTmF0aXZlIiwiYWRkIiwiaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsInNoYW0iLCJEYXRlIiwiX2NvbnN0cnVjdCIsIlBhcmVudCIsIkNsYXNzIiwiYSIsImJpbmQiLCJzeXN0ZW0iLCJ3aW5kb3ciLCJEZWZpbmVNb2R1bGUiLCJhcHAiLCJ1dGlscyIsImFzc2lnbiIsIkxvb3AiLCJmdW5jIiwiZW5hYmxlZCIsIl9hcnJheVdpdGhIb2xlcyIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJfaSIsIl9zIiwiX25vbkl0ZXJhYmxlUmVzdCIsIl9zbGljZWRUb0FycmF5IiwiYXJyYXlXaXRoSG9sZXMiLCJpdGVyYWJsZVRvQXJyYXlMaW1pdCIsIm5vbkl0ZXJhYmxlUmVzdCIsIlN0b3JlIiwibG9hZGVycyIsInJlZnMiLCJwcm9jZXNzb3JzIiwiYXNzZXRUeXBlIiwicHJvY2Vzc29yIiwiYXNzZXROYW1lIiwidXJsIiwiZXhlYyIsImxvYWRlciIsImxvYWQiLCJyZWR1Y2UiLCJuZXdEYXRhIiwiYXN5bmNEYXRhIiwib25Db21wbGV0ZSIsIm9uUHJvZ3Jlc3MiLCJvbkVycm9yIiwiQXBwIiwibG9nIiwidmVyc2lvbiIsIkNsb2NrIiwicmVxdWVzdEFuaW1GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbGxiYWNrIiwic2V0VGltZW91dCIsInByb2Nlc3MiLCJyZXF1ZXN0IiwibGwiLCJsb29wcyIsImNsb2NrIiwibG9vcENhbGxiYWNrIiwibG9vcCIsImFwcGx5TG9jYWxUcmFuc2Zvcm0iLCJtYXRoVHlwZSIsImFzc2lnbkRhdGEiLCJjb3B5IiwieCIsInkiLCJ6IiwidyIsImFwcGx5VHJhbnNmb3JtIiwicG9zaXRpb24iLCJzY2FsZSIsInJvdGF0aW9uIiwiTWVzaENvbXBvbmVudCIsImdlb21ldHJ5IiwibWF0ZXJpYWwiLCJtZXNoIiwiYnJpZGdlIiwiTWVzaCIsIkNhbWVyYUNvbXBvbmVudCIsImNhbWVyYSIsIndpZHRoIiwiaGVpZ2h0IiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkNhbWVyYSIsIkxpZ2h0Q29tcG9uZW50IiwibGlnaHQiLCJMaWdodCIsIlRyZWVNb2R1bGUiLCJzY2VuZSIsIlNjZW5lIiwiUmVuZGVyaW5nTW9kdWxlIiwibW9kdWxlT3B0aW9ucyIsInJlbmRlcmVyT3B0aW9ucyIsImNvbnRhaW5lciIsInNpemUiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJyZW5kZXJlciIsIldlYkdMUmVuZGVyZXIiLCJwcmVwYXJlUmVuZGVyZXJPcHRpb25zIiwic2V0U2l6ZSIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsInJlbmRlckZ1bmMiLCJyZW5kZXIiLCJyZW5kZXJMb29wIiwicXVhbGl0eSIsImFudGlhbGlhcyIsIkNvbnRyb2xzTW9kdWxlIiwiY29udHJvbHNTZXR1cCIsImNvbnRyb2xzIiwiY29udHJvbHNMb29wIiwidXBkYXRlIiwiUmVzaXplTW9kdWxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIndhcm5EZXBzIiwiUkVWSVNJT04iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBT0EsQ0FBRSxVQUFTQSxNQUFULEVBQWlCOztNQUdiQyxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0MsU0FBaEI7TUFDSUMsTUFBTSxHQUFHSCxFQUFFLENBQUNJLGNBQWhCO01BQ0lDLFNBQUosQ0FMaUI7O01BTWJDLE9BQU8sR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFVBQWxCLEdBQStCQSxNQUEvQixHQUF3QyxFQUF0RDtN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
