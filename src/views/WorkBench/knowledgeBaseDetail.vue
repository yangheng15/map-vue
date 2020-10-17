<template>
  <div class="knowledgeBaseDetail">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='知识库详情'">
      <div class="knowledge">
        <h1 class="knowledge_title">营销网格</h1>
        <p class="knowledge_date">发布时间:2020-08-24</p>
        <div class="knowledge_body">
          <img class="knowledge_img" src="../../assets/WorkBench/knowledge.jpg" alt />
          <p
            class="knowledge_text"
          >网格化营销，21世纪的市场营销环境面临着几个重大的变化，首先是市场极度细分，消费群体进一步分化，不同消费群体的数量逐渐变小，消费群体的划分趋向更细致；其次是个人网络服务的发展，尤其是以博客为代表的个人媒体大范围普及兴起，使得信息、广告、媒体向着以个人为单位的方向发展；另外，以快速消费品、电子产品、家居用品为代表的多个市场产品品种极大丰富，新技术的应用导致不断快速地出现新产品、新品牌，市场竞争日趋白热化,广告、渠道、促销等营销工具的张力大大降低，在这方面的投资收益比越来越差，企业和消费者共同面临广告、渠道、促销疲劳症状。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
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

  methods: {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.knowledgeBaseDetail {
  padding-top: 46px;
}
.knowledge {
  padding: 15px;
  text-align: center;
}
.knowledge_title {
  font-size: 20px;
  margin: 0px;
}
.knowledge_date {
  margin: 15px 0px;
}
.knowledge_body {
  border-top: 1px dotted #bbb;
  padding-top: 10px;
}
.knowledge_img {
  width: 100%;
}
.knowledge_text {
  text-indent: 25px;
  line-height: 28px;
  text-align: left;
}

@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
