<template>
  <div id="myPurse">
    <div class="purse-head">
      <h2>Buff余额</h2>
      <p>￥18881.00</p>
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
  margin-left: 20px;

  .purse-head {
    height: 80px;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    background-image: url("../../../public/img/bg//user-header-bg.png");
    background-size: cover;

    h2{
      color: #999;
    }

    p {
      margin-top: 10px;
      font-size: 18px;
      color: #eea20e;
    }
  }

  .purse-main {
    height: 400px;
    width: 100%;

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
        li:hover{
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