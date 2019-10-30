<template>
    <div class="headerMBox">
        <div class="headerMiddle flex">
            <div class="logoBox">
                <a href="/">
                    <img src="/static/images/pc/logo.png?1" alt="">
                </a>
            </div>
            <!-- 标语 -->
            <!--<div class="sloganBox">
                <img :src="slogan" alt="slogan图片">
            </div>-->
            <div class="searchAll">
                <div class="searchBox flex">
                    <div class="searchInp">
                        <input type="text" v-model="searchInput" placeholder="请输入关键词 如  “口碑营销”" @keydown="search">
                    </div>
                    <a class="searchBtn" @click="searchInfo" href="javascript:;">
                        搜索
                    </a>
                </div>
                <div class="markedWords">
                    <ul >
                        <li v-for="item in markWords" :key="item.id"><a :href="item.src+item.name">{{item.name}}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    	logoImgUrl: "/static/images/pc/logo.png?1",
    	slogan: "/static/images/pc/slogan.png",
    	searchInput: "",
    	markWords:[
    	{id:1,name:'一元发稿',src:'/item/list?keyword='},
    	{id:2,name:'百度知道',src:'/item/list?keyword='},
    	{id:3,name:'快速发稿',src:'/item/list?keyword='},
    	{id:4,name:'论坛发帖',src:'/item/list?keyword='},
    	{id:5,name:'微博热搜',src:'/item/list?keyword='}
        ]
    };
  },
  created(){
  	if(this.getQueryString('keyword')){
  		this.searchInput = this.getQueryString('keyword');
  	}
  },
  methods: {
  	searchInfo() {
  		window.location.href = "/item/list?keyword=" + this.searchInput;
  	},
  	search(e){
  		if(e.keyCode == 13){
  			window.location.href = "/item/list?keyword=" + this.searchInput;
  		}
  	},
  	getQueryString(name){
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
		let r = window.location.search.substr(1).match(reg);
		let q = window.location.pathname.substr(1).match(reg_rewrite);
		if(r != null) {
			return decodeURI(r[2]);
		} else if(q != null) {
			return decodeURI(q[2]);
		} else {
			return null;
		}
	}
  }
};
</script>

<style scoped lang="less">
@import "../css/variable.less";
.flex{
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
}
.headerMBox {
  width: 100%;
  height: 130px;
  .headerMiddle {
    width: 1200px;
    margin: 0 auto;
    padding:26px 0 30px;
    justify-content:space-between;
    align-items: center;
    .logoBox {
      /*margin-top: 40px;*/
    }
    .sloganBox {
      display: inline-block;
      margin: 40px 0 0 30px;
    }
    .searchAll {
        /*margin-top: 28px;*/
        width: 745px;
        height: 74px;
      .searchBox {
        width: 745px;
        height: 50px;
        .searchInp {
          width: 656px;
          height: 46px;
          border: 2px solid #eb620f;
          line-height: 46px;
            font-size: 0;
          input {
              font-size: 16px;
              height: 46px;
              line-height: 46px;
            width: 95%;
            color: #333333;
            border-style: none;
            margin-left: 15px;
              padding: 0;
          }
          ::-webkit-input-placeholder { 
         	color: #B5B5B5;
         }
         :-moz-placeholder {
         	color:#B5B5B5;
         	}
         	::-moz-placeholder { 
         		color:#B5B5B5;
         		}
         		:-ms-input-placeholder { 
         			color:#B5B5B5;
         			}
        }
        .searchBtn {
          width:85px;
          height: 50px;
          line-height: 50px;
          /*position: absolute;
          top: 0;*/
          background-color: #ff6400;
          color: #ffffff;
          font-size: 16px;
          text-align: center;
          display: inline-block;
        }
      }
      .markedWords{
          margin-top: 12px;
          width: 660px;
          font-size: 14px;
          /*height: 12px;*/
          
          ul{
            width: 660px;
            /*height: 12px;*/
            li{
                display: inline-block;
                margin-right: 10px;
                a{
                    color: #888888;
                }
                a:hover{
                    color:#ff6400;
                }
            }
          }
      }
    }
  }
}
</style>