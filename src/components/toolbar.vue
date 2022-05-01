<template>
  <transition name="t-toolbar">
    <div id="tools-container" v-show="$store.state.isToolbarSignal">
      <vcToolBtn />
      <vcToolAttr />
      <vcToolOther />
    </div>
  </transition>
</template>

<script>
import vcToolBtn from './toolbar-subcomponents/toolbar-btns.vue'
import vcToolAttr from './toolbar-subcomponents/toolbar-attr.vue'
import vcToolOther from './toolbar-subcomponents/toobar-others.vue'
export default {
  data () {
    return {
      isMenuTool: false
    }
  },
  methods: {

  },
  mounted () {

  },
  components: {
    vcToolBtn,
    vcToolAttr,
    vcToolOther
  }
}
</script>>

<style scoped>
#tools-container {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90vw;
  height: 150px;
  transition: 0.5s;
  overflow: hidden;
  margin-top: 5vh;
  z-index: 10;
}
.t-toolbar-enter-active {
  transition: all 0.3s ease;
}
.t-toolbar-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.t-toolbar-enter,
.t-toolbar-leave-to {
  height: 0;
  opacity: 0;
}
</style>
