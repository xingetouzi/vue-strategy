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
  console.log(headTop)
  export default {
    components: {
      headTop,
      leftMenu
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    }
  }
</script>
