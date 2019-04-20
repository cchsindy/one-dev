import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/store/modules/firebase'
import announcements from '@/store/modules/announcements'
import blackbaud from '@/store/modules/blackbaud'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    announcements,
    blackbaud
  },
  state: {
    fbStore: firebase.myStore
  }
})
