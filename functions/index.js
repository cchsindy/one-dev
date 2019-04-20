const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const FirestoreService = require('./services/firebase/FirestoreService')
const SkyService = require('./services/blackbaud/SkyService')

// FIRESTORE TRIGGER
// exports.skyRequests = functions.firestore
//   .document('skyRequests/{id}')
//   .onCreate((snap, context) => {
//     const data = snap.data()
//     console.log(context.params.id, data)
//   })

// DIRECT CALL
exports.direct = functions.https.onCall((data, context) => {
  return {
    status: 'success'
  }
})

// HTTPS REQUEST
exports.blackbaud = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const fs = new FirestoreService
      const token = await fs.loadSkyToken()
      const ss = new SkyService(token)
      let con = await ss.getConstituent(150)
      if (!con) {
        const newToken = await ss.refreshToken()
        if (newToken) {
          await fs.saveSkyToken(newToken)
          con = await ss.getConstituent(150)
        } 
      }
      if (!con) con = 'Unable to get constituent.'
      response.send(con)
    } catch (err) {
      response.send(err)
    }
  })
})
