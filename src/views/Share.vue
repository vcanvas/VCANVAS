<template>
  <div id="share" style="background-color:rgba(0,0,0,.1)">
    <div class="s-head" style="width:100%">
      <Top></Top>
      <img
        src="../../static/inner_banner.jpg"
        alt=""
        style="width:100%;height:250px"
      />
      <Nav></Nav>
    </div>
    <div class="s-main">
      <div class="s-main-p">
        <div class="s-main-p-upload">
          <el-input
            type="textarea"
            placeholder="说点什么吧..."
            v-model="share_input_txt"
            maxlength="200"
            show-word-limit
          >
          </el-input>
          <input
            ref="upload_img"
            type="file"
            name=""
            id="upload-image"
            accept=".jpg,.png,.jpeg"
            multiple
          />
          <div class="submit-upload" @click="submit()">
            发表
          </div>
        </div>
      </div>
      <div class="s-main-container">
        <el-empty v-show="isEmpty" description="空空如也"></el-empty>
        <div class="card" v-for="(v, i) in cards" :key="i">
          <div class="c-top">
            <div class="c-name">
              {{ v.username }}
            </div>
            <div class="c-date">
              {{ v.date }}
            </div>
          </div>
          <div class="c-con">
            {{ v.content }}
          </div>
          <div v-show="v.has_img == 'true'" class="c-img">
            <img :src="v.img" alt="" srcset="" />
          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import Top from "../components/top.vue";
import Foot from "../components/foot.vue";
import { UpdateShareAPI, GetShareAPI } from "@/http/api.ts";
import { formatTime } from "@/utils/index.ts";
export default {
  components: { Nav, Foot, Top },
  data() {
    return {
      share_input_txt: "",
      filereader: new FileReader(),
      cards: [],
      isEmpty: true
    };
  },
  methods: {
    //将选择的图片转化为base64
    getBase64() {
      const up = this.$refs.upload_img;
      up.addEventListener("change", () => {
        this.filereader.readAsDataURL(up.files[0]);
      });
    },
    async submit() {
      const params = {
        username: localStorage.getItem("username"),
        txt: this.share_input_txt,
        img: this.filereader.result,
        date: formatTime(new Date())
      };
      if (!!localStorage.getItem("username")) {
        let res = await UpdateShareAPI(params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        if (res.data.status == "fail") {
          this.$Message.error(res.data.msg);
        } else {
          this.share_input_txt = "";
          this.getCards();
        }
      } else {
        this.$message.error("请先登录");
      }
    },
    async getCards() {
      let result = await GetShareAPI();
      if (result.data.status == "success") {
        this.cards = result.data.data;
        this.isEmpty = this.cards.length == 0 ? true : false;
      } else {
        this.$message.error(result.data.msg);
      }
    }
  },
  mounted() {
    this.getBase64();
  },
  created() {
    this.getCards();
  }
};
</script>

<style lang="less">
.el-textarea {
  width: 100%;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 10px;
  textarea {
    height: 150px;
    border: 1px solid #409eff;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
.s-main {
  width: 80%;
  margin: 0 auto;
  min-height: 500px;
  padding-bottom: 30px;
  .s-main-p {
    background-color: #fff;
    margin: 20px auto;
    height: 250px;
    padding-bottom: 20px;
    padding-top: 30px;
    .s-main-p-upload {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      margin: 0 auto;
      justify-content: space-between;
    }
  }
  .s-main-container {
    padding: 50px 0 20px;
    width: 100%;
    min-height: 350px;
    margin: 0 auto;
    background-color: #fff;
    .card {
      width: 90%;
      margin: 0 auto 50px;
      background-color: rgba(250, 250, 250, 0.418);
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.418);
      padding-bottom: 10px;
      border-radius: 15px;
      .c-top {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #333;
        position: relative;
        .c-name {
          position: absolute;
          left: 10px;
          top: 10px;
          font-size: 25px;
        }
        .c-date {
          position: absolute;
          right: 10px;
          top: 35px;
          color: #333;
        }
      }
      .c-con {
        text-align: left;
        width: 100%;
        padding: 20px 20px;
      }
      .c-img {
        overflow: hidden;
        padding: 10px 20px;
        img {
          width: 100px;
          height: 100px;
          float: left;
        }
      }
    }
  }
}
#upload-image {
  height: 28px;
  position: relative;
  outline: none;
  &::before {
    content: "选择图片";
    position: absolute;
    height: 25px;
    padding: 0px 8px;
    line-height: 25px;
    top: 0;
    left: 0;
    background-color: #fff;
    border: 1px solid #409eff;
  }
}
.submit-upload {
  width: 100px;
  height: 30px;
  border: 1px solid #409eff;
  line-height: 30px;
  border-radius: 13px;
  cursor: default;
  user-select: none;
  &:hover {
    border-color: #333;
  }
}
</style>
