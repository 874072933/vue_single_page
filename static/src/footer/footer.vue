<template>
    <div class="footer">
        <div class="footer-top"></div>
        <div class="footer-middle-box">
            <div class="footer-middle">
                <div class="footer-middle-left-box">
                    <div class="footer-middle-left">
                        <div class="footer-logo-box">
                            <a href="/" class="footer-logo-box-a">
                                <img :src="footerLogo" class="footer-logo" alt="">
                            </a>
                        </div>
                        <div class="footer-submit-box">
                            <div class="footer-input-box">
                                <input class="footer-input" v-model="name" type="text" placeholder="请输入您的称呼" @input="showSubmit()" @change="hideSubmit()" @blur="hideSubmit()">
                            </div>
                            <div class="footer-input-box">
                                <input class="footer-input" v-model="mobile" type="text" @input="showSubmit()" @blur="hideSubmit()" @change="hideSubmit()" placeholder="请输入您的联系电话">
                            </div>
                            <a href="javascript:;" class="footer-submit" :class="{'showSubmit':isShowSubmit}" @click="submitRecord()">立即提交</a>
                        </div>
                    </div>
                </div>
                <div class="border"></div>
                <div class="footer-middle-right-box">
                    <div class="footer-middle-right">
                        <div class="middle-right-left">
                            <dl class="dl-service">
                                <dt class="dt-service">服务支持</dt>
                                <dd class="dd-service">
                                    <ul class="dd-service-ul">
                                        <li class="dd-service-item" v-for="item in footerService" :key="item.id">
                                            <a :href="'/item/list?cate_id1='+item.id" class="dd-service-item-a">{{item.name}}</a>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </div>
                        <div class="middle-right-middle">
                            <dl class="dl-aboutUs">
                                <dt class="dt-aboutUs">关于传播鱼</dt>
                                <dd class="dd-aboutUs">
                                    <ul class="dd-aboutUs-ul">
                                        <li class="dd-aboutUs-item" v-for="item in footerAboutUs" :key="item.id">
                                            <a href="/about-us.html" class="dd-aboutUs-item-a">{{item.title}}</a>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </div>
                        <!--<div class="middle-right-right">-->
                            <!--<dl class="dl-contactUs">-->
                                <!--<dt class="dt-contactUs">联系我们</dt>-->
                                <!--<dd class="dd-contactUs">-->
                                    <!--<ul class="dd-contactUs-ul">-->
                                        <!--<li class="dd-contactUs-item">-->
                                            <!--<a href="javascript:;" class="dd-contactUs-item-a">微信咨询：xsk_tt</a>-->
                                        <!--</li>-->
                                        <!--<li class="dd-contactUs-item">-->
                                            <!--<a href="javascript:;" class="dd-contactUs-item-a">合作咨询：137-3582-4662</a>-->
                                        <!--</li>-->
                                        <!--<li class="dd-contactUs-item">-->
                                            <!--<a href="javascript:;" class="dd-contactUs-item-a-1">公司地址：浙江省杭州市拱墅区萍水街333号御峰大厦1817</a>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                <!--</dd>-->
                            <!--</dl>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-bottom-p">
                版权所有：<a class="footer-company" href="javascript:;">杭州前景网络科技有限公司</a> 浙ICP备18006790号-2版权所有
            </p>
        </div>
    </div>
</template>

<script>
import { updateRecord,getFooterMenu} from "../api/apiIndex.js";
    export default {
        data(){
            return{
                isShowSubmit:false,
                name:'',
                moblie:'',
                footerLogo:'/static/images/pc/logo-footer.png',
                footerService:[
                ],
                footerAboutUs:[
                    {id:1,title:'公司简介'},
                    {id:2,title:'服务优势'},
                    {id:3,title:'联系我们'}
                ],
                footerContactUs:[
                    {id:1,info:'微信咨询：xsk_tt'},
                    {id:2,info:'合作咨询：137-3582-4662'},
                    {id:3,info:'公司地址：浙江省杭州市拱墅区萍水街333号御峰大厦1817'}
                ]
            }
        },
        created() {
            this._getFooterMenu();
        },
        methods:{
            showSubmit(){
                if(this.name != '' && this.mobile != ''){
                    this.isShowSubmit = true;
                }  
            },
            hideSubmit(){
                if(this.name == '' || this.mobile == ''){
                    this.isShowSubmit = false;
                }  
            },
            _getFooterMenu(){
                getFooterMenu().then(res =>{
                	if(res.data.success == 1){
                		this.footerService = res.data.list.splice(0,8);
                	}
                })
            },
            submitRecord(){
                const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if(this.name == ''){
                    alert('昵称不能为空')
                }else{
                    if(!myreg.test(this.mobile)){
                        alert('您的手机号格式不正确')
                    }else{
                        updateRecord(this.name,this.mobile).then((res)=>{
                                alert(res.data.msg)
                        })
                        .catch((err)=>{
                            console.log(err)
                        });
                    }
                }
                
            }
        }
    }
</script>

