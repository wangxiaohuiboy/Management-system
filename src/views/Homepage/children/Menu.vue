<template>
  <div class="menu">
      <el-menu
        :default-active="activeRoute"
        class="el-menu-vertical-demo"
        :class="this.$store.state.isCollapse==true?'':'active'"
        background-color="#324056"
        text-color="#BFCBD9"
        active-text-color="#20A0FF"
        :unique-opened="true"
        :router="true"
        :collapse="this.$store.state.isCollapse"
      >
        <el-submenu :index="index+''" v-for="(item,index) in newmenuArr" :key="index">
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
      newmenuArr: [],
      menuArr: [
        {
          title: "商品管理",
          icon: "el-icon-s-tools",
          subArr: [
            {
              text: "商品列表",
              index: "/good",
            },
            {
              text: "商品分类",
              index: "/category",
            },
            {
              text: "品牌管理",
              index: "/brand",
            },
            {
              text: "商品属性管理",
              index: "/attribute",
            },
          ],
        },
        {
          title: "订单中心",
          icon: "el-icon-s-management",
          subArr: [
            {
              text: "订单列表",
              index: "/order",
            },
          ],
        },
        {
          title: "店铺运营",
          icon: "el-icon-service",
          subArr: [
            {
              text: "专题管理",
              index: "/topic",
            },
            {
              text: "运营数据",
              index: "/statdata",
            },
          ],
        },
      ],
    };
  },
  computed: {
    activeRoute() {
      return this.$route.path;
    },
  },
  created() {
    var menu = this.$store.state.menu;

    var newmenu = menu.reduce((prev, current) => {
      prev[current.path] = true;
      return prev;
    }, {});

    const newmenuArr = [];
    for (var i = 0; i < this.menuArr.length; i++) {
      const subArr = [];
      for (var j = 0; j < this.menuArr[i].subArr.length; j++) {
        let path = this.menuArr[i].subArr[j].index;
        if (newmenu[path]) {
          subArr.push(this.menuArr[i].subArr[j]);
        }
      }
      if (subArr.length > 0) {
        var obj = {
          ...this.menuArr[i],
          subArr: subArr,
        };
        newmenuArr.push(obj);
      }
    }
    this.newmenuArr = newmenuArr;
  },
};
</script>
 
<style lang = "less" scoped>
.menu {
  width: 100%;
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
  background: rgb(50, 65, 87);
  overflow-y: auto;
  .el-menu {
    width: 100%;
    background: rgb(50, 65, 87);
  }
}
.active {
  width: 250px;
}

.menu::-webkit-scrollbar {
  width: 0;
}
</style>