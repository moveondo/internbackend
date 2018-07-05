import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    FunctionUrl: '',
    isShowAsideMenu: false,
    functionList: [], // 菜单栏数组
    locale: 'in'
  },
  mutations: {
    ChangeFunction(state, data) {
      state.FunctionUrl = data;
      localStorage.setItem("FunctionUrl", JSON.stringify(state.FunctionUrl));
    },
    changeLocale(state, locale) {
      state.locale = locale
    },
    setFunctionList(state, functionList) {
      state.functionList = functionList
    }
  },
  getters: {
    getFunction: state => {
      state.FunctionUrl = localStorage.getItem("FunctionUrl");
      return { ...state.FunctionUrl
      };
    },
    geturl: state => {
      state.FunctionUrl = localStorage.getItem("FunctionUrl");

      return state.FunctionUrl;
    },
    getLocale: state => state.locate
  },
  actions: {
    changeLocale({
      commit
    }, locale) {
      commit('changeLocale', locale)
    },
    setFunctionList({
      commit
    }, functionList) {
      commit('setFunctionList', functionList)
    }
  }
})

export default store
