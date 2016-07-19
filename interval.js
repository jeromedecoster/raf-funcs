const setNumber = require('set-funcs/set-number')

module.exports = function(cb, delay, ctx, count) {
  delay = setNumber(delay, 0, 0)
  count = setNumber(count)
  if (count < 1) count = Infinity
  if (ctx === undefined || ctx === null) ctx = this
  var id
  var step
  var start
  var elapsed

  function request() {
    if (id != null) return
    start = elapsed = Date.now()
    step = 0
    id = requestAnimationFrame(loop)
  }

  request()

  return {
    get started() {
      return id != null
    },
    start: function() {
      request()
    },
    cancel: function() {
      cancelAnimationFrame(id)
      id = null
    }
  }

  function loop() {
    if ((Date.now() - start) >= delay) {
      step++
      cb.call(ctx, Date.now() - elapsed, step)
      start = Date.now()
      if (step >= count) {
        id = null
        return
      }
    }
    id = requestAnimationFrame(loop)
  }
}
