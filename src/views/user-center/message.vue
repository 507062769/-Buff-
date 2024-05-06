<!-- 用户中心--消息中心 -->
<template>
  <div id="message">
    <div class="context">
      <el-table :data="msgData" style="width: 100%">
        <el-table-column prop="context" label="消息内容" width="760" header-align="center">
        </el-table-column>
        <el-table-column prop="formattedTime" label="时间" width="200" header-align="center">
        </el-table-column>
      </el-table>
    </div>

    <div class="bottom">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  components: {},
  data() {
    return {
      msgData: []
    }
  },
  methods: {
    init() {
      axios.get("http://localhost:8081/tool/getMessage").then(res => {
        this.msgData = res.data.data
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped lang="less">
#message {
  background-color: #fff;
  width: 100%;
  height: 670px;

  .context {
    height: 93%;
  }

  .bottom {
    height: 7%;

    /deep/.el-pagination {
      width: fit-content;
      margin: 5px auto 0;
    }
  }
}
</style>