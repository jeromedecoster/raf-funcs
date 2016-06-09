const isGte = require('is-funcs/is-gte')
const clear = require('./clear')

module.exports = function(cb, delay, ctx) {
  delay = isGte(delay, 0) ? delay : 0
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

  throttled.immediate = function() {
    clear(data)
    delayed()
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
