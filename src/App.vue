<template>
  <div>
    <head-top></head-top>
    <left-menu v-if="userInfo.isLogin"></left-menu>
    <div class="main">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<style>

</style>

<script type="text/babel">
  import {mapState, mapMutations, mapActions} from 'vuex'
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
      ...mapMutations([
        'SET_USERINFO'
      ]),
      ...mapActions([
        'setUserInfo' // 映射 this.increment() 为 this.$store.dispatch('increment')
      ]),
      test(){
        console.log(this.userInfo)
        this.SET_USERINFO({userName: '测试'})
        setTimeout(() => this.setUserInfo({userName: '测试'}), 2000)
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
