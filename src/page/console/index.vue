<template>
  <div>
    <div class="common-header">
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>控制台</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <div class="block-20"></div>
      <el-row>
        <el-col :span="24">
          <el-col :span="12">
            <div class="grid-content bg-purple common-header-search">
              <el-input v-model="input" placeholder="请输入策略ID/名称"></el-input>
              <el-button @click="onSearch()">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light common-header-import-button">
              <el-button type="primary" @click="onAdd()">添加策略</el-button>
            </div>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style>

</style>
<script type="text/babel">
  export default{
    methods: {
      onAdd(){
        console.log('onAdd')
      },
      onSearch(){
        console.log('onSearch')
      }
    }
  }

</script>
