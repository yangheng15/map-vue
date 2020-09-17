<template>
  <div class="MyMedal">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="title=='我的勋章'">
      <div class="customer_list">
        <ul v-for="(thisItem,index) in peasant_household" :key="index">
          <li>
            <img src="../../assets/User/medal.png" alt class="li_img" />
            <p>{{thisItem.name}}</p>
            <p>{{thisItem.date}}</p>
          </li>
        </ul>
      </div>
      <div class="end_line">已加载完毕</div>
      <!-- <div
        style="margin-left:85%;position: fixed !important;float: right;z-index: 1;align-items: right;bottom: 50px;right:5%"
      ></div>-->
    </div>
    <div v-if="title=='我的足迹'">
      <ul class="time_vant" style="margin:0rem">
        <li>
          <van-cell title="选择日期区间" :value="date" @click="show = true" />
          <van-calendar v-model="show" type="range" @confirm="onConfirm" />
        </li>
        <!-- <p class="line">
          <span></span>
        </p>
        <li>
          <van-cell style="border-radius: 0.3rem;" :value="date1" @click="show1 = true" />
          <van-calendar v-model="show1" @confirm="onConfirm1" />
        </li>-->
        <li class="time_search">
          <button>查询</button>
        </li>
      </ul>
      <div class="Footprint_list" v-for="(thisItem,index) in Footprintlist" :key="index">
        <ul>
          <li>{{thisItem.name}}</li>
          <li>{{thisItem.date}}</li>
        </ul>
        <ul>
          <li>{{thisItem.local}}</li>
          <li>
            <img style="width:1.2rem" src="../../assets/User/zuji.svg" alt />
          </li>
        </ul>
      </div>
      <div class="end_line">已加载完毕</div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import con1 from "../../assets/User/medal.png";
export default {
  name: "MyMedal",
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
      peasant_household: [
        {
          img: con1,
          name: "跑动达人",
          date: "2020-09-09",
        },
        {
          name: "月度冠军",
          date: "2020-09-09",
        },
        {
          name: "年度优秀",
          date: "2020-09-09",
        },
      ],
      Footprintlist: [
        {
          name: "赵敏",
          date: "2020-09-09 9:00",
          local: "北京市石景山区政达路6号中惠国际大厦",
        },
        {
          name: "李峰",
          date: "2020-09-09 9:00",
          local: "北京市石景山区政达路6号中惠国际大厦",
        },
        {
          name: "张红",
          date: "2020-09-09 9:00",
          local: "北京市石景山区政达路6号中惠国际大厦",
        },
      ],
      show: false,
      show1: false,
      date: " ",
      date1: "结束日期",
      isShowSearch: "true",
      type: "Wholeheartedly",
      isLGB: true,
      controlList: "",
      isDetele: true,
      isInTime: true,
      startSubmitDate: 20200306,
      endSubmitDate: 20200915,
      // isshow:true,
      pictureId: 0,
      baseUrl: "/lgbsmp/api/v1/attachment/download?id=",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    formatDate(date) {
      // var d = new Date(date),
      //   month = "" + (d.getMonth() + 1),
      //   day = "" + d.getDate(),
      //   year = d.getFullYear();
      // if (month.length < 2) month = "0" + month;
      // if (day.length < 2) day = "0" + day;
      // return `${year}-${month}-${day}`;
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    onConfirm1(date1) {
      this.show1 = false;
      this.date1 = this.formatDate(date1);
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    onItemRemove(item, callback) {
      $dialog
        .confirm({
          content: "是否要删除这条信息？",
          okText: "确定",
        })
        .then((confirmResult) => {
          if (confirmResult) {
            console.log("Remove Item:", item);

            $loading.show("数据提交中...");
            this.$axios
              .delete(
                "/lgbsmp/api/v1/exchangeAndInteraction?token=" + this.token,
                {
                  data: {
                    ids: [item.id],
                  },
                }
              )
              .then((res) => {
                $loading.hide();
                console.log("请求res:", res);
                if (res.resultMessage == "success") {
                  callback();
                }
              });
          }
        });
    },

    showItemView(item) {
      this.$store.commit("clearReadNum", item.id);
      this.$router.push(
        "/LGBCollege/WholeheartedlyView?id=" +
          item.id +
          "&type=Wholeheartedly&plan=2"
      );
    },
    getDataList(applyListFunction, pageNum, keywords) {
      this.$axios
        .get(
          "/lgbsmp/api/v1/exchangeAndInteraction?selectPlan=2&type=Wholeheartedly&subjectOrRealName=" +
            keywords +
            "&limit=100&page=" +
            pageNum +
            "&token=" +
            this.token
        )
        .then(applyListFunction);
    },
    date2string(v) {
      return this.$seeks.date2string(v);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.MyMedal {
  margin-top: 46px;
}
.c-row-label {
  width: 40px;
}
.c-badge {
  color: #fff;
}
.end_line {
  margin: 0.8rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.triangle-up {
  width: 0;
  height: 0;
  border-top: 30px solid rgb(180, 180, 180);
  border-right: 30px solid transparent;
}
.customer_list ul {
  background: #fff;
  margin-top: 10px;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem 0.8rem;
}
.customer_list ul li p {
  width: 40%;
  margin-bottom: 0.3rem;
}
.customer_list ul li {
  text-align: center;
  margin-left: 0.8rem;
  /* margin-right: 0.8rem; */
}
.customer_list ul li p:nth-child(even) {
  text-align: left;
  margin-left: 0.8rem;
  /* margin-right: 0.8rem; */
}
.customer_list ul li p:last-child {
  text-align: right;
  margin-left: 0.8rem;
  /* margin-right: 0.8rem; */
}
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
.customer_list ul .li_img {
  width: 1.3rem;
  margin-top: -0.5rem;
}
.time_vant {
  margin: 0.5rem !important;
  display: flex;
}
.line {
  text-align: center;
  width: 3rem;
  margin: 0;
  line-height: 2rem;
}
.line span {
  display: inline-block;
  width: 3rem;
  height: 0.05rem;
  background: #bbb;
  text-align: center;
}
.time_vant .time_search {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
.time_vant .time_search button {
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  border-radius: 0.3rem;
  border: none;
}
.time_vant li {
  margin: 0rem;
  border: 0.05rem solid #e8e8e8;
  width: 70%;
}
.Footprint_list {
  margin: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.Footprint_list ul {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 0.8rem;
  }
  .latest_tasks ul li {
    font-size: 0.7rem;
  }
  .latest_tasks ul {
    margin: 0;
  }
  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .pop_title {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .pop_content {
    padding: 0.5rem;
  }
  .save {
    padding-bottom: 2rem;
  }
}
</style>
