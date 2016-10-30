<template>
    <div class="left-menu">
        <el-menu default-active="2" class="el-menu-vertical-demo" router="true">
            <el-submenu index="bar">
                <template slot="title"><i class="el-icon-message"></i>导航一</template>
                <el-menu-item-group title="分组一">
                    <el-menu-item index="bar">选项1</el-menu-item>
                    <el-menu-item index="foo">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="foo">选项3</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="bar"><i class="el-icon-menu"></i>导航二</el-menu-item>
            <el-menu-item index="foo"><i class="el-icon-setting"></i>导航三</el-menu-item>
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
        components:{
        }
    }

</script>
