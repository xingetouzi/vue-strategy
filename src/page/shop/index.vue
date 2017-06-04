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
              <el-input v-model="searchText" placeholder="请输入策略ID/名称"></el-input>
              <el-button @click="onSearch()">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light common-header-import-button">
              <el-button type="primary" @click="isAddDialogShow = true">添加策略</el-button>
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
    <el-dialog title="收货地址" :visible.sync="isAddDialogShow">
      <el-form :model="strategyAddForm">
        <el-form-item label="策略名称：">
          <el-input v-model="strategyAddForm.strategyText"
                    auto-complete="off"
                    placeholder="请输入策略ID/名称，多个策略请以逗号隔开"
                    :rules="[{ required: true, message: '策略名称不能为空'}]"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="onDialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
</style>
<script type="text/babel">
  import {getPurchaseBill, addPurchaseBill} from '../../service/getData'
  export default{
    data(){
      return {
        tableData: [],
        isAddDialogShow: false,
        searchText: '',
        strategyAddForm: {
          strategyText: ''
        }
      }
    },
    mounted () { // 挂载后执行
      this.initData()
    },
    computed: {},
    methods: {
      async initData () {
        let res = await getPurchaseBill({'tsFilter': 0, 'bsFilter': 0})
        if (res.code === 200) {
          this.tableData = res.data
        }
      },
      onSearch(){
        console.log('onSearch', this.searchText)
      },
      async onDialogConfirm(){
        let strategy = this.strategyAddForm.strategyText.split('，')
        console.log('onDialogConfirm', strategy)
        let res = await addPurchaseBill({strategy})
        if (res.code === 200) {
          this.isAddDialogShow = false
          this.strategyAddForm.strategyText = ''
          let res = await getPurchaseBill({'tsFilter': 0, 'bsFilter': 0})
          if (res.code === 200) {
            this.tableData = res.data
          }
        }
      }
    }
  }

</script>
