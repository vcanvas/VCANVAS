<template>
  <transition name='t-toolAttr'>
    <ul id='toolbar-attr-eraser' v-show='$store.state.openAttrSignal == "eraser"' :class="{'shadowRun':$store.state.attrsubmit_onhover,'boxShadow':$store.state.attrsubmit_active}">
      <li v-for='item in eraser_attrs' :key='item.name'>
        <span>{{ item.name }}</span>：<input :type='item.type' v-model="item.content"/>
      </li>
      <li>
        <button ref='attrsubmitBtn' class='toolbar-attr-submit' @mouseover="btnOnover()" @mouseleave="btnOnleave()" @click="btnOnclick($event)" data-mark="eraser">确定</button>
      </li>
    </ul>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      eraser_attrs: [
        {content: '10', name: '笔触大小', type: 'text'}
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
      this.$store.commit('setOutlineWidth', this.eraser_attrs[0].content)
    }
  },
  mounted () {
    this.$store.commit('getSubmitBtn', this.$refs.attrsubmitBtn)
  }
}
</script>
