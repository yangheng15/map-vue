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
      default: "",
      type: String,
    },
  },
  data() {
    return {};
  },
  created() {},
};
</script>
<style scoped>
.public_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
</style>
