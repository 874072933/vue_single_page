<template>
    <div class="page">
        <div class="header-container">
            <div class="header">
                <a href="/"><img class="logo" :src="logoUrl" alt="logo"></a>
                <span class="header-title-before">|</span>
                <span class="header-title">注册账号</span>
                <div class="header-right">
                    <span class="header-right-left">已有账号,</span>
                    <a href="/user/login" class="header-right-right">直接登录</a>
                </div>
            </div>
        </div>
        <div class="content-container">
            <div class="content">
                <div class="content-top">
                    <p class="top-title">注册账号</p>
                </div>
                <form class="register-form" autocomplete="off">
                    <div class="register-item flex">
                        <span class="item-icon">
                        </span>
                        <span class="item-slice"></span>
                        <div class="item-input-box">
                            <input type="text" class="mobile" v-model="mobile" @focus="focus" @blur="blur" autocomplete="off" auto-focus placeholder="请输入手机号码" @input="detection">
                        </div>
                    </div>
                    <div class="register-item flex">
                        <div class="item-input-box1">
                            <input type="text" class="phone-code" v-model="phone_code" @focus="focus" @blur="blur" autocomplete="off" auto-focus placeholder="请输入短信验证码" @input="detection">
                        </div>
                        <div class="check" @click="sendCode">
                            <a href="javascript:;" class="check-code">{{getCode}}</a>
                        </div>
                    </div>
                    <div class="register-item flex">
                        <span class="item-icon2">
                        </span>
                        <span class="item-slice"></span>
                        <div class="item-input-box">
                            <input type="password" class="mobile" v-model="password" @focus="focus" @blur="blur" auto-focus placeholder="请输入新密码" @input="detection">
                        </div>
                    </div>
                    <div class="register-item last-item flex">
                        <span class="item-icon2">
                        </span>
                        <span class="item-slice"></span>
                        <div class="item-input-box">
                            <input type="password" class="mobile" v-model="rePassword" @focus="focus" @blur="blur" autocomplete="off" auto-focus placeholder="请确认新密码" @input="detection">
                        </div>
                    </div>
                    <div class="register-tips-container">
                        <div class="register-tips animated" v-show="isTips" :class="{'shake':isShake}">
                            <span class="item-icon-err">
                            </span>
                            <p class="item-tips">{{tips}}</p>
                        </div>
                    </div>
                    <span :class="is_btn ? 'submitBtn2':'submitBtn1'" autocomplete="off" @click="register()"></span>
                </form>
            </div>
        </div>
        <div class="footer-container">
            <div class="footer">
                <p class="footer-title">
                    {{footer_title}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {getPhoneCode,registerSave} from '../api/apiIndex.js'
    export default {
        data(){
            return{
                logoUrl:'/static/images/pc/logo-rl.jpg',
                footer_title:'Copyright © 2004-2018  杭州前景网络科技有限公司 版权所有',
                tips:'',
                mobile:'',
                isTips:false,
                phone_code:'',
                password:'',
                rePassword:'',
                getCode:'获取验证码',
                isShake:false,
                countdown:60,
				myTime:'',
				is_request:true,
				is_btn:false,
            }
        },
        methods:{
            success(){
                this.$message({
                message: '恭喜你，注册成功,即将跳转到登录页面',
                type: 'success'
                });
            },
            focus(e){
            	e.target.parentNode.parentNode.style.border = '1px solid #4aafe9';
            	e.target.parentNode.parentNode.style.boxShadow = '0px 2px 5px 0px rgba(74, 175, 233, 0.16)';
            },
            blur(e){
            	e.target.parentNode.parentNode.style.border = 'solid 1px #e6e6e6';
            	e.target.parentNode.parentNode.style.boxShadow = 'none';
            },
            detection(){
            	if(this.mobile || this.phone_code || this.password || this.rePassword){
            		this.is_btn = true;
            	}else{
            		this.is_btn = false;
            	}
            },
            register(){
                const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;	
                if(!myreg.test(this.mobile)){
                    this.isTips = true;
                    this.tips = '您输入的手机号码格式不正确';
                     this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
					return false;
				}else if(!this.phone_code){
					this.isTips = true;
					this.tips = '您输入的验证码不正确'
					return false;
                }else if(this.password != this.rePassword){
					this.isTips = true;
                    this.tips = '两次输入的密码不一致';
                     this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
					return false;
				}
                else{
					this.$http.post('/user/register',{
						mobile:this.mobile,
						code:this.phone_code,
                        password:this.password,
                        password_repeat:this.rePassword
					}).then(res =>{
						if(res.data.success == 1){
                            this.success();
                            setTimeout(()=>{
                                window.location.href = '/'
                            },1500)
						}else{
							this.isTips = true;
							this.tips = res.data.msg;
						}
					})
				}
            },
            sendCode:function(){
                const self = this;
                const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;	
				if(!myreg.test(this.mobile) ){
                    this.isTips = true;
                    this.tips = '您输入的手机格式不正确';
                     this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
                    
                }else if(!this.is_request){
                    this.isTips = true;
                    this.tips = '请稍后重试';
                    this.isShake = true; 
                    setTimeout(()=>{
                        self.isShake = false
                    },2000)
                }else if(myreg.test(this.mobile) && this.is_request){
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
                                result = Object.assign(result,{mobile:that.mobile})
                                getPhoneCode(result).then(res => {
                                    if(res.data.success == 1){
                                        self.getCode = '验证码已发送';
                                        const myTime = setInterval(function(){
                                            self.sendemail();
                                            self.is_request = false;
                                            if(self.countdown == 60){
                                                clearInterval(myTime);
                                                self.is_request = true;  
                                            }
                                        },1000)
                                    }else{
                                        that.$message({ type:"error",message:res.data.msg })
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            }).onError(function(errors){

                            })
                        })
                    })
                    getPhoneCode(this.mobile).then((res)=>{ 
                        if(res.data.success == 1){
                            self.getCode = '验证码已发送';
                            const myTime = setInterval(function(){
                                self.sendemail();
                                self.is_request = false;
                                if(self.countdown == 60){
                                    clearInterval(myTime);
                                    self.is_request = true;  
                                }
                            },1000)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    });
                }
            },
            sendemail(){

				if(this.countdown == 0){
					this.countdown = 60;
					this.getCode = '获取验证码';
				}else{
                    this.is_request = false;
                    this.getCode = this.countdown + '秒后重新获取';
                    
                    this.countdown--;
                    
				}
			},
        }
    }
