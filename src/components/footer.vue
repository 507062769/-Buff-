<template>
  <div id="footer-bg">
    <div class="center">
      <div class="footer-text">
        <h3>账号设置</h3>
        <div class="brLine"></div>
        <ul>
          <li>交易设置</li>
          <li>实名认证</li>
          <li>交易防骗指南</li>
        </ul>
      </div>
      <div class="footer-text">
        <h3>钱包相关</h3>
        <div class="brLine"></div>
        <ul>
          <li>收费标准</li>
          <li>充值体现</li>
        </ul>
      </div>
      <div class="footer-text">
        <h3>交易相关</h3>
        <div class="brLine"></div>
        <ul>
          <li>交易报价失败原因</li>
          <li>新手常见问题</li>
          <li>什么是交易暂挂</li>
        </ul>
      </div>
      <div class="footer-text">
        <h3>便捷支付</h3>
        <div class="brLine"></div>
        <ul>
          <li>支付宝支付</li>
          <li>银行卡支付</li>
          <li>微信支付</li>
        </ul>
      </div>
      <div class="footer-text">
        <h3>手机BUFF</h3>
        <div class="brLine"></div>
        <ul>
          <li>
            <img src="" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footerr",
  components: {},
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
#footer-bg {
  background-image: url("../../public/img/bg/footer-bg.jpg");
  height: 250px;
  width: 100%;

  .center {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;

    .footer-text {
      margin-top: 40px;
    }

    h3 {
      color: #e4e8ee;
    }
    li {
      list-style-type: none;
      color: #666;
      margin-top: 10px;
    }
    .brLine {
      height: 2px;
      width: 20px;
      margin: 10px 0;
      background-color: #4773c8;
    }
  }
}
</style>