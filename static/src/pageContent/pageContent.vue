<template>
    <div class="content-box" ref="content_box">
        <div class="content">
            <ul class="content-ul">
                <li class="content-item d_jump"  v-for="(item,index) in contentList" ref="listGroup">
                    <div class="item-top" >
                        <span class="item-top-title">{{item.title}}</span>
                        <div class="hotBot-box">
                            <span class="hotBot-title">热搜词:</span>
                            <ul class="hotBot-ul">
                                <li class="hotBot-item" v-for="y in item.hot_words " :key="y.id" @mouseover="changeTitle($event)" @mouseout="changedTitle($event)">
                                    <a class="hotBot-item-title"   :href="'/item/list?keyword='+y.word">{{y.word}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="more">
                            <a class="more-a" :href="'/item/list?keyword='+item.title">查看更多&nbsp;></a>
                        </div>
                    </div>
                    <div class="item-container">
                        <div class="item-container-left">
                            <img :src="item.back_image_path" class="item-container-left-img" alt="">
                        </div>
                        <div class="item-container-right">
                            <div class="container-right-box">
                                <ul class="right-box">
                                    <li class="right-Img-item" v-for="x in item.item"> 
                                        <a class="right-Img-item-box" :href="'/item/detail/'+x.unique_key">
                                            <div class="right-Img-item-ImgBox">
                                            <img class="right-Img-item-ImgBox-img" :src="x.image_path" alt="">
                                            </div>
                                            <p class="right-Img-item-title">
                                                
                                                <a :href="'/item/detail/'+x.unique_key" :title="x.title" class="right-Img-item-title-a">
                                                <span class="item-little-title">
                                                  【{{x.title.split('/').splice(0,1).toString()}}】
                                                </span>
                                                {{x.title}}</a>
                                            </p>
                                            <p class="right-Img-item-bottom">
                                                <span class="discountPrice"><span class="disCountPrice-unit">￥</span>{{x.market_price}}</span>
                                                <span class="marketPrice"><span class="marketPrice-unit">￥</span>{{x.discount_price}}</span>
                                                <a href="tencent://message/?uin=2561476865&amp;Site=www.maizhe.com&amp;Menu=yes" class="container-service">
                                                </a>
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="elevator" v-show="isElevator">
            <ul class="elevator-ul">
                <li v-for="(item,index) in contentList" class="handler" @click="jump(index)" :class="{'current':currentIndex === index}">
                    <a href="javascript:;" class="handler-name" @click="jump(index)" :class="{'current-name':currentIndex === index}">{{item.title}}</a>
                </li>
            </ul>
            <div class="serviceIcon">
                <a href="tencent://message/?uin=2561476865&amp;Site=www.maizhe.com&amp;Menu=yes" class="serviceImg"></a>
            </div>
            <div class="qrCode" @mouseover="showQrCode" @mouseout="hideQrCode">
                <a href="javascript:;" class="qrCodeSmall"></a>
                <!--<div v-show="isQrCode" alt="" class="qrCodeBig"></div>-->
            </div>
            <div class="upArrow">
                <a @click="jumpTop()" href="javascript:;" class="upArrowImg"></a>
            </div>
        </div>
    </div>
</template>

<script>
import { getIndexList } from "../api/apiIndex.js";
export default {
  data() {
    return {
      scrollY:-1,
      isElevator:false,
      isServiceIconshow:false,
      isServiceshow:false,
      contentList: [],
      isQrCode: false ,//默认为false,
      currentIndex:0,
      nowindex:''
    };
  },
  created: function() {
    this._getIndexList();
    this.listHeight = [];
    setTimeout(()=>{
      this._calculateHeight()
      },2000)
  },
  mounted:function(){
    //鼠标滚轮事件
      // //chrome and ie
      // window.addEventListener('mousewheel',this.handleScroll,false);
      // //firefox
      // window.addEventListener('DOMMouseScroll',this.handleScroll,false)
      //监听鼠标事件
      this.$nextTick(()=>{
          window.addEventListener('scroll',this.showElevator)
      })
  },
  methods: {
    _calculateHeight(){
      this.listHeight = []
      const list = this.$refs.listGroup;
      let height = 0
      this.listHeight.push(height)
      for(let i = 0;i<list.length;i++){
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
    ,
      getClientHeight(){
        let client = 0;
        if(document.body.clientHeight && document.documentElement.clientHeight){
            var clientHeight =  (document.body.clientHeight<document.documentElement.clientHeight)?
            document.body.clientHeight:document.documentElement.clientHeight;
        }else{
            var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight)?
            document.body.clientHeight:document.documentElement.clientHeight;
        }
        return clientHeight;
      }
      ,
      showElevator(){
          let scrollTop = document.documentElement.scrollTop;
          var clientHeight = this.getClientHeight();
          var content_offsetTop = this.$refs.content_box.offsetTop;
          var elevator_offsetTop
          let jump = document.querySelectorAll(".d_jump");
          let elevator = document.querySelectorAll(".handler");
          this.scrollY = scrollTop;
          if(scrollTop>content_offsetTop){
            this.isElevator = true;
          }else{
            this.isElevator = false;
          }
          
      },
    changeTitle(event){
      event.target.style.color = '#ff6400';
    },
    changedTitle(event){
      event.target.style.color = '#333333';
    },
    _getIndexList() {
      getIndexList().then(res => {
        this.contentList = res.list.list;
      });
    },
    showIcon(){
        this.isServiceIconshow = true;
        this.isServiceshow = true;
    },
    hideIcon(){
        this.isServiceIconshow = false;
        this.isServiceshow = false;
    },
    showQrCode() {
      this.isQrCode = true;
    },
    hideQrCode() {
      this.isQrCode = false;
    },
    jump(index) {
      // 用 class="d_jump" 添加锚点
      let jump = document.querySelectorAll(".d_jump");
      let total = jump[index].offsetTop;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    },
    jumpTop(){
        let clientTop = document.documentElement.scrollTop;
        const fn = ()=>{
          if(document.documentElement.scrollTop>5){
            document.documentElement.scrollTop = document.documentElement.scrollTop-5;
          }else{
            clearInterval(timer)
          }
        }
        const timer = setInterval(fn,5);
    }
  }
  ,
  watch:{
    // data(){
    //   setTimeout(()=>{
    //   this._calculateHeight()
    //   },2000)
    // },
    scrollY(newY){
      const listHeight = this.listHeight
      // 当滚动到顶部时
      // if(newY > 0){
      //   this.currentIndex = 0
      //   return
      // }
      
      //在中间部分移动
      for(let i = 0;i<listHeight.length - 1;i++){
        let height1 = listHeight[i] +600
        let height2 = listHeight[i+1] +600
        if(newY >= height1 && newY<height2){
          this.currentIndex = i;
          return
        }
      }
      // 当滚动到底部时
      // this.currentIndex = listHeight.length - 2
    },

  }
};
</script>

<style scoped lang="less">
@import "../css/reset.css";
.content-box {
  width: 100%;
  min-height: 1500px;
  padding-top: 40px;
  padding-bottom: 32px;
  background-color: #f6f6f6;
  z-index: 1;
  .content {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    .content-ul {
      width: 100%;
      height: 100%;
      .content-item {
        margin-bottom: 46px;
        width: 100%;
        height: 500px;
        .item-top {
          width: 100%;
          height: 22px;
          line-height: 22px;
          position: relative;
          padding-bottom: 9px;
          border-bottom: 2px solid #333333;
          .item-top-title {
            height: 22px;
            font-size: 22px;
            font-weight: bold;
          }
          .hotBot-box {
            width: 850px;
            height: 14px;
            display: inline-block;
            margin-left: 10px;
            position: relative;
            top: -1px;
            .hotBot-title {
              margin-left: -10px;
              width: auto;
              font-size: 14px;
              height: 18px;
              float: left;
              display: block;
              background-color: #f6f6f6;
              position: relative;
              left: 10px;
              z-index: 2
            }
            .hotBot-ul {
              z-index: 1;
              width: auto;
              height: 14px;
              overflow: hidden;
              white-space: nowrap;
              float: left;
              position: relative;
              top: 4px;
              .hotBot-item {
                float: left;
                margin-left: 5px;
                width: auto;
                overflow: hidden;
                height: 14px;
                line-height: 14px;
                vertical-align: bottom;
                .hotBot-item-title {
                  width: auto;
                  height: 14px;
                  color: #333333;
                  font-size: 14px;
                  vertical-align: bottom;
                  display: inline-block;
                }
                .hotBot-item-title::before{
                    content: '|';
                    margin-right:9px;
                  }
              }
            }
          }
          .more {
            vertical-align: middle;
            display: inline-block;
            position: absolute;
            height: 12px;
            line-height: 12px;
            right: 0;
            bottom: 14px;
            .more-a {
              text-align: right;
              display: inline-block;
              line-height: 12px;
              height: 12px;
              width: 80px;
              font-size: 13px;
              color: #a4a4a4;
              
            }
            .more-a:hover {
              color: #fb863a;
            }
          }
        }
        .item-container {
          width: 100%;
          height: 469px;
          /*margin-top: 1px;*/
          .item-container-left {
            float: left;
            width: 240px;
            height: 469px;
            .item-container-left-img{
              width: 100%;
              height: 100%;
              vertical-align: middle;
            }
          }
          .item-container-right {
            float: left;
            width: 960px;
            height: 469px;
            background-color: #ffffff;
            // display: flex;
            // justify-content: center;
            // flex: 1;
            // flex-direction: column;
            .container-right-box {
              overflow: hidden;
              width: 100%;
              height: 100%;
              .right-box {
                width: 100%;
                height: 100%;
                .right-Img-item {
                  float: left;
                  width: 240px;
                  height: 234.5px;
                  box-sizing: border-box;
                  border-right: 1px solid #eeeeee;
                  border-bottom: 1px solid #eeeeee;
                  cursor: pointer;
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
                    height: 33px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    .right-Img-item-title-a {
                      width: 206px;
                      height: 33px;
                      -webkit-line-clamp: 2;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      color: #5f5f5f;
                      font-size: 14px;
                      float: left;
                      line-height: 16px;
                      position: relative;
                      .item-little-title{
                        width: auto;
                        height: 13px;
                        font-size: 14px;
                        line-height: 18px;
                        margin-left: -8px;
                        color: #333333;
                        overflow: hidden;
                      }
                    }
                    .right-Img-item-title-a:hover{
                      color: #ff6400;
                      text-decoration-line: underline;
                      .item-little-title{
                        color: #ff6400;
                      }
                    }
                  }
                  .right-Img-item-title:hover{
                    text-decoration-line: underline;
                    text-decoration-color: #ff6400;
                  }
                  .right-Img-item-bottom {
                    box-sizing: border-box;
                    margin: 10px 15px 0 15px;
                    line-height: 17px;
                    height: 17px;
                    width: 206px;
                    position: relative;
                    .discountPrice {
                      width: auto;
                      height: 13px;
                      font-size: 17px;
                      color: #ff6400;
                      .disCountPrice-unit{
                        height: 10px;
                        font-size: 13px;
                      }
                    }
                    .discountPrice:hover{
                      text-decoration-line: underline;
                    text-decoration-color: #ff6400;
                    }
                    .marketPrice {
                      display: inline-block;
                      height: 10px;
                      font-size: 14px;
                      text-decoration-line: line-through;
                      color: #acacac;
                    }
                    .container-service {
                      position: absolute;
                      right: 0;
                      top: 0;
                      height: 16px;
                      line-height: 16px;
                      width: 60px;
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
          }
        }
      }
    }
  }
  .elevator {
    position: fixed;
    z-index: 960;
    right: 100px;
    bottom:30%;
    width: 40px;
    min-height: 125px;
    height: auto;
    background-color: #ffffff;
    .elevator-ul {
      width: 40px;
      height: auto;
      .handler {
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #f6f6f6;
        .handler-name {
          font-size: 12px;
          height: 20px;
          width: 30px;
          padding: 5px;
          display: inline-block;
          color: #000;
          cursor: default;
        }
        .handler-name:hover{
          font-size: 12px;
          height: 20px;
          width: 30px;
          display: inline-block;
          color: #fff;
        }
        .current-name{
          font-size: 12px;
          height: 20px;
          width: 30px;
          display: inline-block;
          color: #fff;
        }
      }
      .handler:hover{
        background-color: #f35f00;
      }
      .current{
        background-color: #f35f00;
      }
    }
    .serviceIcon {
      width: 40px;
      height: 40px;
      border-bottom: 1px solid #f6f6f6;
      box-sizing: border-box;
      .serviceImg {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/static/images/pc/service-right.png") no-repeat center center;
      }
      .serviceImg:hover{
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/static/images/pc/service-right1.png") no-repeat center center;
        background-color: #f35f00;
      }
      .service-rightImg:hover {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/static/images/pc/service-right.png") no-repeat center
          center;
      }
    }
    .qrCode {
      width: 40px;
      height: 40px;
      border-bottom: 1px solid #f6f6f6;
      box-sizing: border-box;
      position: relative;
      .qrCodeSmall {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/static/images/pc/qrCodeSmall.png") no-repeat center
          center;
      }
      .qrCodeBig {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 0;
        right: 40px;
        border: 1px solid #e0e0e0;
        background: url("/static/images/pc/qrCodeBig.png") no-repeat center
          center;
      }
    }
    .upArrow {
      width: 40px;
      height: 40px;
      box-sizing: border-box;
      .upArrowImg {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/static/images/pc/upArrow.png") no-repeat center center;
      }
      .upArrowImg:hover{
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/static/images/pc/upArrowH.png") no-repeat center center;
        background-color: #f35f00;
      }
    }
  }
}
</style>