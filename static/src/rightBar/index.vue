<style>
	.right-bar{
		position: fixed;
		bottom:30%;
		right:100px;
		z-index:221;
	}
	.right-bar>div{
		width: 40px;
		height: 40px;
		border:1px solid rgb(239,239,239);
		background: #fff;
		box-shadow:0 0 5px #dfdbdb;
		margin-bottom:1px;
	} 
	.right-bar>div a{
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.right-bar-code{
		position: relative;
	}
	.code-large{
		position: absolute;
		top: 0;
		left: -130px;
		width:124px;
		height:124px;
		background:url('/static/images/pc/qrCodeBig.png') no-repeat center center;
	}
	.code-sign{
		width: 100%;
		height: 100%;
		background: url('/static/images/pc/qrCodeSmall.png') no-repeat center center;
	}
	.right-bar-gotop>a{
		background:url('/static/images/pc/upArrow.png') no-repeat center center;
	}
	.right-bar-service>a{
		background:url('/static/images/pc/service-right.png')no-repeat center center ;
	}
</style>
<template>
	<div>
		<div class="right-bar">
			<div class="right-bar-service">
				<a href="tencent://message/?uin=2561476865&Site=www.maizhe.com&Menu=yes"></a>
			</div>
			<div class="right-bar-code" @mouseover="changeT" @mouseleave="changeF">
				<div class="code-sign"></div>
				<div class="code-large" v-show="is_showbig"></div>
			</div>
			<div class="right-bar-gotop">
				<a @click="goTop" href="javascript:;"></a>
			</div>
		</div>
	</div>
</template>

<script>
	const $ = require('jquery');
	export default {
		data: function() {
			return {
				top:'',
				type:'',
				is_showbig:false,
			}
		},
		methods: {
			goTop(){
				$('body,html').animate({
					scrollTop: 0
				},800)
			},
			getScrollTop() {
				if (window.pageYOffset) {
					this.type = 1;
					this.top = window.pageYOffset;
				}else if (document.compatMode && document.compatMode != 'BackCompat'){
					this.type = 2;
					this.top = document.documentElement.scrollTop; 
				}else if (document.body) {
					this.type = 3;
					this.top = document.body.scrollTop; 
				}
			},
			changeT(){
				this.is_showbig = true;
			},
			changeF(){
				this.is_showbig = false;
			}
		},
		props:[],
		mounted: function() {
//			$(window).scroll(function(event) {
//				var top = $(document).scrollTop();
//				if(top >= 450) {
//					$('.right-bar').show();
//				} else {
//					$('.right-bar').hide();
//				}
//			});
		},

	}
</script>