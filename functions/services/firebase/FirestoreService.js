module.exports = class FirestoreService {
  constructor() {
    const admin = require('firebase-admin')
    const functions = require('firebase-functions')
    try {
      admin.initializeApp(functions.config().firebase)
    } catch (err) {
      console.log(err)
    }
    this.myStore = admin.firestore()
  }

  async loadOnToken() {
    try {
      const doc = await this.myStore
        .doc('onTokens/token')
        .get()
      return doc.data()
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async loadSkyToken(product) {
    try {
      const doc = await this.myStore
        .doc(`skyTokens/${product}`)
        .get()
      return doc.data()
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async saveOnToken(token) {
    try {
      await this.myStore
        .doc('onTokens/token')
        .set(token)
      return 'saved'
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async saveSkyToken(product, token) {
    try {
      await this.myStore
        .doc(`skyTokens/${product}`)
        .set(token)
      return 'saved'
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}
