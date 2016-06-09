module.exports = function(data) {
  if (data && data.id !== undefined) {
    cancelAnimationFrame(data.id)
    data.id = null
  }
}
