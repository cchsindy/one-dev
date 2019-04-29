import Vue from 'vue'

const state = {
  announcements: [],
  cachedAnnouncements: []
}

const getters = {

}

const actions = {
  addAnnouncement({ commit }, payload) {
    commit('ADD_ANNOUNCEMENT', payload)
  },
  cancelAnnouncement({ commit }, payload) {
    commit('CANCEL_ANNOUNCEMENT', payload)
  },
  fetchAnnouncements({ commit, rootState }) {
    const ref = rootState.fbStore.collection('announcements')
    ref.orderBy('toDate', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          commit('ADD_ANNOUNCEMENT', { id: change.doc.id, ...change.doc.data() })
        } else if (change.type === 'modified') {
          commit('MODIFY_ANNOUNCEMENT', { id: change.doc.id, ...change.doc.data() })
        } else if (change.type === 'removed') {
          commit('REMOVE_ANNOUNCEMENT', change.doc.id)
        }
      })
    })
  },
  removeAnnouncement({ commit, rootState }, payload) {
    if (payload.substring(0, 3) !== 'NEW') {
      rootState.fbStore
        .collection('announcements')
        .doc(payload)
        .delete()
    } else {
      commit('REMOVE_ANNOUNCEMENT', payload)
    }
  },
  saveAnnouncement({ commit, state, rootState }, payload) {
    const announcement = JSON.parse(
      JSON.stringify(state.announcements.find(a => a.id === payload))
    )
    const id = announcement.id
    delete announcement.id
    if (id.substring(0, 3) === 'NEW') {
      state.announcements = state.announcements.filter(a => a.id !== id)
      rootState.fbStore
        .collection('announcements')
        .add(announcement)
        .then(commit('SAVE_ANNOUNCEMENT'))
    } else {
      rootState.fbStore
        .collection('announcements')
        .doc(id)
        .set(announcement)
        .then(commit('SAVE_ANNOUNCEMENT'))
    }
  }
}

const mutations = {
  ADD_ANNOUNCEMENT(state, announcement) {
    state.announcements.push(announcement)
    state.cachedAnnouncements.push(JSON.parse(JSON.stringify(announcement)))
  },
  CANCEL_ANNOUNCEMENT(state, announcementId) {
    if (announcementId.substring(0, 3) === 'NEW') {
      state.announcements = state.announcements.filter(a => a.id !== announcementId)
      state.cachedAnnouncements = state.cachedAnnouncements.filter(a => a.id !== announcementId)
    } else {
      const index = state.announcements.findIndex(a => {
        return a.id === announcementId
      })
      Vue.set(
        state.announcements,
        index,
        JSON.parse(JSON.stringify(state.cachedAnnouncements[index]))
      )
    }
  },
  MODIFY_ANNOUNCEMENT(state, announcement) {
    const index = state.announcements.findIndex(a => {
      return a.id === announcement.id
    })
    Vue.set(state.announcements, index, announcement)
    state.cachedAnnouncements.forEach((a, i) => {
      if (a.id === announcement.id) state.cachedAnnouncements[i] = announcement
    })
  },
  REMOVE_ANNOUNCEMENT(state, announcementId) {
    state.announcements = state.announcements.filter(a => a.id !== announcementId)
    state.cachedAnnouncements = state.cachedAnnouncements.filter(a => a.id !== announcementId)
  },
  SAVE_ANNOUNCEMENT() {
    // commit changes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
