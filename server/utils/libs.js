
function parseStrToHex (str) {
  return Buffer.from(str).toString('hex');
}
  
function parseHexToStr (hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) str += String.fromCharCode(v);
  }
  return str;
}

function parseHexToDecimal (hex) {
  return parseInt(hex);
}

module.exports = {
  parseStrToHex,
  parseHexToStr,
  parseHexToDecimal
}