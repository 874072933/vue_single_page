<style>
	.mypage {
		text-align: center;
		margin: 10px auto 30px;
		height: 80px;
		line-height: 80px;
		/*background: #fff;*/
		width: 1200px;
	}
	
	.mypage span {
		cursor: pointer;
		display: inline-block;
		height: 28px;
		line-height:28px;
		/*border: 1px solid #eee;*/
		color:#333333;
		margin-right:6px;
		/*border-radius: 4px;*/
		font-size: 14px;
	}
	.mypage .num{
		width: 28px;
	}
	.mypage li {
		display: inline-block;
	}
	.mypage .prev,.next{
		/*width:60px;*/
		padding:0 10px;
	}
	.mypage li span {
		padding: 0;
		width: 28px;
	}
	
	.mypage .addpage {
		background: #FF6400;
		color: white;
	}
</style>
<template>
	<div>
		<div v-show="show" class="mypage">
			<!--<span v-if="isShows" @click="clickPages(1)">首页</span>-->
			<span v-if="isShows" class="prev" @click="clickPages(nowPages - 1)">上一页</span>
			<li>
				<span v-for="x in pagesArr" class="num" :class="x==nowPages ? 'addpage':''" v-text="x" @click="clickPages(x)"></span>
			</li>
			<span v-if="isShoww" class="next" @click="clickPages(nowPages + 1)">下一页</span>
			<!--<span v-if="isShoww" @click="clickPages(maxPages)">尾页</span>-->
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				isShows: false,
				isShoww: false,
				pagesArr: [],
			}
		},
		watch:{
			maxPages:function(to,from){
				if(to != from){
					this.NumPages(this.maxPages,this.nowPages,this.limt);
				}
			}
		},
		components: {

		},
		methods: {
			NumPages:function(maxPages,nowPages,showpages) {
				let mid = Math.floor(showpages / 2);
				let now = (nowPages - 0);
				let pagesArr = [];
				if(this.nowPages == 1){
					this.isShows = false;
				}else{
					this.isShows = true;
				}
				if(this.nowPages == this.maxPages){
					this.isShoww = false;
				}else{
					this.isShoww = true;
				}
				if(now == 1) {
					if(maxPages > 1 && maxPages < showpages) {
						for(let a = 1; a <= maxPages; a++) {
							pagesArr.push(a);
						}
					} else if(maxPages >= showpages) {
						for(let a = 1; a <= showpages; a++) {
							pagesArr.push(a);
						}
					} else {
						pagesArr = [1];
					}
				} else if(now == maxPages) {
					if(maxPages >= showpages) {
						for(let a = (maxPages - showpages + 1); a <= maxPages; a++) {
							pagesArr.push(a);
						}
					} else {
						pagesArr = [];
						for(var i = 1; i <= maxPages; i++) {
							pagesArr.push(i);
						}
					}
				} else {
					if(now > mid) {
						if((now + mid) <= maxPages) {
							for(let a = (now - mid); a <= (now + mid); a++) {
								pagesArr.push(a);
							}
						} else {
							for(let a = (now - mid - 1); a <= maxPages; a++) {
								pagesArr.push(a);
							}
						}
					} else if(now < mid) {
						if(maxPages >= showpages) {
							for(let a = 1; a <= showpages; a++) {
								pagesArr.push(a);
							}
						} else {
							for(let a = 1; a <= maxPages; a++) {
								pagesArr.push(a);
							}
						}
					} else {
						if(maxPages >= showpages) {
							for(let a = (now - mid + 1); a <= (now + mid + 1); a++) {
								pagesArr.push(a);
							}
						} else {
							pagesArr = [];
							for(let i = 1; i <= maxPages; i++) {
								pagesArr.push(i);
							}
						}
					}
				}
				this.pagesArr = pagesArr;
			},
			clickPages: function(index) {
				this.nowPages = index;
				if(this.nowPages == 1){
					this.isShows = false;
				}else{
					this.isShows = true;
				}
				if(this.nowPages == this.maxPages){
					this.isShoww = false;
				}else{
					this.isShoww = true;
				}
				this.NumPages(this.maxPages,this.nowPages,this.limt);
				this.$emit('changepage',this.nowPages);
			},
		},
		props:['maxPages','nowPages','limt','show'],
		mounted: function() {
//			if(this.maxPages == 1){
				this.NumPages(this.maxPages,this.nowPages,this.limt);
//			}
		},

	}
</script>