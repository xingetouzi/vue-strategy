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
          <el-col :span="10">
            <div class="grid-content bg-purple common-header-search">
              <el-input v-model="searchText" placeholder="请输入策略ID/名称"></el-input>
              <el-button @click="onSearch()">搜索</el-button>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content bg-purple-light common-header-import-button">
              <el-button v-if="multipleSelection.length === 0" type="primary" @click="isAddDialogShow = true">添加策略
              </el-button>
              <span v-if="multipleSelection.length > 0">
                <el-button @click="onPurchaseClick()">购买选中</el-button>
                <el-button type="info" @click="onTryClick()">试用选中</el-button>
                <el-button type="danger" @click="onDeleteClick()">删除选中</el-button>
              </span>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <div class="block-20"></div>
    </div>
    <div id="common-body">
      <el-row>
        <el-col :span="24">
          <el-table
                  ref="shopTable"
                  :data="tableData"
                  style="width: 100%"
                  :height="resizeHeight"
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
                    prop="trialStatus"
                    label="试用状态"
                    :filters="[{ text: '可试用', value: '1' }, { text: '试用中', value: '2' },{ text: '即将到期', value: '3' },{ text: '已经到期', value: '4' }]"
                    :filter-method="filterTrialStatus"
                    filter-placement="bottom-start"
                    :formatter="formatterTrialStatus"
            >
            </el-table-column>
            <el-table-column
                    prop="trialExpired"
                    label="试用截止日期"
                    filter-placement="bottom-start"
            >
            </el-table-column>
            <el-table-column
                    prop="buyingStatus"
                    label="付费状态"
                    :filters="[{ text: '全部', value: '0' }, { text: '从未购买', value: '1' },{ text: '使用中', value: '2' },{ text: '即将过期', value: '3' },{ text: '已经过期', value: '4' }]"
                    :filter-method="filterBuyingStatus"
                    filter-placement="bottom-start"
                    :formatter="formatterBuyingStatus"
            >
            </el-table-column>
            <el-table-column
                    prop="buyingExpired"
                    label="使用截止日期"
                    filter-placement="bottom-start"
            >
            </el-table-column>
          </el-table>
          <div class="block-20"></div>
          <div class="shop-selected-text">已选择 <span>{{multipleSelection.length}}</span> 条记录</div>
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
  .shop-selected-text {
    line-height: 36px;
    > span {
      color: red;
    }
  }
</style>
<script type="text/babel">
  import {getPurchaseBill, addPurchaseBill, deletePurchaseBill, trialPurchaseBill} from '../../service/getData'
  import {trialStatusMap, buyingStatusMap, getResizeHeight} from '../common'
  import {mapMutations} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        resizeHeight: '600',
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
      this.resizeHeight = getResizeHeight()
    },
    computed: {},
    methods: {
      ...mapMutations(['UPDATE_SHOPPING_CART']),
      async initData () {
        let res = await getPurchaseBill({'tsFilter': 0, 'bsFilter': 0})
        if (res.code === 200) {
          this.tableData = res.data
        }
      },
      onSearch(){
        console.log('onSearch', this.searchText)
      },
      // 添加策略
      async onAddDialogConfirm(){
        let strategies = this.strategyAddForm.strategyText.split('，')
        console.log('onAddDialogConfirm', strategies)
        let res = await addPurchaseBill({strategies})
        if (res.code === 200) {
          this.isAddDialogShow = false
          this.$message({
            message: `添加策略${this.strategyAddForm.strategyText}成功！`,
            type: 'success'
          })
          this.strategyAddForm.strategyText = ''
          this.initData()
        }
      },
      // 购买策略
      onPurchaseClick(){
        let ids = this.multipleSelection.map((item) => item.identity)
        console.log('onPurchaseClick', ids)
        this.UPDATE_SHOPPING_CART({shoppingList: ids})
        this.$router.push({path: 'order', query: {shoppingList: ids}})
      },
      // 试用策略
      onTryClick(){
        console.log('onTryClick')
        this.$confirm('选中且尚未试用的策略将进入试用期计时，之后您可以在控制台中查看并启动该策略，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let strategies = this.multipleSelection.map((item) => item.identity)
          console.log('onTryClick', strategies)
          let res = await trialPurchaseBill({strategies})
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: `试用策略${strategies.join('，')}成功！`
            })
            this.initData()
          }
        }).catch(() => {
        })
      },
      async onDeleteClick(){
        let strategies = this.multipleSelection.map((item) => item.identity)
        console.log('onDeleteClick', strategies)
        let res = await deletePurchaseBill({strategies})
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: `删除策略${strategies.join(',')}成功！`
          })
          this.initData()
        }
      },
      filterTrialStatus(value, row){
        return row.trialStatus + '' === value
      },
      filterBuyingStatus(value, row){
        return row.buyingStatus + '' === value
      },
      formatterTrialStatus(row, column){
        return trialStatusMap[row.trialStatus]
      },
      formatterBuyingStatus(row, column){
        return buyingStatusMap[row.buyingStatus]
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
      }
    }
  }

</script>
