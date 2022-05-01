<template>
    <ul id='toolbar-othersbtn'>
        <li v-for='(item,index) in vc_toolbar_othersbtn_attrs' :key="index">
            <div :ref='item.r' @click='getFuncIndex(item.r)'> {{ item.name }} </div>
        </li>
    </ul>
</template>>
<script>
export default ({
  data () {
    return {
      vc_toolbar_othersbtn_attrs: [
        {name: '清空画布', r: 'clear_canvas'},
        {name: '关闭属性栏', r: 'close_attr'},
        {name: '关闭工具栏', r: 'close_toolbar'}
      ]
    }
  },
  methods: {
    getFuncIndex (str) {
      switch (str) {
        // 关闭工具栏
        case 'close_toolbar':
          this.$store.commit('toolbarCloseBtnClick')
          break
          // 清空画布
        case 'clear_canvas':
          let cvs = this.$store.state.canvas
          let ctx = cvs.getContext('2d')
          ctx.clearRect(0, 0, cvs.offsetWidth, cvs.offsetHeight)
          Array.from(cvs.parentElement.children).forEach(item => {
            if (item.tagName === 'INPUT') {
              item.remove()
            }
          })
          break
          // 关闭属性栏
        case 'close_attr':
          this.$store.commit('toolbarCloseAttr')
          break
      }
    }
  },
  mounted () {

  }
})
</script>
<style lang='less'>
  #toolbar-othersbtn{
    list-style: none;
    width:20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div{
      background-color:transparent;
      outline: none;
      border: none;
      color:#fff;
      text-align: center;
      line-height:15px;
      border: 1px solid rgba(0,255,215,.5);
      border-radius:13px;
      padding: 5px 20px;
      margin-bottom: 20px;
      cursor: default;
      position: relative;
      overflow: hidden;
      &:before{
        content:"";
        width: 100%;
        height: 100%;
        position:absolute;
        top:0;
        left: -100%;
        background-color: rgba(0,255,215,.3);
        transition: .5s;
        border-radius:13px;
      }
      &:hover:before{
          left:0;
      }
    }
  }
</style>
