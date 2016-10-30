import Vue from 'vue'
import VueRouter from 'vue-router'
var VueResource = require('vue-resource')
import Element from 'element-ui'
import Home from './js/home/home.vue'
import header from './components/header.vue';
import leftMenu from './components/leftMenu.vue';
import './css/common.css'

// 社区贡献了一个插件 vue-resource，提供一种容易的方式与 RESTful APIs 配合。
Vue.use(VueResource)
Vue.use(Element) 

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

// 3. Create the router
const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Home},
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar}
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router,
  components: {
    "v-header": header,
    "left-menu": leftMenu
  },
  template: `
    <div id="app">
    <v-header></v-header>
    <left-menu></left-menu>
      <div class="main">
        <router-view class="view"></router-view>
      </div>
    </div>
  `
}).$mount('#app')


//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// });
