<template>
  <transition name='t-toolAttr'>
    <ul id='toolbar-attr-arc' v-show='$store.state.openAttrSignal == "arc"' :class="{'shadowRun':$store.state.attrsubmit_onhover,'boxShadow':$store.state.attrsubmit_active}">
      <li v-for='item in arc_attrs' :key="item.name">
        <span>{{ item.name }}</span>：<input :type='item.type' v-model="item.content"/>
      </li>
      <li>
        <button ref='attrsubmitBtn' class='toolbar-attr-submit' @mouseover="btnOnover()" @mouseleave="btnOnleave()" @click="btnOnclick($event)" data-mark="arc">确定</button>
      </li>
    </ul>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      arc_attrs: [
        {content: '1', name: '轮廓宽度', type: 'text', key: 'attr1'},
        {content: '#000000', name: '颜色', type: 'color', key: 'attr2'}
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
      this.$store.commit('setOutlineWidth', this.arc_attrs[0].content)
      this.$store.commit('setOutlineColor', this.arc_attrs[1].content)
    }
  },
  mounted () {
    this.$store.commit('getSubmitBtn', this.$refs.attrsubmitBtn)
  }
}
</script>
