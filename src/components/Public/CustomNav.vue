<template>
  <div class="public_nav">
    <van-nav-bar :title="title">
      <template #right>
        <img @click="$router.push('../../Home/Remind')" src="../../assets/images/remind.svg" alt />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "CustomNav",
  props:['title'],
  data () {
    return{}
  }
};
</script>
<style scoped>
.public_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
.van-nav-bar__right img{
  width: 20px;
}
</style>
