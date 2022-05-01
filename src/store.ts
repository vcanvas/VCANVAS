import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    PORT: 3000,
    URL: "localhost",
    _CANVAS_STATES: [],
    CANVAS_BACK_COUNT: 9999,
    // 判定文件栏打开/关闭的变量
    isMenuFileSignal: false,
    // 判定工具栏打开/关闭的变量
    isToolbarSignal: false,
    // 判定用户选项打开/关闭的变量
    isMenuUserSignal: false,
    // 判定工具栏内打开的属性栏的变量
    openAttrSignal: "",
    // 判定是否登录的状态变量
    login_signal: false,
    // 用户名
    username: "",
    head: "",
    // 是否打开用户登录/注册路由界面
    isUserLogin: true,
    // 登录时间
    login_time: "",
    // 在线时间
    onlinetime: "--",
    // 鼠标是否移入工具栏-属性栏-提交按钮
    attrsubmit_onhover: false,
    // 鼠标是否点击工具栏-属性栏-提交按钮
    attrsubmit_active: false,
    // 存储所点击的提交按钮的变量
    attrsubmit_option: "",
    // 轮廓颜色
    outline_color: "",
    // 轮廓宽度
    outline_width: "",
    // 填充颜色
    fill_color: "",
    // 是否填充
    fill_signal: false,
    // 多边形边数
    edge_number: "",
    // 字体大小
    font_size: "",
    // 画布
    canvas: "",
    // 工具确认按钮
    submitBtns: [""],
    drawline_shiftKeyCount: 0,
    drawline_ctrlKeyCount: 0,
    // 是否进入忘记密码界面
    isForgetpwd: false,
    isUserRegister: false,
    // 登录/注册界面的装饰元素
    login_decoration: Object,
    login_main: "",
    register_main: "",
    loginZindex: 102,
    registerZindex: 101,
  },
  mutations: {
    // 点击菜单栏内 文件 选项触发
    isFile(state) {
      state.isMenuFileSignal = !state.isMenuFileSignal;
      state.isToolbarSignal = false;
    },
    // 点击工具栏内关闭按钮时触发
    toolbarCloseBtnClick(state) {
      state.isToolbarSignal = false;
      state.openAttrSignal = "";
      state.attrsubmit_active = false;
      state.attrsubmit_option = "";
    },
    // 点击菜单栏内 工具栏 选项时触发
    isToolbar(state) {
      state.isToolbarSignal = !state.isToolbarSignal;
      state.openAttrSignal = "";
      state.isMenuFileSignal = false;
      state.attrsubmit_active = false;
    },
    // 根据点击的组件来判断打开哪个属性组件
    selectAttr(state, param) {
      if (state.openAttrSignal === param) {
        return;
      }
      state.openAttrSignal = param;
      state.attrsubmit_active = false;
      state.attrsubmit_option = "";
      state.outline_color = "#000000";
      state.outline_width = "1";
      state.fill_color = "#000000";
      state.fill_signal = false;
    },
    // 属性栏内关闭按钮
    toolbarCloseAttr(state) {
      state.openAttrSignal = "";
      state.attrsubmit_active = false;
      state.attrsubmit_option = "";
      state.outline_color = "#000000";
      state.outline_width = "1";
      state.fill_color = "#000000";
      state.fill_signal = false;
    },
    // 刷新在线时间
    refreshOnlinetime(state) {
      if (state.login_signal && state.login_time) {
        setInterval(() => {
          let now = new Date();
          let nowHour = now.getHours();
          let nowMin = now.getMinutes();
          let loginHour;
          let loginMin;
          if (state.login_time) {
            loginHour = new Date(state.login_time).getHours();
            loginMin = new Date(state.login_time).getMinutes();
            if (nowHour === loginHour) {
              state.onlinetime = (nowMin - loginMin).toString();
            } else {
              state.onlinetime = (
                (nowHour - loginHour) * 60 +
                (60 - loginMin + nowMin)
              ).toString();
            }
          }
        }, 1000);
      } else {
        state.onlinetime = "--";
      }
    },
    // 鼠标移入工具栏-属性栏-提交按钮时
    attrsubmitOver(state) {
      if (state.attrsubmit_active) {
        return;
      }
      state.attrsubmit_onhover = true;
    },
    // 鼠标移出工具栏-属性栏-提交按钮时
    attrsubmitLeave(state) {
      state.attrsubmit_onhover = false;
    },
    // 鼠标点击工具栏-属性栏-提交按钮时
    attrsubmitClick(state) {
      state.attrsubmit_onhover = false;
      state.attrsubmit_active = true;
    },
    // 选择绘图工具
    selectTool(state, param) {
      state.attrsubmit_option = param || null;
    },
    // 设置轮廓颜色
    setOutlineColor(state, param) {
      state.outline_color = param || "#000000";
    },
    // 设置轮廓宽度
    setOutlineWidth(state, param) {
      state.outline_width = param || 1;
    },
    // 设置填充颜色
    setFillColor(state, param) {
      state.fill_color = param || "#000000";
    },
    // 设多边形边数
    setEdgeNumber(state, param) {
      state.edge_number = param || 5;
    },
    // 设置字体大小
    setFontSize(state, param) {
      state.font_size = param || 16;
    },
    // 设置是否填充
    isFill(state, param) {
      state.fill_signal = param || false;
    },
    // 获取画布
    getCanvas(state, param) {
      state.canvas = param || null;
    },
    // 获取工具确认按钮
    getSubmitBtn(state, param) {
      state.submitBtns.push(param);
    },
    setShiftKeyCount(state, param) {
      state.drawline_shiftKeyCount = param;
    },
    setCtrlKeyCount(state, param) {
      state.drawline_ctrlKeyCount = param;
    },
    toForgetpwd(state, param) {
      state.isForgetpwd = param;
    },
    // toggleRegister (state) {
    //   state.isUserLogin = !state.isUserLogin
    //   state.isUserRegister = !state.isUserRegister
    //   if(state.login_decoration & state.login_main & state.register_main){

    //   }
    //   let [d, l, r] = [state.login_decoration, state.login_main, state.register_main]
    //   if (state.isUserRegister) {
    //     d.classList.add('login-decoration-login')
    //     l.style.zIndex = 101
    //     r.style.zIndex = 102
    //     d.addEventListener('webkitAnimationEnd', function () {
    //       this.classList.remove('login-decoration-login')
    //       // this.style.transform = "translate(50%,-50%)";
    //     })
    //   } else if (state.isUserLogin) {
    //     d.classList.add('login-decoration-register')
    //     l.style.zIndex = 102
    //     r.style.zIndex = 101
    //     d.addEventListener('webkitAnimationEnd', function () {
    //       this.classList.remove('login-decoration-register')
    //       // this.style.transform = "translate(-50%,-50%)"
    //     })
    //   }
    // }
  },
});
