<template>
    <div class="page">
        <myHeader></myHeader>
        <div class="topBorder"></div>
        <div class="content-container">
            <div class="addressNav-container">
                <div class="addressNav">
                    <span class="address-now">当前位置：></span>
                    <span class="address-1">"{{addressF}}"></span>
                    <span class="address-1" v-show="isAddressF1" >{{addressF1}}></span>
                    <span class="address-1" v-show="isAddressF2" >{{addressF2}}></span>
                    <span class="address-2-title">【{{addressS.split('/').splice(0,1).toString()}}】</span>
                    <span class="address-2">{{addressS}}</span>
                </div>
            </div>
            <div class="commodity">
                <div class="c-left-container">
                    <img :src="commodityImgUrl" :key="commodityImgUrlId" class="commodityImg" alt="">
                </div>
                <div class="c-right-container">
                    <div class="title-box">
                        <span class="commodity-title">【{{addressS.split('/').splice(0,1).toString()}}】{{addressS}}</span>
                    </div>
                    <div class="price-box">
                        <span class="price-title">活动价</span>
                        <span class="price"><span class="price-unit">￥</span>{{discount_price}}</span>
                        <span class="price-title1">原价</span>
                        <span class="remarket-price"><span class="remarket-price-unit">￥</span>{{market_price}}</span>
                    </div>
                    <div class="order-box">
                        <span class="order-title">订单</span>
                        <span class="order-title1">订单平均完成周期：</span>
                        <span class="order-day">【{{order_week}}周】</span>
                        <span class="order-title1">订单平均响应时长：</span>
                        <span class="order-day">【{{order_day}}天】</span>
                    </div>
                    <form class="order_num">
                        <span class="order-title3">数量</span>
                        <div class="input-number"><span class="minus" @click="minus()">-</span><input class="number" type="tel" v-model="num1"><span class="plus" @click="plus()">+</span></div>
                        <!-- <el-input-number class="myInput-number" v-model="num1" @change="handleChange" :min="1" :max="100" :step="1" label="订单"></el-input-number> -->
                    </form>
                    <a href="javascript:;" class="buy" @click="checkout">
                        立即购买
                    </a>
                </div>
            </div>
            <div class="commodity-details">
                <div class="recommend-container">
                    <div href="javascript:;" class="recommend-top">
                        <a href="javascript:;" class="recommend-title">
                            相关营销推荐
                        </a>
                    </div>
                    <ul class="recommend-ul">
                        <li class="right-Img-item" v-for="(x,index) in recommendList" :key="x.id"> 
                            <a class="right-Img-item-box" :href="'/item/detail/'+x.unique_key">
                                <div class="right-Img-item-ImgBox">
                                <img class="right-Img-item-ImgBox-img" :src="x.image_path" alt="">
                                </div>
                                <p class="right-Img-item-title">
                                    <a :href="'/item/detail/'+x.unique_key" :title="x.title" class="right-Img-item-title-a">
                                    <span class="right-Img-item-title-span">【{{x.title.split('/').splice(0,1).toString()}}】</span>
                                    {{x.title}}</a>
                                </p>
                                <p class="right-Img-item-bottom">
                                    <span class="discountPrice"><span class="discountPrice-unit">￥</span>{{x.market_price}}</span>
                                    <span class="marketPrice"><span class="marketPrice-unit">￥</span>{{x.discount_price}}</span>
                                    <a :ref="'active'+index" href="tencent://message/?uin=2561476865&amp;Site=www.maizhe.com&amp;Menu=yes" class="container-service">
                                        
                                    </a>
                                </p>
                            </a>
                            <div class="border">

                            </div>
                        </li>
                    </ul>
                </div>
                <div class="c-details-container">
                    <div class="c-details-top-container">
                        <a href="javascript:;" class="c-details-tab" :class="{'onTabs':isTabOnS}" @click="onService()">服务详情</a>
                        <a href="javascript:;" class="c-details-tab" :class="{'onTabs':isTabOnF}" @click="onFAQ()" v-show="isquestion">常见问题</a>
                    </div>
                    <div class="service-detail-container" v-if="service" v-html="description" >
                    </div>
                    <div class="FAQ-container" v-if="atquestion" v-html="question">
                    </div>
                </div>
            </div>
        </div>
        <rightBar></rightBar>
		<myFooter></myFooter>
        
    </div>
</template>

