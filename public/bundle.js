(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

exports.timeout  = timeout
exports.interval = interval
exports.throttle = throttle
exports.debounce = debounce
exports.clear    = clear

function timeout(cb, delay, ctx) {
  delay = safe(delay)
  if (ctx === undefined) ctx = this
  var start = Date.now()
  var data = {
  	id: requestAnimationFrame(loop)
  }

  return data

  function loop() {
  	if (Date.now() - start >= delay) return cb.call(ctx)
    data.id = requestAnimationFrame(loop)
  }
}

function interval(cb, delay, ctx) {
  delay = safe(delay)
  if (ctx == undefined) ctx = this
  var start = Date.now()
  var data = {
  	id: requestAnimationFrame(loop)
  }

  return data

  function loop() {
    if ((Date.now() - start) >= delay) {
      cb.call(ctx)
      start = Date.now()
    }
    data.id = requestAnimationFrame(loop)
  }
}

function throttle(cb, delay, ctx) {
  delay = safe(delay)
  var start = 0
  var data = {}
  var args

  function throttled() {
  	if (data.id == null) {
      if (ctx === undefined) ctx = this
  	  args = arguments
  	  data.id = requestAnimationFrame(loop)
  	}
  }
  throttled.cancel = function() {
    clear(data)
  }

  return throttled

  function loop() {
    if (delay - (Date.now() - start) <= 0) return delayed()
    data.id = requestAnimationFrame(loop)
  }

  function delayed() {
    start = Date.now()
    data.id = null
    cb.apply(ctx, args)
  }
}

function debounce(cb, delay, ctx) {
  delay = safe(delay)
  var data = {}
  var start
  var args

  function debounced() {
    if (ctx == undefined) ctx = this
    args = arguments

    clear(data)
    start = Date.now()
    data.id = requestAnimationFrame(loop)
  }

  debounced.cancel = function() {
    clear(data)
  }

  return debounced

  function loop() {
    if (delay - (Date.now() - start) <= 0) return delayed()
    data.id = requestAnimationFrame(loop)
  }

  function delayed() {
    data.id = null
    cb.apply(ctx, args)
  }
}

function clear(data) {
  if (data && data.id !== undefined) {
    cancelAnimationFrame(data.id)
    data.id = null
  }
}

function safe(delay) {
  if (typeof delay != 'number' || delay !== delay) return 0
  return delay < 0 ? 0 : delay
}

// https://jsperf.com/new-date-vs-date-now-vs-performance-now/37
// http://jsperf.com/new-object-vs-object-create-vs/2
// http://jacksondunstan.com/articles/983

},{}],2:[function(require,module,exports){

const timeout  = require('..').timeout
const interval = require('..').interval
const throttle = require('..').throttle
const debounce = require('..').debounce
const clear    = require('..').clear

//
// TIMEOUT
//

var timeoutDelay  = document.querySelector('.timeout .delay')
var timeoutStart  = document.querySelector('.timeout .start')
var timeoutClear  = document.querySelector('.timeout .clear')
var timeoutOutput = document.querySelector('.timeout .output')
var timeoutData

timeoutStart.addEventListener('click', function() {
	timeoutOutput.textContent = 'start'
	timeoutData = timeout(function() {
		timeoutOutput.textContent = time()
	}, +timeoutDelay.value)
})
timeoutClear.addEventListener('click', function() {
	timeoutOutput.textContent = 'clear'
	clear(timeoutData)
})


function time() {
	var d = new Date()
	var ms = d.getMilliseconds().toString()
	while (ms.length < 3) ms = '0' + ms
	return d.toString().substr(15, 9) + '.' + ms
}

//
// INTERVAL
//

var intervalDelay  = document.querySelector('.interval .delay')
var intervalStart  = document.querySelector('.interval .start')
var intervalClear  = document.querySelector('.interval .clear')
var intervalOutput = document.querySelector('.interval .output')
var intervalData

intervalStart.addEventListener('click', function() {
	intervalOutput.textContent = 'start'
	intervalData = interval(function() {
		intervalOutput.textContent = time()
	}, +intervalDelay.value)
})
intervalClear.addEventListener('click', function() {
	intervalOutput.textContent = 'clear'
	clear(intervalData)
})

//
// THROTTLE
//

var throttleDelay   = document.querySelector('.throttle .delay')
var throttleAdd     = document.querySelector('.throttle .add')
var throttleRemove  = document.querySelector('.throttle .remove')
var throttleOutput1 = document.querySelector('.throttle .output1')
var throttleOutput2 = document.querySelector('.throttle .output2')
var throttled

throttleAdd.addEventListener('click', function() {
	throttleOutput2.textContent = 'add'
	throttled = throttle(function() {
  		throttleOutput2.innerHTML = time() + ' &nbsp; &nbsp; &nbsp; ' + window.innerWidth + ' x ' + window.innerHeight
	}, +throttleDelay.value)
	window.addEventListener('resize', throttled, false)
})
throttleRemove.addEventListener('click', function() {
	throttleOutput2.textContent = 'remove'
	window.removeEventListener('resize', throttled)
})

window.addEventListener('resize', function() {
	throttleOutput1.innerHTML = time() + ' &nbsp; &nbsp; &nbsp; ' + window.innerWidth + ' x ' + window.innerHeight
}, false)

//
// DEBOUNCE
//

var debounceInput   = document.querySelector('.debounce .input')
var debounceDelay   = document.querySelector('.debounce .delay')
var debounceAdd     = document.querySelector('.debounce .add')
var debounceRemove  = document.querySelector('.debounce .remove')
var debounceOutput1 = document.querySelector('.debounce .output1')
var debounceOutput2 = document.querySelector('.debounce .output2')
var debounced

debounceAdd.addEventListener('click', function() {
	debounceOutput2.textContent = 'add'
	debounced = debounce(function() {
  		debounceOutput2.innerHTML = debounceInner(this)
	}, +debounceDelay.value, debounceInput)
	window.addEventListener('keyup', debounced, false)
})
debounceRemove.addEventListener('click', function() {
	debounceOutput2.textContent = 'remove'
	window.removeEventListener('keyup', debounced)
})

debounceInput.addEventListener('keyup', function() {
	debounceOutput1.innerHTML = debounceInner(this)
})

function debounceInner(ctx) {
	var l = ctx.value.length
	var c = l < 2 ? 'char' : 'chars'
	return time() + ' &nbsp; &nbsp; &nbsp; ' + l + ' ' + c
}

},{"..":1}]},{},[2]);
