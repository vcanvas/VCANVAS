<template>
  <transition name='t-toolAttr'>
    <ul id='toolbar-attr-text' v-show='$store.state.openAttrSignal == "text"' :class="{'shadowRun':$store.state.attrsubmit_onhover,'boxShadow':$store.state.attrsubmit_active}">
      <li v-for='item in text_attrs' :key='item.name'>
        <span>{{ item.name }}</span>：<input :type='item.type' v-model="item.content"/>
      </li>
      <li>
        <button ref='attrsubmitBtn' class='toolbar-attr-submit' @mouseover="btnOnover()" @mouseleave="btnOnleave()" @click="btnOnclick($event)" data-mark="text">确定</button>
      </li>
    </ul>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      text_attrs: [
        {content: '16', name: '字体大小', type: 'text'},
        {content: '#000000', name: '字体颜色', type: 'color'}
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
      this.$store.commit('setFontSize', this.text_attrs[0].content)
      this.$store.commit('setOutlineColor', this.text_attrs[1].content)
    }
  },
  mounted () {
    this.$store.commit('getSubmitBtn', this.$refs.attrsubmitBtn)
  }
}
</script>
