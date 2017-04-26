<template>
    <div>
        <div>这是商城</div>
    </div>
</template>
<style>

</style>
<script type="text/babel">
    import {purchase_bill} from '../../service/getData';
    export default{
        mounted(){ //挂载后执行
            this.initData();
        },
        methods: {
            async initData(){
                let res = await purchase_bill({"tsFilter": 0, "bsFilter": 0});
                console.log(res);
            }
        }
    }

</script>
