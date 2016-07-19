const setNumber = require('set-funcs/set-number')

module.exports = function(cb, delay, ctx) {
  delay = setNumber(delay, 300, 25)
  var id
  var args
  var start = 0

  function debounce() {
    if (ctx === undefined || ctx === null) ctx = this
    args = arguments

    cancel()
    start = Date.now()
    id = requestAnimationFrame(loop)
  }

  debounce.immediate = function() {
    cancel()
    delayed()
  }

  debounce.cancel = function() {
    cancel()
  }

  return debounce

  function loop() {
    if (delay - (Date.now() - start) <= 0) return delayed()
    id = requestAnimationFrame(loop)
  }

  function delayed() {
    id = null
    cb.apply(ctx, args)
  }

  function cancel() {
    cancelAnimationFrame(id)
    id = null
  }
}
