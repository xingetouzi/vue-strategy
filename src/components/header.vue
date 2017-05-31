<template>
  <nav class="header">
    <div class="nav-left">
      <div class="nav-logo">
        <a href="#/">
          <img src="http://ohg8bcao5.bkt.clouddn.com/img/brand.png">
        </a>
      </div>
    </div>
    <!--<div class="nav-title">策略选购平台</div>-->
    <div class="nav-setting">
      <ul>
        <li v-if="userInfo.isLogin" @click='logout'>登出</li>
      </ul>
      <div class="header-name">{{userInfo.userName}}</div>
    </div>
  </nav>
</template>

<script type="text/babel">
  import {mapState, mapActions} from 'vuex'
  export default{
    data () {
      return {}
    },
    computed: mapState([
      'userInfo'
    ]),
    methods: {
      ...mapActions([
        'logout' // 映射 this.increment() 为 this.$store.dispatch('increment')
      ]),
      logout(){
        console.log('logout')
        this.logout()
      }
    }
  }

</script>

<style lang="scss">
  //必须要加~才行
  @import "~css/variable.scss";

  .header {
    height: $header-height;
    overflow: hidden;
    background-color: $primary-color;
    padding: 0 15px;
    .nav-left {
      height: 100%;
      float: left;
    }
    .nav-logo, .nav-title {
      display: table-cell;
      height: $header-height;
      color: white;
      vertical-align: middle;
    }
    .nav-logo {
      img {
        height: 32px;
        width: 136px;
      }
    }
    .nav-title {
      font-size: 20px;
    }
    .nav-setting {
      height: 100%;
      float: right;
      > ul {
        list-style: none;
        margin: 0;
        padding: 0;
        color: white;
        display: inline-block;
      }
      li {
        height: 100%;
        line-height: $header-height;
        padding: 0 10px;
        display: inline-block;
      }
      li:hover {
        background-color: darken($primary-color, 10%);
        cursor: pointer;
      }
      .header-name {
        display: inline-block;
        color: white;
      }
    }
  }
</style>

