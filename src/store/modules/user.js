const state = {
  error: null,
  roles: null,
  user: null
}

const getters = {
  error(state) {
    return state.error
  },
  roles(state) {
    return state.roles
  },
  user(state) {
    return state.user
  }
}

const actions = {
  clearError({ commit }) {
    commit('CLEAR_ERROR')
  },
  googleSignin({ rootState }) {
    rootState.fbAuth.signInWithPopup(rootState.fbGoogle)
      .then(result => {
        if (result.additionalUserInfo.isNewUser) {
          const docRef = rootState.fbStore.doc('users/' + result.user.uid)
          let doc = {
            displayName: 'Brad Spencer',
            email: 'bradspencer@covenantchristian.org',
            roles: [
              'Admin'
            ]
          }
          docRef.set(doc)
        }
      })
  },
  initAuth({ commit, rootState }) {
    rootState.fbAuth.onAuthStateChanged(user => {
      if (user) {
        commit('SET_USER', user.email)
        const docRef = rootState.fbStore.doc('users/' + user.uid)
        docRef.onSnapshot(doc => {
          if (doc && doc.exists) {
            const data = doc.data()
            commit('SET_ROLES', data.roles)
          }
        })
      } else {
        commit('CLEAR_USER')
        commit('CLEAR_ROLES')
      }
    })
  },
  logoutUser({ commit, rootState }) {
    rootState.fbAuth.signOut().catch(error => {
      commit('SET_ERROR', error)
    })
  },
  setError({ commit }, payload) {
    commit('SET_ERROR', payload)
  }
}

const mutations = {
  CLEAR_ERROR(state) {
    state.error = null
  },
  CLEAR_ROLES(state) {
    state.roles = null
  },
  CLEAR_USER(state) {
    state.user = null
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
