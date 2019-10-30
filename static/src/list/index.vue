<template>
	<div class="page" v-cloak v-loading="loading">
		<myHeader></myHeader>
		<div class="list-wrap">
			<div class="list-content">
				<div class="list-result"><span>全部结果：></span><span style="color:#524F4F;margin-left: 10px;" v-text="cate_name"></span></div>
				<div class="list-search">
					<div class="list-class">
						<span>服务类型:</span>
						<ul class="cate-ct">
							<li class="first-cate curp" :class="item.id == cate_id1 ? 'add-opt':''" v-for="(item,index) in searchList" v-text="item.name" @click="choicefid(item.id,index,$event)"></li>
						</ul>
					</div>
					<div class="list-class" v-if="twoSearch.length">
						<span>二级分类:</span>
						<div class="cate-ct">
							<div class="cate-ct-d">
								<div class="two-cate curp" :class="item.id == cate_id2 ? 'add-opt':''" v-for="(item,index) in twoSearch" v-text="item.name" @click="choicetid(item.id,index,$event)"></div>
							</div>
							<div v-if="threeSearch.length > 0" class="cate-ct-d">
								<div class="three-cate curp" v-for="(item,index) in threeSearch" v-text="item.name" :class="item.id == cate_id3 ? 'add-opt':''" @click="choicehid(item.id,index,$event)"></div>
							</div>
						</div>
					</div>
					<div class="list-class">
						<span>价格:</span>
						<div class="cate-ct" style="position:relative;">
							<span class="first-cate price-cate curp" v-for="item in priceArr" v-text="item.name" @click="choicePrice(item.priceStart,item.priceEnd,$event)"></span>
							<div class="price-input">
								<input type="text" style="margin-right:8px;" placeholder="￥" v-model="start_p" /> 一 <input type="text" style="margin-left:8px;" placeholder="￥" v-model="start_e" /><button @click="confirmPrice">确定</button>
							</div>
						</div>
					</div>
				</div>
				<div v-if="listArr.length > 0" class="list-item">
					<div class="item-wrap" v-for="item in listArr" @click="goDetail(item.unique_key)">
						<div class="item-logo flex"><div class="flex"><img :src="item.image_path" alt="" /></div></div>
						<p><span v-text="'【' + item.title.split('/')[0] + '】'"></span>{{item.title}}</p>
						<div class="item-price">
							<span>￥</span><span class="new-price" v-text="parseInt(item.discount_price)"></span><span style="font-size:16px;color:#FF6400;" v-text="item.discount_price.substr(item.discount_price.length - 3)"></span><span class="old-price">￥{{item.market_price}}</span>
							<div class="consult"><i class="consult-logo"></i><span class="curp">咨询</span></div>
						</div>
					</div>
				</div>
				<div v-else class="list-empty">
					<img src="/static/images/pc/list-empty.png" alt="" />
					<p>抱歉，暂无找到相关营销产品！</p>
				</div>
				<myPagination :maxPages="maxPages" :nowPages="nowPages" :limt="limt" :show="is_showPages" @changepage='flipOver'></myPagination>
			</div>
		</div>
		<rightBar></rightBar>
		<myFooter></myFooter>
	</div>
</template>

