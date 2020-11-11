<template>
  <div class="remind">
    <child-nav :title="title"></child-nav>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="screenChange1"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="screenChange2"
      />
    </van-dropdown-menu>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <div
      v-for="(item, index) in recent_contact"
      :key="index"
      class="latest_tasks"
    >
      <ul>
        <li style="font-weight: 550">{{ item.typeName }}</li>
        <li class="set_up" @click="updateStatus(item)">
          {{
            item.status == 1 ? "设为已读" : item.status == 2 ? "设为未读" : ""
          }}
        </li>
        <li>{{ item.createdTime | transform }}</li>
      </ul>
      <ul>
        <li>{{ item.content }}</li>
      </ul>
    </div>
    </van-list>
    <!-- <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider> -->
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { Dialog, Toast } from "vant";
export default {
  name: "Remind",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "提醒",
      recent_contact: [],
      value1: "0",
      value2: "0",
      option1: [],
      option2: [],
      loading: false,
      finished: false,
      throttleTime: {
        lastTime: 0,
        nowTime: 0
      }
    };
  },
  created() {
    this.dic_nation();
    // this.queryTask();
  },
  methods: {
    queryTask() {
      let _username = localStorage.getItem("username");
      return this.$httpGet({
        url: "/api/userMessage/query",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.recent_contact = res.data;
      })
    },
    dic_nation() {
      this.$httpGet({
        url: "/dic/type/dic_message_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ value: it.code, text: it.codeText });
          }
        });
        this.option1 = transformDara;
      });
      this.$httpGet({
        url: "/dic/type/dic_message_status",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ value: it.code, text: it.codeText });
          }
        });
        this.option2 = transformDara;
      });
    },
    screenChange1(val) {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/userMessage/query",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
          type: val,
        },
      }).then((res) => {
        this.recent_contact = res.data;
      });
    },
    screenChange2(val) {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/userMessage/query",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
          status: val,
        },
      }).then((res) => {
        this.recent_contact = res.data;
      });
    },
    updateStatus(item) {
      this.throttleTime.nowTime = new Date().getTime();
      if(this.throttleTime.nowTime - this.throttleTime.lastTime > 2000) {
           this.throttleTime.lastTime = this.throttleTime.nowTime;
           this.$httpPut({
            url: "/api/userMessage/updateMessageStatus",
            params: {
              messageId: item.id,
            },
          }).then((res) => {
            if (res.code == 400) {
              Toast({
                message: res.resultMessage,
                position: "middle",
              });
            } else {
              this.queryTask();
              Toast({
                message: res.resultMessage,
                position: "middle",
              });
            }
          });
      }
     
    },
    onLoad() {
      console.log(123);
      this.queryTask().then(() => {
        this.finished = true
      })
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.recent_contact.push(this.recent_contact.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.recent_contact.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
};
</script>
<style scoped>
.remind {
  padding-top: 46px;
}
.latest_tasks {
  margin: 0px;
  padding: 7px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}
.latest_tasks ul {
  display: flex;
  justify-content: space-between;
  margin: 7px;
}
.latest_tasks ul li {
  font-size: 14px;
}
.set_up {
  color: #1432e3;
}
.van-dropdown-menu >>> .van-dropdown-menu__bar {
  box-shadow: none;
  border-bottom: 1px solid #e8e8e8;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  .latest_tasks ul li {
    font-size: 13px;
  }
}
</style>
