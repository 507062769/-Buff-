<template>
  <div class="bg">
    <div id="topHeader">
      <div class="PageCenter">
        <div class="logo">
          <img src="img/logo.png" alt="" />
        </div>
        <div class="nav">
          <el-menu
            default-active="/home"
            background-color="rgba(0,0,0,0.0)"
            text-color="#fff"
            active-text-color="#4886ff"
            class="el-menu-demo"
            mode="horizontal"
            router
          >
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/marketplace">饰品市场</el-menu-item>
            <el-menu-item index="/gameInfo">游戏资讯</el-menu-item>
          </el-menu>
        </div>
        <div class="login">
          <router-link to="#" class="loginRegister">登录/注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
export default {
  name: "topHeader",
  components: { Banner },
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

<style scoped lang="less">
.bg {
  width: 100%;
  height: 70px;
  background-image: url("../../public/img/bj.jpg");
}

#topHeader {
  height: 70px;
  width: 100%;
  background-image: url("../../public/img/top-bg.png");
  background-position: -210px 0;

  .PageCenter {
    height: 100%;
    width: 80%;
    margin: 0 auto;
    align-content: center;
    display: flex;
    // display: inline-grid;
    // grid-template-columns: 100px auto 1000px auto auto;

    .logo {
      width: 77px;
      margin-top: 25px;
    }

    .nav {
      height: 100%;
      margin-left: 20px;

      /deep/ .el-menu-item {
        height: 70px;
      }
    }

    .login {
      height: 100%;
      width: 80px;
      line-height: 70px;
      font-size: 14px;
      text-align: center;
      margin-left: 778px;

      .loginRegister {
        display: inline-block;
        color: white;
        text-decoration: none;
        height: 100%;
        width: 100%;
      }
    }

    .login:hover {
      background-color: #dee1e6;
    }
  }
}
</style>