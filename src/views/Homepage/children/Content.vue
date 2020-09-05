<template>
  <div class="content" :class="this.$store.state.isCollapse==true?'content-left':''">
    <router-view></router-view>
    <footer class="content-bottom">
      <section class="content-bottom-left">Copyright © 2019-2020 你大爷. All rights reserved.</section>
      <section class="content-bottom-right">Version 1.0.0</section>
    </footer>
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
.content {
  position: absolute;
  top: 70px;
  left: 250px;
  right: 0;
  bottom: 0;
  background: #f0f0f0;
  transition: all 0.4s;
  padding: 15px 15px 8px;
  .content-bottom {
    padding: 0 20px;

    .content-bottom-left {
      float: left;
    }
    .content-bottom-right {
      float: right;
    }
    section {
      font-size: 12px;
      color: #000;
      padding: 8px 0 0;
    }
  }
}
.content-left {
  left: 65px;
}
</style>