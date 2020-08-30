<template>
 <div class="content">
     <router-view></router-view>
 </div>
</template>
 
<script>
export default {
 data () {
 return {

 }
 }
}
</script>
 
<style lang = "less" scoped>
 .content{
     position: absolute;
     top: 70px;
     left: 250px;
     right: 0;
     bottom: 0;
     background: pink;
 }
</style>