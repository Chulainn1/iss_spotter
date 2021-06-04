// It will contain most of the logic
// for fetching the data from each API endpoint.
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
      
    
    
  });

};

const fetchCoordByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
  
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    // const parsed = JSON.parse(body)
    // const cords = {};
    // const lat = parsed.latitude
    // const lon = parsed.longitude

    // cords.latitude = lat
    // cords.longitude = lon
    // callback(null, cords);

    const { latitude, longitude } = JSON.parse(body); // destructuring

    callback(null, { latitude, longitude });

  
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;

    callback(null, passes);

  });

  
};


const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordByIP(ip ,(error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords ,(error, passes) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(null, passes);
      });
    });
  });
};
  



module.exports = { fetchMyIP, fetchCoordByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

// https://api.ipify.org
// https://freegeoip.app/json/invalidIPHere
// https://freegeoip.app/json/
// http://api.open-notify.org/iss/v1/?lat=40.027435&lon=-105.251945