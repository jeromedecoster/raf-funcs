const setNumber = require('set-funcs/set-number')

module.exports = function(cb, delay, ctx) {
  delay = setNumber(delay, 50, 25)
  var id
  var args
  var start = 0

  function throttle() {
    if (id != null) return
    if (ctx === undefined || ctx === null) ctx = this
    args = arguments
    id = requestAnimationFrame(loop)
  }

  throttle.immediate = function() {
    cancel()
    delayed()
  }

  throttle.cancel = function() {
    cancel()
  }

  return throttle

  function loop() {
    if (delay - (Date.now() - start) <= 0) return delayed()
    id = requestAnimationFrame(loop)
  }

  function delayed() {
    start = Date.now()
    id = null
    cb.apply(ctx, args)
  }

  function cancel() {
    cancelAnimationFrame(id)
    id = null
  }
}
