const WHITE_SPACES = [
  ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680', '\u180E',
  '\u2000', '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006',
  '\u2007', '\u2008', '\u2009', '\u200A', '\u2028', '\u2029', '\u202F',
  '\u205F', '\u3000'
];

function unCamelCase(str){
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
  str = str.toLowerCase(); //add space between camelCase text
  return str;
}

function removeNonWord(str){
  return str.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '');
}

function replaceAccents(str){
  // verifies if the String has accents and replace them
  if (str.search(/[\xC0-\xFF]/g) > -1) {
    str = str
      .replace(/[\xC0-\xC5]/g, "A")
      .replace(/[\xC6]/g, "AE")
      .replace(/[\xC7]/g, "C")
      .replace(/[\xC8-\xCB]/g, "E")
      .replace(/[\xCC-\xCF]/g, "I")
      .replace(/[\xD0]/g, "D")
      .replace(/[\xD1]/g, "N")
      .replace(/[\xD2-\xD6\xD8]/g, "O")
      .replace(/[\xD9-\xDC]/g, "U")
      .replace(/[\xDD]/g, "Y")
      .replace(/[\xDE]/g, "P")
      .replace(/[\xE0-\xE5]/g, "a")
      .replace(/[\xE6]/g, "ae")
      .replace(/[\xE7]/g, "c")
      .replace(/[\xE8-\xEB]/g, "e")
      .replace(/[\xEC-\xEF]/g, "i")
      .replace(/[\xF1]/g, "n")
      .replace(/[\xF2-\xF6\xF8]/g, "o")
      .replace(/[\xF9-\xFC]/g, "u")
      .replace(/[\xFE]/g, "p")
      .replace(/[\xFD\xFF]/g, "y");
  }

  return str;
}

function slugify(str, delimeter){
  if (delimeter == null) {
    delimeter = "-";
  }

  str = replaceAccents(str);
  str = removeNonWord(str);
  str = trim(str) //should come after removeNonWord
    .replace(/ +/g, delimeter) //replace spaces with delimeter
    .toLowerCase();

  return str;
}

function hyphenate(str){
  str = unCamelCase(str);
  return slugify(str, "-");
}

function ltrim(str, chars) {
  chars = chars || WHITE_SPACES;

  var start = 0,
    len = str.length,
    charLen = chars.length,
    found = true,
    i, c;

  while (found && start < len) {
    found = false;
    i = -1;
    c = str.charAt(start);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        start++;
        break;
      }
    }
  }

  return (start >= len) ? '' : str.substr(start, len);
}

function rtrim(str, chars) {
  chars = chars || WHITE_SPACES;

  var end = str.length - 1,
    charLen = chars.length,
    found = true,
    i, c;

  while (found && end >= 0) {
    found = false;
    i = -1;
    c = str.charAt(end);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        end--;
        break;
      }
    }
  }

  return (end >= 0) ? str.substring(0, end + 1) : '';
}

function trim(str, chars) {
  chars = chars || WHITE_SPACES;
  return ltrim(rtrim(str, chars), chars);
}

function normalizeMs(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d: d, h: h, m: m, s: s };
}

function pad(str, len, c = '0', side = 'left') {
  let s = `${str}`;

  if (s < len) {
    const padding = (new Array(len - s.length)).fill(c);

    return side === 'left' ?
      `${padding.join('')}${s}` :
      `${s}${padding.join('')}`;
  }

  return s;
}

function wrap(input = '', bp = '–', bindFirst = true, spacey = true, cn = 'nowrap') {
  let result = input;
  
  if (input.includes(bp)) {
    result = '';

    const parts = input.split(bp);
    parts.forEach((p, i) => {
      if (i % 2 === 0) {
        result = `${result}${p.trim()}${bindFirst ? `${spacey ? ' ' : ''}${bp}` : ''}`;
      } else {
        result = `${result} <span class="${cn}">${!bindFirst ? `${bp} ` : ''}${p.trim()}</span>`;
      }
    });
  }

  return result;
}

// for looking up a key in a deeply-nested object
// ripped directly from: https://stackoverflow.com/a/38805302/4043446
function lookup(obj, k) {
  for (key in obj) {
    value = obj[key];
    if (k == key) return [k, value];

    if (type(value) == "Object") {
      var y = lookup(value, k);
      if (y && y[0] == k) return y;
    }
    if (type(value) == "Array") {
      for (var i = 0; i < value.length; ++i) {
        var x = lookup(value[i], k);
        if (x && x[0] == k) return x;
      }
    }
  }

  return null;
}

export {
  pad,
  wrap,
  lookup,
  hyphenate,
  normalizeMs,
};