</script>

<style scoped lang="less">
    @import '../css/reset.css';
    @import '../css/animate.min.css';
    .flex{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}
    .page{
        width: 100%;
        height: auto;
        background-color: #ffffff;
        position: relative;
        .header-container{
            height: 100px;
            width: 100%;
            box-shadow: 0px 4px 4px #efefef;
             .header{
                 width: 1200px;
                 height: 100px;
                 margin: 0 auto;
                 line-height: 100px;
                 position: relative;
                .logo{
                    vertical-align: middle;
                    display: inline-block;
                    width: 204px;
                    height: 68px;
                }
                .header-title-before{
                    margin-left: 20px;
                    font-size: 16px;
                    color: #646464;
                }
                .header-title{
                    display: inline-block;
                    width: 80px;
                    height: 20px;
                    margin-left: 20px;
                    font-size: 16px;
                    color: #646464;
                }
                .header-right{
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    width: 130px;
                    height: 20px;
                    .header-right-left{
                        color: #646464;
                        font-size: 12px;
                    }
                    .header-right-right{
                        color: #ff4a25;
                        font-size: 12px;
                        text-decoration-line: underline;
                    }
                }
             }
        }
        .content-container{
            width: 100%;
            height: 615px;
            display: flex;
            justify-content: center;
            align-items: center;
            .content{
                width: 410px;
                height: 500px;
                border: 1px solid #f1f1f1;
                border-radius: 3px;
                box-shadow: 0px 3px 7px 0px rgba(222, 222, 222, 0.74);
                border-radius: 3px;
                .content-top{
                    width: 100%;
                    height: 55px;
                    border-bottom: 1px solid #f1f1f1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .top-title{
                        font-size: 17px;
                        font-weight: bold;
                    }
                }
                .register-form{
                    width: 355px;
                    height: 385px;
                    margin: 0 auto;
                    padding-top: 25px;
                    .register-item{
                        width: 353px;
                        height: 50px;
                        line-height: 50px;
                        border: 1px solid #e6e6e6;
                        margin-bottom: 25px;
                        border-radius: 1px;
                        align-items: center;
                        .item-input-box1{
                            width: 235px;
                            height: 50px;
                            float: left;
                            .phone-code{
                                width: 225px;
                                font-size: 16px;
                                color: #333333;
                                /*height: 15px;*/
                                border: none;
                                margin-left: 20px;
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
                        .check{
                            float: left;
                            width: 117px;
                            height: 50px;
                            line-height: 50px;
                            border-radius:0 1px 1px 0;
                            border-left: 1px solid #e6e6e6;
                            background-color: #eeeeee;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            .check-code{
                                margin: 0 auto;
                                font-size: 15px;
                                color: #636363;
                            }
                        }
                        .check:hover{
                            background-color: #cccccc;
                        }
                        .item-input-box{
                            width: 230px;
                            display: inline-block;
                            .mobile{
                               width: 230px;
                                height: 50px;
                                line-height: 50px;
                                font-size: 16px;
                               color: #333333;
                                border: none; 
                                vertical-align: top;
                                margin-left:10px;
                                padding: 0;
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
                        }
                        .item-icon{
                            width: 50px;
                            height: 50px;
                            display: inline-block;
                            background: url('/static/images/pc/login-user.png') no-repeat center center;
                        }
                        .item-icon2{
                            width: 50px;
                            height: 50px;
                            display: inline-block;
                            background: url('/static/images/pc/login-password.png') no-repeat center center;
                        }
                        .item-slice{
                            display: inline-block;
                            width: 1px;
                            height: 28px;
                            border-left:1px solid #cccccc;
                        }
                    }
                    .last-item{
                        margin-bottom: 10px !important;
                    }
                    .register-tips-container{
                        width: 353px;
                        height: 20px;
                        margin-bottom: 10px;
                        .register-tips{
                            width: 353px;
                            height: 20px;
                            .item-icon-err{
                                width: 40px;
                                height: 20px;
                                display: inline-block;
                                background: url('/static/images/pc/login-error.png') no-repeat center center;
                            }
                            .item-tips{
                                width: 260px;
                                height: 20px;
                                font-size: 16px;
                                color: #e62a05;
                                display: inline-block;
                                vertical-align: top;
                            }
                        }
                    }
                    .submitBtn1{
                        width: 362px;
                        height:64px;
                        display: inline-block;
                        background: url('/static/images/pc/register-btn1.png') no-repeat;
                        cursor: pointer;
                    }
                    .submitBtn2{
                    	width: 362px;
                        height:64px;
                        display: inline-block;
                        background: url('/static/images/pc/register-btn2.png') no-repeat;
                        cursor: pointer;
                    }
                    /*.submitBtn:hover{
                        background-color: #ff4723;
                    }*/
                }
            }
        }
        .footer-container{
            /*position: fixed;*/
            /*bottom: 0;*/
            width: 100%;
            height: 78px;
            background-color: #ffffff;
            .footer{
                margin: 0 auto;
                width: 1200px;
                height: 51px;
                display: flex;
                justify-content: center;
                align-items: center;
                .footer-title{
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: #666666;
                }
            }
        }
    }
</style>