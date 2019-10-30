<template>
    <div class="headerTopBox" v-cloak>
        <div class="header_top">
            <div class="greeting">
                <span class="greeting-title">{{greeting}}</span>
            </div>
            <div class="rightBox" v-cloak >
                <div class="loginBox" v-show="!isLogin">
                	<a class="login" href="/user/login" v-text="'Hi,请登录'">Hi,请登录</a><a class="register" href="/user/register">注册</a>
                </div>
                <div class="loginBox" v-show="isLogin">
                	<a class="login username" href="javascript:;" v-text="'Hi,' + username"></a><a class="logOut" href="/user/logout">退出</a>
                </div>
                <a class="orderCenter">
                    <span class="orderIcon"></span>
                    <a href="/order/list">订单中心</a>
                </a>
                <div v-cloak  class="personalCenter" :class="isDown ? 'downPersonal1':'downPersonal'" @mouseover="pullDownShow" @mouseout="pullDownHide">
                    <a href="/user/info" class="userInfo">个人中心</a>
                    <span ref="pullDown" :class="isDown ? 'downIcon':'downIcon1'"></span>
                    <ul v-show="isDown" class="personalDown">
                        <li><a href="/user/password-reset">账号管理</a></li>
                        <li><a href="/order/list">订单中心</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserName } from "../api/apiIndex.js";
export default {
  data() {
    return {
      greeting: "欢迎您来到传播鱼",
      isDown:false,
      isLogin:false,
      username:''
    };
  },
  created() {
    this._isLogin();
  },
  methods: {
    _isLogin(){
      getUserName().then((res)=>{
        if(res.data.success == 1){
          this.username = res.data.data.name;
          this.isLogin = true;
        }
      })
    },
    pullDownShow() {
      this.isDown = true;
    },
    pullDownHide() {
      this.isDown = false;
    }
  }
};
</script>

<style scoped lang="less">
[cloak]{
  display: none;
}
.headerTopBox {
  width: 100%;
  height: 31px;
  border-bottom: 1px solid #e5e5e5;
  background-color: #f4f4f4;
  z-index: 0;
  .header_top {
    width: 1200px;
    height: 30px;
    margin: 0 auto;
    line-height: 30px;
    position: relative;
    .greeting {
      display: inline-block;
      color: #949494;
      height: 30px;
      line-height: 30px;
      .greeting-title{
        font-size: 12px;
      }
    }
    .rightBox {
      display: inline-block;
      position: absolute;
      height: 30px;
      right: 0px;
      .loginBox {
        display: inline-block;
        /*width: 120px;*/
        color: #f67025;
        font-size:13px;
        height: 30px;
        .register {
          margin-left: 16px;
          color: #f67025;
          height: 30px;
          line-height: 30px;
        }
        .logOut {
        	display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-left: 16px;
          color: #333;
          font-size: 13px;
        }
        .login {
          /*width: 50px;*/
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
          color: #f67025;
          vertical-align: bottom;
          font-size: 13px;
          line-height: 30px;
          height: 30px;
        }
      }
      .orderCenter {
        display: inline-block;
        margin-left: 28px;
        height: 30px;
        width: auto;
        position: relative;
        padding-left: 18px;
        a {
          color: #666;
          font-size: 13px;
        }
        .orderIcon {
          display: inline-block;
          width: 16px;
          height: 16px;
          position:absolute;
          top:0;
          bottom: 0;
          left: 0;
          margin: auto;
          background: url(/static/images/pc/order.png) no-repeat center;
        }
      }
      .orderCenter:hover{
        .orderIcon {
          background: url(/static/images/pc/order1.png) no-repeat center;
        }
        a{
        	/*text-decoration: underline;*/
        	color:#f67025;
        }
      }
      .downPersonal {
        background-color: #f4f4f4;
      }
      .downPersonal1 {
        background-color: #ffffff;
        /*border: solid 1px #f4f4f4;*/
        box-shadow: 0px 3px 5px rgba(6, 0, 1, 0.06);
      }
      .personalCenter {
        position: relative;
        display: inline-block;
        margin-left:28px;
        /*width: 76px;*/
        a {
          font-size: 13px;
          margin-left: 8px;
          color: #666;
        }
        .downIcon {
          display: inline-block;
          width: 16px;
          height: 16px;
          position: relative;
          top: 2px;
          background: url(/static/images/pc/down.png) no-repeat center;
        }
        .downIcon1 {
          display: inline-block;
          width: 16px;
          height: 16px;
          position: relative;
          top: 2px;
          background: url(/static/images/pc/down1.png) no-repeat center;
        }
        .personalDown {
          padding: 10px 0;
          width: 85px;
          height:56px;
          box-sizing: border-box;
          position: absolute;
          top: 30px;
          left: -1px;
          z-index:888;
          background: #fff;
          border: solid 1px #f4f4f4;
          box-shadow: 0px 3px 5px rgba(6, 0, 1, 0.06);
          li {
            width: 100%;
            line-height:20px;
            text-align: center;
            a {
              color: #666;
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>