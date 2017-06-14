<template>
  <div>
    <div class="common-header">
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>账单</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <div class="block-20"></div>
      <el-row>
        <el-col :span="24">
          <div class="block">
            <el-date-picker
                    v-model="dateRange"
                    type="datetimerange"
                    placeholder="选择时间范围"
                    :picker-options="pickerOptions"
                    align="right"
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <div class="block-20"></div>
      <div id="common-body">
        <el-row>
          <el-col :span="24">
            <el-table
                    ref="shopTable"
                    :data="tableData"
                    style="width: 100%"
                    :height="resizeHeight"
            >
              <el-table-column
                      prop="identity"
                      label="订单号"
                      width="150"
              >
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="日期"
                      width="150"
              >
              </el-table-column>
              <el-table-column
                      prop="runningStatus"
                      label="备注"
              >
              </el-table-column>
              <el-table-column
                      prop="expiringStatus"
                      label="费用"
              >
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script type="text/babel">
  import moment from 'moment'
  import {getPurchaseOrder} from '../../service/getData'
  import {getResizeHeight} from '../common'
  export default{
    data(){
      return {
        tableData: [],
        resizeHeight: '600',
        dateRange: [moment().subtract(30, 'd'), moment()],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90 * 6)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    mounted () { // 挂载后执行
      this.initData()
      this.resizeHeight = getResizeHeight()
    },
    watch: {
      dateRange: function () {
        console.log('dateRange')
        this.initData()
      }
    },
    methods: {
      async initData () {
        let res = await getPurchaseOrder({
          start: moment(this.dateRange[0]).format('YYYY/MM/DD HH:mm:ss'),
          end: moment(this.dateRange[1]).format('YYYY/MM/DD HH:mm:ss')
        })
        if (res.code === 200) {
          this.tableData = res.data
        }
      }
    }
  }

</script>
