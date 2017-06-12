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
          <el-col :span="10">
            <div class="grid-content bg-purple common-header-search">
              <el-input v-model="searchText" placeholder="请输入策略ID/名称"></el-input>
              <el-button @click="onSearch()">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light common-header-import-button">
              <span v-if="multipleSelection.length > 0">
                <el-button @click="onStartClick()">启用选中</el-button>
                <el-button type="success" @click="onContinueClick()">一键续费</el-button>
                <el-button type="info" @click="onStopClick()">停止选中</el-button>
                <el-button type="danger" @click="onRemoveClick()">移除选中</el-button>
              </span>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <div class="block-20"></div>
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
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="策略名称"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="runningStatus"
                    label="运行状态"
                    :filters="[{ text: '已停止', value: '0' },{ text: '启用中', value: '1' }]"
                    :filter-method="filterRunningStatus"
                    filter-placement="bottom-start"
                    :formatter="formatterRunningStatus"
            >
            </el-table-column>
            <el-table-column
                    prop="expiringStatus"
                    label="购买状态"
                    :filters="[{ text: '可使用', value: '1' }, { text: '试用中', value: '2' },{ text: '即将到期', value: '3' },{ text: '已经到期', value: '4' }]"
                    :filter-method="filterExpiringStatus"
                    filter-placement="bottom-start"
                    :formatter="formatterExpiringStatus"
            >
            </el-table-column>
            <el-table-column
                    prop="expiredTime"
                    label="到期时间"
                    filter-placement="bottom-start">
              >
            </el-table-column>
          </el-table>
          <div class="block-20"></div>
          <div class="shop-selected-text">已选择 <span>{{multipleSelection.length}}</span> 条记录</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style>

</style>
<script type="text/babel">
  import {getPurchaseDeal, deletePurchaseDeal, stopPurchaseDeal, startPurchaseDeal} from '../../service/getData'
  import {runningStatusMap, expiringStatusMap} from '../common'
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
    mounted(){
      this.initData()
    },
    methods: {
      async initData () {
        let res = await getPurchaseDeal({'tsFilter': 0, 'bsFilter': 0})
        if (res.code === 200) {
          this.tableData = res.data
        }
      },
      filterExpiringStatus(value, row){
        return row.expiringStatus + '' === value
      },
      filterRunningStatus(value, row){
        return row.runningStatus + '' === value
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
      },
      onStartClick(){
        console.log('onStartClick')
        let strategies = this.multipleSelection.map((item) => item.identity)
        this.$confirm(`是否确认启用策略${strategies.join(',')}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let strategies = this.multipleSelection.map((item) => item.identity)
          console.log(strategies)
          let res = await startPurchaseDeal({strategies})
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: `启用策略${strategies.join(',')}成功！`
            })
            this.initData()
          }
        }).catch(() => {

        })
      },
      onStopClick(){
        console.log('onStopClick')
        let strategies = this.multipleSelection.map((item) => item.identity)
        this.$confirm(`是否确认停止策略${strategies.join(',')}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let strategies = this.multipleSelection.map((item) => item.identity)
          console.log(strategies)
          let res = await stopPurchaseDeal({strategies})
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: `停止策略${strategies.join(',')}成功！`
            })
            this.initData()
          }
        }).catch(() => {

        })
      },
      onSearch(){
        console.log('onSearch')
      },
      onContinueClick(){
        console.log('onContinueClick,跳转到下单页')
      },
      onRemoveClick(){
        console.log('onRemoveClick')
        this.$confirm('移除后，尚未到期策略的可使用时长将清零，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let strategies = this.multipleSelection.map((item) => item.identity)
          console.log(strategies)
          let res = await deletePurchaseDeal({strategies})
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: `移除选中：${strategies.join(',')}成功！`
            })
            this.initData()
          }
        }).catch(() => {
        })
      },
      formatterRunningStatus(row, column){
        return runningStatusMap[row.runningStatus]
      },
      formatterExpiringStatus(row, column){
        return expiringStatusMap[row.expiringStatus]
      }
    }
  }

</script>
