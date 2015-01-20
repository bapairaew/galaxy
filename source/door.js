function Door(id) {
  this.id = id;
}

// Number
Door.prototype.id = null

// Return readable name
Door.prototype.getReadableName = function () {
  return '\'' + this.id.toUpperCase() + '\'';
};

// Parse list of ids to doors
Door.parse = function (list) {
  return list.map(function (id) {
    return new Door(id);
  });
};

module.exports = Door;
