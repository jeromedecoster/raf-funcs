const interval = require('./interval')

module.exports = function(cb, delay, ctx) {
  if (ctx === undefined || ctx === null) ctx = this

  function wrap(elapsed) {
    cb.call(ctx, elapsed)
  }
  var ref = interval(wrap, delay, ctx, 1)

  return {
    get started() {
      return ref.started
    },
    start: function() {
      ref.start()
    },
    cancel: function() {
      ref.cancel()
    }
  }
}
