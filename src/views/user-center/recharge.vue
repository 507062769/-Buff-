<!-- 我的钱包--充值 -->
<template>
  <div id="recharge">
    <form action="#">
      <tbody>
        <tr>
          <td class="title">
            <p>充值金额</p>
          </td>
          <td class="content">
            <div class="amount" @click="toggleTab" :tr="rechargeMethod[0]">
              <p class="input-span" :class="tabIndex == 1 ? 'on' : ''" tabIndex="1">
                <input type="text" placeholder="请输入金额" v-model.number="amount">
              </p>
              <span :class="tabIndex == 2 ? 'on' : ''" tabIndex="2">￥100</span>
              <span :class="tabIndex == 3 ? 'on' : ''" tabIndex="3">￥200</span>
              <span :class="tabIndex == 4 ? 'on' : ''" tabIndex="4">￥500</span>

            </div>
          </td>
        </tr>
        <tr>
          <td class="title">
            <p>充值方式</p>
          </td>
          <td class="content">
            <div class="amount" @click="toggleTab" :tr="rechargeMethod[1]">
              <span :class="meTabIndex == 1 ? 'on' : ''" data-tabIndex="amount_zfb">支付宝</span>
              <span :class="meTabIndex == 2 ? 'on' : ''" data-tabIndex="amount_yhk">银行卡</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="title"></td>
          <td class="content">
            <div class="submit" @click="recharge">
              确认充值
            </div>
          </td>
        </tr>
      </tbody>
    </form>
    <div class="user-pay-desc">
      <div class="line"></div>
      <div class="blank10"></div>
      <div class="blank10"></div>
      <ul>
        <li>充值须知</li>
        <li>1. 单笔限额5-50000元；</li>
        <li>2. 充值退款或提现会产生1%服务费, 使用网易支付购买失败后可原路退回；</li>
        <li>3. 帐号违规资金转移套现将被冻结处理。</li>
      </ul>
      <div class="blank10"></div>
      <div class="blank10"></div>
      <div class="line"> </div>
    </div>
    <!-- <div class="container" v-show="isShowRecharge">
      <h3>请扫描二维码完成付款</h3>
      <div class="container_img"></div>
      <div></div>
    </div>
    <div class="mask" v-show="isShowRecharge" @click="isShowRecharge = false"></div> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  components: {},
  data() {
    return {
      tabIndex: 0,
      meTabIndex: 1,
      rechargeMethod: ['amount', 'method'],
      amount: '',
      isShowRecharge: false,
      paymentMethod: 'amount_zfb',
    }
  },
  methods: {
    toggleTab({ target }) {
      if (target.tagName === "SPAN" || target.tagName === 'INPUT') {
        if (target.parentElement.getAttribute('tr') === "method") {
          this.paymentMethod = target.dataset.tabindex
          switch (target.dataset.tabindex) {
            case 'amount_zfb':
              this.meTabIndex = 1;
              break
            case 'amount_yhk':
              this.meTabIndex = 2;
              break
          }
        } else {
          this.tabIndex = target.tabIndex;
          switch (target.tabIndex) {
            case 2:
              this.amount = 100;
              break;
            case 3:
              this.amount = 200;
              break;
            case 4:
              this.amount = 500;
              break;
          }
        }

      }
    },
    // openRecharge() {
    //   this.isShowRecharge = true;
    // }
    recharge() {
      axios.put("http://localhost:8081/user/recharge", {
        uID: this.$store.state.userInfo.uid,
        paymentMethod: this.paymentMethod,
        price: this.amount
      }).then(res => {
        this.$message({
          message: "充值成功！",
          type: "success",
        })
        axios.get("http://localhost:8081/user/getUserInfo", {
          params: {
            uID: this.$store.state.userInfo.uid
          }
        }).then(res => {
          this.$store.commit("addUserInfo", res.data.data)
        })
      })
    },
  },
}
</script>

<style scoped lang="less">
#recharge {
  padding: 10px 26px 10px;
  background-color: #fff;


  form {
    width: 100%;
    height: 200px;

    tbody {
      display: inline-block;
      height: 100%;
      width: 100%;

      span {
        display: inline-block;
        height: 38px;
        width: 90px;
        border: 1px solid rgba(227, 227, 227, 0.5);
        text-align: center;
        line-height: 38px;
        border-radius: 5px;
        cursor: pointer;
      }

      span:hover,
      input:hover {
        outline: 1px solid orange;
      }
    }

    tr {
      display: inline-block;
      height: 60px;
      width: 100%;

      td {
        display: inline-block;
        height: 100%;
        margin: 0 10px;

        .on {
          outline: 1px solid orange;
          color: orange;
        }
      }

      .title {
        width: 64px;
        line-height: 60px;
        text-align: center;
      }

      .content {

        .amount {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: left;
          align-items: center;
          gap: 10px;

          input {
            height: 38px;
            width: 196px;
            padding: 0 20px;
            font-size: 14px;
            border-radius: 5px;
            border: 1px solid rgba(227, 227, 227, .5);
            color: #999999;
          }

          input:focus {
            outline: 1px solid orange;
            color: orange
          }


          .input-span {
            flex-grow: 0;
            flex-shrink: 0;
            width: 237px;
          }

        }

        .submit {
          height: 38px;
          width: 100px;
          line-height: 38px;
          text-align: center;
          background-color: #4773c8;
          color: #fff;
          margin: 11px 0;
          cursor: pointer;
        }
      }
    }

  }

  .user-pay-desc {
    height: fit-content;
    background-color: #fefcf7;

    ul {
      margin-left: 30px;
    }

    li {
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      color: #999999;
    }

    .blank10 {
      height: 10px;
      overflow: hidden;
    }

    .line {
      height: 1px;
      overflow: hidden;
      background-image: linear-gradient(-90deg, rgba(250, 250, 250, 0) 0, #eea20e 49%, rgba(250, 250, 250, 0) 100%);
    }
  }

  .container {
    height: 400px;
    width: 400px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .mask {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }

}
</style>