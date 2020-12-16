<template>
  <div class="ProductCatalogDetail">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '产品目录详情'" style="background: #f5f5f5">
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
        <!-- <van-uploader
          result-type="dataUrl"
          :after-read="afterRead"
          v-model="fileList"
          multiple
        /> -->
        <van-image v-for="(item,index) in uploader" :key="index" width="80" height="80" :src="item.url" />
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import img from "../../assets/WorkBench/qiyedai.jpg";
export default {
  name: "ProductCatalogDetail",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      id: "",
      productInformation: "",
      fileList: [{ url: "" }],
      uploader: [],
      pictureId:[]
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.getProductInformation();
  },
  updated() {},
  methods: {
    afterRead(file) {
      let formData = new FormData();
      // if (file.size / 1024 > 1025) {
        //文件大于1M（根据需求更改），进行压缩上传
        this.compressImg(file.file, (base64Codes) => {
          let bl = this.base64UrlToBlob(base64Codes, file.file.name);
          formData.append("file", bl); // 文件对象
          this.$httpPost({
            url: "/api/upload/attachment",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          }).then((res) => {
            this.pictureId = res.data.pid;
          });
        });
      // } else {
      //   formData.append("file", file.file);
      //   this.$httpPost({
      //     url: "/api/upload/attachment",
      //     headers: { "Content-Type": "multipart/form-data" },
      //     data: formData,
      //   }).then((res) => {
      //     this.pictureId.push(res.data.pid);
      //   });
      // }
    },
    //压缩图片方法
    compressImg(file, callback) {
      var src;
      var fileSize = parseFloat(parseInt(file["size"]) / 1024 / 1024).toFixed(
        2
      );
      var read = new FileReader();
      read.readAsDataURL(file);
      read.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;
        img.onload = function () {
          //默认按比例压缩
          var w = this.width,
            h = this.height;
          //生成canvas
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          var base64;
          // 创建属性节点
          canvas.setAttribute("width", w);
          canvas.setAttribute("height", h);
          ctx.drawImage(this, 0, 0, w, h);
          // if(fileSize<1){
          //   //如果图片小于一兆 那么不执行压缩操作
          //   base64 = canvas.toDataURL(file['type'], 1);
          // }else if(fileSize>1&&fileSize<2){
          //   //如果图片大于1M并且小于2M 那么压缩0.5
          //   base64 = canvas.toDataURL(file['type'], 0.5);
          // }else{
          //如果图片超过2m 那么压缩0.2
          base64 = canvas.toDataURL(file["type"], 0.2);
          // }
          // 回调函数返回file的值
          callback(base64);
        };
      };
    },
    /*这里转blob*/
    base64UrlToBlob(urlData, filename) {
      let arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // return new Blob([u8arr], {type:mime});
      //转file
      return new File([u8arr], filename, { type: mime });
    },
    getProductInformation() {
      this.$httpGet({
        url: `/api/productsInfo/get/${this.id}`,
      }).then((res) => {
        this.pictureId = res.data.url
        ? res.data.url.split(",")
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
        this.productInformation = res.data;
      }); 
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
.ProductCatalogDetail {
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

@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
