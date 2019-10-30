<template>
	<div class="page">
		<myHeader></myHeader>
		<div class="content">
			<div class="content-wrap">
				<div class="addressNav-container">
					<div class="addressNav">
						<span class="address-now">当前位置:></span>
						<span class="address-1">"{{addressF}}"></span>
						<span class="address-2">"{{addressS}}"></span>
						<span class="address-2">{{addressT}}</span>
					</div>
				</div>
				<div class="content-container">
					<div class="content-container-left">
						<div class="slide-nav">
							<div class="nav-title"><span :class="infoDrop ? 'nav-title2':'nav-title1'" @click="infoDrop=!infoDrop"></span>账户管理</div>
							<ul class="nav-ul nav-border" v-show="infoDrop">
								<li class="item-nav">
									<a class="item-a" href="/user/info">基本信息</a>
								</li>
								<li class="item-nav">
									<a class="item-a add-item-a" href="/user/password-reset">密码管理</a>
								</li>
							</ul>
							<div class="nav-title"><span :class="orderDrop ? 'nav-title2':'nav-title1'" @click="orderDrop=!orderDrop"></span>订单中心</div>
							<ul class="nav-ul" v-show="orderDrop">
								<li class="item-nav">
									<a class="item-a" href="/order/list">订单记录</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="content-container-right">
						<div class="right-top-box">
							<h3 class="h3">密码管理</h3>
						</div>
						<div class="info-box">
							<div class="info-content">
								<div class="info-item info-item-first">
									<span class="info-item-title">手机号</span>
									<el-input class="info-item-input" v-model="mobile" placeholder="请输入手机号" @blur="validate(1)"></el-input>
									<div class="check" @click="sendCode">
										<a href="javascript:;" :class="is_request ? 'check-code':'check-code1'">{{getCode}}</a>
									</div>
									<p class="item-tips1" v-show="test1">*手机号格式不正确，请重新输入！</p>
								</div>
								<div class="info-item">
									<span class="info-item-code">验证码</span>
									<!--<div class="item-input-box1">-->
										<el-input type="text" class="info-item-input" v-model="phone_code" autocomplete="off" auto-focus placeholder="请输入短信验证码" @blur="validate(2)"></el-input>
									<!--</div>-->
									<p class="item-tips1" v-show="test2">*验证码不能为空！</p>
								</div>
								<div class="info-item">
									<span class="info-item-title">新密码</span>
									<el-input type="password" class="info-item-input" v-model="password" placeholder="请输入新密码" @blur="validate(3)"></el-input>
									<p class="item-tips1" v-show="test3">*密码不能为空！</p>
								</div>
								<div class="info-item info-item-last">
									<span class="info-item-title">确认密码</span>
									<el-input type="password" class="info-item-input " v-model="password_repeat" placeholder="请再次输入密码" @blur="validate(4)"></el-input>
									<p class="item-tips1" v-show="test4">*请输入正确的确认密码</p>
								</div>
								<!--<div class="login-tips-container">-->
									<!--<div class="login-tips animated" v-show="isTips" :class="{'shake':isShake}">-->
										<!--<span class="item-icon-err">-->
                                    <!--</span>-->
										<!--<p class="item-tips">{{tips}}</p>-->
									<!--</div>-->
								<!--</div>-->
								<a href="javascript:;" class="save" @click="passwordReset">确认保存</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<myFooter></myFooter>
	</div>
</template>

