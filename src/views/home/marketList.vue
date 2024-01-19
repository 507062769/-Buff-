<template>
  <div id="marketList">
    <div class="center">
      <div class="title">
        <span class="kind">{{ title }}</span>
        <router-link to="/marketplace" class="goShop">进入市场></router-link>
      </div>
      <Item :marketInfo="marketInfo" />
    </div>
  </div>
</template>

<script>
import Item from "../market/marketItem.vue";
export default {
  name: "marketList",
  components: { Item },
  props: ["marketInfo", "title"],
  data() {
    return {};
  },
  create() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style scoped lang='less'>
#marketList {
  height: fit-content;
  width: 100%;
  background-image: url("../../../public/img/list-bj.jpg");
  padding: 55px 0 0 0;

  .center {
    width: 80%;
    height: fit-content;
    margin: 0 auto;

    .title {
      height: 40px;
      border-bottom: 1px solid #aa7f25;

      .kind {
        display: inline-block;
        height: 100%;
        width: 150px;
        font-size: 22px;
        line-height: 40px;
        text-align: center;
        background-color: #aa7f25;
        color: white;
      }

      .goShop {
        color: #fff;
        text-decoration: none;
        height: 100%;
        font-size: 16px;
        float: right;
        line-height: 40px;
        text-align: center;
        padding-right: 10px;
        cursor: pointer;
        color: #333;
      }

      .goShop:hover {
        color: #aa7f25;
      }
    }
  }
}
</style>