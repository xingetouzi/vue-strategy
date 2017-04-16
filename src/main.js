import Vue from 'vue'
import VueRouter from 'vue-router'
var VueResource = require('vue-resource');
import routes from './router'
import Element from 'element-ui'
import '../theme/index.css'
import './css/common.scss'
import './css/normalize.css'

// 社区贡献了一个插件 vue-resource，提供一种容易的方式与 RESTful APIs 配合。
Vue.use(VueResource);
Vue.use(Element);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production'
});

new Vue({
  router,
  // store,
}).$mount('#app');
