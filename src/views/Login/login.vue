<template>
  <div id="login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <h2>电商管理系统</h2>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" },
        ],
      },
    };
  },
};
</script>
 
<style lang = "less" scoped>
#login {
  height: 100vh;
  background: #344a5f;
  overflow: hidden;
  .el-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    h2 {
      line-height: 30px;
      font-size: 24px;
      color: #fff;
      margin: 0;
      padding: 10px 0;
    }
    .el-input {
      width: 330px;
    }
    .el-button {
      width: 330px;
    }
  }
}
</style>