<template>
  <div id="Home">
    <Banner />
    <MarketList :marketInfo="marketInfo" title="热门饰品"></MarketList>
    <MarketList :marketInfo="marketInfo" title="最新上架"></MarketList>
  </div>
</template>

<script>
import MarketList from "./marketList.vue";
import Banner from "../../components/banner.vue";

export default {
  name: "",
  components: { MarketList, Banner },
  data() {
    return {
      marketInfo: [
        {
          Id: 1,
          Title: "蝴蝶刀（★） | 都市伪装",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 2,
          Title: "蝴蝶刀（★） | 森林",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 3,
          Title: "蝴蝶刀（★） | 虎牙",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 4,
          Title: "蝴蝶刀（★） | 多普勒",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 5,
          Title: "蝴蝶刀（★） | 外表生锈",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 6,
          Title: "蝴蝶刀（★） | 传说",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 7,
          Title: "蝴蝶刀（★） | 黑色层压板",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 8,
          Title: "蝴蝶刀（★） | 自由之手",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 9,
          Title: "蝴蝶刀（★） | 深红之网",
          Img: "img/hdd.png",
          Price: 999.0,
        },
        {
          Id: 10,
          Title: "蝴蝶刀（★） | 大马士革刚",
          Img: "img/hdd.png",
          Price: 999.0,
        },
      ],
    };
  },
  create() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style scoped></style>