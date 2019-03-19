module.exports = function (value) {
  value = '' + value
  const valueArr = value.toLowerCase().match(/\S+/g) || []
  return valueArr.join('-')
}
