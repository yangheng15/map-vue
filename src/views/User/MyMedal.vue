<template>
  <div class="MyMedal">
    <child-nav :title="typeCN"></child-nav>

  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "MyMedal",
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {

  },
  mounted() {},
};
</script>

<style scoped>
.MyMedal {
  margin-top: 46px;
}
</style>
