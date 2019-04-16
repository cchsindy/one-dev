import Vue from 'vue'
import Vuex from 'vuex'
import announcements from '@/store/modules/announcements'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    announcements
  },
  state: {
  }
})
