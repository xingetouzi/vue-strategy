/**
 * Created by spider on 5/14/17.
 */
import {login} from '../service/getData'
import {GET_USERINFO} from './mutations'

export default {

  async login ({commit, state}) {
    let res = await login({})
    commit(GET_USERINFO, res)
  }
}
