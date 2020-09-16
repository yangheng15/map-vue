<template>
  <div class="grid">
    <router-view></router-view>
    <my-tabbar></my-tabbar>
  </div>
</template>

<script>
import MyTabbar from "../../components/Public/MyTabbar";

export default {
  name: "Grid",
  components: {
    MyTabbar
  },
};
</script>


<style lang='scss'>

</style>