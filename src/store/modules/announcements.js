const state = {
  announcements: []
}

const getters = {

}

const actions = {
  fetchAnnouncements({ commit, rootState }) {
    commit('CLEAR_ANNOUNCEMENTS')
    const ref = rootState.fbStore.collection('announcements')
    ref.orderBy('toDate', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          commit('ADD_ANNOUNCEMENT', { id: change.doc.id, ...change.doc.data() })
        }
      })
    })
  }
}

const mutations = {
  ADD_ANNOUNCEMENT(state, announcement) {
    state.announcements.push(announcement)
  },
  CLEAR_ANNOUNCEMENTS(state) {
    state.announcements = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
