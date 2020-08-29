<template>
  <div class="menu">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#324056"
      text-color="#BFCBD9"
      active-text-color="#20A0FF"
      :unique-opened="true"
    >
      <el-submenu :index="index+''" v-for="(item,index) in menuArr" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
          v-for="(items,indexs) in item.subArr"
          :key="indexs"
          :index="items.index"
        >{{items.text}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      menuArr: [
        {
          title: "商品管理",
          icon: "el-icon-s-tools",
          subArr: [
            {
              text: "商品列表",
              index: "1-1",
            },
            {
              text: "商品分类",
              index: "1-2",
            },
            {
              text: "品牌管理",
              index: "1-3",
            },
            {
              text: "商品属性管理",
              index: "1-4",
            },
          ],
        },
        {
          title: "订单中心",
          icon: "el-icon-s-management",
          subArr: [
            {
              text: "订单列表",
              index: "2-1",
            },
          ],
        },
        {
          title: "店铺运营",
          icon: "el-icon-service",
          subArr: [
            {
              text: "专题管理",
              index: "3-1",
            },
            {
              text: "运营数据",
              index: "3-2",
            },
          ],
        },
      ],
    };
  },
};
</script>
 
<style lang = "less" scoped>
.menu {
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  background: rgb(50, 65, 87);
  overflow-y: auto;
  .el-menu {
    width: 250px;
    background: rgb(50, 65, 87);
  }
}
.menu::-webkit-scrollbar {
  width: 0;
}
</style>