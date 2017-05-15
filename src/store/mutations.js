/**
 * Created by spider on 5/14/17.
 */
import {GET_USERINFO} from './mutation_type'

export default {
  // 获取用户信息存入vuex
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    };
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
      let validity = 30
      let now = new Date()
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
      document.cookie = 'USERID=' + info.user_id + ';expires=' + now.toGMTString()
      document.cookie = 'SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw' + ';expires=' + now.toGMTString()
    } else {
      state.userInfo = null
    }
  }
}
