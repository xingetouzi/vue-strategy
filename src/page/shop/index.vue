<template>
    <div>
        <div>这是商城</div>
    </div>
</template>
<style>

</style>
<script type="text/babel">
    import {purchase_bill,login} from '../../service/getData';
    export default{
        mounted(){ //挂载后执行
            this.initData();
            this.login();
        },
        methods: {
            async initData(){
                let res = await purchase_bill({"tsFilter": 0, "bsFilter": 0});
                console.log(res);
            },
            async login(){
                let res = await login();
                console.log(res);
            }
        }
    }

</script>
