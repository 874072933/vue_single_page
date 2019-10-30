<template>
    <div class="page">
        <myHeader></myHeader>
        <div class="topBorder"></div>
        <div class="content-container">
            <div class="content">
                <div class="content-top-box">
                    <span class="title-left">订单信息</span>
                    <span class="title-right">数量</span>
                </div>
                <div class="content-middle-box">
                    <div class="orderInfo-box">
                        <div class="orderInfo-img">
                            <img class="orderImg" :src="orderImg" alt="">
                            <h3 class="payChoice">
                                选择支付方式
                            </h3>
                        </div>
                        <div class="orderMake-container">
                            <div class="orderTitle">
                                <a class="orderTitle-a" :href="'/item/detail/'+unique_key">
                                    {{orderName}}
                                </a>
                            </div>
                            <div class="orderMake">
                                <div class="discount-price">
                                    <span class="price-title">活动价</span><span class="price-lab">￥</span><span class="price" v-text="discount_price"></span>
                                </div>
                                <div class="numBox">
                                    <span class="minus" @click="minus()">-</span><input class="number" v-model="num1" type="tel" @input="total"><span class="plus" @click="plus()">+</span>
                                </div>
                            </div>
                            <div class="orderName">
                                平均响应时长<span class="orderName-a">{{day}}</span>个工作日
                            </div>
                        </div>
                    </div>
                    <div class="pay-container flex">
                        <!--<el-radio class="payRadio" v-model="pay_type" label="alipay">
                            <img class="payIcon" :src="alipayIcon" alt="">
                        </el-radio>
                        <el-radio class="payRadio" v-model="pay_type" label="wx">
                            <img class="payIcon" :src="wxIcon" alt="">
                        </el-radio>
                        <el-radio class="payRadio2" v-model="pay_type" label="transfer">
                            <img class="payIcon" :src="transferIcon" alt=""><span class="transferName">(开户行:兴业银行杭州湖墅支行 账号：6229-083530-03279-715)</span>
                        </el-radio>-->
                        <div class="pay-type flex">
                        	<span :class="pay_type == 'alipay' ? 'pay-type-radio2':'pay-type-radio1'" @click="pay_type='alipay'"></span>
                        	<div :class="pay_type == 'alipay' ? 'pay-type-logon':'pay-type-logo'" @click="pay_type='alipay'"><img class="payIcon" :src="alipayIcon" alt=""></div>
                        </div>
                        <div class="pay-type flex">
                        	<span :class="pay_type == 'wx' ? 'pay-type-radio2':'pay-type-radio1'" @click="pay_type='wx'"></span>
                        	<div :class="pay_type == 'wx' ? 'pay-type-logon':'pay-type-logo'" @click="pay_type='wx'"><img class="payIcon" :src="wxIcon" alt=""></div>
                        </div>
                        <div class="pay-type flex">
                        	<span :class="pay_type == 'transfer' ? 'pay-type-radio2':'pay-type-radio1'" @click="pay_type='transfer'"></span>
                        	<div :class="pay_type == 'transfer' ? 'pay-type-logon':'pay-type-logo'" @click="pay_type='transfer'"><img class="payIcon" :src="transferIcon" alt=""></div>
                        	<span class="transferName">(开户行:兴业银行杭州湖墅支行 账号：6229-083530-03279-715)</span>
                        </div>
                        
                    </div>
                    <div class="commit-container flex">
                        <div class="choiceOrder flex">已选商品<span class="commit-num">{{num1}}</span>件</div>
                        <div class="money-title flex">商品金额：<span class="money">￥{{money}}</span></div>
                        <a href="javascript:;" class="commit-btn" @click="commit">
                            确认提交
                        </a>
                    </div>
                </div>
            </div>
            <!-- 弹窗 -->
            <div v-show="isDialog" id="background" class="back">  
                <div id="div1" class="content">  
                    <div id="div2"> 
                        <div class="img-box">
                            <div class="img"><img :src="pcweixin" alt="" class="pcweixin"></div>
                            <div id="close" @click="close">  
                                <img id="close-button" src="/static/images/pc/closeBtn.png" @click="close" />  
                            </div>
                            <div class="wxname">{{wxname}}</div>  
                        </div>
                        
                    </div>  
                </div>  
            </div>  
            <!-- 弹窗 -->
            <!-- 弹窗 -->
            <div v-show="isDialog2" id="background2" class="back2">  
                <div id="div12" class="content2">  
                    <div id="div22">
                        <div class="img-box2">
                            <div class="img2"></div>
                            <div id="close2" @click="close2">  
                                <img id="close-button2" src="/static/images/pc/closeBtn.png" @click="close2" />  
                            </div>  
                        </div>
                        <div class="wxname2">{{wxname2}}</div>  
                    </div>  
                </div>  
            </div>  
            <!-- 弹窗 -->
        </div>
        <rightBar></rightBar>
		<myFooter></myFooter>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                num1:'',
                orderName:'',
                discount_price:'',
                orderImg:'',
                pay_type:'alipay',
                unique_key:'',
                money:'',
                day:'',
                alipayIcon:'/static/images/pc/alipayIcon.png',
                wxIcon:'/static/images/pc/wxIcon.png',
                transferIcon:'/static/images/pc/transferIcon.png',
                colseBtn:'/static/images/pc/closeBtn.png',
                isDialog:false,
                isDialog2:false,
                wxname:'',
                wxnam2:'',
                pcweixin:''
            }
        },
        created() {
            let id = this.getQueryString("id");
            let quantity = this.getQueryString("quantity");
            this.getOrderInfo(id,quantity);     
        },
        methods:{
            minus(){
                if(this.num1>1){
                    this.num1--;
                }
                this.total();
            },
            plus(){
                this.num1++;
                this.total();
            },
            total(){
                this.num1 = this.num1.replace(/[^\d]/g,'')
                this.money = this.num1*this.discount_price;
            },
            isPay(order_id){
                if(this.isDialog = true){
                    var self = this;
                    var timer = setInterval(function(){
                        const url = '/order/check-pay?order_id='+order_id;
                        self.$http.get(url).then(res =>{
                            if(res.body.data.pay_status == 1){
                                self.isDialog = false;
                                clearInterval(timer);
                                window.location.href = `/order/detail?id=${order_id}`;
                            }else if(self.isDialog == false && res.body.data.pay_status == 0){
                                clearInterval(timer);
                                window.location.href = `/order/detail?id=${order_id}`;
                            }
                        }) 
                    },6000)   
                }        
            },
            handleChange(value){
                this.num1 = value;       
                this.money = value*this.discount_price;
            },
            success(){
                this.$message({
                message: '成功提交',
                type: 'success'
                });
            },
            error(msg) {
                this.$message({
                showClose: true,
                message:msg,
                type: 'error',
                });
            },
            close(){
                this.isDialog = false;
            },
            wxopen(){
                this.isDialog = true;
            },
            close2(){
                this.isDialog2 = false;
            },
            transferopen(){
                this.isDialog2 = true;

            },
            pay(order_id,pay_type){
                const url = '/order/pay?order_id='+order_id+'&pay_type='+pay_type;
                this.$http.post(url).then(res =>{
                    if(res.body.data.type == 'pcweixin'){
                        this.pcweixin = res.body.data.url;
                        this.isPay(order_id);
                    }
                })
            },
            alipay(order_id,pay_type){
                const url = '/order/pay?order_id='+order_id+'&pay_type='+pay_type;
                this.$http.post(url).then(res =>{
                    window.location.href = res.url;
                })
            },
            commit(){
                const url = '/order/make';
                let id = this.getQueryString("id");
                this.$http.post(url,{
                    id:id,
                    pay_type:this.pay_type,
                    quantity:this.num1
                }).then((res)=>{
                    this.success();
                    if(res.body.success == 1){
                        if(res.body.data.pay_type == 'wx'){
                            this.wxname = res.body.data.weixin;
                            let order_id = res.body.data.order_id;
                            let pay_type = res.body.data.pay_type;
                            this.pay(order_id,pay_type);
                            this.wxopen();
                        }else if(res.body.data.pay_type == 'transfer'){
                            this.wxname2 = res.body.data.weixin;
                            this.transferopen()
                        }else if(res.body.data.pay_type == 'alipay'){
                            let order_id = res.body.data.order_id;
                            let pay_type = res.body.data.pay_type;
                            this.alipay(order_id,pay_type);
                        }
                    }else{
                        this.error(res.body.msg);
                    }
                })
            },
            getOrderInfo(id,quantity){
                const url = '/order/checkout';
                this.$http.post(url,{
                    id:id,
                    quantity:quantity
                }).then((res)=>{
                    if(res.body.success == 1){
                       this.num1 = res.body.data.quantity;
                       this.orderName = res.body.data.title;
                       this.discount_price = res.body.data.discount_price;
                       this.orderImg = res.body.data.image_path;
                       this.money = res.body.data.money;
                       this.day = res.body.data.day;
                       this.unique_key = res.body.data.unique_key;
                    }
                })
            },
            getQueryString(name){
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                let q = window.location.pathname.substr(1).match(reg_rewrite);
                if(r != null){
                    return unescape(r[2]);
                }else if(q != null){
                    return unescape(q[2]);
                }else{
                    return null;
                }
            }
        }
    }
