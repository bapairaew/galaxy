var Galaxy = require('./source/galaxy');
var Colony = require('./source/colony');
var Portal = require('./source/portal');
var Star = require('./source/star');

var galaxy = new Galaxy();

galaxy.addStars([
  new Star('a'),
  new Star('b'),
  new Star('c'),
  new Star('d'),
  new Star('e'),
  new Star('f'),
  new Star('g'),
  new Star('h'),
  new Star('i'),
  new Star('j'),
  new Star('k'),
  new Star('l'),
  new Star('m'),
  new Star('n'),
  new Star('o'),
  new Star('p'),
  new Star('q'),
  new Star('r')
]);

// NOTE: for shorter code we skip the assigning each star to dedicated variable
var colonies = [
  new Colony(0, [galaxy.getStarById('a'), galaxy.getStarById('b')], 10),
  new Colony(1, [galaxy.getStarById('c'), galaxy.getStarById('d'), galaxy.getStarById('e')], 30),
  new Colony(2, [galaxy.getStarById('g'), galaxy.getStarById('f')], 20),
  new Colony(3, [galaxy.getStarById('i'), galaxy.getStarById('j'), galaxy.getStarById('h')], 15),
  new Colony(4, [galaxy.getStarById('k')], 5),
  new Colony(5, [galaxy.getStarById('l'), galaxy.getStarById('m')], 3),
  new Colony(6, [galaxy.getStarById('n'), galaxy.getStarById('o'), galaxy.getStarById('q'), galaxy.getStarById('r')], 2)
];

galaxy.addColonies(colonies);

galaxy.addPortals(Portal.bidirection(colonies[0], colonies[1]).concat(
  Portal.bidirection(colonies[1], colonies[2])).concat(
  Portal.bidirection(colonies[2], colonies[3])).concat(
  Portal.bidirection(colonies[3], colonies[4])).concat(
  Portal.bidirection(colonies[4], colonies[5])).concat(
  Portal.bidirection(colonies[5], colonies[6])));

console.log(galaxy.routeString(galaxy.getStarById('a'), galaxy.getStarById('g')));
