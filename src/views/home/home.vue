<template>
  <div id="Home">
    <Banner />
    <MarketList :marketInfo="hotSellGoods" title="热门饰品"></MarketList>
    <MarketList :marketInfo="newSellGoods" title="最新上架"></MarketList>
  </div>
</template>

<script>
import axios from 'axios'
import MarketList from "./marketList.vue";
import Banner from "../../components/banner.vue";

export default {
  name: "",
  components: { MarketList, Banner },
  data() {
    return {
      hotSellGoods: [],
      newSellGoods: [],
    };
  },
  methods: {
    init() {
      axios.get("http://localhost:8081/sell/getNewGoods").then(res => {
        this.newSellGoods = res.data.data
      })
      axios.get("http://localhost:8081/sell/getHotGoods").then(res => {
        this.hotSellGoods = res.data.data
      })
    }
  },
  mounted() {
    this.init()
  },
};
</script>

<style scoped></style>