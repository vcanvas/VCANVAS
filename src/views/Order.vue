<template>
  <div id="order">
    <Top></Top>
    <img
      src="../../static/inner_banner.jpg"
      alt=""
      style="width:100%;height:250px"
    />
    <Nav></Nav>
    <div class="o-main">
      <el-empty v-show="isEmpty" description="空空如也"></el-empty>
      <div v-for="(v, i) in data" :key="i">
        <el-card class="box-card" shadow="hover">
          <div class="text item"><img :src="v.img" alt="" srcset="" /></div>
          <div class="text item">
            {{ v.name }}
            <span style="float:right;font-size:10px">￥{{ v.price }}</span>
          </div>
          <div class="text item" style="font-size:12px">{{ v.intro }}</div>
          <div class="text item">联系电话：{{ v.tel }}</div>
          <div class="text item">地址：{{ v.address }}</div>
          <div class="text item"><a href="#">点此前往订购</a></div>
        </el-card>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import { GetOrderAPI } from "@/http/api.ts";
import Nav from "../components/nav.vue";
import Top from "../components/top.vue";
import Foot from "../components/foot.vue";
export default {
  components: { Nav, Foot, Top },
  data() {
    return {
      data: [],
      isEmpty: true
    };
  },
  methods: {
    async getData() {
      let result = await GetOrderAPI();
      this.data = result.data.data;
      console.log(this.data);
      this.isEmpty = this.data.length == 0 ? true : false;
    },
    checkLogin() {
      if (!!localStorage.getItem("token")) {
        return;
      } else {
        this.$message.error("请先登录！");
        setTimeout(()=>{
            this.$router.push('/login/login')
        },1500)
      }
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.checkLogin();
  }
};
</script>

<style lang="less">
#order {
  .o-main {
    min-height: 500px;
    width: 80%;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 50px;
    padding: 20px;
    .box-card {
      width: 240px;
      .text {
        text-align: left;
        margin: 5px 0;
        a {
          color: #409eff;
          font-family: "等线";
          float: right;
        }
      }
      img {
        width: 200px;
        margin: 0 auto;
        display: block;
      }
    }
  }
}
</style>
