let translations = require('../locale/en')
translations = translations.en

function dotLookup (notation, lookup) {
  return notation.split('.').reduce((obj, i) => obj[i], lookup)
}

module.exports = function (notaion) {
  return dotLookup(notaion, translations)
}
