const functions = require('firebase-functions');
const SkyService = require('./services/blackbaud/SkyService')

exports.blackbaud = functions.https.onRequest((request, response) => {
  response.send("run a BB thing...")
})
