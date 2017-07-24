import Vue from 'vue';
import VueRouter from 'vue-router';
// let VueResource = require('vue-resource')
import routes from './router';
import store from './store/index';
import Element from 'element-ui';
import '../theme/index.css';
import './css/common.scss';
import './css/normalize.css';

// 社区贡献了一个插件 vue-resource，提供一种容易的方式与 RESTful APIs 配合。
// Vue.use(VueResource)
Vue.use(Element);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
});

// 页面刷新时，重新赋值token
/*
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
})
*/

new Vue({
  router,
  store
}).$mount('#app');
