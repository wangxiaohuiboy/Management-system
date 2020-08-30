<template>
  <div class="error">
      <span @click="routerindex">返回首页</span>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods:{
      routerindex(){
          this.$router.push("/homepage")
      }
  }
};
</script>
 
<style lang = "less" scoped>
.error {
    height: 100vh;
    background: url('../assets/画板 1.png');
    background-size: 100%;
    position: relative;
    span{
        position: absolute;
        left: 10.6%;
        bottom: 13%;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        display: block;
        padding: 6px 30px;
    }
}
</style>