<script>
	import { getPhoneCode } from "../api/apiIndex.js";
	export default {
		data() {
			return {
				addressF: "个人中心",
				addressS: "账号管理",
				addressT: "密码修改",
				getCode: '获取验证码',
				phone_code: '',
				mobile: '',
				password: '',
				password_repeat: '',
				countdown: 60,
				myTime: '',
				is_request: true,
				isTips: false,
				isShake: false,
				tips: '',
				infoDrop: true,
				orderDrop: false,
                test1:false,
                test2:false,
                test3:false,
                test4:false,
			};
		},
		created() {
			this._getUserInfo();
		},
		methods: {
			_getUserInfo() {
				const url = '/user/info/'
				this.$http.get(url).then((res) => {
					if(res.body.success == 1) {

					}
				})
			},
			success() {
				this.$message({
					message: '密码修改成功',
					type: 'success'
				});
			},
            validate(index){
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			    if(index == 1){
			        if(!myreg.test(this.mobile)){
			            this.test1 = true;
					}else{
                        this.test1 = false;
					}
				}else if(index == 2){
			        if(!this.phone_code){
                        this.test2 = true;
					}else{
                        this.test2 = false;
					}
				}else if(index == 3){
			        if(!this.password){
                        this.test3 = true;
					}else{
                        this.test3 = false;
					}
				}else if(index == 4){
			        if(!this.password_repeat || this.password_repeat != this.password){
                        this.test4 = true;
                    }else{
                        this.test4 = false;
                    }
				}
			},
			passwordReset() {
				const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.mobile)) {
					// this.isTips = true;
					// this.tips = '您输入的手机号码格式不正确';
					// this.isShake = true;
					// setTimeout(() => {
					// 	self.isShake = false
					// }, 2000)
					return false;
				} else if(this.phone_code == '') {
					// this.isTips = true;
					// this.tips = '验证码不能为空!';
					// this.isShake = true;
					// setTimeout(() => {
					// 	self.isShake = false
					// }, 2000)
					return false;
				} else if(this.password == '') {
					// this.isTips = true;
					// this.tips = '密码不能为空!';
					// this.isShake = true;
					// setTimeout(() => {
					// 	self.isShake = false
					// }, 2000)
					return false;
				} else if(this.password_repeat == '') {
					// this.isTips = true;
					// this.tips = '密码不能为空!';
					// this.isShake = true;
					// setTimeout(() => {
					// 	self.isShake = false
					// }, 2000)
					return false;
				} else {
					this.$http.post('/user/password-reset', {
						mobile: this.mobile,
						code: this.phone_code,
						password: this.password,
						password_repeat: this.password_repeat
					}).then(res => {
						if(res.data.success == 1) {
							this.success();
						} else {
                            this.$message({
                                message:res.data.msg,
                                type: 'success'
                            });
						}
					})
				}
			},
			sendCode: function() {
				const self = this;
				const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.mobile)) {
					this.isTips = true;
					this.tips = "您输入的手机格式不正确";
					this.isShake = true;
					setTimeout(() => {
						self.isShake = false;
					}, 2000);
				} else if(!this.is_request) {
					this.isTips = true;
					this.tips = "请稍后重试";
					this.isShake = true;
					setTimeout(() => {
						self.isShake = false;
					}, 2000);
				} else if(myreg.test(this.mobile) && this.is_request) {
					this.isTips = false;
					this.tips = '';
					getPhoneCode(this.mobile)
						.then(res => {
							if(res.data.success == 1) {
								const myTime = setInterval(function() {
									self.sendemail();
									self.is_request = false;
									if(self.countdown == 60) {
										clearInterval(myTime);
										self.is_request = true;
										self.isTips = false;
										self.tips = '';
									}
								}, 1000);
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			},
			sendemail() {
				if(this.countdown == 0) {
					this.countdown = 60;
					this.getCode = "获取验证码";
				} else {
					this.is_request = false;
					this.getCode = this.countdown + "S重新获取";
					this.countdown--;
				}
			}
		}
	};
</script>

<style scoped lang="less">
	@import "../css/reset.css";
	@import "../css/animate.min.css";
	.page {
		width: 100%;
		height: auto;
		.content {
			border-top: 2px solid #2D2C2C;
			.content-wrap {
				width: 1200px;
				height: 945px;
				margin: 0 auto;
				.addressNav-container {
					padding:20px 0 20px;
					.addressNav {
						font-size: 13px;
						.address-now {
							color:#666666;
						}
						.address{
							color:#524f4f;
						}
					}
				}
				.content-container {
					.content-container-left {
						float: left;
						width: 148px;
						padding: 17px 0 17px;
						box-sizing: border-box;
						display: flex;
						justify-content: center;
						text-align: center;
						font-size: 15px;
						border: 1px solid #eeeeee;
						.slide-nav {
							width: 110px;
							.nav-title {
								font-weight: bold;
								color: #333333;
								position: relative;
								.nav-title1 {
									position: absolute;
									left: 0;
									top: 0;
									bottom: 0;
									margin: auto;
									display: inline-block;
									width: 13px;
									height: 13px;
									background: url('/static/images/pc/unfold.png') no-repeat left center;
								}
								.nav-title2 {
									position: absolute;
									left: 0;
									top: 0;
									bottom: 0;
									margin: auto;
									display: inline-block;
									width: 13px;
									height: 13px;
									background: url('/static/images/pc/fewer.png') no-repeat left center;
								}
							}
							.nav-title:nth-of-type(2) {
								margin-top: 15px;
							}
							.nav-ul {
								height: auto;
								margin-top: 15px;
								.item-nav {
									.item-a {
										color: #666666;
									}
									.add-item-a {
										color: #ed620f;
									}
									a:hover {
										color: #ed620f;
									}
								}
							}
							.nav-border {
								border-bottom: 1px dashed #dddddd;
								padding-bottom: 15px;
								.item-nav:nth-child(1) {
									margin-bottom: 10px;
								}
							}
						}
					}
					.content-container-right {
						width: 1030px;
						height: 638px;
						margin-left: 20px;
						border: 1px solid #eeeeee;
						float: left;
						.right-top-box {
							width: 1030px;
							height: 40px;
							border-bottom: 1px solid #eeeeee;
							line-height: 40px;
							.h3 {
								margin-left: 20px;
								font-size: 15px;
								font-weight: bold;
							}
						}
						.info-box {
							width: 1030px;
							height: 600px;
							.info-content {
								margin-left: 310px;
								margin-top: 40px;
								width: 380px;
								height: 460px;
								.info-item {
									width: 100%;
									height: 40px;
									margin-bottom:30px;
									line-height: 40px;
									position: relative;
									font-size: 0;
									.item-tips1{
										position: absolute;
										left: 100px;
										bottom:-35px;
										color: #ff6400;
										font-size: 13px;
									}
									.info-item-code {
										width: 60px;
										height: 40px;
										font-size: 15px;
										color: #333333;
										display: block;
										float: left;
										text-align: right;
									}
									.info-item-title {
										width: 60px;
										height: 40px;
										font-size: 15px;
										color: #333333;
										display: inline-block;
										text-align: right;
									}
									.info-item-input {
										margin-left: 30px;
										font-size: 13px;
										width: 280px;
									}
									.item-input-box1 {
										float: left;
									}
									
									.check {
										float: right;
										width: 120px;
										height: 40px;
										text-align: center;
										display: flex;
										justify-content: center;
										align-items: center;
										cursor: pointer;
										margin-top:1px;
										.check-code {
											display: inline-block;
											width: 102px;
											height: 33px;
											line-height:33px;
											background: #fff;
											border-radius:2px;
											font-size: 15px;
											color:#ff6400;
											border: solid 1px #ff6400;
										}
										.check-code1{
											display: inline-block;
											width: 102px;
											height: 33px;
											line-height:33px;
											background: #eeeeee;
											border-radius:2px;
											font-size: 15px;
											color: #b3b3b3;
											border:1px solid #eeeeee;
										}
										.check-code:hover{
											background: #ff6400;
											color:#fff;
										}
									}
								}
								.info-item-last {
									margin-bottom:0;
								}
								.info-item-first{
									width: 500px;
									display: flex;
									align-items: center;
								}
								.login-tips-container {
									width: 353px;
									height: 20px;
									margin-bottom: 10px;
									.login-tips {
										margin-left: 40px;
										width: 310px;
										height: 20px;
										.item-icon-err {
											width: 40px;
											height: 20px;
											display: inline-block;
											background: url("/static/images/pc/login-error.png") no-repeat center center;
										}
										.item-tips {
											width: 250px;
											height: 20px;
											font-size: 16px;
											color: #e62a05;
											display: inline-block;
											vertical-align: top;
										}
									}
								}
								.save {
									display: inline-block;
									background-color:#ff6400;
									color: #fefefe;
									font-size: 24px;
									width:180px;
									height: 60px;
									line-height:60px;
									text-align: center;
									margin:70px 0 0 114px;
								}
								.save:hover{
									background: #f05e00;
								}
							}
						}
					}
				}
			}
			.content-wrap:after {
					display: block;
					clear: both;
					content: "";
					visibility: hidden;
					height: 0
				}
		}
	}
</style>
<style type="text/css">
	.el-input__inner{
		border:solid 1px #dddddd;
		border-radius: 0;
		color: #333333;
		font-size: 15px;
	}
	.el-input__inner:focus{
		box-shadow: 0px 2px 5px 0px rgba(74, 175, 233, 0.16);
		border: solid 1px #4aafe9;
	}
</style>