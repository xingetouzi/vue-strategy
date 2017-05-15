<template>
  <div>
    <div>这是商城</div>
  </div>
</template>
<style>

</style>
<script type="text/babel">
  import {purchaseBill, login} from '../../service/getData'
  export default{
    mounted () { // 挂载后执行
      this.initData()
    },
    methods: {
      async initData () {
        let res = await purchaseBill({'tsFilter': 0, 'bsFilter': 0})
        console.log(res)
      },
      async login () {
        let res = await login()
        console.log(res)
      }
    }
  }

</script>
