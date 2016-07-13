const setNumber = require('set-funcs/set-number')

module.exports = function(cb, delay, ctx) {
  delay = setNumber(delay)
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
