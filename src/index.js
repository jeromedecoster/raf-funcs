
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
