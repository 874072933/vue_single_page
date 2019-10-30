<template>
	<div class="page">
		<myHeader></myHeader>
		<div class="content">
			<div class="content-wrap">
				<div class="addressNav-container">
					<div class="addressNav">
						<span class="address-now">当前位置:></span>
						<span class="address-1 address">"{{addressF}}"></span>
						<span class="address-2 address">"{{addressS}}"></span>
						<span class="address-2 address">{{addressT}}</span>
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
									<a class="item-a" href="/user/password-reset">密码管理</a>
								</li>
							</ul>
							<div class="nav-title"><span :class="orderDrop ? 'nav-title2':'nav-title1'" @click="orderDrop=!orderDrop"></span>订单中心</div>
							<ul class="nav-ul" v-show="orderDrop">
								<li class="item-nav">
									<a class="item-a add-item-a" href="/order/list">订单记录</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="content-container-right">
						<div class="right-top-box">
							<h3 class="h3">订单管理</h3>
						</div>
						<div class="order-box" v-loading="loading">
							<div class="order-top">
								<div class="order-top-type"><span @click="orderStatus('')" :class="order_status == '' ? 'add-type':''">全部订单</span><span @click="orderStatus(1)" :class="order_status == 1 ? 'add-type':''">待付款</span></div>
								<div class="order-top-search"><input type="text" v-model="keyword" placeholder="请输入名称或编号" /><button @click="keywordSearch">搜索</button></div>
							</div>
							<div class="order-list" v-if="orderList.length > 0">
								<div class="order-list-hd">
									<span class="hd-detail">商品详情</span><span class="hd-price">交易金额（元）</span><span class="hd-number">数量</span><span class="hd-pstate">支付状态</span><span class="hd-ostate">订单状态</span>
								</div>
								<div class="order-list-bd">
									<div class="order-list-item" v-for="(item,index) in orderList">
										<div class="item-top"><span>订单编号：{{item.order_id}}</span><span>下单时间：{{item.create_at}}</span></div>
										<div class="item-content">
											<div class="item-content-s item-msg" @click="goDetail(item.item_unique_key)">
												<div class="item-logo"><img :src="item.image_path" alt="logo" /></div>
												<p class="item-title" v-text="item.item_title"></p>
											</div>
											<div class="item-content-s item-pay">
												<p class="item-pay-price">￥{{item.pay_money}}</p>
												<p class="item-pay-type">({{item.pay_type_cn}})</p>
											</div>
											<div class="item-content-s item-number" v-text="item.quantity">2</div>
											<div class="item-content-s item-pstate">
												<a v-if="item.order_status == -1" href="javascript:;">已取消</a>
												<span v-else-if="item.order_status == 1" class="item-pstate-gobuy" @click="goPay(item.order_id)">立即付款</span>
												<a v-else href="javascript:;">已付款</a>
											</div>
											<div class="item-content-s item-ostate">
												<a :href="'/order/detail?id=' + item.order_id">订单详情</a>
												<a v-if="item.order_status == -1" :href="'/order/detail?id=' + item.order_id">订单关闭</a>
												<a v-else-if="item.order_status == 2" :href="'/order/detail?id=' + item.order_id">服务中</a>
												<a v-else-if="item.order_status == 1" href="javascript:;" @click="openPopup(item.order_id,index)">取消订单</a>
												<a v-else="item.order_status == 3" :href="'/order/detail?id=' + item.order_id">服务成功</a>
											</div>
										</div>
									</div>
								</div>
								<!--<myPagination :maxPages="maxPages" :nowPages="nowPages" :limt="5" :show="showPages" @changepage='pageAjax'></myPagination>-->
							</div>
							<div v-else class="order-empty">
								<img src="/static/images/pc/order-empty.png" alt="" />
								<p>抱歉，暂无订单记录！</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<myPopup :show="pop_show" :txt="poptxt" @confirm="popConfirm" @cancel="uppop"></myPopup>
		<myFooter></myFooter>
		<rightBar></rightBar>
	</div>
