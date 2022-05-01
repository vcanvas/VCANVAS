<template>
  <div id="list">
    <div class="l-head" style="width:100%">
      <Top></Top>
      <img
        src="../../static/inner_banner.jpg"
        alt=""
        style="width:100%;height:250px"
      />
      <Nav></Nav>
    </div>
    <div class="l-main">
      <Menu></Menu>
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import Top from "../components/top.vue";
import Menu from "../components/menu.vue";
import Foot from "../components/foot.vue";
export default {
  components: { Nav, Foot, Top, Menu }
};
</script>

<style lang="less">
.l-main {
  width: 80%;
  margin: 0 auto;
}
</style>
