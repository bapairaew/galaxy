var Galaxy = require('./source/galaxy');
var fs = require('fs');

// EXAMPLE: node route andromeda.json a g
var filePath = process.argv[2];
var start = process.argv[3];
var destination = process.argv[4];

var json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
var galaxy = Galaxy.parse(json);

console.log(galaxy.routeString(galaxy.getDoorById(start.toLowerCase()), galaxy.getDoorById(destination.toLowerCase())));
