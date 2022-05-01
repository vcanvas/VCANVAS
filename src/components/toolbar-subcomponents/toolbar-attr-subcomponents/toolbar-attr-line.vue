<template>
  <transition name='t-toolAttr'>
    <ul id='toolbar-attr-line' v-show='$store.state.openAttrSignal == "line"' :class="{'shadowRun':$store.state.attrsubmit_onhover,'boxShadow':$store.state.attrsubmit_active}">
      <li v-for='item in line_attrs' :key='item.name'>
        <span>{{ item.name }}</span>：<input :type='item.type' v-model="item.content"/>
      </li>
      <li>
        <button ref='attrsubmitBtn' class='toolbar-attr-submit' @mouseover="btnOnover()" @mouseleave="btnOnleave()" @click="btnOnclick($event)" data-mark="line">确定</button>
      </li>
    </ul>
  </transition>
</template>
<script>

export default {
  data () {
    return {
      line_attrs: [
        {content: '1', name: '轮廓宽度', type: 'text'},
        {content: '#000000', name: '直线颜色', type: 'color'}
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
      this.$store.state.attrsubmit_option = e.target.getAttribute('data-mark')
      this.$store.commit('setOutlineWidth', this.line_attrs[0].content)
      this.$store.commit('setOutlineColor', this.line_attrs[1].content)
      this.$store.commit('setShiftKeyCount', parseInt(0))
      this.$store.commit('setCtrlKeyCount', parseInt(0))
    }
  },
  mounted () {
    this.$store.commit('getSubmitBtn', this.$refs.attrsubmitBtn)
  }
}
</script>
