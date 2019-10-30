<template>
	<div class="page">
		<myHeader></myHeader>
		<div class="wrap">
			<div class="order-detail">
				<p class="order-detail-p1">订单详情</p>
				<div class="order-state">
					<div class="flex">
						<div class="order-state-sign" :class="orderObj.order_status == -1 ? 'order-state-sign3' : orderObj.order_status == 1 ? 'order-state-sign2':'order-state-sign1'"></div>
						<div class="order-state-txt">
							<p class="order-state-tp1">订单状态：{{orderObj.order_status_cn}}</p>
							<p v-if="orderObj.order_status_tips" class="order-state-tp2" v-text="orderObj.order_status_tips">您的订单已交易并服务成功！</p>
						</div>
					</div>
					<a v-if="orderObj.order_status == 1" :href="'/order/pay-again?order_id=' + order_id" class="order-gobuy">立即付款</a>
				</div>
				<p class="order-detail-p2">订单信息</p>
				<div class="order-message">
					<div class="order-message-d">
						<p><span class="order-message-lab">订单编号：</span>{{order_id}}</p>
						<p><span class="order-message-lab">下单时间：</span>{{orderObj.create_at}}</p>
					</div>
					<div class="order-message-d">
						<p><span class="order-message-lab">支付金额：</span><span class="order-message-price">￥{{orderObj.pay_money}}</span><span class="order-message-type">({{orderObj.pay_type_cn}})</span></p>
						<p><span class="order-message-lab">支付时间：</span>{{orderObj.pay_at}}</p>
					</div>
				</div>
				<div class="goods-detail">
					<div class="goods-detail-hd"><span>订单信息</span><span>数量</span></div>
					<div class="goods-detail-bd flex">
						<div class="goods-msg flex">
							<div class="goods-logo flex" @click="goDetail(orderObj.unique_key)"><img :src="orderObj.item_image_path" alt="" /></div>
							<div class="goods-msgd">
								<p class="goods-des" v-text="orderObj.item_title"></p>
								<p class="goods-price">活动价<span>￥{{orderObj.sales_price}}</span></p>
								<p class="goods-time">平均响应时长{{orderObj.item_day}}个工作日</p>
							</div>
						</div>
						<div class="goods-num flex" v-text="orderObj.quantity"></div>
					</div>
				</div>
			</div>
		</div>
		<myFooter></myFooter>
	</div>
</template>

<script>
	//import { getPhoneCode } from "../api/apiIndex.js";
	export default {
		data() {
			return {
				order_id: '',
				orderObj: {},
			};
		},
		created() {
			this.order_id = this.getQueryString('id');
			console.log(this.order_id);
			this.orderDetail()
		},
		methods: {
			orderDetail() {
				this.$http.post('/order/detail', {
					order_id: this.order_id
				}).then(res => {
					if(res.body.success == 1) {
						this.orderObj = res.body.data;
					}
				})
			},
			getQueryString(name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				let reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
				let r = window.location.search.substr(1).match(reg);
				let q = window.location.pathname.substr(1).match(reg_rewrite);
				if(r != null) {
					return unescape(r[2]);
				} else if(q != null) {
					return unescape(q[2]);
				} else {
					return null;
				}
			},
			goDetail(key){
				window.location.href = '/item/detail/' + key;
			}
		}
	};
</script>

<style scoped lang="less">
	@import "../css/reset.css";
	.flex {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}
	
	.page {
		width: 100%;
		height: auto;
		.wrap {
			background: #f6f6f6;
			padding: 30px 0 140px;
			.order-detail {
				width: 1200px;
				margin: 0 auto;
				background: #fff;
				border: 1px solid #E7E7E7;
				.order-detail-p1 {
					color: #565656;
					font-size: 18px;
					padding: 20px 0 20px 24px;
					border-bottom: 1px solid #E7E7E7;
				}
				.order-detail-p2 {
					color: #2A2A2A;
					font-size: 18px;
					font-weight: bold;
					padding: 10px 0 10px 24px;
					border-bottom: 1px solid #E7E7E7;
				}
				.order-state {
					padding: 34px 0 90px 24px;
					.flex {
						align-items: center;
						.order-state-sign {
							width: 46px;
							height: 46px;
							margin-right: 12px;
						}
						.order-state-sign1 {
							background: url('/static/images/pc/sign1.png') no-repeat;
						}
						.order-state-sign2 {
							background: url('/static/images/pc/sign2.png') no-repeat;
						}
						.order-state-sign3 {
							background: url('/static/images/pc/sign3.png') no-repeat;
						}
						.order-state-tp1 {
							font-size: 16px;
							color: #2A2A2A;
							font-weight: bold;
						}
						.order-state-tp2 {
							font-size: 16px;
							color: #333333;
							margin-top: 8px;
						}
					}
					.order-gobuy{
						display: inline-block;
						width: 160px;
						line-height: 54px;
						background: #ff6400;
						font-size: 20px;
						text-align: center;
						color: #fff;
						margin:30px 0 0 20px;  
					}
				}
				.order-message {
					padding: 30px 0 42px 24px;
					.order-message-d {
						display: -webkit-box;
						display: -moz-box;
						display: -ms-flexbox;
						display: -webkit-flex;
						display: flex;
						font-size: 16px;
						p {
							width: 280px;
							margin-right: 84px;
							color: #262626;
							.order-message-lab {
								display: inline-block;
								width: 80px;
								color: #888888;
							}
							.order-message-price {
								font-weight: bold;
								margin-right: 8px;
							}
						}
					}
				}
				.goods-detail {
					.goods-detail-hd {
						line-height: 34px;
						background: #f9f8f8;
						span {
							font-size: 16px;
							color: #565656;
							display: inline-block;
						}
						span:nth-child(1) {
							width: 926px;
							padding-left: 24px;
						}
						span:nth-last-child(1) {
							width: 250px;
							text-align: center;
						}
					}
					.goods-detail-bd {
						padding: 22px 0 62px 24px;
						.goods-msg {
							width: 926px;
							.goods-logo {
								width: 152px;
								height: 152px;
								justify-content: center;
								align-items: center;
								img {
									max-width: 100%;
									max-height: 100%;
								}
							}
							.goods-msgd {
								flex: 1;
								margin-left: 30px;
								.goods-des {
									color: #2A2A2A;
									font-size: 16px;
									font-weight: bold;
									margin-bottom: 54px;
								}
								.goods-price {
									font-size: 14px;
									color: #2D2C2C;
									margin-bottom: 14px;
									span {
										color: #F66000;
										font-size: 16px;
									}
								}
								.goods-time {
									font-size: 14px;
									color: #2D2C2C;
								}
							}
						}
						.goods-num {
							width: 250px;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}
	}
</style>