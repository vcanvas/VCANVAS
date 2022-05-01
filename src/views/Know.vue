<template>
  <div id="know">
    <div class="k-head" style="width:100%">
      <Top></Top>
      <img
        src="../../static/inner_banner.jpg"
        alt=""
        style="width:100%;height:250px"
      />
      <Nav></Nav>
    </div>
    <div class="k-main">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="$router.push('/know/into')">
          <i class="el-icon-guide"></i>
          <span slot="title">走进商城</span>
        </el-menu-item>
        <el-menu-item index="2"  @click="$router.push('/know/his')">
          <i class="el-icon-time"></i>
          <span slot="title">历史沿革</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('/know/sd')">
          <i class="el-icon-video-camera"></i>
          <span slot="title">歌舞商城</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push('/know/pspace')">
          <i class="el-icon-user-solid"></i>
          <span slot="title">便民空间</span>
        </el-menu-item>
        <el-menu-item index="5" @click="$router.push('/know/news')">
          <i class="el-icon-news"></i>
          <span slot="title">商城新闻</span>
        </el-menu-item>
      </el-menu>
      <div class="k-main-r">
        <router-view></router-view>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import Top from "../components/top.vue";
import Foot from "../components/foot.vue";
export default {
  components: { Nav, Foot, Top },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
.k-main {
  width: 80%;
  margin: 0 auto;
  display: flex;
  .el-menu {
    width: 20%;
    height: 500px;
  }
  .k-main-r{
      width: 78%;
      min-height: 500px;
      background-color: rgba(0,0,0,.1);
  }
}
</style>
