const setNumber = require('set-funcs/set-number')

module.exports = function(cb, delay, ctx) {
  delay = setNumber(delay, 0)
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
