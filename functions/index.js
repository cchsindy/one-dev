const functions = require('firebase-functions');
const SkyService = require('./services/blackbaud/SkyService')

exports.skyRequests = functions.firestore
  .document('skyRequests/{id}')
  .onCreate((snap, context) => {
    const data = snap.data()
    console.log(context.params.id, data)
  })

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
