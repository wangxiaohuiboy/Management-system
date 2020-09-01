<template>
  <div class="content" :class="this.$store.state.isCollapse==true?'content-left':''">
    <router-view></router-view>
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
  background: pink;
  transition: all 0.4s;
  padding: 15px 15px 8px;
  
}
.content-left {
  left: 65px;
}
</style>