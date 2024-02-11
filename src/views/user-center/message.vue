<!-- 用户中心--消息中心 -->
<template>
  <div id="message">
    <div class="context">
      <el-table :data="msgData" style="width: 100%">
        <el-table-column prop="msg" label="消息内容" width="760" header-align="center">
        </el-table-column>
        <el-table-column prop="date" label="时间" width="200" header-align="center">
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
export default {
  name: "",
  components: {},
  data() {
    return {
      msgData: [
        {
          msg: '你在售的物品 "熊刀（★） | 北方森林 (略有磨损)" 已被人购买，请前往发货。温馨提示：未能及时发货将可能导致你的出售功能被封禁，另外注意：令牌确认时要核对买家Steam注册日期等信息，谨防欺诈。',
          date: '2023-12-31 18:35:23'
        },
        {
          msg: '你在售的物品 "熊刀（★） | 北方森林 (略有磨损)" 已被人购买，请前往发货。温馨提示：未能及时发货将可能导致你的出售功能被封禁，另外注意：令牌确认时要核对买家Steam注册日期等信息，谨防欺诈。',
          date: '2023-12-31 18:35:23'
        }, {
          msg: '你在售的物品 "熊刀（★） | 北方森林 (略有磨损)" 已被人购买，请前往发货。温馨提示：未能及时发货将可能导致你的出售功能被封禁，另外注意：令牌确认时要核对买家Steam注册日期等信息，谨防欺诈。',
          date: '2023-12-31 18:35:23'
        }, {
          msg: '你在售的物品 "熊刀（★） | 北方森林 (略有磨损)" 已被人购买，请前往发货。温馨提示：未能及时发货将可能导致你的出售功能被封禁，另外注意：令牌确认时要核对买家Steam注册日期等信息，谨防欺诈。',
          date: '2023-12-31 18:35:23'
        },
      ]
    }
  },
  methods: {},
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