<script>
	const $ = require('jquery');
	//import {getItemList} from '../api/apiIndex.js'
	export default {

		data: function() {
			return {
				loading:true,
				is_showPages: true,
				nowPages: 1,
				maxPages: 10,
				limt: 5,
				searchList: [],
				listArr: [],
				twoSearch: [],
				threeSearch: [],
				priceArr: [{
						name: '500元以下',
						priceStart: 0,
						priceEnd: 500,
					},
					{
						name: '500-2000元',
						priceStart: 500,
						priceEnd: 2000,
					},
					{
						name: '2000-4000元',
						priceStart: 2000,
						priceEnd: 4000,
					},
					{
						name: '4000-6000元',
						priceStart: 4000,
						priceEnd: 6000,
					},
					{
						name: '6000-10000元',
						priceStart: 6000,
						priceEnd: 10000,
					},
					{
						name: '10000元以上',
						priceStart: 10001,
						priceEnd: '',
					}
				],
				cate_id1: '',
				cate_id2: '',
				cate_id3: '',
				dataObj: {
					page_no: 1,
				},
				start_p: '',
				start_e: '',
				keyword:'',
				cate_name:'',
			}
		},
		watch: {

		},
		created(){
			let self = this;
            var timer = window.setTimeout(()=>{
                self.loading = false;
            },500)
            clearTimeout();
			if(this.getQueryString('keyword')){
				this.keyword = this.getQueryString('keyword');
//				this.dataObj.keyword = this.keyword;
			}
			if(this.getQueryString('cate_id1')){
				this.cate_id1 = this.getQueryString('cate_id1');
//				this.dataObj.cate_id1 = this.cate_id1;
			}else if(this.getQueryString('cate_id2')){
				this.cate_id2 = this.getQueryString('cate_id2');
//				this.dataObj.cate_id2 = this.cate_id2;
			}else if(this.getQueryString('cate_id3')){
				this.cate_id3 = this.getQueryString('cate_id3');
//				this.dataObj.cate_id3 = this.cate_id3;
			}
			this.getItemList();
			this.getCate();
		},
		methods: {
			getItemList() {
				this.load = true;
				this.$http.post('/item/list',{
					cate1_id:this.cate_id1,
					cate2_id:this.cate_id2,
					cate3_id:this.cate_id3,
					keyword:this.keyword,
					begin_money: this.priceStart,
					end_money: this.priceEnd,
					page_no:this.nowPages
				}).then(res => {
					if(res.body.success == 1) {
						if(res.body.data.list.length > 0){
							this.listArr = res.body.data.list;
							this.maxPages = Math.ceil(res.body.data.count / 16);
							this.is_showPages = true;
							
						}else{
							this.listArr = [];
							this.is_showPages = false;
						}
						this.cate_name = res.body.data.cate_name;
					} else if(res.body.success == 0) {
						this.listArr = [];
						this.is_showPages = false;
					}
					this.load = false;
				})
			},
			flipOver(nowpages) {
				this.nowPages = nowpages;
//				this.judge('1');
				this.getItemList();
			},
			goDetail(key){
				window.location.href = '/item/detail/' + key;
			},
			getCate() {
				this.$http.get('/search-cate').then(res => {
					this.searchList = res.body.list;
					if(this.cate_id1){
						for(let i = 0;i < this.searchList.length;i++){
							if(this.searchList[i].id == this.cate_id1){
								if(this.searchList[i].son){
									this.twoSearch = this.searchList[i].son;
								}
							}
						}
					}else{
						this.twoSearch = this.searchList[0].son;
					}
					
					
				})
			},
			choicefid(id, index, e) {
                this.keyword = '';
				let el = e.target;
				if($(el).hasClass('add-opt')) {
					this.cate_id1 = '';
					$(el).removeClass('add-opt');
				} else {
					$(el).parent().find('li').removeClass('add-opt');
					$(el).addClass('add-opt');
					this.cate_id1 = id;
					this.cate_id2 = '';
					this.cate_id3 = '';
					this.nowPages = 1;
					this.getItemList();
				}
				if(this.searchList[index].son){
					this.twoSearch = this.searchList[index].son;
				}else{
					this.twoSearch = [];
				}
				this.threeSearch = [];
			},
			choicetid(id, index, e){
                this.keyword = '';
				let el = e.target;
				if($(el).hasClass('add-opt')) {
					this.cate_id2 = '';
					this.threeSearch = [];
				} else {
					this.cate_id2 = id;
					this.cate_id3 = '';
					this.nowPages = 1;
					this.getItemList();
					if(this.twoSearch[index].son) {
						this.threeSearch = this.twoSearch[index].son;
					} else {
						this.threeSearch = [];
					}

				}
			},
			choicehid(id, index, e) {
                this.keyword = '';
				let el = e.target;
				if($(el).hasClass('add-opt')) {
					this.cate_id3 = '';
				} else {
					this.cate_id3 = id;
					this.nowPages = 1;
					this.getItemList();
				}
			},
			choicePrice(start, end, e) {
                this.keyword = '';
				let el = e.target;
				if($(el).hasClass('add-opt')) {
					$(el).removeClass('add-opt');
					this.priceStart = '';
					this.priceEnd = '';
				} else {
					$('.price-cate').removeClass('add-opt');
					$(el).addClass('add-opt');
					this.priceStart = start;
					this.priceEnd = end;
//					this.judge();
					this.nowPages = 1;
					this.getItemList();
				}
			},
			judge: function(t) {
				if(this.cate_id3) {
					this.dataObj = {
						page_no: t == 1 ? this.nowPages : 1,
						cate_id3: this.cate_id3,
						begin_money: this.priceStart,
						end_money: this.priceEnd,
					}
					return false;
				}
				if(this.cate_id2) {
					this.dataObj = {
						page_no: t == 1 ? this.nowPages : 1,
						cate_id2: this.cate_id2,
						begin_money: this.priceStart,
						end_money: this.priceEnd
					}
					return false;
				}
				this.dataObj = {
					page_no: t == 1 ? this.nowPages : 1,
					cate_id1: this.cate_id1,
					begin_money: this.priceStart,
					end_money: this.priceEnd
				}
			},
			confirmPrice() {
				if((this.start_p - 0) > (this.start_e - 0)) {
					this.$message({
						message: '请输入正确价格',
						iconClass:'error1',
						customClass:'el-error'
					});
					return false;
				} else {
					this.priceStart = this.start_p;
					this.priceEnd = this.start_e;
//					this.judge();
					this.getItemList();
				}
			},
			getQueryString(name){
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				let reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
				let r = window.location.search.substr(1).match(reg);
				let q = window.location.pathname.substr(1).match(reg_rewrite);
				if(r != null) {
					return decodeURI(r[2]);
				} else if(q != null) {
					return decodeURI(q[2]);
				} else {
					return null;
				}
			}
		},
	}
