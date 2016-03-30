
exports.timeout  = timeout
exports.interval = interval
exports.throttle = throttle
exports.debounce = debounce
exports.clear    = clear

function timeout(cb, delay, ctx) {
  delay = safe(delay)
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

function interval(cb, delay, ctx) {
  delay = safe(delay)
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

function throttle(cb, delay, ctx) {
  delay = safe(delay)
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

function debounce(cb, delay, ctx) {
  delay = safe(delay)
  var data = {}
  var start
  var args

  function debounced() {
    if (ctx == undefined) ctx = this
    args = arguments

    clear(data)
    start = Date.now()
    data.id = requestAnimationFrame(loop)
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

function clear(data) {
  if (data && data.id !== undefined) {
    cancelAnimationFrame(data.id)
    data.id = null
  }
}

function safe(delay) {
  if (typeof delay != 'number' || delay !== delay) return 0
  return delay < 0 ? 0 : delay
}
