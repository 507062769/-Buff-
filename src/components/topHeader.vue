<template>
  <div class="bg" :class="$route.path !== '/home' ? 'notHomeBg' : 'homeBg'">
    <div id="topHeader">
      <div class="PageCenter">
        <div class="logo">
          <img src="img/logo.png" alt="" />
        </div>
        <div class="nav">
          <el-menu default-active="/home" background-color="rgba(0,0,0,0.0)" text-color="#fff" active-text-color="#4886ff"
            class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/marketplace">饰品市场</el-menu-item>
            <el-menu-item index="/gameInfo">游戏资讯</el-menu-item>
            <div class="right-menu-items">
              <el-menu-item index="/myBackpack/inventory" v-show="user !== null">我的库存</el-menu-item>
              <el-menu-item index="/mySell/sellManage/onSell" v-show="user !== null">我的出售</el-menu-item>
            </div>
          </el-menu>
        </div>
        <div class="login" v-if="user == null">
          <div class="loginRegister" @click="dialogForm = true">登录/注册</div>
        </div>
        <div class="nav nav_entries" v-else>
          <el-avatar icon="el-icon-user-solid" class="tx"></el-avatar>
          <div class="userInfo">
            <p class="userName">
              {{ user.nickName }}
            </p>
            <div class="drop-store">
              <div class="store-user">
                <span class="store-tx">
                  <el-avatar :size="60" icon="el-icon-user-solid" class="tx-margin"></el-avatar>
                </span>

                <span class="store-info">
                  <p @click="goUserCenter">{{ user.nickName }}</p>
                  <p @click="logout">退出登录</p>
                </span>
              </div>
              <div class="store-account">
                <h3>
                  余额<b>￥{{ user.money }}</b>
                </h3>
                <p>
                  <a class="i_Btn_small">充值</a>
                  <a class="i_Btn_small" style="background-color: #4773c8">提现</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-show="dialogForm">
      <div class="heading">帐号登录/注册</div>
      <form action="" class="form">
        <input v-model="account" required="" class="input" name="account" id="account" placeholder="请输入手机号" />
        <input v-model="pwd" required="" class="input" type="password" name="password" id="password"
          placeholder="请输入密码" />
        <span class="forgot-password"><a href="#">忘记密码?</a></span>
        <input class="login-button" type="button" value="登录" @click="login" />
      </form>
    </div>
    <div class="mask" v-show="dialogForm" @click="dialogForm = false"></div>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
import axios from "axios";
export default {
  name: "topHeader",
  components: { Banner },
  data() {
    return {
      dialogForm: false,
      account: "",
      pwd: "",
      user: {},
    };
  },
  create() { },
  mounted() {
    this.isExistUserInfo();
  },
  watch: {},
  computed: {},
  methods: {
    isExistUserInfo() {
      this.user = JSON.parse(localStorage.getItem("BuffUserInfo"));
    },
    login() {
      axios
        .get("http://localhost:8081/user/findUserByTel", {
          params: {
            account: this.account,
            pwd: this.pwd,
          },
        })
        .then((res) => {
          console.log('res:', res)
          switch (res.data.status) {
            case "200":
              this.dialogForm = false;
              this.user = res.data.data;
              localStorage.setItem(
                "BuffUserInfo",
                JSON.stringify(this.user)
              );
              this.$message({
                message: "登录成功！",
                type: "success",
              });
              this.isExistUserInfo();
              break;
            case "201":
              this.$message({
                message: "账号密码不一致！",
                type: "error",
              });
              break;
            case "202":
              this.$message({
                message: "账号存在问题！",
                type: "error",
              });
              break;
          }
        });
    },
    logout() {
      localStorage.removeItem("BuffUserInfo");
      this.$message({
        message: "退出成功！",
        type: "success",
      });
      this.isExistUserInfo();
    },
    goUserCenter() {
      this.$router.push({
        name: "recharge"
      });
    },
  },
};
</script>

<style scoped lang="less">
、 .bg {
  width: 100%;
  height: 70px;
}

.homeBg {
  background-image: url("../../public/img/bg/bj.jpg");
}

