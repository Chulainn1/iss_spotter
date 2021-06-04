//It will require and run our main fetch function.

const { fetchMyIP, fetchCoordByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  humanReadablePasses(passes);
});

const humanReadablePasses = passes => {
  for (const pass of passes) {
    const datetime = new Date(0); // how to use constructor
    datetime.setUTCseconds = pass.risetime;
    const duration = pass.duration;

    console.log(`You can see the ISS on ${datetime} for ${duration} seconds! Suggested camera settings: ISO - 400, Aperture - f/5.6,  1 min exposure.`);

  }
};


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });



// fetchCoordByIP("142.59.97.112" ,(error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Heres the coordinates:", coords);
// });

// const myCoords = { latitude: '49.27670', longitude: '-123.13000' };

// fetchISSFlyOverTimes(myCoords ,(error, passes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! See the ISS during these passes:", passes);
// });

