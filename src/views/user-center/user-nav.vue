<template>
  <div id="userNav">
    <div class="my-thum">
      <el-avatar icon="el-icon-user-solid" :size="70" class="tx"></el-avatar>
      <p>热心小刘</p>
    </div>
    <div class="my-menu">
      <ul @click="toggleTab">
        <li :tabIndex="1" :class="tabIndex == 1 ? 'on' : ''" >
          <a><i class="el-icon-money"> </i> 我的钱包</a>
        </li>
        <li :tabIndex="2" :class="tabIndex == 2 ? 'on' : ''" >
          <a><i class="el-icon-setting"> </i> 账号设置</a>
        </li>
        <li :tabIndex="3" :class="tabIndex == 3 ? 'on' : ''">
          <a><i class="el-icon-message"> </i> 消息中心</a>
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
    // 切换tab栏，对应的tabIndex发生变化从而改变选中的li的样式
    toggleTab({ target }) {
      if (target.tagName === "LI") {
        this.tabIndex = target.tabIndex;
      } else if (target.tagName === "A") {
        this.tabIndex = target.closest("li").tabIndex;
      }
      switch (this.tabIndex) {
        case 1:
          this.$router.push({
            name: "recharge"
          })
          break;
        case 2:
          this.$router.push({
            name: "profile"
          })
          break;
        case 3:
          this.$router.push({
            name: "message"
          })
          break;
      }

    }
  },
};
</script>

<style scoped lang="less">
#userNav {
  width: 20%;
  height: 530px;
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