.notHomeBg {
  background-image: url("../../public/img/bg/header-bg_csgo.jpg");
  background-position: -204px 0;
}

#topHeader {
  height: 70px;
  width: 100%;
  background-image: url("../../public/img/bg/top-bg.png");
  background-position: -210px 0;

  .PageCenter {
    height: 100%;
    width: 80%;
    margin: 0 auto;
    align-content: center;
    display: flex;

    .logo {
      width: 77px;
      margin-top: 25px;
    }

    .nav {
      height: 100%;
      margin-left: 20px;
      width: 988px;

      /deep/ .el-menu {
        border-bottom: none;
      }

      /deep/ .el-menu-item {
        height: 70px;
        line-height: 70px;
      }

      /deep/.el-menu-item:hover {
        background-color: rgba(98, 127, 173, 0.4) !important;
      }

      .right-menu-items {
        display: flex;
        float: right;
      }
    }

    .login {
      height: 100%;
      width: 80px;
      line-height: 70px;
      font-size: 14px;
      text-align: center;
      margin-left: auto;

      .loginRegister {
        display: inline-block;
        color: white;
        text-decoration: none;
        height: 100%;
        width: 100%;
      }
    }

    .login:hover {
      background-color: rgba(98, 127, 173, 0.4);
      cursor: pointer;
    }

    .nav_entries {
      margin-left: auto;
      text-align: center;
      height: 70px;
      width: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

      .tx {
        margin-left: 15px;
      }

      .userInfo {
        height: 100%;
        margin-left: 10px;
        cursor: pointer;

        position: relative;

        .userName {
          line-height: 70px;
        }

        .drop-store {
          position: absolute;
          display: none;
          height: 200px;
          width: 300px;
          left: -236px;
          top: 70px;
          background-color: #313a45;
          z-index: 2;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

          .store-user {
            height: 50%;
            width: 100%;
            background-color: #313a45;
            display: flex;
            flex-wrap: wrap;

            .store-tx {
              height: 100%;
              flex-basis: 35%;

              .tx-margin {
                margin: 15px 0;
              }
            }

            .store-info {
              height: 100%;
              flex-basis: 65%;
              text-align: left;
              line-height: 10px;

              p {
                height: 20px;
                line-height: 20px;
                margin-top: 10px;
                cursor: pointer;
              }

              p:nth-child(1) {
                margin-top: 20px;
              }

              p:nth-child(2) {
                display: inline-block;
                color: #0099ff;
                font-size: 12px;
              }
            }
          }

          .store-account {
            height: 50%;
            width: 100%;
            background-color: #3a4452;

            h3 {
              text-align: center;
              padding: 10px 0;

              b {
                color: #eea20e;
              }
            }

            .i_Btn_small {
              display: inline-block;
              height: 25px;
              width: 80px;
              background-color: #45536c;
              margin: 10px 10px;
              font-size: 14px;
              line-height: 25px;
              border-radius: 5px;
              cursor: pointer;
            }
          }
        }
      }

      .userInfo:hover {
        .drop-store {
          display: inherit;
        }
      }
    }
  }
}

.container {
  max-width: 350px;
  background: #f8f9fd;
  background: linear-gradient(0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%);
  border-radius: 40px;
  padding: 25px 35px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
  position: relative;
  top: 50%;
  left: 34%;
  z-index: 2;

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);

    .form {
      margin-top: 20px;
    }
  }
}


.form .input {
  width: 90%;
  background: white;
  border: none;
  padding: 15px;
  border-radius: 20px;
  margin-top: 15px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
}

.form .input::-moz-placeholder {
  color: rgb(170, 170, 170);
}

.form .input::placeholder {
  color: rgb(170, 170, 170);
}

.form .input:focus {
  outline: none;
  border-inline: 2px solid #12b1d1;
}

.form .forgot-password {
  display: block;
  margin-top: 10px;
  margin-left: 10px;
}

.form .forgot-password a {
  font-size: 11px;
  color: #0099ff;
  text-decoration: none;
}

.form .login-button {
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(45deg,
      rgb(16, 137, 211) 0%,
      rgb(18, 177, 209) 100%);
  color: white;
  padding-block: 15px;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
}

.form .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

div.mask {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>