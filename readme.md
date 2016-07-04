# raf-funcs

> A very limited subset of requestAnimationFrame functions I use every day

## Install

```bash
npm i raf-funcs
```

Package [on npm](https://www.npmjs.com/package/raf-funcs)

## API

* [debounce](#debouncecb-delay-ctx)
* [interval](#intervalcb-delay-ctx)
* [throttle](#throttlecb-delay-ctx)
* [timeout](#timeoutcb-delay-ctx)

#### debounce(cb, delay, [ctx])

Debounce a function with `cancel` and `immediate` methods

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | the delay in ms |
| **ctx** | the context of `this`|

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

#### interval(cb, delay, [ctx])

Like `setInterval` but based on `requestAnimationFrame`

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | the delay in ms |
| **ctx** | the context of `this`|

```js
const interval = require('raf-funcs/interval')
const clear = require('raf-funcs/clear')

var ref = interval(function() {
  console.log('every second')
}, 1000)

// uncomment to cancel the interval
// clear(ref)
```

---

#### throttle(cb, delay, [ctx])

Throttle a function with `cancel` and `immediate` methods

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | the delay in ms |
| **ctx** | the context of `this`|

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

#### timeout(cb, delay, [ctx])

Like `setTimeout` but based on `requestAnimationFrame`

| Argument | Action |
| :------ | :------- |
| **cb** | the callback |
| **delay** | the delay in ms |
| **ctx** | the context of `this`|

```js
const timeout = require('raf-funcs/timeout')
const clear = require('raf-funcs/clear')

var ref = timeout(function() {
  console.log('1 second later')
}, 1000)

// uncomment to cancel the timeout
// clear(ref)
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
