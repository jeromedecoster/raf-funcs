
//
// SERVER
//

const bs = require('browser-sync')

bs({
  server: 'public',
  ui: false,
  files: ['public/**', '!**/**DS_Store'],
  open: false,
  notify: false
})

//
// JS
//

const browserify = require('browserify')
const watchify = require('watchify')
const fs = require('fs')

var b = browserify('src/index.js')
bundle()

var w = watchify(b)
w.on('update', bundle)

function bundle() {
  b.bundle(function (err, data) {
    if (err) return console.error(err.message)
    fs.writeFileSync('public/bundle.js', data)
  })
}
