<template>
  <div class="home">
    <custom-nav :title="title"></custom-nav>
    <div class="page-content">
      <dl class="data_img">
        <dt v-for="(statistic,index) in my_statistics" :key="index">
          <ul class="text_content">
            <li>
              <img class="img_content" :src="statistic.img" alt />
              <p style="margin:0;">{{statistic.name}}</p>
            </li>
            <li>
              <p class="total_money">{{statistic.num}}万</p>
              <p :class="statistic.state?'up_color':'down_color'">
                {{statistic.money}}万
                <img
                  style="width:15px;vertical-align: text-top;"
                  :src="statistic.up_down"
                  alt
                />
              </p>
            </li>
          </ul>
        </dt>
      </dl>
      <dl class="progress_content">
        <dt>本月任务执行</dt>
        <!-- <dd>
          <div class="progress">
            <div class="progress-done" data-done="68" style="width: 62%;">62%</div>
          </div>
        </dd>-->
      </dl>
      <ul class="data_display">
        <li>
          <p>执行中</p>
          <p class="data_num">10</p>
        </li>
        <li>
          <p>即将过期</p>
          <p class="data_num">10</p>
        </li>
        <li>
          <p>已经过期</p>
          <p class="data_num">10</p>
        </li>
        <li>
          <p>成功完成</p>
          <p class="data_num">6</p>
        </li>
        <li>
          <p>失败</p>
          <p class="data_num">20</p>
        </li>
      </ul>
      <div class="tabTitle">
        <ul class="tabList">
          <li @click="tab(0)" :class="tabId==0?'cur':''">最新任务</li>
          <li @click="tab(1)" :class="tabId==1?'cur':''">最近联系客户</li>
        </ul>
        <div v-show="tabId===0">
          <router-link
            v-for="(item,index) in latest_tasks"
            :key="index"
            class="latest_tasks"
            tag="div"
            :to="{ name: 'MissionDetails', query: { title: '任务详情' }}"
          >
            <ul>
              <li style="font-weight:600">{{item.name1}}</li>
              <li>{{item.menoy}}</li>
            </ul>
            <ul>
              <li>{{item.name2}}</li>
              <li>{{item.date}}</li>
            </ul>
          </router-link>
        </div>
        <div v-show="tabId===1">
          <div v-for="(item,index) in recent_contact" :key="index" class="latest_tasks">
            <ul>
              <li>{{item.name1}}</li>
              <li>
                {{item.telephone}}
                <img style="width:16px" src="../../assets/home/md-phone.svg" alt />
              </li>
            </ul>
            <ul>
              <li>{{item.name2}}</li>
              <li>{{item.date}}</li>
            </ul>
          </div>
          <!-- <div
            style="text-align: center;padding: 30px;color: #aaaaaa;padding-top:0px;"
            @click="$router.push('/ContentManage/ArticleList4Notice/wttdfczs?title=待办事项')"
          >
            加载更多
            <i class="icon ion-ios-arrow-right"></i>
          </div>-->
        </div>
      </div>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>

