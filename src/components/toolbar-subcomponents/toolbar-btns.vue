<template>
  <ul id="toolbar-btns" ref="vc_toolbar_btns">
    <!-- <li
      v-for="(item, index) in toolIconsAttrs"
      :title="item.title"
      :data-mark="item.mark"
      :key="index"
      @click="openAttr($event)"
    >
      <img :src="item.src" />
    </li> -->
    <li title="直线" data-mark="line" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/line.png" alt="" />
    </li>
    <li title="矩形" data-mark="rect" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/rect.png" alt="" />
    </li>
    <li title="圆形" data-mark="circle" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/circle.png" alt="" />
    </li>
    <li title="多边形" data-mark="polygon" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/polygon.png" alt="" />
    </li>
    <li title="文字" data-mark="text" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/text.png" alt="" />
    </li>

    <li title="画笔" data-mark="brush" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/brush.png" alt="" />
    </li>
    <li title="橡皮擦" data-mark="eraser" @click="openAttr($event)">
      <img src="../../../static/icons/tool-icons/eraser.png" alt="" />
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      toolIconsAttrs: [
        {
          src: "../../../static/icons/tool-icons/line.png",
          title: "直线",
          mark: "line",
        },
        // {src: '/static/icons/tool-icons/arc.png', title: '曲线', mark: 'arc'},
        {
          src: "../../../static/icons/tool-icons/rect.png",
          title: "矩形",
          mark: "rect",
        },
        {
          src: "../../../static/icons/tool-icons/circle.png",
          title: "圆",
          mark: "circle",
        },
        {
          src: "../../../static/icons/tool-icons/polygon.png",
          title: "多边形",
          mark: "polygon",
        },
        {
          src: "../../../static/icons/tool-icons/text.png",
          title: "文字",
          mark: "text",
        },
        {
          src: "../../../static/icons/tool-icons/brush.png",
          title: "画笔",
          mark: "brush",
        },
        {
          src: "../../../static/icons/tool-icons/eraser.png",
          title: "橡皮擦",
          mark: "eraser",
        },
      ],
    };
  },
  methods: {
    openAttr(e) {
      this.$store.commit(
        "selectAttr",
        e.currentTarget.getAttribute("data-mark")
      );
      Array.from(e.currentTarget.parentElement.children).forEach((item) => {
        item.classList.contains("toolbar-btns-li-active")
          ? item.classList.remove("toolbar-btns-li-active")
          : null;
      });
      e.currentTarget.classList.add("toolbar-btns-li-active");
    },
  },
  mounted() {
    let _this = this;
    setInterval(() => {
      if (_this.$store.state.openAttrSignal === null) {
        if (_this.$refs.vc_toolbar_btns) {
          Array.from(_this.$refs.vc_toolbar_btns.children).forEach((item) => {
            item.classList.contains("toolbar-btns-li-active")
              ? item.classList.remove("toolbar-btns-li-active")
              : null;
          });
        }
      }
    }, 0);
  },
};
</script>
<style lang="css">
#toolbar-btns {
  width: 50%;
  height: 100%;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#toolbar-btns li {
  display: inline-block;
  padding: 0 5px;
  transition: all 0.5s;
}
#toolbar-btns li:hover {
  box-shadow: inset rgba(0, 255, 215, 0.6) 0px -10px 20px -5px;
}
.toolbar-btns-li-active {
  box-shadow: inset rgba(0, 255, 215, 0.6) 0px -10px 20px -5px;
}
#toolbar-btns img {
  --toolSize: 70;
  width: calc(var(--toolSize) * 1px);
  height: calc(var(--toolSize) * 1px);
}
</style>