</template>

<script>
	//import { getPhoneCode } from "../api/apiIndex.js";
	export default {
		data() {
			return {
				addressF: "个人中心",
				addressS: "账号管理",
				addressT: "订单信息",
				orderList: [],
				maxPages: 5,
				nowPages: 1,
				showPages: true,
				keyword: '',
				order_status: '',
				order_id: '',
				pop_show: false,
				poptxt: '您确定取消该订单吗？删除后不可恢复！',
				loading: true,
				index: '',
				keyword: '',
				infoDrop: false,
				orderDrop: true,
			};
		},
		created() {
			this.orderAjax();

		},
		methods: {
			orderAjax() {
				this.loading = true;
				this.$http.post('/order/list', {
					page_no: this.nowPages,
					keyword: this.keyword,
					order_status: this.order_status,
				}).then(res => {
					this.loading = false;
					if(res.body.success == 1) {
						this.orderList = res.body.data.list;
						// this.maxPages = Math.ceil(res.body.data.total_count / 5);
					} else if(res.body.success == 0) {
						this.orderList = [];
					}
				})
			},
			pageAjax(now) {
				this.nowPages = now;
				this.orderAjax();
			},
			keywordSearch() {
				this.orderAjax();
			},
			orderStatus(status) {
				this.order_status = status;
				this.keyword = '';
				this.orderAjax()
			},
			openPopup(order_id, index) {
				this.order_id = order_id;
				this.index = index;
				this.pop_show = true;
			},
			uppop() {
				this.pop_show = false;
			},
			cancelOrder() {
				this.$http.post('/order/cancel', {
					order_id: this.order_id
				}).then(res => {
					this.$message({
						message: '取消订单成功',
						type: 'success',
						iconClass: 'success1',
					});
					this.orderList[this.index].order_status = -1;
				})
			},
			popConfirm() {
				this.pop_show = false;
				this.cancelOrder();
			},
			goPay(id) {
				window.location.href = '/order/pay-again?order_id=' + id;
			},
			goDetail(key) {
				window.location.href = '/item/detail/' + key;
			},
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
				margin: 0 auto;
				padding-bottom:60px;
				.addressNav-container {
					width: 100%;
					padding: 20px 0 20px;
					.addressNav {
						width: 1200px;
						vertical-align: top;
						font-size: 13px;
						.address-now {
							color:#666666;
						}
						.address{
							color: #212121;
						}
					}
				}
				.content-container {
					width: 1200px;
					/*display: flex;*/
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
						margin-left: 20px;
						float: left;
						.right-top-box {
							width: 1030px;
							height: 40px;
							box-sizing: border-box;
							border: 1px solid #EEEEEE;
							line-height: 40px;
							.h3 {
								margin-left: 20px;
								font-size: 15px;
								font-weight: bold;
							}
						}
						.order-box {
							width: 1030px;
							.order-top {
								padding: 20px 30px;
								display: -webkit-box;
								display: -moz-box;
								display: -ms-flexbox;
								display: -webkit-flex;
								display: flex;
								justify-content: space-between;
								border: 1px solid #EEEEEE;
								border-top: none;
								.order-top-type {
									.add-type {
										color: #EB620F;
									}
									span {
										display: inline-block;
										color: #333333;
										font-weight: bold;
										line-height: 22px;
										font-size: 14px;
										padding: 0 38px 0 30px;
										border-right: 1px solid #E5E5E5;
										cursor: pointer;
									}
									span:nth-last-child(1) {
										border: none;
									}
									span:nth-child(1) {
										padding-left: 0;
									}
								}
								.order-top-search {
									display: -webkit-box;
									display: -moz-box;
									display: -ms-flexbox;
									display: -webkit-flex;
									display: flex;
									align-items: center;
									font-size: 14px;
									color: #333333;
									input {
										width: 230px;
										height: 32px;
										color: #333333;
										border: 1px solid #DDDDDD;
										line-height: 32px;
										padding-left: 12px;
									}
									::-webkit-input-placeholder {
										color: #b7b7b7;
									}
									 :-moz-placeholder {
										color: #b7b7b7;
									}
									::-moz-placeholder {
										color: #b7b7b7;
									}
									:-ms-input-placeholder {
										color: #b7b7b7;
									}
									button {
										width: 54px;
										height: 34px;
										text-align: center;
										background: #F5F5F5;
										border: 1px solid #DDDDDD;
										border-left: none;
										cursor: pointer;
									}
									button:hover {
										background: #fff;
									}
								}
							}
							.order-list {
								.order-list-hd {
									line-height: 36px;
									background: #FBFBFB;
									font-size: 14px;
									border: 1px solid #EEEEEE;
									border-top: none;
									span {
										display: inline-block;
										text-align: center;
										width: 132px;
									}
									.hd-detail {
										width: 500px;
									}
								}
								.order-list-bd {
									.order-list-item {
										margin-top: 20px;
										border: 1px solid #EEEEEE;
										.item-top {
											padding-left: 26px;
											height: 36px;
											line-height: 36px;
											font-size: 14px;
											color: #6E6E6E;
											background: #F4F4F4;
											span {
												margin-right: 52px;
											}
										}
										.item-content {
											display: -webkit-box;
											display: -moz-box;
											display: -ms-flexbox;
											display: -webkit-flex;
											display: flex;
											.item-content-s {
												width: 132px;
												box-sizing: border-box;
												border-right: 1px solid #ECEBEB;
												display: -webkit-box;
												display: -moz-box;
												display: -ms-flexbox;
												display: -webkit-flex;
												display: flex;
											}
											.item-content-s:nth-last-child(1) {
												border-right: none;
											}
											.item-msg {
												width: 502px;
												/*align-items: center;*/
												padding: 20px 0 20px 28px;
												cursor: pointer;
												.item-logo {
													width: 102px;
													height: 102px;
													background: #F4F4F4;
													display: -webkit-box;
													display: -moz-box;
													display: -ms-flexbox;
													display: -webkit-flex;
													display: flex;
													justify-content: center;
													align-items: center;
													img {
														max-width: 102px;
														max-height: 102px;
													}
												}
												.item-title {
													width: 260px;
													font-size: 14px;
													color: #3F3F3F;
													font-weight: bold;
													margin: 5px 0 0 10px;
												}
											}
											.item-pay {
												flex-direction: column;
												justify-content: center;
												p {
													width: 100%;
													text-align: center;
												}
												.item-pay-price {
													font-size: 16px;
													color: #262626;
													font-weight: bold;
												}
												.item-pay-type {
													margin-top: 14px;
													font-size: 14px;
													color: #4B4848;
												}
											}
											.item-number {
												justify-content: center;
												align-items: center;
												font-size: 16px;
												color: #262626;
												font-weight: bold;
											}
											.item-pstate {
												justify-content: center;
												align-items: center;
												a {
													font-size: 16px;
													color: #262626;
												}
												.item-pstate-gobuy {
													display: inline-block;
													width: 82px;
													line-height: 34px;
													background: #ff6400;
													border-radius: 3px;
													font-size: 16px;
													color: #fff;
													text-align: center;
													cursor: pointer;
												}
												.item-pstate-gobuy:hover {
													background: #f05e00;
												}
											}
											.item-ostate {
												flex-direction: column;
												justify-content: center;
												a {
													font-size: 14px;
													color: #4B4848;
													width: 100%;
													display: inline-block;
													margin-top: 15px;
													text-align: center;
												}
												a:hover {
													text-decoration: underline;
													color: #F56000;
												}
												a:nth-child(1) {
													margin: 0;
												}
											}
										}
									}
								}
							}
							.order-empty {
								text-align: center;
								padding-top: 150px;
								min-height: 580px;
								p {
									color: #B2B2B2;
									font-size: 18px;
									margin-top: 20px;
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