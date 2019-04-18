const functions = require('firebase-functions');
const SkyService = require('./services/blackbaud/SkyService')
// does requiring the SkyService class automatically instantiate it? NO!

exports.blackbaud = functions.https.onRequest((request, response) => {
  const ss = new SkyService
  response.send(ss.isRunning())
})
