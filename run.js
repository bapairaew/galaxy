var Galaxy = require('./source/galaxy');
var Star = require('./source/star');
var Portal = require('./source/portal');
var Door = require('./source/door');

var galaxy = new Galaxy();

galaxy.addDoors([
  new Door('a'),
  new Door('b'),
  new Door('c'),
  new Door('d'),
  new Door('e'),
  new Door('f'),
  new Door('g'),
  new Door('h'),
  new Door('i'),
  new Door('j'),
  new Door('k'),
  new Door('l'),
  new Door('m'),
  new Door('n'),
  new Door('o'),
  new Door('p'),
  new Door('q'),
  new Door('r')
]);

// NOTE: for shorter code we skip the assigning each door to dedicated variable
var stars = [
  new Star('10', [galaxy.getDoorById('a'), galaxy.getDoorById('b')], 10),
  new Star('30', [galaxy.getDoorById('c'), galaxy.getDoorById('d'), galaxy.getDoorById('e')], 30),
  new Star('20', [galaxy.getDoorById('g'), galaxy.getDoorById('f')], 20),
  new Star('15', [galaxy.getDoorById('i'), galaxy.getDoorById('j'), galaxy.getDoorById('h')], 15),
  new Star('5', [galaxy.getDoorById('k')], 5),
  new Star('3', [galaxy.getDoorById('l'), galaxy.getDoorById('m')], 3),
  new Star('2', [galaxy.getDoorById('n'), galaxy.getDoorById('o'), galaxy.getDoorById('q'), galaxy.getDoorById('r')], 2)
];

galaxy.addStars(stars);

galaxy.addPortals(Portal.bidirection(stars[0], stars[1]).concat(
  Portal.bidirection(stars[1], stars[2])).concat(
  Portal.bidirection(stars[2], stars[3])).concat(
  Portal.bidirection(stars[3], stars[4])).concat(
  Portal.bidirection(stars[4], stars[5])).concat(
  Portal.bidirection(stars[5], stars[6])));

console.log(galaxy.routeString(galaxy.getDoorById('a'), galaxy.getDoorById('g')));

// Question #2
var newStar = new Star('17', [], 17);
var portals = Portal.bidirection(stars[2], newStar);
galaxy.addStars([newStar]);
galaxy.addPortals(portals);
var zDoor = new Door('z');
galaxy.addDoors([zDoor]);
newStar.addDoors([zDoor]);
console.log(galaxy.routeString(galaxy.getDoorById('a'), galaxy.getDoorById('z')));
galaxy.removeDoor(galaxy.getDoorById('f'));
console.log(galaxy.routeString(galaxy.getDoorById('a'), galaxy.getDoorById('f')));

// Question #3
var starToDestroy = galaxy.getStarById('5');
galaxy.removeStar(starToDestroy);
console.log(galaxy.routeString(galaxy.getDoorById('a'), galaxy.getDoorById('k')));
