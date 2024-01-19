<template>
  <div>
    <div class="content">
      <div class="market" v-for="item in marketInfo" :key="item.id">
        <a href="#">
          <div class="item_bg">
            <img class="marketImg" :src="item.Img" alt="" />
          </div>
        </a>
        <h3>
          <a href="#">{{ item.Title }}</a>
        </h3>
        <p>
          <b>￥{{ item.Price }}</b>
          <span>1000件在售</span>
        </p>
      </div>
    </div>
    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        page-size="20"
        hide-on-single-page="1"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: ["marketInfo"],
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
.content {
  height: fit-content;
  width: 100%;
  margin-top: 20px;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;

  .market {
    height: 230px;
    // width: 19%;
    margin-bottom: 16px;
    background-color: white;
    .item_bg {
      height: 70%;
      width: 100%;
      background-image: url("../../../public/img/item_bg.png");
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
  }
  .market:hover {
    background-color: #fefcf7;
  }
}
.paging {
  width: fit-content;
  height: 50px;
  margin: 20px auto 0;
}
</style>