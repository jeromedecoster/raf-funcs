const interval = require('../interval')
const debounce = require('../debounce')
const throttle = require('../throttle')
const timeout  = require('../timeout')

function time() {
  var d = new Date()
  var ms = d.getMilliseconds().toString()
  while (ms.length < 3) ms = '0' + ms
  return d.toString().substr(15, 9) + '.' + ms
}

//
// TIMEOUT
//

var timeoutDelay  = document.querySelector('.timeout .delay')
var timeoutCreate = document.querySelector('.timeout .create')
var timeoutStart  = document.querySelector('.timeout .start')
var timeoutCancel = document.querySelector('.timeout .cancel')
var timeoutOutput = document.querySelector('.timeout .output')
var timeoutCtx    = { count:0 }
var timeouted

timeoutCreate.addEventListener('click', function() {
  if (timeouted) return
  timeoutOutput.textContent = 'start'
  timeouted = timeout(function(elapsed) {
    console.log('timeout elapsed:', elapsed)
    this.count++
    timeoutOutput.textContent = time() + ' count:' + this.count
  }, +timeoutDelay.value, timeoutCtx)
})
timeoutStart.addEventListener('click', function() {
  if (timeouted == null || timeouted.started) return
  timeoutOutput.textContent = 'start'
  timeouted.start()
})
timeoutCancel.addEventListener('click', function() {
  if (timeouted == null || timeouted.started == false) return
  timeoutOutput.textContent = 'cancel'
  timeouted.cancel()
})

//
// INTERVAL
//

var intervalDelay  = document.querySelector('.interval .delay')
var intervalCount  = document.querySelector('.interval .count')
var intervalCreate = document.querySelector('.interval .create')
var intervalStart  = document.querySelector('.interval .start')
var intervalCancel = document.querySelector('.interval .cancel')
var intervalOutput = document.querySelector('.interval .output')
var intervalCtx    = { count:0 }
var intervalled

intervalCreate.addEventListener('click', function() {
  if (intervalled) return
  intervalOutput.textContent = 'create'
  intervalled = interval(function(elapsed, step) {
    console.log('interval elapsed:', elapsed, 'step:', step)
    this.count++
    intervalOutput.textContent = time() + ' count:' + this.count
  }, +intervalDelay.value, intervalCtx, +intervalCount.value)
})
intervalStart.addEventListener('click', function() {
  if (intervalled == null || intervalled.started) return
  intervalOutput.textContent = 'start'
  intervalled.start()
})
intervalCancel.addEventListener('click', function() {
  if (intervalled == null || intervalled.started == false) return
  intervalOutput.textContent = 'cancel'
  intervalled.cancel()
})

//
// THROTTLE
//

var throttleDelay     = document.querySelector('.throttle .delay')
var throttleAdd       = document.querySelector('.throttle .add')
var throttleRemove    = document.querySelector('.throttle .remove')
var throttleImmediate = document.querySelector('.throttle .immediate')
var throttleCancel    = document.querySelector('.throttle .cancel')
var throttleOutput1   = document.querySelector('.throttle .output1')
var throttleOutput2   = document.querySelector('.throttle .output2')
var throttled

throttleAdd.addEventListener('click', function() {
  throttleOutput2.textContent = 'add'
  if (throttled) {
    throttled.cancel()
    window.removeEventListener('resize', throttled)
  }
  throttled = throttle(function() {
      throttleOutput2.innerHTML = time() + ' &nbsp; &nbsp; &nbsp; ' + window.innerWidth + ' x ' + window.innerHeight
  }, +throttleDelay.value)
  window.addEventListener('resize', throttled, false)
})
throttleRemove.addEventListener('click', function() {
  throttleOutput2.textContent = 'remove'
  window.removeEventListener('resize', throttled)
})
throttleImmediate.addEventListener('click', function() {
  if (throttled == null) return
  throttleOutput2.textContent = 'immediate'
  throttled.immediate()
})
throttleCancel.addEventListener('click', function() {
  if (throttled == null) return
  throttleOutput2.textContent = 'cancel'
  throttled.cancel()
})

window.addEventListener('resize', function() {
  throttleOutput1.innerHTML = time() + ' &nbsp; &nbsp; &nbsp; ' + window.innerWidth + ' x ' + window.innerHeight
}, false)

//
// DEBOUNCE
//

var debounceInput     = document.querySelector('.debounce .input')
var debounceDelay     = document.querySelector('.debounce .delay')
var debounceAdd       = document.querySelector('.debounce .add')
var debounceRemove    = document.querySelector('.debounce .remove')
var debounceImmediate = document.querySelector('.debounce .immediate')
var debounceCancel    = document.querySelector('.debounce .cancel')
var debounceOutput1   = document.querySelector('.debounce .output1')
var debounceOutput2   = document.querySelector('.debounce .output2')
var debounced

debounceAdd.addEventListener('click', function() {
  debounceOutput2.textContent = 'add'
  if (debounced) {
    debounced.cancel()
    window.removeEventListener('keyup', debounced)
  }
  debounced = debounce(function() {
      debounceOutput2.innerHTML = debounceInner(this)
  }, +debounceDelay.value, debounceInput)
  window.addEventListener('keyup', debounced, false)
})
debounceRemove.addEventListener('click', function() {
  debounceOutput2.textContent = 'remove'
  window.removeEventListener('keyup', debounced)
})
debounceImmediate.addEventListener('click', function() {
  if (debounced == null) return
  debounceOutput2.textContent = 'immediate'
  debounced.immediate()
})
debounceCancel.addEventListener('click', function() {
  if (debounced == null) return
  debounceOutput2.textContent = 'cancel'
  debounced.cancel()
})
debounceInput.addEventListener('keyup', function() {
  debounceOutput1.innerHTML = debounceInner(this)
})

function debounceInner(ctx) {
  var l = ctx.value.length
  var c = l < 2 ? 'char' : 'chars'
  return time() + ' &nbsp; &nbsp; &nbsp; ' + l + ' ' + c
}
