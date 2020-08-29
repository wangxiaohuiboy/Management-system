<template>
  <div class="header">
    <div class="header-left">
      <h3>商品管理系统</h3>
      <i class="el-icon-menu"></i>
    </div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.header {
  height: 70px;
  line-height: 70px;
  background: rgb(64, 158, 255);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .header-left {
    h3 {
      float: left;
      margin: 0;
      font-size: 22px;
      font-weight: normal;
      padding: 0 15px;
    }
    i {
      font-size: 20px;
      margin-top: 26px;
    }
  }
  .el-dropdown {
    float: right;
    font-size: 14px;
    color: #fff;
    padding: 0 15px;
  }
}
</style>