<template>
  <transition name='t-toolAttr'>
    <ul id='toolbar-attr-brush' v-show='$store.state.openAttrSignal == "brush"' :class="{'shadowRun':$store.state.attrsubmit_onhover,'boxShadow':$store.state.attrsubmit_active}">
      <li v-for='item in brush_attrs' :key='item.name'>
        <span>{{ item.name }}</span>：<input :type='item.type' v-model="item.content"/>
      </li>
      <li>
        <button ref='attrsubmitBtn' class='toolbar-attr-submit' @mouseover="btnOnover()" @mouseleave="btnOnleave()" @click="btnOnclick($event)" data-mark="brush">确定</button>
      </li>
    </ul>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      brush_attrs: [
        {content: '1', name: '笔触大小', type: 'text'},
        {content: '#000000', name: '画笔颜色', type: 'color'}
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
      this.$store.commit('attrsubmitClick')
      this.$store.commit('selectTool', e.target.getAttribute('data-mark'))
      this.$store.commit('setOutlineWidth', this.brush_attrs[0].content)
      this.$store.commit('setOutlineColor', this.brush_attrs[1].content)
    }
  },
  mounted () {
    this.$store.commit('getSubmitBtn', this.$refs.attrsubmitBtn)
  }
}
</script>
