const isGte = require('is-funcs/is-gte')

module.exports = function(cb, delay, ctx) {
  delay = isGte(delay, 0) ? delay : 0
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
