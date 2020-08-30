<template>
  <div class="header">
    <div class="header-left">
      <h3>商品管理系统</h3>
      <i @click="switchSidebar" class="el-icon-menu"></i>
    </div>
    <el-dropdown @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        admin
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        localStorage.removeItem("token");
        window.location.reload();
      }
    },
    // 切换侧边栏
    switchSidebar() {
      //展开收起
      this.$store.commit("setisCollapse");
      //缩小侧边栏
      
    },
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
.el-dropdown-menu {
  top: 45px !important;
}
</style>