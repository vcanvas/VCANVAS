<template>
  <div id="admin">
    <Nav></Nav>
    <div class="admin-main">
      <Menu></Menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { CheckPermissionAPI } from "@/http/api.ts";
import Nav from "@/components/nav.vue";
import Menu from "@/components/admin/menu.vue";
export default {
  components: { Nav, Menu },
  methods: {
    async checkPermission() {
      let result = await CheckPermissionAPI({
        email: localStorage.getItem("usermail")
      });
      if (result.data.permission != "管理员") {
        this.$message.error("当前用户无权限");
        this.$router.push("/index");
      }
    }
  },
  created() {
    this.checkPermission();
  }
};
</script>

<style lang="less">
#admin {
  height: 100vh;
  .admin-main {
    display: flex;
  }
}
</style>
