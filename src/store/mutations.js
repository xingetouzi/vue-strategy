/**
 * Created by spider on 5/14/17.
 */
import {GET_USERINFO, SET_USERINFO, LOGOUT} from './mutation_type'

export default {
  // 获取用户信息存入vuex
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
  },
  [SET_USERINFO] (state, info) {
    state.userInfo = {}
    state.userInfo.isLogin = true
    state.userInfo.userName = info.userName
  },
  [LOGOUT] (state, info) {
    state.userInfo = {}
    state.userInfo.isLogin = false
    state.userInfo.userName = ''
  }
}
