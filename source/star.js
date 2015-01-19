function Star(id) {
  this.id = id;
}

// Number
Star.prototype.id = null

// Return readable name
Star.prototype.getReadableName = function () {
  return '\'' + this.id.toUpperCase() + '\'';
};

// Parse list of ids to stars
Star.parse = function (list) {
  return list.map(function (id) {
    return new Star(id);
  });
};

module.exports = Star;
