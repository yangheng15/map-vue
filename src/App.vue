<template>
  <div id="app">
    <router-view />
    <!-- <CustomerPool></CustomerPool>
    <ScreenCustomerPool></ScreenCustomerPool> -->
  </div>
</template>


<script>
import CustomerPool from "./views/WorkBench/CustomerPool/CustomerPool";
import ScreenCustomerPool from "./views/WorkBench/CustomerPool/ScreenCustomerPool";
export default {
  components: {
    CustomerPool,
    ScreenCustomerPool,
  },
  data() {
    return {};
  },
  methods: {},

  methods: {},

  created() {},
};
</script>


<style lang='scss'>
</style>