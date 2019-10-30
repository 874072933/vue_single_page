<template>
  <div class="page">
    <div class="header-container">
      <div class="header">
        <a href="/">
          <img class="logo" :src="logoUrl" alt="logo">
        </a>
        <span class="header-title-before">|</span>
        <span class="header-title">用户登录</span>
      </div>
    </div>
    <div class="content-container">
      <div class="login-container">
        <div class="login-box">
          <div class="login-top">
            <div class="login-top-tab">
              <span
                class="login-password login-title"
                :class="{loginOn:isPasswordOn}"
                @click="passwordOn"
              >密码登录</span>
              <!--<span class="login-cut"></span>-->
              <span class="login-code login-title" :class="{loginOn:isCodeOn}" @click="codeOn">验证码登录</span>
            </div>
          </div>
          <form v-if="!isCodeLogin" class="passwordLogin">
            <div class="login-item flex" :class="{'showBord':isShowBord}">
              <span class="item-icon"></span>
              <span class="item-slice"></span>
              <div class="item-input-box">
                <input
                  type="text"
                  class="mobile"
                  data-val="pMobile"
                  v-model="pMobile"
                  autocomplete="off"
                  @focus="showBorder"
                  @blur="hideBorder"
                  :class="{'showBord':isShowBord}"
                  @input="showDel1()"
                  auto-focus
                  placeholder="请输入手机号码"
                >
                <span class="del" @click="del1" v-show="showDelIcon1"></span>
              </div>
            </div>
            <div class="login-item flex">
              <span class="item-icon2"></span>
              <span class="item-slice"></span>
              <div class="item-input-box">
                <input
                  type="password"
                  class="mobile"
                  data-val="password"
                  v-model="password"
                  autocomplete="off"
                  @focus="focus"
                  @blur="blur"
                  @input="showDel2()"
                  auto-focus
                  placeholder="请输入密码"
                >
                <span class="del" @click="del2" v-show="showDelIcon2"></span>
              </div>
            </div>
            <div class="login-tips-container">
              <div class="login-tips animated" v-show="isTips" :class="{'shake':isShake}">
                <span class="item-icon-err"></span>
                <p class="item-tips">{{tips}}</p>
              </div>
            </div>
            <span
              :class="is_changeBtn1 ? 'submitBtn2':'submitBtn1'"
              autocomplete="off"
              @click="passwordLogin()"
            ></span>
            <div class="login-footer">
              <div class="login-footer-left">
                <span @click="isRemember" :class="autoLogin ? 'autoLogin2':'autoLogin1'"></span>
                <!--<input type="checkbox" name="autoLogin" class="autoLogin" id="isautoLogin" v-model="autoLogin" @change="isRemember()">-->
                <label @click="isRemember" class="autoLoginLabel" for="isAutoLogin">自动登录</label>
              </div>
              <div class="login-footer-right">
                <span class="footer-right-left">还没有账号？</span>
                <a href="/user/register" class="header-right-right">立即注册</a>
              </div>
            </div>
          </form>
          <form v-if="isCodeLogin" class="passwordLogin">
            <div class="login-item flex">
              <span class="item-icon"></span>
              <span class="item-slice"></span>
              <div class="item-input-box">
                <input
                  type="text"
                  class="mobile"
                  data-val="cMobile"
                  v-model="cMobile"
                  autocomplete="off"
                  @focus="focus"
                  @blur="blur"
                  @input="showDel3()"
                  auto-focus
                  placeholder="请输入手机号码"
                >
                <span class="del" @click="del3" v-show="showDelIcon3"></span>
              </div>
            </div>
            <div class="login-item">
              <div class="item-input-box1">
                <input
                  type="text"
                  class="phone-code"
                  data-val="phone_code"
                  v-model="phone_code"
                  @focus="focus"
                  @blur="blur"
                  @input="showDel4"
                  autocomplete="off"
                  auto-focus
                  placeholder="请输入短信验证码"
                >
              </div>
              <div class="check" @click="sendCode">
                <a href="javascript:;" class="check-code">{{getCode}}</a>
              </div>
            </div>
            <div class="login-tips-container">
              <div class="login-tips animated" v-show="isTips" :class="{'shake':isShake}">
                <span class="item-icon-err"></span>
                <p class="item-tips">{{tips}}</p>
              </div>
            </div>
            <span
              :class="is_changeBtn2 ? 'submitBtn2':'submitBtn1'"
              autocomplete="off"
              @click="codeLogin()"
            ></span>
            <div class="login-footer">
              <!--<div class="login-footer-left">
                                <input type="checkbox" name="autoLogin" class="autoLogin" id="isautoLogin" value="">
                                <label class="autoLoginLabel" for="">自动登录</label>
              </div>-->
              <div class="login-footer-right">
                <span class="footer-right-left">还没有账号？</span>
                <a href="/user/register" class="header-right-right">立即注册</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="footer">
        <p class="footer-title">{{footer_title}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPhoneCode } from "../api/apiIndex.js";
