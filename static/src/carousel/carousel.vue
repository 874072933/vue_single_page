<template>
    <div class="carousel">
        <swiper :options="swiperOption" class="carouselSwiper" ref="mySwiper">
            <swiper-slide v-for="item in banners" :key="item.id">
                <a :href="item.ad_url" class="bannerPostion" :style="{backgroundImage:'url('+item.image_path+')'}">
                    <!-- <img :src="item.image_path" class="needclick"> -->
                </a>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>

            <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
    </div>
</template>

<script>
import { getbannerList } from "../api/apiIndex.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        // loop: true,
        centeredSlides: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        // },
        observer:true,
        observeParents:true,
        navigation:{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass:'dddddd'
        },//滚轮切换和点击切换不能同时存在
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
      banners:[]
    }
  },
  created(){
  	this.bannerAjax();
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
  },
  methods:{
  	bannerAjax(){
  		getbannerList().then(res => {
			this.banners = res.data.api_sub_advert;
  		})
  	}
  },
  mounted(){
  	this.swiper.loop = true;
  }
};
</script>

<style scoped lang="less">
@import '../css/swiper.min.css';
.bannerPostion{
    background-position: center;
}
.swiper-button-prev{
    left: 40px;
}
.swiper-button-next{
    right: 40px;
} 
.carousel {
  width: 100%;
  height: 425px;
  .carouselSwiper{
        width: 100%;
        height: 425px;
    .swiper-wrapper{
        width: 100%;
        height: 425px;
        .swiper-slide{
            width: 100%;
            height: 425px;
            .bannerPostion{
                width: 100%;
                height: 425px;
                display: inline-block;
            }
        }
    }
  }

}
.needclick{
    width: 100%;
    height: 425px;
}
</style>
<style>	
.swiper-container-horizontal>.swiper-pagination-bullets{
	bottom: 23px;
}	
.swiper-pagination-bullet{
    width: 16px ;
    height: 16px;
    opacity: 1;
    background: url('/static/images/pc/swiper-cir2.png') no-repeat;
}
.swiper-pagination-bullet-active{
    background: url('/static/images/pc/swiper-cir1.png') no-repeat ;
}
.swiper-button-prev{
	display: none;
	width: 29px;
	height: 58px;
	background: url('/static/images/pc/slider_jt.png') no-repeat !important;
	background-position:0 -58px !important;
	background-size: 100%;
    z-index:99999 !important;
}
.swiper-button-next{
	display: none;
	width: 29px;
	height: 58px;
	background: url('/static/images/pc/slider_jt.png') no-repeat !important;
	background-position:-29px -58px !important;
	background-size: 100%;
    z-index: 9999 !important;
}
.carousel:hover .swiper-button-white{
	display:block;

}
</style>