const functions = require('firebase-functions');
const SkyService = require('./services/blackbaud/SkyService')

exports.blackbaud = functions.https.onRequest((request, response) => {
  response.send("run a BB thing...")
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