export default {
  data() {
    return {
      logoUrl:'/static/images/pc/logo-rl.jpg',
      footer_title: "Copyright © 2004-2018  杭州前景网络科技有限公司 版权所有",
      isPasswordOn: true,
      isCodeOn: false,
      isCodeLogin: false,
      isAutoLogin:false,
      tips: '',
      autoLogin:'',
      isTips: false,
      isShake: false,
      pMobile: '',
      password: '',
      cMobile:'',
      phone_code:'',
      getCode: "获取验证码",
      countdown:60,
      myTime:'',
      is_request:true,
      showDelIcon1:false,
      showDelIcon2:false,
      showDelIcon3:false,
      isShowBord:false,
      is_changeBtn1:false,
      is_changeBtn2:false,
      remember:'',
    };
  },
  methods: {
    showBorder(e){
      this.isShowBord = true;
      e.target.parentNode.parentNode.style.border = '1px solid #4aafe9';
      e.target.parentNode.parentNode.style.boxShadow = '0px 2px 5px 0px rgba(74, 175, 233, 0.16)';
    },
    hideBorder(e){
      this.isShowBord = false;
      e.target.parentNode.parentNode.style.border = 'solid 1px #e6e6e6';
      e.target.parentNode.parentNode.style.boxShadow = 'none';
      this.detectionM(e.target);
    },
    focus(e){
    	e.target.parentNode.parentNode.style.border = '1px solid #4aafe9';
    	e.target.parentNode.parentNode.style.boxShadow = '0px 2px 5px 0px rgba(74, 175, 233, 0.16)';
    },
    blur(e){
    	e.target.parentNode.parentNode.style.border = 'solid 1px #e6e6e6';
    	e.target.parentNode.parentNode.style.boxShadow = 'none';
    	this.detectionM(e.target);
    },
    detectionM(dom){
    	if(this.isPasswordOn){
    		let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    		if((!myreg.test(this.pMobile)) && (dom.getAttribute('data-val') == 'pMobile')){
    			this.isTips = true;
    			this.tips = '您输入的手机号码格式不正确';
    			this.isShake = true;
    			setTimeout(()=>{
    				this.isShake = false
    			},2000)
    			return false;
    		}else if(this.password == ''  && (dom.getAttribute('data-val') == 'password')){
    			this.isTips = true;
    			this.tips = '密码不能为空!请输入密码';
    			this.isShake = true;
    			setTimeout(()=>{
    				this.isShake = false
                },2000)
				return false;
			}else{
				this.isTips = false;
    			this.isShake = false;
			}
    	}else if(this.isCodeOn){
    		let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    		if((!myreg.test(this.cMobile)) && (dom.getAttribute('data-val') == 'cMobile')){
    			this.isTips = true;
    			this.tips = '您输入的手机号码格式不正确';
    			this.isShake = true;
    			setTimeout(()=>{
    				this.isShake = false
    			},2000)
    			return false;
    		}else if(this.phone_code == '' && (dom.getAttribute('data-val') == 'phone_code')){
				this.isTips = true;
                this.tips = '验证码不能为空!';
                this.isShake = true; 
                setTimeout(()=>{
                    this.isShake = false
                },2000)
                return false;
			}else{
				this.isTips = false;
    			this.isShake = false;
			}
    	}
    },
    isRemember(){
    	this.autoLogin = !this.autoLogin;
        if(this.autoLogin){
        	this.remember = 1;
        }else{
        	this.remember = '';
        }
    },
    showDel1(){
      if(this.pMobile != ''){
        this.showDelIcon1 = true;
      }else{
        this.showDelIcon1 = false;
      }
      if(this.pMobile || this.password){
      	this.is_changeBtn1 = true;
      }else{
      	this.is_changeBtn1 = false;
      }
    },
    del1(){
      this.pMobile = '';
      this.showDelIcon1 = false;
    },
        showDel2(){
      if(this.password != ''){
        this.showDelIcon2 = true;
      }else{
        this.showDelIcon2 = false;
      }
      if(this.pMobile || this.password){
      	this.is_changeBtn1 = true;
      }else{
      	this.is_changeBtn1 = false;
      }
    },
    del2(){
      this.password = '';
      this.showDelIcon2 = false;
    },
    showDel3(){
      if(this.cMobile != ''){
        this.showDelIcon3 = true;
      }else{
        this.showDelIcon3 = false;
      }
      if(this.cMobile || this.phone_code){
      	this.is_changeBtn2 = true;
      }else{
      	this.is_changeBtn2 = false;
      }
    },
    showDel4(){
    	if(this.cMobile || this.phone_code){
    		this.is_changeBtn2 = true;
    	}else{
    		this.is_changeBtn2 = false;
      }
    },
    del3(){
      this.cMobile = '';
      this.showDelIcon3 = false;
    },
//  remember(){
//      if(this.isAutoLogin){
//          localStorage.setItem("cbypMobile",this.pMobile);
//          localStorage.setItem("cbypassword",this.password);
//      }
//  },  
    success(){
        this.$message({
          message: '恭喜你，登录成功,即将跳转到首页',
          type: 'success'
        });
    },
    //密码登录
    passwordLogin(){
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;	
    if(!myreg.test(this.pMobile)){
        this.isTips = true;
        this.tips = '您输入的手机号码格式不正确';
        this.isShake = true; 
        setTimeout(()=>{
            self.isShake = false
        },2000)
        return false;
    }
    else if(this.password == ''){
		this.isTips = true;
        this.tips = '密码不能为空!请输入密码';
        this.isShake = true; 
        setTimeout(()=>{
            self.isShake = false
                    },2000)
					return false;
			}
    else{
        this.$http.post('/user/login',{
            mobile:this.pMobile,
            password:this.password,
            remember:this.remember,
            type:'password'
        }).then(res =>{
            if(res.data.success == 1){
                this.success();
                setTimeout(()=>{
                       window.location.href = res.data.data.refer;
                },1500)
            }else{
                    this.isTips = true;
                    this.tips = res.data.msg;
                    this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
                }
        })
    }
    },
    codeLogin(){
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;	
    if(!myreg.test(this.cMobile)){
        this.isTips = true;
        this.tips = '您输入的手机号码格式不正确';
        this.isShake = true; 
        setTimeout(()=>{
            self.isShake = false
        },2000)
        return false;
    }
    else if(this.phone_code == ''){
					this.isTips = true;
                    this.tips = '验证码不能为空!';
                     this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
					return false;
			}
    else{
        this.$http.post('/user/login',{
            mobile:this.cMobile,
            code:this.phone_code,
            type:'code'
        }).then(res =>{
            if(res.data.success == 1){
                this.success();
                setTimeout(()=>{
                    window.location.href = res.data.data.refer;
                },1500)
            }else{
                    this.isTips = true;
                    this.tips = res.data.msg;
                    this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
                }
        })
    }
    }
    ,
    sendCode: function() {
      console.log(1111)
      const self = this;
      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.cMobile)) {
        this.isTips = true;
        this.tips = "您输入的手机格式不正确";
        this.isShake = true;
        setTimeout(() => {
          self.isShake = false;
        }, 2000);
      } else if (!this.is_request) {
        this.isTips = true;
        this.tips = "请稍后重试";
        this.isShake = true;
        setTimeout(() => {
          self.isShake = false;
        }, 2000);
      } else if (myreg.test(this.cMobile) && this.is_request) {
          this.isTips = false;
          this.tips = '';
          this.geetVerify()
      }
    },
    geetVerify(){
				let that = this
				this.$axios.get('/geet/code').then(res => {
					res = res.data.data
					res.success = 1
					initGeetest({
						gt:res.gt,
						challenge:res.challenge,
						offline:!res.success,
						new_captcha: res.new_captcha,
						https:false,
						product: 'bind',
						width:'300px'
					},function(captchaObj){
						captchaObj.onReady(function(){
              captchaObj.verify();
						}).onSuccess(function(){
              let result = captchaObj.getValidate()
              result = Object.assign(result,{mobile:that.cMobile})
              getPhoneCode(result).then(res => {
                if (res.data.success == 1) {
                  const myTime = setInterval(function() {
                    that.sendemail();
                    that.is_request = false;
                    if (that.countdown == 60) {
                      clearInterval(myTime);
                      that.is_request = true;
                      that.isTips = false;
                      that.tips = '';
                    }
                  }, 1000);
                }else{
                  that.$message({
                    type:"error",
                    message:res.data.msg
                  })
                }
              })
              .catch(err => {
                console.log(err);
              })
						}).onError(function(errors){

						})
					})
				})
			},
    sendemail() {
      if (this.countdown == 0) {
        this.countdown = 60;
        this.getCode = "获取验证码";
      } else {
        this.is_request = false;
        this.getCode = this.countdown + "秒后重新获取";

        this.countdown--;
      }
    },
    passwordOn() {
      this.isCodeLogin = false;
      this.isPasswordOn = true;
      this.isCodeOn = false;
//    this.pMobile = '';
//    this.password = '';
      this.remember = '';
      this.isTips = false;
      this.isShake = false; 
    },
    codeOn() {
      this.isCodeLogin = true;
      this.isPasswordOn = false;
      this.isCodeOn = true;
//    this.cMobile = '';
//    this.phone_code = '';
      this.remember = '';
      this.isTips = false;
      this.isShake = false; 
    }
  },
  created(){
  	this.pMobile = document.getElementById('mobile').value;
    this.password = document.getElementById('password').value;
  }
};
</script>

