<template>
  <div id="withdraw">
    <form action="#">
      <tbody>
        <tr>
          <td class="title">
            <p>提现金额</p>
          </td>
          <td class="content">
            <div class="amount">
              <p class="input-span" :tabIndex="1">
                <input type="text" placeholder="请输入支付宝提现金额" v-model.number="amount.zfb">
              </p>
              <p class="input-span" :tabIndex="1">
                <input type="text" placeholder="请输入银行卡提现金额" v-model.number="amount.qt">
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td class="title">
            <p>收款账号</p>
          </td>
          <td class="content">
            <div class="amount">
              <el-select v-model="account.zfb" placeholder="请选择支付宝账号">
                <el-option :key="1" :label="17671214206" :value="17671214206">
                </el-option>
              </el-select>
              <el-select v-model="account.qt" placeholder="请选择银行卡账号">
                <el-option :key="2" label="***************9779" value="***************9779">
                </el-option>
              </el-select>
            </div>

          </td>
        </tr>
        <tr>
          <td class="title">服务费</td>
          <td>
            <div style="color: #4d80e1;">
              <span>￥0</span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="title"></td>
          <td class="content">
            <div class="submit">
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
        <li>提现须知</li>
        <li>1. 默认每日提现次数为3次，系统会根据近期出售记录自动调整；</li>
        <li>2. 提现服务费1%，最低2元，向上取整；</li>
        <li>3. 支付宝提现2小时内到账，银行卡到账时间取决于收款银行。</li>
      </ul>
      <div class="blank10"></div>
      <div class="blank10"></div>
      <div class="line"> </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      amount: {
        zfb: "",
        qt: "",
      },
      account: {
        zfb: '',
        qt: '',
      },
    }
  },
  methods: {},
}
</script>

<style scoped lang="less">
#withdraw {
  padding: 10px 26px 10px;
  background-color: #fff;

  form {
    width: 100%;

    tbody {
      display: inline-block;
      height: 100%;
      width: 100%;

    }

    tr {
      display: inline-block;
      width: 100%;
      margin: 10px 5px;

      td {
        display: inline-block;
        height: 100%;
        margin: 0 10px;
      }

      .title {
        width: 64px;
        text-align: center;
      }

      .content {

        .amount {
          width: 400px;
          display: flex;
          justify-content: left;
          flex-direction: column;
          flex-wrap: wrap;
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
            outline: 1px solid #999;
          }

          .input-span {
            flex-grow: 0;
            flex-shrink: 0;
            width: 237px;
          }

          /deep/.el-select {
            width: 238px;
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
}
</style>