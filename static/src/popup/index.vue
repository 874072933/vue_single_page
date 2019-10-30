<style>
	.my-popup-bg{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.6);
		z-index: 222;
	}
	.my-popup-content{
		width: 380px;
		background: #fff;
		padding-bottom: 22px;
		position: fixed;
		top:28%;
		left: 0;
		right: 0;
		margin:0 auto;
		z-index: 223;
	}
	.my-popup-txt{
		padding:40px 46px 30px;
		text-align: center;
		font-size: 16px;
		color: #1E1E1E;
		font-weight: bold;
	}
	.my-popup-close{
		width: 16px;
		height: 16px;
		background: url('/static/images/pc/popup-close.png') no-repeat;
		position: absolute;
		right: -27px;
		top: 0;
	}
	.my-popup-btn{
		display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content:space-between;
        padding:0 72px;
	}
	.my-popup-btn span{
		display: inline-block;
		width: 98px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		font-size: 16px;
		cursor: pointer;
	}
	.my-popup-isbtn{
		color: #fff;
		background: #FF6400;
	}
	.my-popup-nobtn{
		box-sizing: border-box;
		background: #fff;
		border:1px solid #A2A2A2;
	}
</style>
<template>
	<div>
		<div v-show="show" class="my-popup-bg"></div>
		<div v-show="show" class="my-popup-content">
			<p class="my-popup-txt" v-text="txt"></p>
			<div class="my-popup-btn">
				<span class="my-popup-isbtn" @click="popupIs">是</span><span class="my-popup-nobtn" @click="popupNo">否</span>
			</div>
			<div class="my-popup-close" @click="popupNo"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				
			}
		},
		watch:{
			
		},
		components: {

		},
		methods: {
			popupIs(){
				this.$emit('confirm');
			},
			popupNo(){
				this.$emit('cancel');
			}
		},
		props:['show','txt'],
		mounted: function() {
//			console.log(this.show);
		},

	}
</script>