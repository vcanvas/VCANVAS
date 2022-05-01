<template>
  <div id="feature">
    <div class="f-head" style="width:100%">
      <Top></Top>
      <img
        src="../../static/inner_banner.jpg"
        alt=""
        style="width:100%;height:250px"
      />
      <Nav></Nav>
      <div class="f-main">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="width:20%"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-sunny"></i>
              <span @click="$router.push('/feature/intro')">红色记忆</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <el-menu-item index="1-1" @click="$router.push('/feature/intro')"
                >红专介绍</el-menu-item
              >
              <el-menu-item index="1-2" @click="$router.push('/feature/his')"
                >历史纪念</el-menu-item
              >
              <el-menu-item index="1-3" @click="$router.push('/feature/addr')"
                >旧址馆史</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2" @click="$router.push('/feature/rural')">
            <i class="el-icon-house"></i>
            <span slot="title">古色乡村</span>
          </el-menu-item>
        </el-menu>
        <div class="f-main-r">
          <router-view></router-view>
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
.f-main {
  width: 80%;
  margin: 0 auto;
  display: flex;
  .el-menu {
    .el-menu-item {
      margin: 0 auto;
    }
  }
  .f-main-r {
    width: 78%;
    min-height: 500px;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
