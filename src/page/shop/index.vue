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
              <el-button type="primary" @click="isAddDialogShow = true">添加策略</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light common-header-import-button">
              <el-button>购买选中</el-button>
              <el-button type="info" @click="onTryClick()">试用选中</el-button>
              <el-button type="danger" @click="onDeleteClick()">删除选中</el-button>
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
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
          >
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
                    :filters="[{ text: '可使用', value: '1' }, { text: '试用中', value: '2' },{ text: '即将到期', value: '3' },{ text: '已经到期', value: '4' }]"
                    :filter-method="filterTrialExpired"
                    filter-placement="bottom-start">
              >
            </el-table-column>
            <el-table-column
                    prop="buyingExpired"
                    label="付费使用期"
                    :filters="[{ text: '全部', value: '0' }, { text: '从未购买', value: '1' },{ text: '使用中', value: '2' },{ text: '即将过期', value: '3' },{ text: '已过期', value: '4' }]"
                    :filter-method="filterBuyingExpired"
                    filter-placement="bottom-start">
              >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="block-20"></div>
      <el-row>
        <el-col :span="24" class="tlr">
          <span>已选择 <span :style="{color:'red'}">{{multipleSelection.length}}</span> 条记录</span>
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
        <el-button type="primary" @click="onAddDialogConfirm">确 定</el-button>
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
        isAddDialogShow: false, // 添加策略
        searchText: '',
        strategyAddForm: {
          strategyText: ''
        },
        multipleSelection: [] // 多选
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
      // 添加策略窗口确定
      async onAddDialogConfirm(){
        let strategies = this.strategyAddForm.strategyText.split('，')
        console.log('onAddDialogConfirm', strategies)
        let res = await addPurchaseBill({strategies})
        if (res.code === 200) {
          this.isAddDialogShow = false
          this.strategyAddForm.strategyText = ''
          let res = await getPurchaseBill({'tsFilter': 0, 'bsFilter': 0})
          if (res.code === 200) {
            this.tableData = res.data
          }
        }
      },
      onTryClick(){
        console.log('onTryClick')
        this.$confirm('选中且尚未试用的策略将进入试用期计时，之后您可以在控制台中查看并启动该策略，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交使用策略，跳转到控制台'
          })
        }).catch(() => {
        })
      },
      onDeleteClick(){
        console.log('onDeleteClick')
      },
      filterTrialExpired(){

      },
      filterBuyingExpired(){

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
      }
    }
  }

</script>
