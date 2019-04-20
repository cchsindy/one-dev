import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import config from './config'

const myApp = firebase.initializeApp(config)
const myAuth = myApp.auth()
const myFunctions = firebase.functions()
const myGoogle = new firebase.auth.GoogleAuthProvider()
const myStore = myApp.firestore()
// myStore.settings({
//   timestampsInSnapshots: true
// })

export { myAuth, myFunctions, myGoogle, myStore }