<style scoped lang="less">
@import "../css/reset.css";
@import "../css/animate.min.css";
.flex{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}
.page {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  position: relative;
  .header-container {
    height: 100px;
    width: 100%;
    box-shadow: 0px 4px 4px #efefef;
    .header {
      width: 1200px;
      height: 100px;
      margin: 0 auto;
      line-height: 100px;
      position: relative;
      .logo {
        vertical-align: middle;
        display: inline-block;
        width: 204px;
        height: 68px;
      }
      .header-title-before {
        margin-left: 20px;
        font-size: 16px;
        color: #646464;
      }
      .header-title {
        display: inline-block;
        width: 80px;
        height: 20px;
        margin-left: 20px;
        font-size: 16px;
        color: #646464;
      }
      .header-right {
        display: inline-block;
        position: absolute;
        right: 0;
        width: 130px;
        height: 20px;
        .header-right-left {
          color: #646464;
          font-size: 12px;
        }
        .header-right-right {
          color: #ff4a25;
          font-size: 12px;
          text-decoration-line: underline;
        }
      }
    }
  }
  .content-container {
    margin-top: 3px;
    width: 100%;
    height: 520px;
    background: url("/static/images/pc/login-bg.png") no-repeat center;
    .login-container {
      width: 1200px;
      height: 520px;
      position: relative;
      margin: 0 auto;
      .login-box {
        width: 422px;
        height: 406px;
        position: absolute;
        right: 0;
        top: 60px;
        background:url('/static/images/pc/login_broder.png') no-repeat;
        /*border-radius: 3px;*/
        .login-top {
          width: 100%;
          height: 72px;
          line-height: 72px;
          /*border-bottom: 1px solid #f1f1f1;*/
          .login-top-tab {
            width: 100%;
            height: 72px;
            vertical-align: middle;
            display: flex;
            color:#ababab;
            .login-title {
              display: inline-block;
              flex: 1;
              text-align: center;
              font-size: 17px;
              cursor: pointer;
            }
            .loginOn {
              color: #262626;
            }
            .login-cut {
              font-size: 28px;
              width: 1px;
              display: inline-block;
              vertical-align: middle;
              background: url("/static/images/pc/login-cut.png") no-repeat center
                center;
              background-size: 1px 28px;
              height: 72px;
            }
          }
        }
        .passwordLogin {
          width: 352px;
          margin-left: 30px;
          height: 320px;
          .showBord{
            border: solid 1px #4aafe9;
          }
          .login-item {
          	align-items: center;
            width: 350px;
            height: 50px;
            line-height: 50px;
            border: 1px solid #e6e6e6;
            margin-top: 30px;
            border-radius: 1px;
            .item-input-box1 {
              width: 235px;
              height: 50px;
              float: left;
              position: relative;
                font-size: 0;
              .phone-code {
                width: 200px;
                height: 50px;
                line-height: 50px;
                border: none;
                margin-left: 20px;
                font-size: 16px;
                color:#333333;
                  padding: 0;
              }
              .phone-code::-webkit-input-placeholder{ 
color:#bdbdbd; 
} 
.phone-code:-moz-placeholder{ 
 
color:#bdbdbd; 
} 
.phone-code::-moz-placeholder{ 

color: #bdbdbd; 
} 
.phone-code:-ms-input-placeholder{ 

color:#bdbdbd; 
}
            }
            .check {
              float:right;
              width: 112px;
              height: 50px;
              line-height: 50px;
              border-radius:0 1px 1px 0;
              border-left: 1px solid #e6e6e6;
              background-color: #eeeeee;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              .check-code {
                margin: 0 auto;
                font-size: 15px;
                color: #636363;
              }
            }
            .check:hover {
              background-color: #cccccc;
            }
            .item-input-box {
              width: 230px;
              /*height: 15px;*/
              display: inline-block;
              position: relative;
              .mobile {
                width: 230px;
                height: 50px;
                line-height: 50px;
                border: none;
                vertical-align: top;
                margin-left: 12px;
                font-size: 16px;
                color: #333333;
                border: none;
                  padding:0;
              }
              .mobile::-webkit-input-placeholder{ 
color:#bdbdbd; 
} 
.mobile:-moz-placeholder{ 
 
color:#bdbdbd; 
} 
.mobile::-moz-placeholder{ 

color: #bdbdbd; 
} 
.mobile:-ms-input-placeholder{ 

color:#bdbdbd; 
}
              .del{
                position: absolute;
                top: 0;
                bottom: 0;
                right: -35px;
                margin:auto;
                width: 14px;
                height: 14px;
                background: url('/static/images/pc/inputDel.png') no-repeat center;
              }
            }
            .item-icon {
              width: 50px;
              height: 50px;
              display: inline-block;
              background: url("/static/images/pc/login-user.png") no-repeat
                center center;
            }
            .item-icon2 {
              width: 50px;
              height: 50px;
              display: inline-block;
              background: url("/static/images/pc/login-password.png") no-repeat
                center center;
            }
            .item-slice {
              display: inline-block;
              /*margin-bottom: 11px;*/
              width: 1px;
              height: 28px;
              border-left: 1px solid #cccccc;
            }
          }
          .login-tips-container {
            width: 352px;
            height: 20px;
            margin: 10px 0;
            .login-tips {
              width: 353px;
              height: 20px;
              .item-icon-err {
                width: 40px;
                height: 20px;
                display: inline-block;
                background: url("/static/images/pc/login-error.png") no-repeat
                  center center;
              }
              .item-tips {
                width: 260px;
                height: 20px;
                font-size: 16px;
                color: #e62a05;
                display: inline-block;
                vertical-align: top;
              }
            }
          }
          .submitBtn1 {
            width: 362px;
            height:50px;
            display: inline-block;
            background: url('/static/images/pc/login-button1.png') no-repeat left -4px center;
          }
          .submitBtn2 {
            width: 362px;
            height:50px;
            display: inline-block;
            background: url('/static/images/pc/login-button2.png') no-repeat left -4px center;
          }
          .login-footer {
            width: 352px;
            height: 17px;
            margin-top: 15px;
            .login-footer-left {
              width: 100px;
              height: 17px;
              line-height: 17px;
              float: left;
              .autoLogin1 {
              	display: inline-block;
                width: 17px;
                height: 17px;
                background:url('/static/images/pc/login-hold1.png') no-repeat;
              }
              .autoLogin2 {
              	display: inline-block;
                width: 17px;
                height: 17px;
                background:url('/static/images/pc/login-hold2.png') no-repeat;
              }
              .autoLoginLabel {
                font-size:14px;
                margin-left: 10px;
                vertical-align: top;
                color: #949494;
              }
            }
            .login-footer-right {
              width: auto;
              height: 17px;
              color: #686868;
              float: right;
              .footer-right-left{
                color: #686868;
              }
              .header-right-right{
                color: #fe6400;
              }
              
            }
          }
        }
      }
    }
  }
  .footer-container {
    /*position: fixed;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    height: 78px;
    background-color: #ffffff;
    .footer {
      margin: 0 auto;
      width: 1200px;
      height:54px;
      display: flex;
      justify-content: center;
      align-items: center;
      .footer-title {
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: #666666;
      }
    }
  }
}
</style>