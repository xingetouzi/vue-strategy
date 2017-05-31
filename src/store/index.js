/**
 * Created by spider on 5/14/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import Cookies from 'js-cookie'
window.Cookies = Cookies

Vue.use(Vuex)

const state = {
  userInfo: {// 用户信息
    isLogin: !!Cookies.get('csrftoken')
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
