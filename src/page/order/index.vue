<template>
  <div>
    <div class="common-header">
      <el-row>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>下单</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <div class="block-20"></div>
    </div>
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
                    label="策略ID"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="策略名"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="runningStatus"
                    label="购买/续费时长"
            >
            </el-table-column>
            <el-table-column
                    prop="expiringStatus"
                    label="使用期"
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
<script>
    export default{

    }

</script>
