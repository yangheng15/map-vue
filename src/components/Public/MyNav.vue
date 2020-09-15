<template>
  <div class="public_nav">
    <van-nav-bar :title="title"></van-nav-bar>
  </div>
</template>

<script>
// import { Button } from 'vant';
export default {
  name: "MyNav",
  props: {
    title: {
      default: '',
      type: String
    }
  },
  data () {
    return{

    }
  },
  created() {
    console.log(this.title);
  }
};
</script>
<style scoped>
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar__title {
  color: #ffffff !important;
}
</style>
