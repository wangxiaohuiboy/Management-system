<template>
  <div class="homepage">
    <my-header></my-header>
    <my-menu></my-menu>
    <my-content></my-content>
  </div>
</template>
 
<script>
import MyHeader from "./children/Header";
import MyMenu from "./children/Menu";
import MyContent from "./children/Content";
export default {
  components: {
    MyHeader,
    MyMenu,
    MyContent,
  },
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.homepage{
    height: 100vh;
    position: relative;
}
</style>