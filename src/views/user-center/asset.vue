<!-- 用户中心--资金流水 -->
<template>
  <div id="asset">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="流水号" width="220" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180" align="center">
      </el-table-column>
      <el-table-column prop="amount" label="变动金额" width="180" align="center" color="red">
        <template slot-scope="scope">
          <span :style="{ color: scope.row.type === '出售' ? '#efa20e' : '#508f50' }">
            {{ scope.row.type === '出售' ? '+' : '-' }} {{ scope.row.amount }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="blance" label="余额" width="200" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      tableData: [{
        id: '1',
        type: '出售',
        amount: '8.9',
        blance: '8.9',
        createTime: '2024-12-31 15:32',
      },
      {
        id: '2',
        type: '提现',
        amount: '8.9',
        blance: '0',
        createTime: '2024-12-31 15:42',
      }, {
        id: '3',
        type: '出售',
        amount: '18',
        blance: '18',
        createTime: '2024-12-31 15:52',
      },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped lang="less">
#asset {
  background-color: #fff;
}
</style>