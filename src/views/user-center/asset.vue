<!-- 用户中心--资金流水 -->
<template>
  <div id="asset">
    <el-empty description="暂无数据" v-if="flowFundData.length == 0"></el-empty>
    <el-table :data="flowFundData" stripe style="width: 100%" v-else>
      <el-table-column prop="fid" label="流水号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="160" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">购买</span>
          <span v-if="scope.row.type == 2">出售</span>
          <span v-if="scope.row.type == 3">退款</span>
          <span v-if="scope.row.type == 4">充值</span>
          <span v-if="scope.row.type == 5">提现</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="变动金额" width="200" align="center" color="red">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.type === 1 || scope.row.type == 5 ? '#508f50' : '#efa20e' }">
            {{ scope.row.type === 1 || scope.row.type == 5 ? '-' : '+' }} {{ scope.row.amount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="余额(元)" width="220" align="center">
      </el-table-column>
      <el-table-column prop="formattedTime" label="创建时间" width="180" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["flowFundData"],
  data() {
    return {
    }
  },
  methods: {

  },

}
</script>

<style scoped lang="less">
#asset {
  background-color: #fff;
}
</style>