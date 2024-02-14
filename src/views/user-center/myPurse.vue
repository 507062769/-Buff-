<!-- 我的钱包 -->
<template>
  <div id="myPurse">
    <div class="purse-head">
      <span>
        <h4>BUFF余额
          <span class="showzfb">支付宝</span>
          <div class="showContent zfb">
            <h3>BUFF余额-支付宝</h3>
            <div>
              1. 支付宝余额可用于购买饰品，或提现到支付宝<br>
              2. 通过花呗信用卡充值到BUFF的余额不可提现
            </div>
          </div>
        </h4>
        <p>￥18881.00</p>
      </span>
      <p class="divisionLine"></p>
      <span>
        <h4>BUFF余额
          <span class="showqt">其他</span>
          <div class="showContent qt">
            <h3>BUFF余额-银行卡</h3>
            <div>
              1. 其他用户使用BUFF余额-银行卡和微信支付购买你饰品的收入<br>
              2. 可购买饰品，或提现到银行卡
            </div>
          </div>
        </h4>
        <p>￥18881.00</p>

      </span>
    </div>
    <div class="purse-main">
      <div class="main-head">
        <ul @click="toggleTab">
          <li :tabindex="1" :class="tabIndex == 1 ? 'on' : ''">
            <span>充值</span>
          </li>
          <li :tabindex="2" :class="tabIndex == 2 ? 'on' : ''">
            <span>提现</span>
          </li>
          <li :tabindex="3" :class="tabIndex == 3 ? 'on' : ''">
            <span>资金流水</span>
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myPurse",
  components: {},
  data() {
    return {
      tabIndex: 1,
    }
  },
  methods: {
    toggleTab({ target }) {
      console.log('tar:', target)
      if (target.tagName === "LI") {
        this.tabIndex = target.tabIndex;
      } else if (target.tagName === "SPAN") {
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
            name: "withdraw"
          })
          break;
        case 3:
          this.$router.push({
            name: "asset"
          })
          break;
      }
    }

  },
}
</script>

<style scoped lang="less">
#myPurse {
  height: fit-content;
  width: 100%;

  .purse-head {
    height: 80px;
    width: 100%;
    text-align: center;
    background-image: url("../../../public/img/bg//user-header-bg.png");
    background-size: cover;
    display: flex;

    span {
      width: 230px;

      h4 {
        color: #999;
        margin-top: 15px;

        span {
          color: #3173bd;
          font-size: 12px;
        }

      }

      p {
        margin-top: 5px;
        font-size: 18px;
        color: #eea20e;
      }

      .showContent {
        display: none;
        height: fit-content;
        width: 180px;
        position: absolute;
        top: 90px;
        text-align: left;
        background-color: #020202;
        color: #fff;
        padding: 15px;
        line-height: 22PX;

        h3 {
          color: #999;
          font-size: 14px;
          line-height: 26px;
        }
      }

      .showzfb:hover+.showContent {
        display: block;
      }

      .showqt:hover+.showContent {
        display: block;
      }

      .zfb {
        left: 620px;
      }

      .qt {
        left: 900px;
      }

    }

    .divisionLine {
      height: 40px;
      width: 1px;
      overflow: hidden;
      margin: 23px 0;
      background-image: linear-gradient(180deg, rgba(250, 250, 250, 0) 0, #eea20e 49%, rgba(250, 250, 250, 0) 100%);
    }
  }

  .purse-main {
    height: 400px;
    width: 100%;
    margin-top: 20px;

    .main-head {
      height: 50px;
      width: 100%;

      background-color: #1c202b;

      ul {
        display: flex;

        li {
          height: 50px;
          width: 140px;
          font-size: 18px;
          text-align: center;
          line-height: 50px;
          border-right: 1px solid rgba(255, 255, 255, .3);
          color: #999;
        }

        li:hover {
          background-image: url("../../../public/img/icon.png");
          background-position: -325px 0px;
          color: #fff;
          cursor: pointer;

        }

        .on {
          color: #fff;
          background-image: url("../../../public/img/icon.png");
          background-position: -308px -78px;
          pointer-events: none;
        }
      }
    }
  }
}
</style>