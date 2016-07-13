const setNumber = require('set-funcs/set-number')
const clear = require('./clear')

module.exports = function(cb, delay, ctx) {
  delay = setNumber(delay)
  var start = 0
  var data = {}
  var args

  function debounced() {
    if (ctx == undefined) ctx = this
    args = arguments

    clear(data)
    start = Date.now()
    data.id = requestAnimationFrame(loop)
  }

  debounced.immediate = function() {
    clear(data)
    delayed()
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
