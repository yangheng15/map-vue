<template>
  <div class="knowledgeBase">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '知识库'">
      <van-search
        v-model="search_txt"
        placeholder="请输入标题"
        @search="onSearch"
        show-action
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template></van-search
      >
      <router-link
        class="knowledgeBody"
        tag="ul"
        :to="{ name: 'knowledgeBaseDetail', query: { title: '知识库详情' } }"
      >
        <li class="knowledge" v-for="(item, index) in knowledge" :key="index">
          <p>{{ item.name }}</p>
          <p>{{ item.date }}</p>
          <p class="right_cursor">
            <van-icon name="arrow" />
          </p>
        </li>
      </router-link>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import echarts from "echarts";
import { option } from "./gauge-option";
export default {
  name: "knowledgeBase",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      knowledge: [
        {
          name: "营销网格",
          date: "发布时间:2020-10-24",
          id: 1,
        },
        // {
        //   name: "企业贷",
        //   date: "发布时间:2020-08-24",
        //   id: 2,
        // },
      ],
      search_txt: "",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    onSearch() {
    },
  },
  mounted() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
p {
  margin: 7px 0px;
}
.van-search {
  width: 100%;
}
.knowledgeBase {
  padding-top: 46px;
}
.knowledgeBody .knowledge {
  border-bottom: 1px solid #e8e8e8;
  padding: 5px 10px;
  position: relative;
}
.knowledgeBody .knowledge .right_cursor {
  position: absolute;
  right: 10px;
  margin: 0;
  top: 32%;
}
.knowledge ul .right_cursor img {
  width: 1.5rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
