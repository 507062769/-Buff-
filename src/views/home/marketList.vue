<template>
  <div id="marketList">
    <div class="center">
      <div class="title">
        <span class="kind">{{ title }}</span>
        <router-link to="/marketplace" class="goShop">进入市场></router-link>
      </div>
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
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "marketList",
  components: {},
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
  height: 600px;
  width: 100%;
  background-image: url("../../../public/img/list-bj.jpg");
  padding: 55px 0 0 0;

  .center {
    width: 80%;
    height: 500px;
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

    .content {
      height: 500px;
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .market {
        height: 230px;
        width: 19%;
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
  }
}
</style>