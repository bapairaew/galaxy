function ObjectFinder() { }

// Find an object by field's value
ObjectFinder.find = function (list, field, value) {
  return ObjectFinder.findByTestFunction(list, function (item) {
    return item[field] === value;
  });
};

// Find the first object which the test function return true
ObjectFinder.findByTestFunction = function (list, testFunction) {
  var length = list.length;
  for (var i = 0; i < length; i++) {
    var item = list[i];
    if (testFunction(item)) {
      return item;
    }
  }

  return null;
};

module.exports = ObjectFinder;
