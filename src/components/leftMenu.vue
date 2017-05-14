<template>
    <div class="left-menu">
        <el-menu default-active="2" class="el-menu-vertical-demo" router="true">
            <el-menu-item index="shop"><i class="el-icon-menu"></i>选购</el-menu-item>
            <el-menu-item index="console"><i class="el-icon-setting"></i>控制台</el-menu-item>
            <el-menu-item index="bill"><i class="el-icon-document"></i>账单</el-menu-item>
        </el-menu>
    </div>
</template>

<style>

</style>

<script>
    export default{
      data () {
        return {
          msg: 'hello vue'
        }
      },
      components: {
      }
    }

</script>
