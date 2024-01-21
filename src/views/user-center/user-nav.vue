<template>
  <div id="userNav">
    <div class="my-thum">
      <el-avatar icon="el-icon-user-solid" :size="70" class="tx"></el-avatar>
      <p>热心小刘</p>
    </div>
    <div class="my-menu">
      <ul @click="toggleTab">
        <li :tabIndex="1" :class="tabIndex == 1 ? 'on' : ''">
          <router-link to="#"><i class="el-icon-money"> </i> 我的钱包</router-link>
        </li>
        <li :tabIndex="2" :class="tabIndex == 2 ? 'on' : ''">
          <router-link to="#"><i class="el-icon-setting"> </i> 账号设置</router-link>
        </li>
        <li :tabIndex="3" :class="tabIndex == 3 ? 'on' : ''">
          <router-link to="#"><i class="el-icon-message"> </i> 消息中心</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "userNav",
  components: {},
  data() {
    return {
      tabIndex: 1,
    };
  },
  create() { },
  mounted() { },
  watch: {},
  computed: {},
  methods: {
    toggleTab(e) {
      console.log("被点击啦！", e.target);
      this.tabIndex = e.target.tabIndex;
      // e.target.classList.add("on");
    },
  },
};
</script>

<style scoped lang="less">
#userNav {
  width: 20%;
  height: 500px;
  color: #fff;

  .my-thum {
    width: 100%;
    height: 40%;
    background-color: #181c23;

    .tx {
      margin: 30px 85px 0;
    }

    p {
      margin-top: 15px;
      text-align: center;
      font-size: 18px;
    }
  }

  .my-menu {
    width: 100%;
    height: 60%;
    background-color: #13161b;

    li {
      height: 60px;
      width: 100%;
      line-height: 60px;
      font-size: 18px;
      text-align: center;
      cursor: pointer;
      pointer-events: auto;
      a {
        color: #fff;
      }
    }

    .on {
      background-image: url("../../../public/img/icon.png");
      background-position: 0 -272px;
      pointer-events: none;
    }

    li:hover {
      background-image: url("../../../public/img/icon.png");
      background-position: -210px -148px;
    }
  }
}
</style>
