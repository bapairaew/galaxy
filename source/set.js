function Set() { }

// Set subtraction
Set.subtract = function (a, b) {
  return a.filter(function (i) {return b.indexOf(i) < 0; });
};

module.exports = Set;
