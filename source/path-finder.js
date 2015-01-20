var Hash = require('./hash');

function PathFinder() { }

// Remove the path and its invert
var removeEntirePath = function (paths, path) {
  return paths.filter(function (_path) {
    return !path.isEqual(_path) && !path.isEqual(_path.getInvert());
  });
};

// Route sorter
var sorter = function (a, b) {
  return a.distance - b.distance;
};

// Find paths which has exit1 equal to start node
PathFinder.findPathsWhichHasStartingNode = function (paths, start) {
  return paths.filter(function (path) {
    return path.exit1 === start;
  });
};

// Find paths which has exit2 equal to start node
PathFinder.findPathsWhichHasEndingNode = function (paths, start) {
  return paths.filter(function (path) {
    return path.exit2 === start;
  });
};

// Return route node of shortest path
// each _paths item must implement exit1, exit2, getDistance()
PathFinder.search = function (a, b, _paths) {
  if (a === b) {
    // Same node
    return new Hash(0, []);
  }

  var paths = _paths.slice(0); // Clone

  var nodes = PathFinder.findPathsWhichHasStartingNode(paths, a).map(function (node) {
    return new Hash(node.getDistance(), [node]);
  }).sort(sorter);

  while (nodes.length !== 0 && paths.length !== 0) {
    // Consider the cheapest one
    var current = nodes.shift();

    // Check if we reach the destination
    var currentRoute = current.getLastRoute();
    if (currentRoute.exit2 === b) {
      return current;
    }

    // Remove visited path
    paths = removeEntirePath(paths, currentRoute);

    // Populate its neighbor
    var neighbors = PathFinder.findPathsWhichHasStartingNode(paths, currentRoute.exit2);
    nodes = nodes.concat(neighbors.map(function (node) {
      return new Hash(current.distance + node.getDistance(), current.routes.concat(node));
    })).sort(sorter);
  }

  return null;
};

module.exports = PathFinder;
