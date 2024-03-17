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
        <tr v-if="isShowName">
          <td>昵称</td>
          <td>
            {{ nickName }}
          </td>
          <td>
            <div class="btn" @click="isShowName = !isShowName">修改昵称</div>
          </td>
        </tr>
        <tr v-else class="update">
          <td>昵称</td>
          <td>
            <el-input v-model="nickName"></el-input>
            <span>
              昵称必须为包含数字、英文、中文在内的4-14个字符，三个月内只能修改一次。
            </span>
            <b>
              (请勿带有辱骂、广告、诱导等其他违反法规的词汇，违者帐号将作封禁处理)
            </b>
          </td>
          <td>
            <div class="btn" @click="updateName">确定</div>
            <div class="btn close" @click="closeUpdateName">取消</div>
          </td>
        </tr>
      </table>
    </div>

    <div class="securitySet">
      <h3>安全设置</h3>
      <table>
        <tr v-if="isShowAccount">
          <td>手机账号</td>
          <td>
            <span>已绑定 </span>
            绑定手机号{{ account }}
          </td>
          <td>
            <div class="btn" @click="isShowAccount = !isShowAccount">
              更换号码
            </div>
          </td>
        </tr>
        <tr v-else class="update" style="height: 60px">
          <td>手机账号</td>
          <td>
            <el-input v-model="account"></el-input>
          </td>
          <td>
            <div class="btn" @click="updateACcount">确定</div>
            <div class="btn close" @click="closeUpdateAccount">取消</div>
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
            <div class="btn" @click="isShowPwd = !isShowPwd">修改密码</div>
          </td>
        </tr>
      </table>
      <el-dialog title="修改密码" :visible.sync="isShowPwd">
        <el-form :model="pwdForm" ref="ruleForm" label-position="right" label-width="130px" :rules="rules">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="pwdForm.oldPwd" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码" prop="pass">
            <el-input v-model="pwdForm.pass" show-password autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="请再次输入新密码" prop="checkPass">
            <el-input v-model="pwdForm.checkPass" show-password autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click=" isShowPwd = false">取 消</el-button>
          <el-button type="primary" @click="updatePwd('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",
  components: {},
  data() {
    let validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.pwdForm.oldPwd !== '') {
          axios.get("http://localhost:8081/user/checkPwd", {
            params: {
              account: this.$store.state.userInfo.account,
              pwd: this.pwdForm.oldPwd
            }
          }).then(res => {
            if (res.data.status == '200') callback();
            else callback(new Error('密码不正确'));
          })
        }

      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value === this.pwdForm.oldPwd) {
          callback(new Error('新密码不能与老密码一致'));
        }
        callback()
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pwdForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isShowName: true,
      isShowAccount: true,
      isShowPwd: false,
      nickName: "",
      account: "",
      pwdForm: {
        oldPwd: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        oldPwd: [
          { validator: validateOldPwd, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 初始化用户名、手机号、密码等信息
    init() {
      this.nickName = this.$store.state.userInfo.nickName;
      this.account = this.$store.state.userInfo.account;
    },
    // 取消修改用户名
    closeUpdateName() {
      this.isShowName = !this.isShowName;
      this.nickName = this.$store.state.userInfo.nickName;
    },
    // 取消修改手机号
    closeUpdateAccount() {
      this.isShowAccount = !this.isShowAccount;
      this.account = this.$store.state.userInfo.account;
    },
    // 修改用户名
    updateName() {
      axios
        .get("http://localhost:8081/user/updateName", {
          params: {
            uID: this.$store.state.userInfo.uid,
            nickName: this.nickName,
          },
        })
        .then((res) => {
          this.$store.commit("updateUserNickName", this.nickName);
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          this.isShowName = !this.isShowName;
        });
    },
    // 修改手机号
    updateACcount() {
      axios
        .get("http://localhost:8081/user/isExistTel", {
          params: {
            uID: this.$store.state.userInfo.uid,
            account: this.account,
          },
        })
        .then((res) => {
          switch (res.data.status) {
            case "200":
              this.$message({
                type: "success",
                message: "注册成功！",
              });
              this.$store.commit("updateUserAccount", this.account);
              this.isShowAccount = !this.isShowAccount;
              break;
            case "201":
              this.$message({
                type: "error",
                message: "手机号已被注册，请重新输入手机号！",
              });
              break;
          }
        });
    },
    // 修改密码
    updatePwd(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          axios.put("http://localhost:8081/user/updatePwd", {
            uID: this.$store.state.userInfo.uid,
            pwd: this.pwdForm.pass,
          }).then(res => {
            this.$message({
              type: "success",
              message: "修改成功！"
            })
            this.isShowPwd = false;
          })
        } else {
          return false
        }
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

  .update {
    height: 100px;

    /deep/.el-input {
      width: 200px;
    }

    span,
    b {
      display: block;
      font-size: 12px;
      color: #959595;
    }

    .close {
      background: #45536c;
      margin: 0 10px;
    }
  }
}
</style>
