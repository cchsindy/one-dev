const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const CanvasService = require('./services/canvas/CanvasService')
const FirestoreService = require('./services/firebase/FirestoreService')
const OnService = require('./services/blackbaud/OnService')
const SkyService = require('./services/blackbaud/SkyService')

// FIRESTORE TRIGGER
// exports.skyRequests = functions.firestore
//   .document('skyRequests/{id}')
//   .onCreate((snap, context) => {
//     const data = snap.data()
//     console.log(context.params.id, data)
//   })

// DIRECT CALL
exports.canvas = functions.https.onCall(async (data, context) => {
  const cs = new CanvasService
  const user = await cs.getUser(data.name)
  console.log(user)
  const grades = await cs.getGrades(user[0].id, 86)
  // const sections = await cs.getCourseSections(data.courseId)
  // const courses = await cs.getUserCourses(data.UserId)
  return grades
})

exports.canvasFetch = functions.https.onCall(async (data, context) => {
  const cs = new CanvasService
  const response = await cs.fetchData(data.url, data.params)
  return response
})

exports.canvasDelete = functions.https.onCall(async (data, context) => {
  const cs = new CanvasService
  const response = await cs.deleteData(data.url, data.params)
  return response
})

exports.onapi = functions.https.onCall(async (data, context) => {
  try {
    const fs = new FirestoreService
    const token = await fs.loadOnToken()
    const os = new OnService(token)
    let res = await os.fetchData(data.url, data.params)
    if (!res) {
      const newToken = await os.refreshToken()
      if (newToken) {
        await fs.saveOnToken(newToken)
        res = await os.fetchData(data.url, data.params)
      } 
    }
    if (!res) res = 'Unable to fetch data.'
    return res
  } catch (err) {
    return err
  }
})

exports.skyapi = functions.https.onCall(async (data, context) => {
  try {
    const fs = new FirestoreService
    const token = await fs.loadSkyToken(data.product)
    const ss = new SkyService(token)
    let res = await ss.getData(data.product + '/v1/' + data.url, data.params)
    if (!res) {
      const newToken = await ss.refreshToken()
      if (newToken) {
        await fs.saveSkyToken(data.product, newToken)
        res = await ss.getData(data.product + '/v1/' + data.url, data.params)
      } 
    }
    if (!res) res = 'Unable to get data.'
    return res
  } catch (err) {
    return err
  }
})

// HTTPS REQUEST
exports.blackbaud = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    try {
      const fs = new FirestoreService
      const token = await fs.loadSkyToken(request.product)
      const ss = new SkyService(token)
      let con = await ss.getConstituent(150)
      if (!con) {
        const newToken = await ss.refreshToken()
        if (newToken) {
          await fs.saveSkyToken(request.product, newToken)
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
