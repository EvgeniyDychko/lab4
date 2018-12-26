/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {SUCCESS, FETCH_NOTES, ADD_NOTE, DELETE_NOTE, NOTES} from './types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    [FETCH_NOTES + SUCCESS](state, payload) {
      state.notes = payload.reverse()
    },
    [ADD_NOTE + SUCCESS](state, payload) {
      state.notes.unshift(payload)
    },
    [DELETE_NOTE + SUCCESS](state, payload) {
      state.notes = state.notes.filter(item => item.messageID !== payload)
    }
  },
  actions: {
    async [FETCH_NOTES]({commit}) {
      try {
        let res = await axios.get('https://apeps.kiev.ua/api/getMessages')

        commit(FETCH_NOTES + SUCCESS, res.data)
      } catch (e) {
        console.log(e)
      }
    },
    async [ADD_NOTE]({commit}, payload) {
      try {
        let res = await axios({
          method: 'post',
          url: 'https://apeps.kiev.ua/api/addMessage',
          data: new URLSearchParams(payload)
        })

        commit(ADD_NOTE + SUCCESS, {...payload, messageID: res.data})
      } catch (e) {
        console.log(e)
      }
    },
    async [DELETE_NOTE]({commit}, payload) {
      const data = new FormData()
      data.append('messageID', payload)

      try {
        await axios.post('https://apeps.kiev.ua/api/deleteMessage', data)

        commit(DELETE_NOTE + SUCCESS, payload)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    [NOTES](state) {
      return state.notes
    }
  }
})

export default store
