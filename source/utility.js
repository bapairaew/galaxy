function Utility() { }

// If input param is not array it will return new array
Utility.makeItBecomeArray = function (arr) {
  if (!(arr instanceof Array)) {
    return [];
  }

  return arr;
};

module.exports = Utility;
