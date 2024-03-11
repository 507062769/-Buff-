<template>
  <div class="market" @click="goDetail" :data-id="item.gid">
    <a href="javascript:void(0)">
      <div class="item_bg">
        <img class="marketImg" :src="item.img" alt="" />
      </div>
    </a>
    <h3>
      <a href="javascript:void(0)">{{ item.name }}</a>
    </h3>
    <p>
      <b>￥{{ item.price }}</b>
      <span>{{ item.total_count }} 件在售</span>
    </p>
    <span class="tag w1" v-show="item.wid === 1">崭新出厂</span>
    <span class="tag w2" v-show="item.wid === 2">略有磨损</span>
    <span class="tag w3" v-show="item.wid === 3">久经沙场</span>
    <span class="tag w4" v-show="item.wid === 4">破损不堪</span>
    <span class="tag w5" v-show="item.wid === 5">战痕累累</span>

  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["item"],
  data() {
    return {};
  },
  create() { },
  mounted() {
  },
  methods: {
    goDetail() {
      this.$router.push({
        name: "Goods",
        params: {
          goodsID: this.item.sid,
          item: this.item
        }
      })
    }
  },
};
</script>

<style scoped lang='less'>
.market {
  height: 230px;
  background-color: white;
  position: relative;
  border: 1px solid #e4e4e4;


  .item_bg {
    height: 70%;
    width: 100%;
    background-image: url("../../../public/img/bg/item_bg.png");
  }

  .marketImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h3 {
    margin: 6px 10px 0;
    height: 26px;
    overflow: hidden;
  }

  p {
    margin: 6px 10px 0;
    font-size: 16px;
    color: #eea20e;
  }

  span {
    color: #959595;
    float: right;
    font-size: 14px;
  }

  h3 a:hover {
    color: #f5b50e;
  }

  a {
    color: #111;
    text-decoration: none;
  }

  .tag {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #397439;
    font-size: 12px;
    display: inline-block;
    height: 18px;
    border-radius: 2px;
    line-height: 18px;
    padding: 0 6px;
    color: white;

  }

  .w1 {
    background-color: #397439;
  }

  .w2 {
    background-color: #488b48;
  }

  .w3 {
    background-color: #f1ad4d;
  }

  .w4 {
    background-color: #b7625f;
  }

  .w5 {
    background-color: #993a38;
  }
}

.market:hover {
  background-color: #fefcf7;
}
</style>