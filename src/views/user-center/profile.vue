<!-- 用户中心--账号设置 -->
<template>
  <div id="profile">
    <div class="basicSet">
      <h3>基本设置</h3>
      <table>
        <tr>
          <td>头像</td>
          <td>
            <el-avatar icon="el-icon-user-solid" class="tx"></el-avatar>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>昵称</td>
          <td>热心小刘</td>
          <td>
            <div class="btn">
              修改昵称
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="securitySet">
      <h3>安全设置</h3>
      <table>
        <tr>
          <td>手机账号</td>
          <td>
            <span>已绑定</span>
            绑定手机号17671214206
          </td>
          <td>
            <div class="btn">
              更换号码
            </div>
          </td>
        </tr>
        <tr>
          <td>实名认证</td>
          <td>
            <span>已认证</span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>密码设置</td>
          <td></td>
          <td>
            <div class="btn">
              修改密码
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  components: {},
  data() {
    return {
    }
  },
  methods: {},
}
</script>

<style scoped lang="less">
#profile {
  background-color: #fff;
  width: 100%;
  height: 670px;
  padding: 40px 54px;


  table {
    height: 100%;
    width: 100%;
    border-collapse: collapse;

    tr {
      height: 60px;
      width: 100%;

      td {
        border-bottom: 1px solid #e9e9e9;

        .btn {
          background-color: #4773c8;
          color: white;
          height: 22px;
          width: 70px;
          text-align: center;
          line-height: 22px;
          font-size: 12px;
          float: right;
          cursor: pointer;
        }

        span {
          color: #0b0;
        }
      }

      td:first-child {
        width: 120px;
        color: #999;
      }
    }
  }

  .securitySet {
    margin-top: 20px;
  }
}
</style>