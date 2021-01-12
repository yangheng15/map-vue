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
      <van-list
              v-model="loadEnd"
              :finished="finishEnd"
              :offset="offset"
              finished-text="已加载完毕"
              @load="onLoadList"
              class="customer_list"
      >
        <ul>
          <router-link
            class="knowledgeBody"
            tag="ul"
            :to="{ name: 'knowledgeBaseDetail', query: { title: '知识库详情', id: item.id } }"
            v-for="(item, index) in MarketingRecord"
            :key="index"
          >
            <li class="knowledge">
              <p>{{ item.name }}</p>
              <p>{{ item.createdTime | transform }}</p>
              <p class="right_cursor">
                <van-icon name="arrow" />
              </p>
            </li>
          </router-link>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "knowledgeBase",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      MarketingRecord: [],
      loadEnd: false, // 滚动加载中
      finishEnd: false, // 滚动加载完成
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
      currentPage: 1,
      pageSize1: 10,
      dataTotal: "",
      search_txt: "",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    onLoadList() {
      this.getMyClients();
    },
    getMyClients() {
      this.$httpGet({
        url: "/api/knowledgeBase/query",
        params: {
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
          publishStatus: 1,
          name: this.search_txt,
        },
      }).then((res) => {
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize1) {
          this.MarketingRecord = res.data;
        } else {
          this.currentPage++;
          let arr = res.data;
          this.MarketingRecord = this.MarketingRecord.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.MarketingRecord.length >= this.dataTotal) {
          this.finishEnd = true; //结束，显示我也是有底线的
        }
      });
    },
    onSearch() {
      this.currentPage = 1;
      this.pageSize1 = 10;
      this.$httpGet({
        url: "/api/knowledgeBase/query",
        params: {
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
          publishStatus: 1,
          name: this.search_txt,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
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
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
