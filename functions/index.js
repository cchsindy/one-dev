const functions = require('firebase-functions');
const SkyService = require('./services/blackbaud/SkyService')

exports.blackbaud = functions.https.onRequest((request, response) => {
  const ss = new SkyService
  ss.getConstituent(100)
    .then(res => {
      response.send(res)
      return
    })
    .catch(err => {
      response.send(err)
    })
})
