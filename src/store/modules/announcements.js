import Vue from 'vue'

const state = {
  announcements: [],
  cachedAnnouncements: [],
  notifications: [],
  cachedNotifications: []
}

const getters = {

}

const actions = {
  addAnnouncement({ commit }, payload) {
    commit('ADD_ANNOUNCEMENT', payload)
  },
  addNotification({ commit }, payload) {
    commit('ADD_NOTIFICATION', payload)
  },
  cancelAnnouncement({ commit }, payload) {
    commit('CANCEL_ANNOUNCEMENT', payload)
  },
  cancelNotification({ commit }, payload) {
    commit('CANCEL_NOTIFICATION', payload)
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
  fetchNotifications({ commit, rootState }) {
    const ref = rootState.fbStore.collection('notifications')
    ref.orderBy('until', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          commit('ADD_NOTIFICATION', { id: change.doc.id, ...change.doc.data() })
        } else if (change.type === 'modified') {
          commit('MODIFY_NOTIFICATION', { id: change.doc.id, ...change.doc.data() })
        } else if (change.type === 'removed') {
          commit('REMOVE_NOTIFICATION', change.doc.id)
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
  removeNotification({ commit, rootState }, payload) {
    if (payload.substring(0, 3) !== 'NEW') {
      rootState.fbStore
        .collection('notifications')
        .doc(payload)
        .delete()
    } else {
      commit('REMOVE_NOTIFICATION', payload)
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
  },
  saveNotification({ commit, state, rootState }, payload) {
    const notification = JSON.parse(
      JSON.stringify(state.notifications.find(n => n.id === payload))
    )
    const id = notification.id
    delete notification.id
    if (id.substring(0, 3) === 'NEW') {
      state.notifications = state.notifications.filter(n => n.id !== id)
      rootState.fbStore
        .collection('notifications')
        .add(notification)
        .then(commit('SAVE_NOTIFICATION'))
    } else {
      rootState.fbStore
        .collection('notifications')
        .doc(id)
        .set(notification)
        .then(commit('SAVE_NOTIFICATION'))
    }
  }
}

const mutations = {
  ADD_ANNOUNCEMENT(state, announcement) {
    state.announcements.push(announcement)
    state.cachedAnnouncements.push(JSON.parse(JSON.stringify(announcement)))
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push(notification)
    state.cachedNotifications.push(JSON.parse(JSON.stringify(notification)))
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
  CANCEL_NOTIFICATION(state, notificationId) {
    if (notificationId.substring(0, 3) === 'NEW') {
      state.notifications = state.notifications.filter(n => n.id !== notificationId)
      state.cachedNotifications = state.cachedNotifications.filter(n => n.id !== notificationId)
    } else {
      const index = state.notifications.findIndex(n => {
        return n.id === notificationId
      })
      Vue.set(
        state.notifications,
        index,
        JSON.parse(JSON.stringify(state.cachedNotifications[index]))
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
  MODIFY_NOTIFICATION(state, notification) {
    const index = state.notifications.findIndex(n => {
      return n.id === notification.id
    })
    Vue.set(state.notifications, index, notification)
    state.cachedNotifications.forEach((n, i) => {
      if (n.id === notification.id) state.cachedNotifications[i] = notification
    })
  },
  REMOVE_ANNOUNCEMENT(state, announcementId) {
    state.announcements = state.announcements.filter(a => a.id !== announcementId)
    state.cachedAnnouncements = state.cachedAnnouncements.filter(a => a.id !== announcementId)
  },
  REMOVE_NOTIFICATION(state, notificationId) {
    state.notifications = state.notifications.filter(n => n.id !== notificationId)
    state.cachedNotifications = state.cachedNotifications.filter(n => n.id !== notificationId)
  },
  SAVE_ANNOUNCEMENT() {
    // commit changes
  },
  SAVE_NOTIFICATION() {
    // commit changes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
