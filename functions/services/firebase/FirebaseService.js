module.exports = class FirebaseService {
  constructor() {
    const admin = require('firebase-admin')
    const serviceAccount = require('./serviceAccountKey.json')
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://my-covenant-dev.firebaseio.com'
      })
    }
    this.myStore = admin.firestore()
  }

  async loadSkyToken() {
    try {
      const doc = await this.myStore
        .doc('skyTokens/re')
        .get()
      return doc.data()
    } catch (err) {
      return err
    }
  }

  async saveSkyToken(token) {
    try {
      await this.myStore
        .doc('skyTokens/re')
        .set(token)
      return 'saved'
    } catch (err) {
      return err
    }
  }
}
