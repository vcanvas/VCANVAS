<template>
  <div id='toolbar-attr'>
    <lineAttr />
    <arcAttr />
    <rectAttr />
    <circleAttr />
    <polygonAttr />
    <textAttr />
    <brushAttr />
    <eraserAttr />
  </div>
</template>
<script>
import lineAttr from './toolbar-attr-subcomponents/toolbar-attr-line.vue'
import arcAttr from './toolbar-attr-subcomponents/toolbar-attr-arc.vue'
import rectAttr from './toolbar-attr-subcomponents/toolbar-attr-rect.vue'
import circleAttr from './toolbar-attr-subcomponents/toolbar-attr-circle.vue'
import polygonAttr from './toolbar-attr-subcomponents/toolbar-attr-polygon.vue'
import textAttr from './toolbar-attr-subcomponents/toolbar-attr-text.vue'
import brushAttr from './toolbar-attr-subcomponents/toolbar-attr-brush.vue'
import eraserAttr from './toolbar-attr-subcomponents/toolbar-attr-eraser.vue'
export default {
  name: 'vcToolAttr',
  data () {
    return {

    }
  },
  components: {
    lineAttr,
    arcAttr,
    rectAttr,
    circleAttr,
    polygonAttr,
    textAttr,
    brushAttr,
    eraserAttr
  }
}
</script>
<style lang='less'>
  #toolbar-attr{
    width:20%;
    height:100%;

    ul{
      width:90%;
      margin:0 auto;
      height:100%;
      padding:0 10px;
      border-left:1px solid rgb(0,255,215);
      border-right:1px solid rgb(156,112,215);
      color:#fff;
      list-style:none;
      display:flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: column;
      /* box-shadow: inset 0px 0px 30px 1px rgb(0,255,215); */
      /* animation: shadowRun 3s ease-in-out infinite; */
      li{
        width:100%;
        span{
          display:inline-block;
          width:30%;
          text-align:center;
        }
        input{
          border:none;
          outline:none;
          background:none;
          width:50%;
          color:#fff;
          padding:0 5px;
          text-align:center;
        }
        input[type=text]{
          border-bottom:1px solid #fff;
        }
      }
    }
  }

  .shadowRun{
    animation: shadowRun 3s ease-in-out infinite;
  }
  .boxShadow{
    box-shadow: inset 0px 0px 30px 1px rgb(0,255,215);
  }
  @keyframes shadowRun {
    0%{box-shadow: inset 0px 0px 0px 0px rgb(255,255,255);}
    50%{box-shadow: inset 0px 0px 30px 1px rgb(0,255,215);}
    100%{box-shadow: inset 0px 0px 0px 0px rgb(255,255,255);}
  }
.toolbar-attr-submit{
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  margin-left:50%;
  transform: translateX(-50%);
  border: 1px solid rgb(0,255,215);
  border-radius: 13px;
  padding: 0 20px;
  &:hover{
    background-color:rgba(0,0,0,.1);
  }
}

/* t-toolAttr过渡动画 */
.t-toolAttr-enter-active {
  transition: all .5s ease;
}
.t-toolAttr-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.t-toolAttr-enter{
  transform: scaleX(0);
  opacity:0;
}
.t-toolAttr-enter-to,.t-toolAttr-leave{
  transform: scaleX(1);
  opacity:1;
}
</style>
