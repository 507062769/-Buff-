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
        <tr v-show="isShowName">
          <td>昵称</td>
          <td>
            {{ userInfo.nickName }}
          </td>
          <td>
            <div class="btn" @click="isShowName = !isShowName">修改昵称</div>
          </td>
        </tr>
        <tr v-show="!isShowName" class="updateName">
          <td>昵称</td>
          <td>
            <el-input v-model="userInfo.nickName"></el-input>
            <span>
              昵称必须为包含数字、英文、中文在内的4-14个字符，三个月内只能修改一次。
            </span>
            <b>
              (请勿带有辱骂、广告、诱导等其他违反法规的词汇，违者帐号将作封禁处理)
            </b>
          </td>
          <td>
            <div class="btn" @click="updateName">确定</div>
            <div class="btn close" @click="isShowName = !isShowName">取消</div>
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
            绑定手机号{{ userInfo.account }}
          </td>
          <td>
            <div class="btn">更换号码</div>
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
            <div class="btn">修改密码</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "profile",
  components: {},
  data() {
    return {
      userInfo: {},
      isShowName: true,
    };
  },
  methods: {
    init() {
      this.userInfo = this.$store.state.userInfo;
    },
    updateName() {
      axios.get("http://localhost:8081/user/updateName", {
        params: {
          uID: this.userInfo.uid,
          name: this.userInfo.nickName
        }
      }).then(res => {
        this.init()
        this.$message({
          type: "success",
          message: "修改成功！"
        })
      })
    },
  },
  mounted() {
    this.init();
  },
};
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

  .updateName {
    height: 100px;

    /deep/.el-input {
      width: 200px;
    }

    span,
    b {
      display: block;
      font-size: 12px;
      color: #959595
    }

    .close {
      background: #45536c;
      margin: 0 10px;
    }

  }

}
</style>