<script>
    
    import { getCommodityDet } from "../api/commodity.js";
    export default {
        data(){
            return{
               num1:1,
               isServiceIconshow:false,
               isServiceshow:false,
               service:true,
               isAdvertising:false,
               addressF:'口碑营销',
               addressF1:'',
               addressF2:'',
               addressS:'',
               commodityImgUrl:'',
               commodityImgUrlId:'',
               discount_price:'',
               market_price:'',
               order_week:'',
               order_day:'',
               recommendList:[],
               exampleImg:'/static/images/pc/detail-example.png',
               unique_key:'',
               question:'',
               isquestion:false,
               description:'',
               atquestion:false,
               isAddressF1:false,
               isAddressF2:false,
               isTabOnS:true,
               isTabOnF:false,
            }
        },
        created() {
            let url = window.location.href;
            let urlarr = url.split('/');
            let id = urlarr[urlarr.length-1];
            this._getCommodityDet(id);
            this._getRecommendList(id)
        },
        methods:{
            minus(){
                if(this.num1>1){
                    this.num1 = --this.num1;
                }
            },
            plus(){
                this.num1 = ++this.num1;
            },
            addActice(index){
                return 'active'
            }
            ,
            showIcon(index){
                this.isServiceIconshow = true;
                this.isServiceshow = true;
            },
            hideIcon(index){
                this.isServiceIconshow = false;
                this.isServiceshow = false;
            }
            ,
            checkout(){
                window.location.href = '/order/checkout?id='+this.unique_key+'&quantity='+this.num1;
            },
            noAdver(){
                this.isAdvertising = false;
            },
            Adver(){
                this.isAdvertising = true;
            },
            onService(){
                this.service = true;
                this.atquestion = false;
                this.isTabOnS = true;
                this.isTabOnF = false;
            },
            onFAQ(){
                this.service = false;
                this.atquestion = true;
                this.isTabOnS = false;
                this.isTabOnF = true;
            }
            ,
            _getCommodityDet(id){
                const url = '/item/detail/'+id;
               this.$http.post(url
            ).then((res)=>{
                if(res.body.success == 1){
                    this.addressF = res.body.data.item_cate1.name;
                    if(res.body.data.item_cate2 == null){
                        this.addressF1 = '';
                        this.isAddressF1 = false;
                    }else{
                        this.isAddressF1 = true;
                        this.addressF1 = res.body.data.item_cate2.name;
                        
                    }
                     if(res.body.data.item_cate3 == null){
                        this.addressF2 = '';
                        this.isAddressF2 = false;
                    }else{
                        this.isAddressF2 = true;
                        this.addressF2 = res.body.data.item_cate3.name;
                    }
                    this.addressS = res.body.data.title;
                    this.commodityImgUrl = res.body.data.image_path;
                    this.commodityImgUrlId = res.body.data.image_id;
                    this.discount_price = res.body.data.discount_price;
                    this.market_price = res.body.data.market_price;
                    this.order_week = res.body.data.week;
                    this.order_day = res.body.data.day;
                    this.unique_key = res.body.data.unique_key;
                    if(res.body.data.question != null && res.body.data.question){
                        this.isquestion = true;
                        this.question = res.body.data.question;
                    }
                    if(res.body.data.description != null){
                        this.description = res.body.data.description;
                    }
                }
            })
            },
            _getRecommendList(id){
                const url = '/item/related/'+id
               this.$http.post(url
            ).then((res)=>{
                if(res.body.success == 1){
                    this.recommendList = res.body.data.list;
                }
            })
            }
        }
        
    }
</script>

