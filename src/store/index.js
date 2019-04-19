import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/store/modules/firebase'
import announcements from '@/store/modules/announcements'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    announcements
  },
  state: {
    fbStore: firebase.myStore
  }
})
