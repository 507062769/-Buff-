<template>
  <div class="market" @click="goDetail">
    <a href="javascript:void(0)">
      <div class="item_bg">
        <img class="marketImg" :src="item.Img" alt="" />
      </div>
    </a>
    <h3>
      <a href="javascript:void(0)">{{ item.Title }}</a>
    </h3>
    <p>
      <b>￥{{ item.Price }}</b>
      <span>1000件在售</span>
    </p>
    <span class="tag">崭新出厂</span>
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
  mounted() { },
  methods: {
    goDetail() {
      console.log('获取到了id：', this.item.Id)
      this.$router.push({
        name: "Goods",
        params: {
          id: this.item.Id
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
}

.market:hover {
  background-color: #fefcf7;
}
</style>