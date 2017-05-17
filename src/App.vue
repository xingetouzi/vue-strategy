<template>
  <div>
    <head-top></head-top>
    <left-menu></left-menu>
    <div class="main">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<style>

</style>

<script type="text/babel">
  import {mapState} from 'vuex'
  import headTop from './components/header'
  import leftMenu from './components/leftMenu.vue'
  export default {
    data(){
      return {
        isLogin: true
      }
    },
    components: {
      headTop,
      leftMenu
    },
    mounted(){
      this.test()
      this.isLogin = this.userInfo.isLogin
    },
    methods: {
      test(){
        console.log(this.userInfo)
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    }
  }
</script>
