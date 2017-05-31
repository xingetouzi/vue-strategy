<template>
  <div>
    <div class="common-header">
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>选购</el-breadcrumb-item>
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
              <el-button type="primary" @click="onImport()">批量导入</el-button>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <div class="block-20"></div>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-table
                  ref="shopTable"
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="identity"
                    label="策略ID"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="策略名称"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="trialExpired"
                    label="试用期"
            >
            </el-table-column>
            <el-table-column
                    prop="buyingExpired"
                    label="付费使用期"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block-20"></div>
      <el-row>
        <el-col :span="24" class="tlr">
          <span>已经选择10条记录</span>
          <span class="space-10"></span>
          <el-button>查看详情</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script type="text/babel">
  import {purchaseBill} from '../../service/getData'
  export default{
    data(){
      return {
        tableData: []
      }
    },
    mounted () { // 挂载后执行
      this.initData()
    },
    computed: {},
    methods: {
      async initData () {
        let res = await purchaseBill({'tsFilter': 0, 'bsFilter': 0})
        if (res.code === 200) {
          this.tableData = res.data
        }
      },
      onSearch(){
        console.log('search')
      },
      onImport(){
        console.log('import')
      }
    }
  }

</script>
