<template>
  <div id="wh">
    <div class="top">
      <nav>
        <ul>
          <li @click="$router.push('/index')">首页</li>
          <li @click="$router.push('/notice')">系统公告</li>
        </ul>
      </nav>
    </div>
    <div class="user-side">
      <div class="user-info-base">
        <img :src="userInfo.head" alt="" srcset="" />
        <p>{{ userInfo.username }}</p>
      </div>
      <div class="user-info-other">
        <p><b>注册时间：</b>{{ userInfo.registertime }}</p>
        <p><b>电子邮箱：</b>{{ userInfo.mail }}</p>
        <p><b>图片数：</b>{{ pager.total }}</p>
        <p><b>累计在线时长：</b>{{ userInfo.onlinetime }}分钟</p>
      </div>
    </div>
    <div class="lists" style="position: relative">
      <el-empty
        v-show="pager.total == 0"
        description="空空如也"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        "
      ></el-empty>
      <div class="item" v-for="(v, i) in pictureLists" :key="i">
        <img :src="v.picture" alt="" srcset="" />
        <p><b>Picture_ID：</b>{{ v.picture_id }}</p>
        <p><b>Picture_Time：</b>{{ v.time }}</p>
        <el-button
          style="background-color: transparent; float: right; border: none"
          @click="delPicture(v.picture_id)"
          >删除</el-button
        >
      </div>
      <el-pagination
        v-show="pager.total !== 0"
        style="
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
        "
        @current-change="handleCurrentChange"
        :current-page.sync="pager.currPage"
        :page-size="pager.pageSize"
        :pager-count="pager.page_count"
        layout="total, prev, pager, next, jumper"
        :total="pager.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import http from "@/http/request";
export default {
  data() {
    return {
      userInfo: {},
      pictureLists: [],
      pager: {
        total: 0,
        pageSize: 3,
        currPage: 1,
        page_count: 7,
      },
      isEmpty: true,
    };
  },
  methods: {
    async getData() {
      let res = await http.get(
        `/user/info/search?token=${localStorage.getItem("token")}`
      );
      this.userInfo = res.data.userinfo[0];
      let resP = await http.get(`/warehouse/user/search`, {
        params: {
          user: this.userInfo.username,
          pageSize: this.pager.pageSize,
          currPage: this.pager.currPage,
        },
      });
      this.pictureLists = resP.data.list;
      this.pager.total = resP.data.total;
    },
    handleCurrentChange(val) {
      this.pager.currPage = val;
      this.getData();
    },
    delPicture(id) {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/,
        inputErrorMessage: "密码格式不正确",
      })
        .then(async ({ value }) => {
          await http.get("/warehouse/user/delete", {
            params: {
              picture_id: id,
              password: value,
            },
          });
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less">
#wh {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  .top {
    position: absolute;
    top: 0;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    ul {
      width: 87.5%;
      margin: 0 auto;
      height: 50px;
      list-style-type: none;
      display: flex;
      position: relative;
      li {
        // width: 100px;
        text-align: center;
        padding: 0 40px;
        height: 50px;
        line-height: 50px;
        cursor: default;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  .user-side {
    background-color: rgba(255, 255, 255, 0.5);
    width: 20%;
    height: 85%;
    margin: auto 0;
    padding: 10px;
    border-bottom-right-radius: 15px;
    .user-info-base {
      width: 100%;
      text-align: center;
      padding: 20px 0;
      img {
        width: 150px;
        height: 150px;
        background-position: center;
        background-size: cover;
      }
      p {
        font-weight: bold;
        margin-top: 10px;
        font-size: 20px;
      }
    }
    .user-info-other {
      margin-top: 20px;
      line-height: 30px;
      p {
        font-weight: 500;
      }
    }
  }
  .lists {
    width: 60%;
    height: 80%;
    margin: auto 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 40%;
      height: 40%;
      box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.7);
      img {
        width: 100%;
        height: 70%;
      }
      p {
        text-align: center;
        line-height: 20px;
      }
    }
  }
  .btn-prev,
  .el-pager li,
  .btn-next,
  .el-input__inner {
    color: #000;
    background-color: transparent;
  }
}
</style>
