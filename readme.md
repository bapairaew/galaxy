## Programming assignment

Implementation of ["GOD" Talent Programming Season #1](https://thehub.thomsonreuters.com/docs/DOC-918101?utm_medium=spotlight&utm_campaign=search&utm_source=results)

### Prerequisite
- [Node.js](http://nodejs.org/)

### The Assignment
To see the result of [the assignment](https://thehub.thomsonreuters.com/docs/DOC-918101?utm_medium=spotlight&utm_campaign=search&utm_source=results) please use the following command,

`node run`

which should show

`'A'->10->30->20->'G'`

### Build for Chrome console

You have to install `node_modoules` dependencies by run this command.

`npm install`

Once it is done you can now build a html page for test on Chrome browser by running the following command.

`node chrome/build.js`

The result will be generated to `build/index.html`.

### Test

`node test`

### Usage
`node route <galaxy.json> <start> <end>`

The routing string from `<start>` star to `<end>` star of `<galaxy.json>` galaxy will be display in console.

#### Example
`node route andromeda.json a g`

will result

`'A'->10->30->20->'G'`

#### Galaxy.json
You can define you own galaxy with the following json format.

```javascript
// Please remove comment before using it.
{
  "stars": [ "earth", "mars", "neptune", "moon" ], // List of stars' ids
  "colonies": [                                    // List of colonies
    {
      "id": "shangri-la",                          // Colony's id
      "stars": [ "earth" ],                        // Member (star's id)
      "cost": 10                                   // Cost of entering the colony
    }, {
      "id": "artemis",
      "stars": [ "moon" ],
      "cost": 30
    }, {
      "id": "heliopolis",
      "stars": [ "mars", "neptune" ],
      "cost": 50
    }
  ],
  "portals": [                                     // List of portals between colonies
    {
      "exit1": "shangri-la",                       // Exit #1 colony's id
      "exit2": "artemis",                          // Exit #2 colony's id
      "bidirectional": true                        // This portal is bidirectional
    }, {
      "exit1": "shangri-la",
      "exit2": "heliopolis",
      "bidirectional": false                      // This portal is one way
    }, {
      "exit1": "artemis",
      "exit2": "heliopolis",
      "bidirectional": true
    }
  ]
}
```

Otherwise, you can take a look of a provided example `andromeda.json` which is generated from [the assignment](https://thehub.thomsonreuters.com/docs/DOC-918101?utm_medium=spotlight&utm_campaign=search&utm_source=results).

![andromeda](https://github.com/bapairaew/galaxy/blob/master/star.PNG)
