const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
.then((passes) => {
  humanReadablePasses(passes)
})
.catch((error) => {
  console.log("That didn't work :/", error.message);
})

const humanReadablePasses = passes => {
  for (const pass of passes) {
    const datetime = new Date(0); // how to use constructor
    datetime.setUTCseconds = pass.risetime;
    const duration = pass.duration;

    console.log(`You can see the ISS on ${datetime} for ${duration} seconds!`);

  }
};