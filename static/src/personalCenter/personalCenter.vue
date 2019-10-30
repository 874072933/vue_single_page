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
								<a class="item-a add-item-a" href="/user/info">基本信息</a>
							</li>
							<li class="item-nav">
								<a class="item-a" href="/user/password-reset">密码管理</a>
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
						<h3 class="h3">基本信息</h3>
					</div>
					<div class="info-box">
						<div class="info-content">
							<div class="info-item">
								<span class="info-item-title">姓名</span>
								<el-input class="info-item-input" v-model="username" placeholder="请输入姓名"></el-input>
							</div>
							<div class="info-item">
								<span class="info-item-title">手机号</span>
								<span class="info-item-input" placeholder="请输入手机号">{{userMobile}}</span>
							</div>
							<div class="info-item info-item-wx">
								<span class="info-item-title">微信号</span>
								<el-input class="info-item-input" v-model="userwx" placeholder="请输入微信号" @input="verifyWx"></el-input>
								<p v-show="!is_Wx" class="tip-iswx">*微信账号格式不正确，请重新输入！</p>
							</div>
							<div class="info-item">
								<span class="info-item-title">职位</span>
								<el-input class="info-item-input" v-model="userposition" placeholder="请输入职位"></el-input>
							</div>
							<div class="info-item" style="margin-bottom: 0;">
								<span class="info-item-title">公司名</span>
								<el-input class="info-item-input" v-model="usercompany" placeholder="请输入公司名"></el-input>
							</div>
							<a href="javascript:;" class="save" @click="save()">确认保存</a>
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
	export default {
		data() {
			return {
				addressF: "个人中心",
				addressS: "账号管理",
				addressT: "基本信息",
				username: '',
				userMobile: '',
				userwx: '',
				userposition: '',
				usercompany: '',
				infoDrop: true,
				orderDrop: false,
				is_Wx:true,
			};
		},
		created() {
			this._getUserInfo();
		},
		methods: {
			success(data) {
				this.$message({
					message: data,
					type: 'success'
				});
			},
			verifyWx(){
				let reg = /^[0-9a-zA-Z_-]{5,}$/;
				if(reg.test(this.userwx)){
					this.is_Wx = true;
				}else{
					this.is_Wx = false;
				}
			},
			save(){
				let reg = /^[0-9a-zA-Z_-]{5,}$/;
				if(!reg.test(this.userwx)){
					return false;
				}
				const url = '/user/update';
				this.$http.get(url, {
					params: {
						weixin: this.userwx,
						name: this.username,
						position: this.userposition,
						company_name: this.usercompany,
						mobile: this.userMobile
					}
				}).then((res) => {
					if(res.body.success == 1) {
						this.success('资料修改成功');
					}else{
						this.success(res.body.message);
					}
				})
			},
			_getUserInfo() {
				const url = '/user/info'
				this.$http.get(url).then((res) => {
					if(res.body.success == 1) {
						this.username = res.body.list.name;
						this.userMobile = res.body.list.mobile;
						this.userwx = res.body.list.weixin;
						this.userposition = res.body.list.position;
						this.usercompany = res.body.list.company_name;
					}
				})
			}
		}
	};
</script>

<style scoped lang="less">
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
					width: 1200px;
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
								/*width: 360px;*/
								height: 460px;
								.info-item {
									width: 100%;
									height: 40px;
									margin-bottom: 30px;
									line-height: 40px;
									.info-item-title {
										width: 45px;
										height: 40px;
										font-size: 15px;
										display: inline-block;
									}
									.info-item-input {
										margin-left: 30px;
										font-size: 15px;
										width: 280px;
									}
								}
								.info-item-wx{
									position: relative;
									.tip-iswx{
										color:#ff6400;
										font-size: 13px;
										position: absolute;
										left:90px;
										bottom: -30px;
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
									margin:60px 0 0 114px;
								}
								.save:hover{
									background: #f05e00;
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
	}
</style>
<style type="text/css">
	.el-input__inner{
		border:1px solid #dddddd;
		border-radius:0;
		color: #333333;
		font-size: 15px;
	}
	.el-input__inner:focus{
		box-shadow: 0px 2px 5px 0px rgba(74, 175, 233, 0.16);
		border: solid 1px #4aafe9;
	}
</style>