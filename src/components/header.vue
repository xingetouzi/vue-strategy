<template>
    <div class="header">
        <div class="line"></div>
        <el-menu default-active="1"
                 class="el-menu-demo"
                 mode="horizontal"
                 router = "true"
        >
            <el-menu-item index="bar">处理中心</el-menu-item>
            <el-submenu index="foo">
                <template slot="title">我的工作台</template>
                <el-menu-item index="bar">选项1</el-menu-item>
                <el-menu-item index="foo">选项2</el-menu-item>
                <el-menu-item index="bar">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="foo">订单管理</el-menu-item>
        </el-menu>
    </div>
</template>
<style>

</style>
<script>
   export default{
        data(){
            return{
                msg:'hello vue'
            }
        },

    }
</script>
