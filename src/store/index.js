import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/store/modules/firebase'
import announcements from '@/store/modules/announcements'
import blackbaud from '@/store/modules/blackbaud'
import canvas from '@/store/modules/canvas'
import user from '@/store/modules/user'
import table from '@/store/modules/table.json'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    announcements,
    blackbaud,
    canvas,
    user
  },
  state: {
    fbAuth: firebase.myAuth,
    fbFunctions: firebase.myFunctions,
    fbGoogle: firebase.myGoogle,
    fbStore: firebase.myStore,
    table
  }
})
