<template>
  <div class="public_nav">
    <van-nav-bar>
      <template #title>
        <h4 style="color:#fff">{{title}}</h4>
      </template>
      <template #right>
        <img @click="$router.push('/remind')" src="../../assets/images/remind.svg" alt />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
// import { Button } from 'vant';
export default {
  name: "CustomNav",
  props:['title'],
  data () {
    return{

    }
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
