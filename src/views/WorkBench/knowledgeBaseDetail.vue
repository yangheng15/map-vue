<template>
  <div class="knowledgeBaseDetail">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='知识库详情'">
      <div class="knowledge">
        <h1 class="knowledge_title">{{ knowledgeInfo.name }}</h1>
        <p class="knowledge_date">发布时间：{{ knowledgeInfo.createdTime | transform }}</p>
        <div class="knowledge_body">
          <div class="knowledge_img">
            <van-image v-for="(item,index) in uploader" :key="index" width="100" height="100" :src="item.url" />
          </div>
          <p class="knowledge_text">
            {{ knowledgeInfo.content }}
          </p>
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
      title: "",
      id: "",
      knowledgeInfo: "",
      uploader: [],
      pictureId:[]
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.getKnowledgeDetail();
  },

  methods: {
    getKnowledgeDetail() {
      this.$httpGet({
        url: `/api/knowledgeBase/get/${this.id}`,
      }).then((res) => {
        this.pictureId = res.data.imgs
                ? res.data.imgs.split(",")
                : [];
        this.pictureId.forEach((el) => {
          this.$httpGet({
            url: "/api/show/image/base64",
            params: {
              id: el,
            },
          }).then((res) => {
            this.uploader.push({
              url: "data:image/jpg;base64," + res.data,
              isImage: true,
            });
          });
        });
        this.knowledgeInfo = res.data;
      });
    },

  },
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

@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