<style scoped lang="less">
    .footer{
        width: 100%;
        height: 505px;
        .footer-top{
            width: 100%;
            height: 80px;
            background: url('/static/images/pc/footer-top.png') no-repeat center;
        }
        .footer-middle-box{
            width: 100%;
            height: 380px;
            background-color: #333333;
            .footer-middle{
                width: 1200px;
                height: 380px;
                margin: 0 auto;
                .footer-middle-left-box{
                    width: 448px;
                    height: 380px;
                    float: left;
                    .footer-middle-left{
                        position: relative;
                        top: 40px;
                        width: 448px;
                        height: 300px;
                        box-sizing: border-box;
                        .footer-logo-box{
                            width: 218px;
                            height: 52px;
                            margin: 32px 0 0 42px;
                            .footer-logo-box-a{
                                width: 218px;
                                height: 52px;
                                display: inline-block;
                                color: #e4e4e4;
                                .footer-logo{
                                    width: 218px;
                                    height: 52px;
                                    text-align: center;
                                }
                            }
                            
                        }
                        .footer-submit-box{
                            width: 287px;
                            height: 160px;
                            margin-top: 40px;
                            margin-left: 22px;                        
                            .footer-input-box{
                                border-radius: 4px;
                                width: 287px;
                                height: 40px;
                                line-height: 40px;
                                box-sizing: border-box;
                                border: 1px solid #737373;
                                margin-bottom: 20px;
                                .footer-input{
                                    margin-left: 10px;
                                    background-color: #333333;
                                    color: #e4e4e4;
                                    border:none;
                                    font-size: 15px;
                                    height: 15px;
                                    ::-webkit-input-placeholder{
                                    color: #707070;
                                    height: 15px;
                                    font-size: 15px;
                                }
                                }
                            }
                            .footer-submit{
                                width: 287px;
                                height: 38px;
                                line-height: 38px;
                                text-align: center;
                                margin-top: 4px;
                                display: inline-block;
                                background-color: #272727;
                                color: #a6a6a6;
                                font-size: 15px;
                            }
                            .showSubmit{
                                color: #e1e1e1 !important;
                            }
                        }
                    }
                }
                .border{
                    margin-top: 40px;
                    width: 1.5px;
                    height: 304px;
                    background-color: #454545;
                    float: left;
                }
                .footer-middle-right-box{
                    width: 749px;
                    height: 380px;
                    float: left;
                    .footer-middle-right{
                        width: 640px;
                        height: 300px;
                        position: relative;
                        top: 38px;
                        left: 110px;
                        .middle-right-left{
                            width: 90;
                            height: 300px;
                            float: left;
                            .dl-service{
                                width: auto;
                                height: 300px;
                                .dt-service{
                                    font-size: 17px;
                                    color: #ffffff;
                                }
                                .dd-service-ul{
                                    width: auto;
                                    margin-top: 30px;
                                    height: auto;
                                    .dd-service-item{
                                        width: auto;
                                        margin-bottom: 22px;
                                        line-height: 14px;
                                        height: 14px;
                                        .dd-service-item-a{
                                            display: inline-block;
                                            width: auto;
                                            color: #c7c7c7;
                                            font-size: 15px;
                                            height: 14px;
                                        }
                                    }
                                }
                            }
                        }
                        .middle-right-middle{
                            width: 86px;
                            height: 300px;
                            margin-left: 100px;
                            float: left;
                            .dl-aboutUs{
                                width: 86px;
                                height: 300px;
                                .dt-aboutUs{
                                    font-size: 17px;
                                    color: #ffffff;
                                }
                                .dd-aboutUs-ul{
                                    width: 86px;
                                    margin-top: 30px;
                                    height: 260px;
                                    .dd-aboutUs-item{
                                        width: 86px;
                                        margin-bottom: 22px;
                                        height: 14px;
                                        .dd-aboutUs-item-a{
                                            color: #c7c7c7;
                                            font-size: 15px;
                                            height: 14px;
                                            width: auto;
                                            display: inline-block;
                                        }
                                    }
                                }
                            }
                        }
                        .middle-right-right{
                            width: 285px;
                            height: 300px;
                            margin-left:100px;
                            float: left;
                            .dl-contactUs{
                                width: 285px;
                                height: 300px;
                                .dt-contactUs{
                                    font-size: 17px;
                                    color: #ffffff;
                                }
                                .dd-contactUs-ul{
                                    width: 285px;
                                    margin-top: 30px;
                                    height: 260px;
                                    .dd-contactUs-item{
                                        width: 285px;
                                        margin-bottom: 22px;
                                        height: 13px;
                                        line-height: 13px;
                                        .dd-contactUs-item-a{
                                            color: #c7c7c7;
                                            line-height: 20px;
                                            font-size: 15px;
                                            height: 15px;
                                            display: inline-block;
                                            width: auto;
                                        }
                                        .dd-contactUs-item-a-1{
                                            text-indent: -78px;
                                            margin-left: 80px;
                                            color: #c7c7c7;
                                            line-height: 20px;
                                            font-size: 15px;
                                            height: 15px;
                                            display: inline-block;
                                            width: auto;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .footer-bottom{
            width: 100%;
            height: 45px;
            box-sizing: border-box;
            background-color: #333333;
            border-top:1px solid #454545;
            border-bottom:1px solid #454545;
            display: flex;
            justify-content: center;
            align-items: center;
            .footer-bottom-p{
                font-size: 15px;
                height: 15px;
                color: #707070;
                .footer-company{
                    font-size: 15px;
                    color: #707070;
                }
            }
        }
    }
</style>