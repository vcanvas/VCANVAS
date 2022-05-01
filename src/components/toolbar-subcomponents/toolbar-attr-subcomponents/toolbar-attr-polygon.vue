<template>
  <transition name='t-toolAttr'>
    <ul id='toolbar-attr-polygon' v-show='$store.state.openAttrSignal == "polygon"' :class="{'shadowRun':$store.state.attrsubmit_onhover,'boxShadow':$store.state.attrsubmit_active}">
      <li v-for='item in polygon_attrs' :key='item.name'>
        <span>{{ item.name }}</span>：<input :type='item.type' v-model='item.content'/>
      </li>
      <li>
        <button ref='attrsubmitBtn' class='toolbar-attr-submit' @mouseover="btnOnover()" @mouseleave="btnOnleave()" @click="btnOnclick($event)" data-mark="polygon">确定</button>
      </li>
    </ul>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      isPolygon: false,
      polygon_attrs: [
        {content: '3', name: '边数', type: 'text'},
        {content: '1', name: '轮廓宽度', type: 'text'},
        {content: '#000000', name: '轮廓颜色', type: 'color'},
        {content: '#000000', name: '填充颜色', type: 'color'},
        {content: false, name: '是否填充', type: 'checkbox'}
      ]
    }
  },
  methods: {
    btnOnover () {
      this.$store.commit('attrsubmitOver')
    },
    btnOnleave () {
      this.$store.commit('attrsubmitLeave')
    },
    btnOnclick (e) {
      if (this.polygon_attrs[0].content >= 3) {
        this.$store.commit('attrsubmitClick')
        this.$store.commit('selectTool', e.target.getAttribute('data-mark'))
        this.$store.commit('setEdgeNumber', this.polygon_attrs[0].content)
        this.$store.commit('setOutlineWidth', this.polygon_attrs[1].content)
        this.$store.commit('setOutlineColor', this.polygon_attrs[2].content)
        this.$store.commit('setFillColor', this.polygon_attrs[3].content)
        this.$store.commit('isFill', this.polygon_attrs[4].content)
      }
    }
  },
  mounted () {
    this.$store.commit('getSubmitBtn', this.$refs.attrsubmitBtn)
  }
}
</script>
