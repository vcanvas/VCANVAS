(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d405e8ee"],{"4e16":function(t,e,n){"use strict";n("55b2")},"55b2":function(t,e,n){},b29c:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"login-container"}},[n("div",{staticClass:"login-l"},[n("button",{staticClass:"login-signup",on:{click:function(e){return t.toRegister()}}},[t._v("注册")]),n("button",{staticClass:"return-main",on:{click:function(e){return t.returnMain()}}},[t._v("返回")])]),t._m(0),n("ul",{attrs:{id:"login-main-login"}},[t._l(t.login_input,(function(e,i){return n("li",{key:i},[n("label",{staticClass:"login_ipt_name"},[t._v(t._s(e.prefix)),n("span",{attrs:{id:"spanForJustify"}})]),"checkbox"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"item.content"}],ref:"ipt",refInFor:!0,attrs:{autocomplete:t.autocomplete,iptId:i,pattern:e.pattern,required:"required",placeholder:e.placeholder,type:"checkbox"},domProps:{checked:Array.isArray(e.content)?t._i(e.content,null)>-1:e.content},on:{keypress:function(e){return t.iptOnInput(e)},input:function(e){return t.iptOn(e)},change:function(n){var i=e.content,o=n.target,r=!!o.checked;if(Array.isArray(i)){var s=null,a=t._i(i,s);o.checked?a<0&&t.$set(e,"content",i.concat([s])):a>-1&&t.$set(e,"content",i.slice(0,a).concat(i.slice(a+1)))}else t.$set(e,"content",r)}}}):"radio"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"item.content"}],ref:"ipt",refInFor:!0,attrs:{autocomplete:t.autocomplete,iptId:i,pattern:e.pattern,required:"required",placeholder:e.placeholder,type:"radio"},domProps:{checked:t._q(e.content,null)},on:{keypress:function(e){return t.iptOnInput(e)},input:function(e){return t.iptOn(e)},change:function(n){return t.$set(e,"content",null)}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"item.content"}],ref:"ipt",refInFor:!0,attrs:{autocomplete:t.autocomplete,iptId:i,pattern:e.pattern,required:"required",placeholder:e.placeholder,type:e.type},domProps:{value:e.content},on:{keypress:function(e){return t.iptOnInput(e)},input:[function(n){n.target.composing||t.$set(e,"content",n.target.value)},function(e){return t.iptOn(e)}]}}),n("transition",{attrs:{name:"fade"}},[n("p",{directives:[{name:"show",rawName:"v-show",value:e.isEmpty||e.isError,expression:"item.isEmpty || item.isError"}],staticClass:"empty_msg"},[t._v("\n          "+t._s(e.prefix)+"\n          "),n("span",{directives:[{name:"show",rawName:"v-show",value:e.isEmpty,expression:"item.isEmpty"}]},[t._v("不能为空")]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.isError,expression:"item.isError"}]},[t._v("格式错误")]),t._v("!\n        ")])])],1)})),n("li",[n("div",{attrs:{id:"login-rememberme"}},[n("input",{attrs:{type:"checkbox",id:"login-rememberme-option"},domProps:{checked:t.isRemeber},on:{input:function(e){return t.isRememberme(e)}}}),n("label",{attrs:{for:"login-rememberme-option"}},[t._v("记住我")])]),n("p",{staticClass:"forget_pwd",on:{click:function(e){return t.setForget()}}})]),n("li",[n("button",{ref:"loginbtn",staticClass:"loginbtn loginSubmitBtn",on:{click:t.submitLogin}},[t._v("\n        登录\n      ")]),n("span",[t._v(t._s(t.login_tips))])])],2)])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-main-top"},[n("i"),n("span",{staticStyle:{padding:"0 20px"},attrs:{id:"login-main-title"}},[t._v(" 欢迎登录 ")]),n("i")])}],r=(n("ac6a"),{data:function(){return{login_input:[{content:"",prefix:"用户名",type:"text",isError:!1,isEmpty:!1,pattern:"^[a-zA-Z][a-zA-Z0-9_]{4,15}$",placeholder:"请输入用户名"},{content:"",prefix:"密码",type:"password",isError:!1,isEmpty:!1,pattern:"^[a-zA-Z][a-zA-Z0-9_]{5,17}$",placeholder:"请输入密码"}],login_tips:"",isRemeber:!1,autocomplete:"new-password"}},methods:{toRegister:function(){this.$router.push("/login/register")},returnMain:function(){this.$router.push("/")},iptOn:function(t){var e=t.target.getAttribute("iptId");this.login_input[e].isError=!1,this.login_input[e].isEmpty=!1},iptOnInput:function(t){32===t.keyCode&&t.preventDefault()},isRememberme:function(t){this.isRemeber=t.target.checked},submitLogin:function(){var t=this,e=this,n=this.login_input.every((function(t){return 0==t.isError&&0==t.isEmpty}));n&&this.axios.get("http://".concat(this.$store.state.URL,":").concat(this.$store.state.PORT,"/login"),{params:{username:this.login_input[0].content,password:this.login_input[1].content,logintime:new Date}}).then((function(n){"fail"===n.data.status?t.$message.error(n.data.msg):"success"===n.data.status&&(e.isRemeber?localStorage.setItem("rememberMe",!0):localStorage.removeItem("rememberMe"),t.$message({type:"success",message:"登录成功"}),e.login_tips="",t.$router.push("/"),t.$store.state.login_signal=!0,t.$store.state.login_time=new Date,t.$store.state.username=n.data.resData[0].username,t.$store.state.head=n.data.resData[0].head,localStorage.setItem("token",n.data.token),t.$store.commit("refreshOnlinetime"))})).catch((function(t){console.log(t)}))},setForget:function(){this.$store.commit("toForgetpwd",!0),this.$router.push("/login/forget"),this.login_input[0].content&&window.eventBus.$emit("confirm_username",this.login_input[0].content)},setIptTrue:function(t){t.classList.add("ipt-item-true"),t.classList.remove("ipt-item-false")},setIptFalse:function(t){t.classList.add("ipt-item-false"),t.classList.remove("ipt-item-true")},checkIpt:function(t,e,n){e.value?(t.login_input[n].isEmpty=!1,this.setIptFalse(e),e.checkValidity()?(t.login_input[n].isError=!1,this.setIptTrue(e)):(t.login_input[n].isError=!0,this.setIptFalse(e))):(t.login_input[n].isError=!1,t.login_input[n].isEmpty=!0,this.setIptFalse(e))}},beforeMount:function(){localStorage.getItem("rememberMe")&&(this.autocomplete="on",this.isRemeber=!0)},mounted:function(){var t=this,e=this;this.$refs.ipt.forEach((function(n,i){n.oninput=function(){t.checkIpt(e,n,i)}})),document.onkeydown=function(e){13==e.keyCode&&t.submitLogin()},console.log(this.$route.params),1==this.$route.params.reload&&location.reload()}}),s=r,a=(n("4e16"),n("2877")),c=Object(a["a"])(s,i,o,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-d405e8ee.5d6c74bd.js.map