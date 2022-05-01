<template>
  <div id="usercenter-container">
    <div id="usercenter-sidebar">
      <div id="usercenter-sidebar-top">欢迎您！{{ $store.state.username }}</div>
      <div id="usercenter-sidebar-main">
        <ul ref="usercenter_sidebar_main_lis">
          <li v-for="(item,index) in user_options" :key="index">
          </li>
        </ul>
      </div>
    </div>
    <div id="usercenter-content"></div>
    <router-link id="usercenter-close" to="/"></router-link>
  </div>
</template>

<script lang='typescrit'>
export default {
  data () {
    return {
      user_options: [
        {name: '用户信息'},
        {name: '历史记录'},
        {name: '个人设置'}
      ]
    }
  }
}
</script>

<style lang="less">
#usercenter-container{
  width: 100vw;
  height: 100vh;
  background-color: rgb(250, 250, 250);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  #usercenter-sidebar{
    width: 20vw;
    height: 80vh;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 50px;
    left: 10vw;
    box-shadow: 0px 0px 10px 1px rgba(177, 177, 177, 0.1);
    border-radius: 13px;
    border-top-left-radius: 0;
    padding: 0 20px;
    #usercenter-sidebar-top{
      text-align: center;
      padding: 20px 0;
      font-size: 20px;
      border-bottom: 1px solid #000;
    }
    ul{
      list-style-type: none;
      margin-top: 20px;
      li{
        cursor: default;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        transition: .8s;
        &:hover{
          box-shadow:  rgba(0,0,0,.5) 0px 0px 10px 1px;
        }
        &:nth-child(1):before{
          content:"用户信息"
        }
        &:nth-child(2):before{
          content:"历史记录"
        }
        &:nth-child(3):before{
          content:"个人设置"
        }
      }

    }
  }
  .side-li-active{
    box-shadow:  rgba(0,0,0,.5) 0px 0px 10px 1px;
  }
  #usercenter-content{
    width: 50vw;
    height: 80vh;
    position: absolute;
    top: 7vh;
    left: 35vw;
    background-color: #fff;
    box-shadow: 0px 0px 10px 1px rgba(177, 177, 177, 0.1);
  }
  #usercenter-close{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50px;
    right: 100px;
    background-image: url("/static/icons/close.png");
    background-size: cover;
    border-radius: 50%;
    &:hover{
      background-color: rgba(255,0,0,.5);
      background-image: url('/static/icons/close-hover.png');
      transform: scale(1.1) rotate(90deg);
      border-radius: 0%;
      transition: all .5s;
    }
  }
}

</style>