<script>
import CustomNav from "../../components/Public/CustomNav";
import MyTabbar from "../../components/Public/MyTabbar";
import kehushu from "../../assets/home/kehushu.svg";
import cunkuane from "../../assets/home/cunkuane.svg";
import daikuane from "../../assets/home/daikuane.svg";
import licaie from "../../assets/home/licaie.svg";
import up from "../../assets/home/arrow-alt-up.svg";
import down from "../../assets/home/arrow-alt-down.svg";
export default {
  name: "Home",
  data() {
    return {
      title: "首页",
      istrue: 0,
      tabId: 0,
      items: [],
      infiniteCount: 0,
      loginInfo: {
        token: "",
        isLgbWorker: 0,
      },
      isloaded: false,
      newsList: [],
      voluntaryURL: "",
      userId: "",
      imgList: [],
      PayList: [],
      newsLists: [],
      swiperList: [],
      noticeList: [],
      LGBActivityBadge: 0,
      customsNum: 0,
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
        },
        speed: 1000,
        autoplay: {
          delay: 1000,
          autoplayDisableOnInteraction: true,
          disableOnInteraction: false,
        },
        effect: "slide",
      },
      swiperNotice: {
        loop: true,
        direction: "vertical",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
        },
        speed: 1000,
        autoplay: {
          delay: 2500,
          autoplayDisableOnInteraction: true,
          disableOnInteraction: false,
        },
        effect: "slide",
      },
      latest_tasks: [
        {
          name1: "产品营销",
          menoy: "30万/100万",
          name2: "企业贷",
          date: "2020-08-30日前",
          id: 1,
        },
        {
          name1: "资料采集",
          menoy: "10户/30户",
          name2: "农户家庭",
          date: "2020-08-30日前",
          id: 2,
        },
        {
          name1: "资料采集",
          menoy: "10户/30户",
          name2: "农户家庭",
          date: "2020-08-30日前",
          id: 3,
        },
      ],
      recent_contact: [
        {
          name1: "陈昱晓",
          telephone: "18612280988",
          name2: "企业贷",
          date: "1天前",
        },
        {
          name1: "李亚楠",
          telephone: "18612280988",
          name2: "理财",
          date: "2天前",
        },
        {
          name1: "吴宇迪",
          telephone: "18612280988",
          name2: "资料采集",
          date: "2天前",
        },
      ],
      my_statistics: [
        {
          img: kehushu,
          name: "客户数",
          num: "10",
          money: "21",
          up_down: up,
          state: true,
        },
        {
          img: cunkuane,
          name: "存款额",
          num: "100",
          money: "20",
          up_down: up,
          state: true,
        },
        {
          img: daikuane,
          name: "贷款额",
          num: "100",
          money: "21",
          up_down: down,
          state: false,
        },
        {
          img: licaie,
          name: "理财额",
          num: "100",
          money: "20",
          up_down: up,
          state: true,
        },
      ],
    };
  },
  components: {
    CustomNav,
    MyTabbar,
  },
  methods: {
    tab(ev) {
      this.tabId = ev;
      // localStorage.setItem("indexTabId", this.tabId);
    },
  },
};
</script>
<style scoped lang='scss'>
.home {
  padding-top: 46px;
}
.cur {
  color: #df0f0f;
  font-weight: 500;
  font-size: 14px;
  position: relative;
}
.cur::after {
  position: absolute;
  content: "";
  top: 65%;
  left: 3%;
  width: 92%;
  height: 1px;
  background: #df0f0f;
}
.page-content {
  padding-top: 0px;
}

.data_img {
  display: flex;
  flex-wrap: wrap;
  margin: 0px;

  dt {
    width: 45%;
    margin: 2%;
    border: 1px solid #e1e1e1;
    background-color: #f2f2f2;
    display: flex;
    border-radius: 5px;

    .img_content {
      width: 45px;
      border-radius: 5px;
    }
    .text_content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 5px;

      li {
        width: 50%;
        text-align: center;
        color: #000;
        .up_color {
          color: #3cc8ab;
          margin: 0;
        }
        .down_color {
          color: #df0f0f;
          margin: 0;
        }
      }
    }
    .total_money {
      font-size: 20px;
      margin-top: 4px;
      margin-bottom: 15px;
      color: #000;
    }
  }
}
.progress_content {
  margin-left: 2%;
  color: #878787;
}
.progress_content,
.progress_content dt {
  margin-bottom: 10px;
}
.progress {
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 26px;
  width: 96%;
  border: 1px solid #cecece;
  border-radius: 5px;
}
.progress-done {
  /* background: linear-gradient(to left, rgb(52, 204, 1), rgb(247, 247, 203)); */
  background: linear-gradient(to left, rgb(242, 112, 156), rgb(245, 212, 103));
  box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156);
  border-radius: 5px;
  height: 26px;
  width: 0;
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 5px;
  line-height: 26px;
}
.data_display {
  width: 96%;
  margin-left: 2%;
  display: flex;

  li:first-child {
    margin-left: 0;
  }
  li {
    width: 18.6%;
    height: 60px;
    border-radius: 6px;
    background-color: #f2f2f2;
    margin-left: 7px;
    font-size: 14px;

    p {
      margin: 0;
      line-height: 30px;
      text-align: center;
    }
  }
}
.data_num {
  color: #fa9049;
  font-size: 16px;
}
.tabTitle {
  border-top: 0px;
  margin-top: 20px;
}
.tabList {
  display: flex;
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #f2f2f2;
  justify-content: space-around;
  font-size: 14px;
}
.latest_tasks {
  margin: 10px;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8 !important;
}
.latest_tasks ul {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  .page-content .data_img dt .img_content {
    width: 40px;
  }
  .page-content .data_img dt .text_content li {
    font-size: 12px;
  }
  .page-content .progress_content dt {
    font-size: 13px;
  }
  .progress {
    height: 15px;
  }
  .progress-done {
    height: 15px;
  }
  .data_display li p {
    font-size: 13px;
  }
  .tabTitle {
    margin-top: 20px;
  }
  .tabList {
    height: 40px;
    font-size: 13px;
    line-height: 40px;
  }
  .cur {
    font-size: 13px;
  }
  .cur::after {
    top: 70%;
  }
  .latest_tasks {
    font-size: 13px;
  }
}
</style>