</script>

<style scoped lang="less">
	@import '../css/reset.css';
	body{
		opacity: 0;
	}
	.flex{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}
	.page {
		width: 100%;
		height: 1300px;
	}
	
	.curp {
		cursor: pointer;
	}
	
	.list-wrap {
		border-top: 2px solid #2D2C2C;
		background: #f6f6f6;
		padding-bottom: 85px;
	}
	
	.list-content {
		width: 1200px;
		margin: 0 auto;
	}
	
	.list-result {
		font-size: 13px;
		padding: 23px 0 22px;
		color: #666666;
	}
	
	.list-search {
		background: #fff;
		border:1px solid #eeeeee;
	}
	
	.list-class {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		font-size: 13px;
		border-bottom: 1px solid #EEECEC;
	}
	
	.list-class>span {
		display: inline-block;
		width: 105px;
		color: #888888;
		margin: 22px 0 21px 28px;
	}
	
	.cate-ct {
		flex: 1;
		overflow: hidden;
	}
	
	.first-cate {
		margin: 21px 36px 0 0;
		color: #323232;
		float: left;
	}
	.first-cate:hover{
		color: #FF6400;
	}
	.cate-ct-d {
		overflow: hidden;
	}
	.two-cate {
		margin: 21px 36px 0 0;
		float: left;
		position: relative;
	}
	.two-cate:hover{
		color: #FF6400;
	}
	.three-cate {
		display: inline-block;
		margin: 22px 36px 22px 0;
	}
	.three-cate:hover{
		color: #FF6400;
	}
	.add-opt {
		color: #FF6400;
	}
	
	.price-input {
		position: absolute;
		right: 46px;
		top: 0;
		padding-top: 14px;
		input {
			width: 78px;
			padding-left: 8px;
			height: 26px;
			border: 1px solid #C8C8C8;
		}
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
		button {
			width: 46px;
			height: 24px;
			background: #fff;
			margin: -2px 0 0 28px;
			vertical-align: middle;
			border-radius: 2px;
			font-size: 12px;
			color: #808080;
			border: 1px solid #C8C8C8;
		}
		button:hover{
			background: #f3efef;
		}
	}
	
	.list-item {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		flex-flow: wrap;
	}
	
	.item-wrap {
		width: 285px;
		box-sizing: border-box;
		background: #fff;
		margin: 20px 20px 0 0;
		border: 1px solid #E0E0E0;
		cursor: pointer;
		.item-logo {
			padding:30px 0 20px;
			justify-content: center;
			div{
				width: 140px;
				height: 140px;
				justify-content: center;
				align-items: center;
				img {
					width:100%;
					max-height:100%;
				}
			}
		}
		.item-price {
			padding: 10px 0 20px 10px;
			span {
				color: #FF6400;
				font-size: 13px;
			}
			.new-price {
				font-size: 20px;
			}
			.old-price {
				text-decoration-line: line-through;
				color: #ACACAC;
				margin-left: 4px;
			}
			.consult {
				float: right;
				margin-right: 16px;
				height:27px;
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				align-items: center;
				.consult-logo {
					display: inline-block;
					width: 18px;
					height: 16px;
					background: url('/static/images/pc/service.png') no-repeat;
				}
				.consult-logo:hover {
					background: url('/static/images/pc/service1.png') no-repeat;
				}
				span {
					font-size: 14px;
					color: #A6A5A5;
					margin-left: 5px;
				}
			}
		}
		p {
			font-size: 14px;
			color: #333333;
			padding: 0 10px;
			min-height: 38px;
			max-height: 38px;
			overflow: hidden;
			span{
				margin-right:5px;
			}
		}
		p:hover{
			color:#FF6400;
			text-decoration:underline;
		}
	}
	
	.item-wrap:nth-of-type(4n-4){
		margin-right: 0;
	}
	.item-wrap:hover {
		border: 1px solid #FFB68A;
		box-shadow: 0px 4px 5px 0px rgba(235, 98, 15, 0.09);
	}
	
	.list-empty {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		flex-flow: wrap;
		padding: 100px 0 400px 0;
		img {
			margin-bottom: 22px;
		}
		p {
			width: 100%;
			color: #919191;
			font-size: 18px;
			text-align: center;
		}
	}
</style>