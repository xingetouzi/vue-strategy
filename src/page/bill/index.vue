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
                    v-model="value3"
                    type="datetimerange"
                    placeholder="选择时间范围">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <div class="block-20"></div>
      <el-row>
        <el-col :span="24">
          <el-table
                  ref="shopTable"
                  :data="tableData"
                  style="width: 100%"
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
</template>
<style>

</style>
<script type="text/babel">
  export default{
    data(){
      return {
        tableData: [],
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      }
    },
    methods: {}
  }

</script>
