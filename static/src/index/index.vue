<template>

	<div class="page" v-loading="loading">
		<myHeader></myHeader>
		<myCarousel></myCarousel>
		<myPageContent></myPageContent>
		<myFooter></myFooter>
	</div>
</template>

<script>
import {getIndexList} from '../api/apiIndex.js'
	export default {
		
		data: function() {
			return {
				loading:true
			}
		},
		watch:{
			
			
		},
		methods: {
		},
		created: function(){
			let self = this;
            var timer = window.setTimeout(()=>{
                self.loading = false;
            },500)
            clearTimeout();
		},
		mounted: function() {
			
		},
	}
</script>

<style scoped lang="less">
	@import '../css/reset.css';
	.page{
		width: 100%;
		height: 1300px;
	}
</style>
