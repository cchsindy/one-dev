const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const FirebaseService = require('./services/firebase/FirebaseService')
const SkyService = require('./services/blackbaud/SkyService')

// exports.skyRequests = functions.firestore
//   .document('skyRequests/{id}')
//   .onCreate((snap, context) => {
//     const data = snap.data()
//     console.log(context.params.id, data)
//   })

exports.blackbaud = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const fbs = new FirebaseService
      const token = await fbs.loadSkyToken()
      const ss = new SkyService(token)
      let con = await ss.getConstituent(150)
      if (con === null) {
        const newToken = await ss.refreshToken()
        if (newToken) {
          await fbs.saveSkyToken(newToken)
          con = await ss.getConstituent(150)
        } 
      }
      if (con === null) con = 'Unable to get constituent.'
      response.send(con)
    } catch (err) {
      response.send(err)
    }
  })
})
