<template>
  <div>
    <head-top></head-top>
    <left-menu v-if="userInfo.isLogin"></left-menu>
    <div class="main">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>
<style lang="scss">
  .main{
    padding: 20px 20px;
  }
</style>

<script type="text/babel">
  import {mapState, mapMutations, mapActions} from 'vuex'
  import headTop from './components/header'
  import leftMenu from './components/leftMenu.vue'
  export default {
    data(){
      return {}
    },
    components: {
      headTop,
      leftMenu
    },
    mounted(){
    },
    methods: {
      ...mapMutations([
        'SET_USERINFO'
      ]),
      ...mapActions([
        'setUserInfo' // 映射 this.increment() 为 this.$store.dispatch('increment')
      ])
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    }
  }
</script>
