<template>
  <div id="index">
    <div class="index-head">
      <Top></Top>
      <el-carousel>
        <el-carousel-item v-for="(v, i) in banner_imgs" :key="i">
          <h3 class="small">
            <img :src="v.img" alt="" srcset="" />
          </h3>
        </el-carousel-item>
      </el-carousel>
      <Nav></Nav>
    </div>
    <div class="index-main">
      <div class="index-main-news index-item">
        <div class="index-main-news-head item-head">
          <h3>商城新闻</h3>
          <span @click="$router.push('/know/news')">更多</span>
        </div>
        <hr />
        <div class="index-main-news-con">
          <el-carousel height="300px">
            <el-carousel-item v-for="(v, i) in newImgs" :key="i">
              <h3 class="small">
                <img
                  :src="v.img"
                  alt=""
                  srcset=""
                  @click="toContent('know/con', 'news', v.id)"
                />
              </h3>
            </el-carousel-item>
          </el-carousel>
          <ul>
            <li
              v-for="(v, i) in news"
              :key="i"
              @click="toContent('know/con', 'news', v.id)"
            >
              {{ v.title }}
              <span>{{ v.date }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="index-main-rural index-item">
        <div class="index-main-rural-head item-head">
          <h3>古色乡村</h3>
          <span @click="$router.push('/feature/rural')">更多</span>
        </div>
        <hr />
        <div class="index-main-rural-con">
          <div
            class="rural-box"
            v-for="(v, i) in rurals"
            :key="i"
            @click="$router.push(`/feature/con?key=rural&id=${v.id}`)"
          >
            <img :src="v.img" alt="" srcset="" />
            <p class="rural-name">{{ v.name }}</p>
            <p class="rural-info">
              {{ v.info.substr(0, 50) }}
              <span v-show="v.info.length > 50">...</span>
            </p>
          </div>
        </div>
      </div>

      <div class="index-main-his index-item">
        <div class="index-main-his-head item-head">
          <h3>历史纪念</h3>
          <span @click="$router.push('/feature/his')">更多</span>
        </div>
        <hr />
        <div class="index-main-his-con">
          <ul>
            <li
              v-for="(v, i) in hiss"
              :key="i"
              @click="toContent('feature/con', 'his', v.id)"
            >
              {{ v.title }}
              <span>{{ v.date }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="index-main-khis index-item">
        <div class="index-main-khis-head item-head">
          <h3>历史沿革</h3>
          <span @click="$router.push('/know/his')">更多</span>
        </div>
        <hr />
        <div class="index-main-khis-con">
          <el-timeline :reverse="timelineReverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content.substr(0, 63)
              }}<span v-show="activity.content.length > 63">...</span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

      <div class="index-main-pspace index-item">
        <div class="index-main-pspace-head item-head">
          <h3>便民空间</h3>
          <span @click="$router.push('/know/pspace')">更多</span>
        </div>
        <hr />
        <div class="index-main-pspace-con">
          <el-card
            class="box-card"
            v-for="(v, i) in pspaces"
            :key="i"
            shadow="hover"
          >
            <div slot="header" class="clearfix">
              <span>{{ v.name }}</span>
            </div>
            <div class="text item">地址：{{ v.address }}</div>
            <div class="text item">联系电话：{{ v.tel }}</div>
            <div class="text item">简介：{{ v.info }}</div>
          </el-card>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import {
  GetBannerAPI,
  GetNewsAPI,
  GetFRuralAPI,
  GetFHisAPI,
  GetKnowHisAPI,
  GetKnowPspaceAPI,
} from "@/http/api.ts";
import Nav from "@/components/nav.vue";
import Top from "@/components/top.vue";
import Foot from "@/components/foot.vue";
export default {
  components: { Nav, Top, Foot },
  data() {
    return {
      banner_imgs: [],
      newsSize: this.$store.state.index_news_size,
      news: [],
      newImgs: [],
      rurals: [],
      hiss: [],
      hisSize: this.$store.state.index_his_size,
      activities: [],
      activitySize: this.$store.state.index_activity_size,
      timelineReverse: true,
      pspaces: [],
      pspacesSize: this.$store.state.index_pspace_size,
    };
  },
  methods: {
    async getBanner() {
      let result = await GetBannerAPI();
      this.banner_imgs = result.data.data;
    },
    async getNews() {
      const params = {
        isIndex: true,
        size: this.newsSize,
      };
      let result = await GetNewsAPI(params);
      if (result.data.status == "success") {
        this.news = result.data.data;
        let i = 0;
        for (const v of this.news) {
          this.newImgs[i] = {};
          this.newImgs[i].id = i;
          this.newImgs[i].img = v.img;
          i++;
        }
      }
    },
    toContent(router, key, id) {
      this.$router.push(`/${router}?key=${key}&id=${id}`);
    },
    async getRurals() {
      let result = await GetFRuralAPI();
      if (result.data.status == "success") {
        this.rurals = result.data.data.reverse().slice(0, 4);
      }
    },
    async getHiss() {
      let result = await GetFHisAPI();
      this.hiss = result.data.data.reverse().slice(0, this.hisSize);
    },
    async getKHiss() {
      let result = await GetKnowHisAPI();
      this.activities = result.data.data;
    },
    async getPspaces() {
      let result = await GetKnowPspaceAPI();
      this.pspaces = result.data.data.reverse().slice(0, this.pspacesSize);
    },
    getDatas() {
      this.getBanner();
      this.getNews();
      this.getRurals();
      this.getHiss();
      this.getKHiss();
      this.getPspaces();
    },
  },
  created() {
    this.getDatas();
  },
};
</script>

