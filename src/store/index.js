import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    year: '',
    month: '',
    categorys: [],
    cards: [],
    peoples: [],
    datasApi: [],
    bankAndCardRelationship: {},
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },

    ADD_DATA(state, value) {
      state.datasApi = value
    },

    ADD_DATA_CATEGORYS(state, value) {
      if(!state.categorys.includes(value) && value !== undefined) {
        state.categorys.push(value)
      } else {
        if(!state.categorys.includes("Novo")) {
          state.categorys.push("Novo")
        }
      }
    },

    ADD_NAMES_PEOPLES(state, value) {
      if(value != "cartao" && value != "cor" && value != "id") {
        if(!state.peoples.includes(value)) {
          state.peoples.push(value)
        }
      } else {
        if(!state.peoples.includes("Novo")) {
          state.peoples.push("Novo")
        }
      }
    },

    ADD_MY_CARDS(state, value) {
      if(!state.cards.includes(value)) {
        state.cards.push(value)
      }
    },

    ADD_RELATIONSHIP(state, value) {
      state.bankAndCardRelationship[value[0]] = value[1]
    },

    RESET_DATAS(state) {
      state.user = {
        loggedIn: false,
        data: null
      },
      state.year = '',
      state.month = '',
      state.categorys = [],
      state.cards = [],
      state.peoples = [],
      state.datasApi = [],
      state.bankAndCardRelationship = {}
    },
  },

  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);

      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });

      } else {
        commit("SET_USER", null);
        
      }
    },

    addDatasApi({ commit }, data) {
      commit('ADD_DATA', data)
    },

    addDatasCategorys({ commit }, nameCategory) {
      commit('ADD_DATA_CATEGORYS', nameCategory)
    },

    addNamesPeoples({ commit }, namesPeople) {
      commit('ADD_NAMES_PEOPLES', namesPeople)
    },

    addMyCards({ commit }, myCards) {
      commit('ADD_MY_CARDS', myCards)
    },

    addRelationshipCardAndBank({ commit }, relationship) {
      commit('ADD_RELATIONSHIP', relationship)
    },

    resetDatas({ commit }) {
      commit('RESET_DATAS')
    },
  },

  modules: {
  }
})
