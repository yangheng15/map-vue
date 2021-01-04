<template>
  <div class="ProductIntroduction">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '产品介绍'" style="background: #f5f5f5">
      <p class="productName">产品名称：{{ productInformation.name }}</p>
      <p class="productTitle">产品描述</p>
      <van-field
        v-model="productInformation.productDesc"
        rows="10"
        autosize
        label
        type="textarea"
        maxlength="500"
        placeholder="请输入产品描述"
        show-word-limit
      />
      <p class="productTitle">营销话术</p>
      <van-field
        v-model="productInformation.talk"
        rows="10"
        autosize
        label
        type="textarea"
        maxlength="500"
        placeholder="请输入营销话术"
        show-word-limit
      />
      <p class="productTitle">宣传资料</p>
      <div class="productImg">
        <van-uploader
          result-type="dataUrl"
          :after-read="afterRead"
          :max-count="1"
          v-model="fileList"
          multiple
        />
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import img from "../../assets/WorkBench/qiyedai.jpg";
export default {
  name: "ProductIntroduction",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      productCode: "",
      productInformation: "",
      fileList: [{ url: "" }],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.productCode = this.$route.query.productCode;
    this.getProductInformation();
  },
  updated() {},
  methods: {
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$httpPost({
        url: "/api/upload/attachment",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((res) => {
        this.pictureId = res.data.pid;
      });
    },
    getProductInformation() {
      this.$httpGet({
        url: "/api/productsInfo/getByCode",
        params: {
          code: this.productCode,
        },
      }).then((res) => {
        this.productInformation = res.data;
        this.editPicture();
      });
    },

    editPicture() {
      if (this.productInformation.url) {
        this.$httpGet({
          url: "/api/show/image/base64",
          params: {
            id: this.productInformation.url,
          },
        }).then((res) => {
          this.fileList[0].url = "data:image/jpg;base64," + res.data;
          this.fileList[0].isImage = true;
        });
      }
    },
  },
  beforeDestroy() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
p {
  margin: 0;
}
.ProductIntroduction {
  padding-top: 46px;
}
.productName {
  background-color: #fff;
  padding: 10px 5px;
}
.productTitle {
  padding: 8px 5px;
}
.productImg {
  padding: 15px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