</script>

<style scoped lang="less">
.flex{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
	}
    .page{
        z-index: 0;
        width: 100%;
        height: auto;
        .topBorder{
            border-bottom: 2px solid #2d2c2c;
        }
        .content-container{
            width: 100%;
            height: 805px;
            background-color: #f6f6f6;
            #background{position: fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.3);z-index: 223;}
            #div1{width: 100%;z-index: 1;overflow: auto;margin-top:30px;}
            #div2{margin: 0 auto;width:341px;height:413px /* 355/37.5 */ ;margin-top: 120px /* 135/37.5 */;position: relative;}
            .img-box{
                width:341px;
                height: 413px;
                background:transparent url('/static/images/pc/wxopen-bg.png') no-repeat center;
                .img{
                    width: 250px;
                    height: 250px;
                    position: absolute;
                    left:45px;
                    top:32px;
                    .pcweixin{
                        width: 250px;
                        height: 250px;
                        display: inline-block;
                    }
                }
                .wxname{
                     width: 90px;
                     height: 13px;
                     line-height: 13px;
                     color: #ff7e3d;
                     position: absolute;
                     bottom: 25px;
                     right: 20px;   
                    }
                
            }
            #close{width: 16px;height: 16px;position: absolute;right: -26px; top: 0;}
            #close-button{float:left;cursor: pointer;}
            //弹窗2
            #background2{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.3);z-index: 223;}
            #div12{width: 100%;z-index: 1;overflow: auto;margin-top:30px;}
            #div22{margin: 0 auto;width:315px;height:415px /* 355/37.5 */ ;margin-top: 120px /* 135/37.5 */;position: relative;}
            .img-box2{
                width: 341px;
                height: 413px;
                background: url('/static/images/pc/transfer-bg.png') no-repeat center; 
            }
            .wxname2{
                width: 90px;
                height: 13px;
                line-height: 13px;
                     color: #ff7e3d;
                     position: absolute;
                     bottom: 25px;
                     right: 20px;   
                    }
            #close2{width: 16px;height: 16px;position: absolute;right:-50px; top:2px;}
            #close-button2{float:left;cursor: pointer;}
            //弹窗2
            .content{
                margin-top: 35px;
                width: 1200px;
                height: 610px;
                margin: 0 auto;
                position: relative;
                top: 35px;
                .content-top-box{
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    box-sizing: border-box;
                    border: 1px solid #e7e7e7;
                    background-color: #f5f3f4;
                    position: relative;
                    .title-left{
                        font-size: 16px;
                        height: 16px;
                        left: 35px;
                        position: absolute;
                        width: 100px;
                        display: inline-block;
                    }
                    .title-right{
                        font-size: 16px;
                        height: 16px;
                        right: 105px;
                        position: absolute;
                        width: 100px;
                        display: inline-block;
                    }
                }
                .content-middle-box{
                    width: 100%;
                    height: 575px;
                    box-sizing: border-box;
                    background-color: #ffffff;
                    .orderInfo-box{
                        width: 100%;
                        height: 310px;
                        box-sizing: border-box;
                        border-bottom:1px solid #e7e7e7;
                        .orderInfo-img{
                            /*width: 210px;*/
                            height: 310px;
                            float: left;
                            position: relative;
                            .orderImg{
                                margin-left:36px;
                                margin-top: 32px; 
                                width: 150px;
                                height: 150px;
                                display: inline-block;
                            }
                            .payChoice{
                                position: absolute;
                                left: 30px;
                                bottom: 15px;
                                font-size: 17px;
                                font-weight: 600;
                            }
                        }
                        .orderMake-container{
                            margin-top: 35px;
                            margin-left: 30px;
                            width: 950px;
                            float: left;
                            .orderTitle{
                                width: 950px;
                                font-size: 16px;
                                font-weight: bold;
                                .orderTitle-a{
                                    color: #333333;
                                }
                            }
                            .orderMake{
                                width: 950px;
                                height: 35px;
                                position: relative;
                                line-height: 35px;
                                margin-top: 60px;
                                .discount-price{
                                    width: 730px;
                                    height: 35px;
                                    float: left;
                                    color:#ff6400;
                                    .price-title{
                                    color: #444343;
                                    font-size: 15px;
                                    }
                                    .price-lab{
                                    	margin-left:8px;
                                    	font-size: 18px;
                                    }
                                    .price{
                                        font-size:20px;
                                    }
                                    .price-dribs{
                                    	font-size: 17px;
                                    }
                                }
                                .numBox{
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
                            .orderName{
                                margin-top: 15px;
                                width: 180px;
                                font-size: 15px;
                                .orderName-a{
                                    color: #ff7e3d;
                                }
                            }
                        }
                    }
                }
                .pay-container{
                    padding: 31px 0 0 19px;
                    background-color: #fff;
                    .pay-type{
                    	align-items: center;
                    	margin-left: 40px;
                    	.pay-type-radio1{
                    		display: inline-block;
                    		width: 14px;
                    		height: 14px;
                    		background: url('/static/images/pc/radio1.png') no-repeat;
                    	}
                    	.pay-type-radio2{
                    		display: inline-block;
                    		width: 14px;
                    		height: 14px;
                    		background: url('/static/images/pc/radio2.png') no-repeat;
                    	}
                    	.pay-type-logo{
                    		width: 148px;
                    		height: 54px;
                    		margin:0 0 0 20px;
                    		background: url('/static/images/pc/radio-b1.png') no-repeat;
                    	}
                    	.pay-type-logon{
                    		width: 148px;
                    		height: 54px;
                    		margin:0 0 0 20px;
                    		background: url('/static/images/pc/radio-b2.png') no-repeat;
                    	}
                    	.transferName{
                    		font-size: 14px;
                    		color: #4f4f4f;
                    		margin-left: 17px;
                    	}
                    }
                }
                .commit-container{
                    /*width: 540px;*/
                    height: 60px;
                    line-height: 60px;
                    position: absolute;
                    bottom: 50px;
                    right: 65px;
                    line-height: 60px;
                    align-items: center;
                    .choiceOrder{
                    	align-items: center;
                        font-size: 15px;
                        color: #333333;
                        .commit-num{
                            font-size:14px;
                            color:#ff6400;
                            padding:0 4px;
                        }
                    }
                    .money-title{
                    	align-items: center;
                    	margin-left: 15px;
                        font-size: 15px;
                        color: #333333;
                        .money{
                            font-size: 24px;
                            color: #ff6400;
                        }

                    }
                    .commit-btn{
                        width: 180px;
                        height: 60px;
                        margin-left: 20px;
                        display: inline-block;
                        font-size: 24px;
                        text-align: center;
                        color:#fefefe;
                        background-color:#ff6400;
                        box-sizing: border-box;
                    }
                    .commit-btn:hover{
                        background: #f05e00;
                    }

                }
            }
            
        }
    }
</style>