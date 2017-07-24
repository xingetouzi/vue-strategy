/**
 * Created by spider on 5/14/17.
 */
// import {login} from '../service/getData'
import {SET_USERINFO, LOGOUT} from './mutation_type';
import Cookies from 'js-cookie';

export default {
  async setUserInfo({commit, state}, info) {
    // let res = await login({})
    commit(SET_USERINFO, info);
  },
  async logout ({commit, state}){
    Cookies.remove('csrftoken');
    Cookies.remove('sessionid');
    commit(LOGOUT);
  }
};
