# raf-funcs

> A very limited subset of requestAnimationFrame functions I use every day

## Install

```bash
npm i raf-funcs
```

Package [on npm](https://www.npmjs.com/package/raf-funcs)

## API

* [debounce](#debouncecb-delay-ctx)
* [interval](#intervalcb-delay-ctx-count)
* [throttle](#throttlecb-delay-ctx)
* [timeout](#timeoutcb-delay-ctx)

#### debounce(cb, [delay], [ctx])

Debounce a function, based on `requestAnimationFrame`

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | optional delay, default to 300 ms, min to 25 ms |
| **ctx** | optional context of `this`, default to global |

Return a reference with

* Two methods `immediate` and `cancel`

```js
const debounce = require('raf-funcs/debounce')

var debounced = debounce(function() {
  console.log('250 ms after the last keyup')
}, 250)

input.addEventListener('keyup', debounced)

// uncomment to cancel the debounce
// debounced.cancel()

// uncomment to call it immediately
// debounced.immediate()
```

---

#### interval(cb, [delay], [ctx], [count])

Like `setInterval` but based on `requestAnimationFrame`

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | optional delay, default to 0 ms |
| **ctx** | optional context of `this`, default to global |
| **count** | optional maximum call, default to `Infinity` |

Return a reference with

* A property `started`
* Two methods `start` and `cancel`

```js
const interval = require('raf-funcs/interval')

var ref = interval(function() {
  console.log('every second')
}, 1000)

// true
ref.started

// uncomment to cancel the interval
// ref.cancel()

// uncomment to restart the interval (if finished or canceled)
// ref.start()
```

The callback `cb` receive two arguments

| Argument | Action |
| :------ | :------- |
| **elapsed** | the `elapsed` time since the start |
| **step** | the `step` count |

```js
const interval = require('raf-funcs/interval')

// elapsed: 1010 step: 1
// elapsed: 2011 step: 2
// elapsed: 3014 step: 3
interval(function(elapsed, step) {
  console.log('elapsed:', elapsed, 'step:', step)
}, 1000, null, 3)
```

---

#### throttle(cb, [delay], [ctx])

Throttle a function, based on `requestAnimationFrame`

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | optional delay, default to 50 ms, min to 25 ms |
| **ctx** | optional context of `this`, default to global |

Return a reference with

* Two methods `immediate` and `cancel`

```js
const throttle = require('raf-funcs/throttle')

var throttled = throttle(function() {
  console.log('after the first resize, then after each 250 ms elapsed')
}, 250)

window.addEventListener('resize', throttled)

// uncomment to cancel the throttle
// throttled.cancel()

// uncomment to call it immediately
// throttled.immediate()
```

---

#### timeout(cb, [delay], [ctx])

Like `setTimeout` but based on `requestAnimationFrame`

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | optional delay, default to 0 ms |
| **ctx** | optional context of `this`, default to global |

Return a reference with

* A property `started`
* Two methods `start` and `cancel`

```js
const timeout = require('raf-funcs/timeout')

var ref = timeout(function() {
  console.log('1 second later')
}, 1000)

// true
ref.started

// uncomment to cancel the timeout
// ref.cancel()

// uncomment to restart the timeout (if finished or canceled)
// ref.start()
```

The callback `cb` receive one argument

| Argument | Action |
| :------ | :------- |
| **elapsed** | the `elapsed` time since the start |

```js
const timeout = require('raf-funcs/timeout')

// elapsed: 1006
timeout(function(elapsed) {
  console.log('elapsed:', elapsed)
}, 1000)
```

## Thanks

Mainly forked / inspired on
- [request-timeout](https://github.com/nk-components/request-timeout)
- [request-interval](https://github.com/nk-components/request-interval)
- [mout/throttle](https://github.com/mout/mout/blob/master/src/function/throttle.js)
- [mout/debounce](https://github.com/mout/mout/blob/master/src/function/debounce.js)

Performance tips from
- [Date.now() vs performance.now()](https://jsperf.com/new-date-vs-date-now-vs-performance-now/37)
- [{} vs Object.create(null)](http://jsperf.com/new-object-vs-object-create-vs/2)
- [faster isNaN](http://jacksondunstan.com/articles/983)

## License

MIT