<style scoped lang="less">
@import "../css/reset.css";
    .page{
        width: 100%;
        height: auto;
        background-color: #ffffff;
        .topBorder{
            border-bottom: 2px solid #2d2c2c;
        }
        .content-container{
            width: 1200px;
            height: auto;
            margin:0 auto;
            .addressNav-container{
                width: 100%;
                height: 55px;
                line-height: 55px;
                .addressNav{
                    width: 1200px;
                    height: 14px;
                    .address-now{
                        width: auto;
                        display: inline-block;
                        height: 12px;
                        font-size: 12px;
                        color: #666666;
                    }
                    .address-1{
                        width: auto;
                        display: inline-block;
                        height: 13px;
                        font-size: 13px;
                        color: #524f4f;
                        margin-left: 2px;
                        text-align: left;
                    }
                    .address-2{
                        width: auto;
                        display: inline-block;
                        height: 13px;
                        text-align: left;
                        margin-left: -6px;
                        font-size: 13px;
                        color: #212121;
                    }
                    .address-2-title{
                        width: auto;
                        display: inline-block;
                        height: 13px;
                        margin-left: -6px;
                        text-align: left;
                        font-size: 13px;
                        color: #212121;
                    }
                }
            }
            .commodity{
                width: 1200px;
                height: 445px;
                margin: 0 auto;
                .c-left-container{
                    width: 455px;
                    height: 445px;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #e3e3e3;
                    .commodityImg{
                        width: 385px;
                        height: 385px;
                    }
                }
                .c-right-container{
                    width: 700px;
                    height: 445px;
                    margin-left: 35px;
                    float: left;
                    .title-box{
                        width: 100%;
                        height: 45px;
                        line-height: 45px;
                        border-bottom: 1px solid #e3e3e3;
                        .commodity-title{
                            margin-left: -10px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            width: 100%;
                            font-weight: bold;
                            height: 21px;
                            font-size: 20px;
                            display: inline-block;
                            color: #2d2c2c;
                        }
                    }
                    .price-box{
                        width: 100%;
                        height: 68px;
                        line-height: 68px;
                        border-bottom: 1px dashed #dddddd;
                        .price-title{
                            width: 60px;
                            height: 12px;
                            font-size: 12px;
                            text-align: left;
                            display: inline-block;
                            color: #888888;
                        }
                        .price{
                            min-width: 120px;
                            height: 30px;
                            display: inline-block;
                            font-size: 36px;
                            color: #f45d00;
                            .price-unit{
                                font-size: 21px;
                            }
                        }
                        .price-title1{
                            width: auto;
                            height: 10px;
                            font-size: 13px;
                            display: inline-block;
                            color: #333333;
                            margin-left: 15px;
                        }
                        .remarket-price{
                            min-width: 120px;
                            height: 10px;
                            display: inline-block;
                            font-size: 13px;
                            color: #5d5d5d;
                            text-decoration-line: line-through;
                        }
                    }
                    .order-box{
                        width: 100%;
                        height: 50px;
                        border-bottom: 1px solid #e3e3e3;
                        line-height: 50px;
                        .order-title1{
                            width: 26px;
                            height: 12px;
                            font-size: 13px;
                            color: #888888;
                        }
                        .order-title1{
                            margin-left: 45px;
                            width: 120px;
                            height: 13px;
                            color: #333333;
                        }
                        .order-day{
                            font-size: 13px;
                            color:#ff6400;
                            text-align: left;
                        }
                    }
                    .order_num{
                        margin: 40px 0;
                        width: 100%;
                        height: 30px;
                        .order-title3{
                            display: block;
                            float: left;
                            width: 55px;
                            height: 32px;
                            font-size: 13px;
                            line-height: 32px;
                            color: #333333;
                            margin-right: 12px; 
                        }
                        .input-number{
                            float: left;
                            width: 128px;
                            height: 32px;
                            line-height: 32px;
                            border: solid 1px #cccccc;
                            box-sizing: border-box;
                            .minus{
                                display: inline-block;
                                width: 31px;
                                height: 30px;
                                border-right: 1px solid #cccccc;
                                font-size: 13px;
                                color: #333333;
                                line-height: 30px;
                                text-align: center;
                                box-sizing: border-box;
                                vertical-align: top;
                                cursor: default;
                            }
                            .minus:hover{
                                    background-color: #cccccc;
                                }
                            .number{
                                display: inline-block;
                                width: 64px;
                                height: 30px;
                                vertical-align: top;
                                text-align: center;
                                line-height: 30px;
                                margin: 0;
                                padding: 0;
                                border:none;
                            }
                            .plus{
                                width: 31px;
                                height: 30px;
                                vertical-align: top;
                                display: inline-block;
                                border-left: 1px solid #cccccc;
                                font-size: 13px;
                                color: #333333;
                                line-height: 30px;
                                text-align: center;
                                box-sizing: border-box;
                                cursor: default;
                            }
                            .plus:hover{
                                background-color: #cccccc;
                            }
                        }
                    }
                    .buy{
                        display: inline-block;
                        background-color: #f45d00;
                        color: #ffffff;
                        font-size: 24px;
                        width: 218px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        margin-top: 20px;
                    }
                }
            }
            .commodity-details{
                width: 1200px;
                margin: 0 auto;
                min-height: 2020px;
                margin-top: 40px;
                height: auto;
                .recommend-container{
                    width: 227px;
                    height: auto;
                    border:1px solid #e3e3e3;
                    box-sizing: border-box;
                    float: left;
                    overflow: hidden;
                    .recommend-top{ 
                        line-height: 45px;
                        height: 45px;
                        width: 227px;
                        text-align: center;
                        font-size: 16px;
                        color: #5f5f5f;         
                        .recommend-title{
                            height: 45px;
                            width: 227px;  
                            background-color: #efefef;
                            color: #5f5f5f;
                            text-align: center;
                            display: inline-block;
                        }
                    }
                    .recommend-ul{
                        width: 225px;
                        height: auto;
                        .right-Img-item {
                        float: left;
                        width: 225px;
                        height: 232px;
                        // cursor: pointer;
                        .border{
                            width: 100%;
                            height: 1px;
                            background:url('/static/images/pc/border-dashe.png') no-repeat center;
                            margin-top: 14px;
                        }
                        .right-Img-item-ImgBox {
                            width: 100%;
                            height: 160px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .right-Img-item-ImgBox-img {
                            width: 140px;
                            height: 140px;
                            display: inline-block;
                            }
                        }
                        .right-Img-item-title {
                            box-sizing: border-box;
                            margin: 0 15px;
                            width: 206px;
                            height: 28.5px;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            .right-Img-item-title-a {
                                width: auto;
                                color: #5f5f5f;
                                line-height: 15px;
                                font-size: 14px;
                                display: inline-block;
                                height: 28.5px;
                                -webkit-line-clamp: 2;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                            .right-Img-item-title-span{
                                font-size: 14px;
                                color: #333333;
                                margin-left: -6px;
                                width: auto;
                                height: 13px;
                            }
                            }
                            .right-Img-item-title-a:hover{
                                color:#ff6400;
                                text-decoration-line: underline;
                                .right-Img-item-title-span{
                                    color:#ff6400;
                                    text-decoration-line: underline;
                                }
                            }
                            .right-Img-item-title-a:active{
                                color:#fe6600;
                                text-decoration-line: underline;
                                .right-Img-item-title-span{
                                    color:#fe6600;
                                    text-decoration-line: underline;
                                }
                            }
                        }
                        .right-Img-item-bottom {
                            box-sizing: border-box;
                            margin: 14px 15px 0 15px;
                            height: 15px;
                            line-height: 15px;
                            width: 206px;
                            position: relative;
                            .discountPrice {
                            font-size: 15px;
                            color: #ff6400;
                            width: auto;
                            height: 15px;
                            display: inline-block;
                            .discountPrice-unit{
                                -webkit-transform:scale(0.833);
                                font-size: 12px;
                                transform:scale(0.833);
                            }
                            }
                            .marketPrice {
                            text-decoration-line: line-through;
                            font-size: 12px;
                            transform:scale(0.833);
                            color: #acacac;
                            }
                            .container-service {
                            position: absolute;
                            right: 0;
                            height: 16px;
                            width: 60px;
                            line-height: 16px;
                            display: inline-block;
                            background: url('/static/images/pc/consult.png') no-repeat center;
                            }
                            .container-service:hover{
                            background: url('/static/images/pc/consult-active.png') no-repeat center;
                            }
                        }
                        }
                    }
                }
                .c-details-container{
                    width: 956px;
                    margin: 0 auto;
                    min-height: 2020px;
                    margin-left: 15px;
                    height: auto;
                    float: left;
                    .c-details-top-container{
                        width: 956px;
                        height: 45px;
                        background-color: #efefef;
                        border: 1px solid #e3e3e3;
                        .c-details-tab{
                            width: 170px;
                            height: 45px;
                            display: inline-block;
                            background-color: #efefef;
                            text-align: center;
                            line-height: 45px;
                            color: #5d5d5d;
                            cursor: default;
                        }
                        .c-details-tab:hover{
                            background-color: #ffffff;
                        }
                        .onTabs{
                            background-color: #ffffff !important;
                            color: #333333 !important;
                        }
                    }
                    .service-detail-container{
                        margin-top: 40px;
                        margin-left: 30px;
                        width: 925px;
                        height: auto;
                        .productInfo{
                            width: 100%;
                            height: auto;
                            margin-bottom: 40px;
                            .h3{
                                width: 250px;
                                height: 17px;
                                font-size: 17px;
                                font-weight: 600;
                                color: #333333;
                                margin-bottom: 20px;

                            }
                            .productInfo-infor{
                                margin-bottom: 10px;
                            }
                        }
                        .example{
                            width: 100%;
                            height: 1180px;
                            .h3{
                                width: 250px;
                                height: 17px;
                                font-size: 17px;
                                font-weight: 600;
                                color: #333333;
                                margin-bottom: 20px;
                            }
                            .example-imgBox{
                                width: 845px;
                                height: 1180px;
                                margin-left: 40px;
                                margin-top:40px;
                                .exampleImg{
                                    width: 768px;
                                    height: 944px;
                                } 
                            }
                        }  
                    }
                    .FAQ-container{
                        margin-top: 40px;
                        margin-left: 30px;
                        width: 925px;
                        height: auto;
                        .FAQTitle{
                            margin: 20px 0;
                            width: 300px;
                            height: 20px;
                            .marketType-1{
                                display: inline-block;
                                height: 20px;
                                width: 72px;
                                cursor: pointer;
                            }
                            .marketType-1:hover{
                                color: #f45d00;
                            }
                        }
                        .productInfo{
                            width: 100%;
                            height: auto;
                            margin-bottom: 40px;
                            .h3{
                                width: 100%;
                                height: 17px;
                                font-size: 17px;
                                font-weight: 600;
                                color: #333333;
                                margin-bottom: 20px;

                            }
                            .productInfo-infor{
                                margin-bottom: 10px;
                            }
                        }  
                    }
                }
            }
        }
    }
</style>