<template>
    <div class="page" v-loading="loading" >
        <myHeader></myHeader>
        <div class="banner">
            
        </div>
        <div class="content">
            <div class="advantage-container">
                <div id="certify">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"><img src="/static/images/pc/about-diversity.png" /></div>
                            <div class="swiper-slide"><img src="/static/images/pc/about-marketing.png" /></div>
                            <div class="swiper-slide"><img src="/static/images/pc/about-scheme.png" /></div>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>
            <div class="map-container" >
                <div class="shade"></div>
                <!--<iframe class="map-box" src="http://map.baidu.com/?newmap=1&s=inf%26uid%3Dcdd274deae3fe9d6e9f8533c%26wd%3D%E8%90%8D%E6%B0%B4%E8%A1%97333%E5%8F%B7%E5%BE%A1%E5%B3%B0%E5%A4%A7%E5%8E%A6%26all%3D1%26c%3D179&from=alamap&tpl=map_singlepoint" frameborder="0"></iframe>-->
                <!--<div class="contact-container">-->
                    <!--<span class="phone">137-3582-4662</span>-->
                    <!--<span class="wx">xsk_tt</span>-->
                <!--</div>-->
            </div>
            
        </div>
		<myFooter></myFooter>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                loading:true,
                aboutImg:[
                    {id:1,imgUrl:'/static/images/pc/about-diversity2.png'},
                    {id:2,imgUrl:'/static/images/pc/about-marketing2.png'},
                    {id:3,imgUrl:'/static/images/pc/about-scheme2.png'},
                    ]
            }
        },
        created() {
            let self = this;
            var timer = window.setTimeout(()=>{
                self.loading = false;
            },500)
            clearTimeout();
        },
    }
</script>

<style scoped lang="less">
    @import '../css/swiper.min.css';
    @import '../css/certify.css';
    body{
        opacity: 0;
    }
    .page{
        width: 100%;
        height: auto;
        .banner{
            width: 100%;
            height: 240px;
            background: url('/static/images/pc/about-banner.png') no-repeat center;
        }
        .content{
            width: 100%;
            height: 2555px;
            background: url('/static/images/pc/about-bg.png') no-repeat center;
            position: relative;
            .advantage-container{
                width: 1200px;
                height: 277px;
                padding-top: 1145px;
                margin: 0 auto;
            }
            .map-container{
                width: 1200px;
                height: 430px;
                margin: 0 auto;
                padding-top: 650px;
                position: relative;
                .shade{
                    position: absolute;
                    width: 100%;
                    height:430px;
                    top: 650px;
                    right: 0;
                    background: #F6F6F6;
                }
                .map-box{
                    float: left;
                    width: 600px;
                    height: 430px;
                }
                .contact-container{
                float: left;
                margin-left: 165px;
                margin-top:145px;
                width: 300px;
                .phone{
                    font-size: 17px;
                    color: #3c3c3c;
                    margin-bottom: 32px;
                    display: block;
                    height: 17px;
                    line-height: 17px;
                    width: 300px;
                }
                .wx{
                    display: block;
                    font-size: 17px;
                    color: #3c3c3c;
                    height: 17px;
                    line-height: 17px;
                    width: 300px;
                }
                
            }
            }
            
        }
    }
</style>