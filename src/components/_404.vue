<template>
  <!-- 路由路径错误时，跳转到此页面 -->
  <div id="Page404">
    <el-empty
      description="您所查找的页面不存在，请检查URL地址后重试！"
    ></el-empty>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#Page404 {
  .el-empty {
    margin-top: 10px;
    .el-empty__image {
      width: 250px;
      height: 250px;
    }
    .el-empty__description {
      p {
        color: #000;
        letter-spacing: 5px;
        font-size: 16px;
      }
    }
  }
}
</style>
