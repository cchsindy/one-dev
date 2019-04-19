import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './config'

const myApp = firebase.initializeApp(config)
const myAuth = myApp.auth()
const myGoogle = new firebase.auth.GoogleAuthProvider()
const myStore = myApp.firestore()
myStore.settings({
  timestampsInSnapshots: true
})

export { myAuth, myGoogle, myStore }