<style lang="less">
@bannerHeight: 600px;
#index {
  background-color: rgba(0, 0, 0, 0.1);
  .index-head {
    width: 100%;
    .el-carousel__container {
      height: @bannerHeight;
      img {
        width: 100%;
        height: @bannerHeight;
        filter: brightness(0.7);
      }
    }
  }
  .index-main {
    width: 80%;
    margin: 0 auto;
    min-height: 500px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ul {
      list-style-type: none;
    }
    .el-carousel {
      width: 48%;
      img {
        width: 100%;
        height: 300px;
      }
    }
    .index-main-his,
    .index-main-khis {
      width: 48% !important;
      .el-timeline-item__wrapper {
        height: 50px !important;
      }
      .el-timeline-item__content {
        height: 30px !important;
      }
      .el-timeline-item__node {
        background-color: #fff;
      }
      .el-timeline-item__tail {
        border-left: 2px solid #fff;
        display: block;
      }
      ul {
        width: 100% !important;
        padding-top: 10px;
        li {
          line-height: 50px !important;
        }
      }
    }
    .index-item {
      width: 100%;
      margin-top: 50px;
      .item-head {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        h3 {
          cursor: default;
        }
        span {
          cursor: default;
          color: rgba(0, 0, 0, 0.5);
          &:hover {
            color: #000;
          }
        }
      }
      .index-main-news-con {
        padding: 20px;
        display: flex;
        justify-content: space-between;
      }
      .index-main-rural-con,
      .index-main-pspace-con {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .box-card{
          height: 200px;
          width: 280px;
        }
        .rural-box,
        .pspace-box {
          width: 220px;
          height: 320px;
          padding: 10px;
          background-color: #fff;
          border-radius: 13px;
          box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
          img {
            width: 200px;
            height: 250px;
          }
          p {
            cursor: default;
          }
          .rural-info {
            text-align: left;
            text-indent: 2em;
            font-size: 10px;
          }
        }
      }
      ul {
        width: 48%;
        li {
          text-align: left;
          color: rgba(0, 0, 0, 0.5);
          padding: 0 10px;
          line-height: 45px;
          cursor: default;
          &:hover {
            color: rgba(0, 0, 0, 1);
          }
          span {
            float: right;
          }
        }
      }
    }
  }
}
</style>
