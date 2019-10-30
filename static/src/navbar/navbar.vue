<template>
    <div class="navbarBox">
        <div class="navbar flex">
            <div class="navbarLeft" @mouseover="showList" @mouseleave="hideList">
                <h2 class="navbarLeft-h2 flex" >
                    <span class="navbarLeft-icon navbarLeft-icon1"></span>
                    <a href="javascript:;">全部营销分类</a>
                </h2>
                <div class="navbox" v-show="isLisNav">
                    <ul class="lisnav-ul" >
                        <li class="nav-item flex" v-for="(item,index) in getMenubarList" :key="item.id" :class="nowindex == index ? 'nav-item1': ''"  @mouseover="changeIcon(index)" @mouseleave="changedIcon(index)">
                            <span class="nav-item-icon" :class="nowindex == index ? 'nav-item' + (index + 1) + '-icon' + 1 : 'nav-item' + (index + 1) + '-icon'">
                            </span>
                            <a :href="'/item/list?cate_id1=' + item.id" class="nav-item1-title">{{item.name}}</a>
                        </li>
                    </ul>
                </div>
                <li v-show="is_sonShow">
                    <div class="subnav"  @mouseover="changeIcon2" @mouseleave="changedIcon2">
                        <div class="fullcategory" >
                            <div v-if="sonBarList.length > 0" class="category-item" v-for="x in sonBarList" >
                                <span class="categoryTitle" v-text="x.name + ':'"></span>
                                <a v-if="x.son" :href="'/item/list?cate_id3=' + x.id" v-for="z in x.son" v-text="z.name" class="categoryType">发帖</a>
                            </div>
                            <div class="category-imgBox">
                                <a v-for="item in sonBarlogo" href="javascript:;" class="categoryImgBox-a">
                                    <img :src="item" class="categoryImgBox-img" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </li>

            </div>
            
            <div class="navbarRight">
                <ul class="navbarMain">
                    <li v-for="item in mainNavs" :key="item.id" class="navbarMain-item">
                        <a :href="item.url" class="navbarMain-item-a">
                            {{item.name}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	const $ = require('jquery');
import { getMenubarList,getHeaderMenu } from "../api/apiIndex.js";
    export default {
        data(){
            return {
                isSubnav:false,
                isLisNav:false,
                menubarList:[],
                mainNavs:[],
                nowindex:-1,
                sonBarList:[],
                sonBarlogo:[],
                is_sonShow:false,
            }
        },
        watch:{
        	mainNavs(){
        		this.addClass();
        	}
        },
        created(){
            this.getMenubar();
            this.getMenufbar();
        },
        methods:{
            getNavItem(index){
                return "nav-item"+index
            },
            showList(){
                this.isLisNav = true;
                this.isSubnav = true;
            },
            hideList(){
                this.isLisNav = false;
                this.isSubnav = false;
            },
            changeIcon(i){
            	this.nowindex = i;
            	if(this.getMenubarList[i].son){
            		this.sonBarList = this.getMenubarList[i].son;
            		this.sonBarlogo = this.getMenubarList[i].image_path_array;
            		this.is_sonShow = true;
            	}

            },
            changedIcon(i){
            	this.is_sonShow = false;
            	this.nowindex = -1;
            },
            changeIcon2(){
            	this.is_sonShow = true;
            },
            changedIcon2(){
            	this.is_sonShow = false;
            },
            getMenubar(){
                getMenubarList().then(res=>{
                    if(res.data.success == 1){
                        this.getMenubarList = res.data.list;
                    }
                })
            },
            getMenufbar(){
            	getHeaderMenu().then(res => {
            		if(res.data.success == 1){
            			this.mainNavs = res.data.list;
//          			document.body.style.opacity = 1;
            		}
            	})
            },
            addClass(){
            	this.$nextTick(function(){
            		$('.navbarMain-item-a').each(function(){
            			let $this = $(this);
            			if($this[0].href == String(window.location)){
            				$(this).css('color','#FF6400')
            			}
            		})
            	})
            }
        },
        mounted:function(){
        	
        }
    }
</script>

<style scoped lang="less">
    @import '../css/reset.css';
    .flex{
    	display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
    .navbarBox{
        width: 100%;
        z-index: 0;
        font-size:0;
        .navbar{
            width: 1200px;
            margin: 0 auto;
            height: 44px;
            a{
            	text-decoration: none;
            }
            .navbarLeft{
                width: 195px;
                height: 44px;
                vertical-align: top;
                position: relative;
                background-color: #2d2c2c;
                .navbarLeft-h2{
                    width: 195px;
                    height: 44px;
                    line-height: 44px;
                    font-size:0;
                    overflow: hidden;
                    align-items: center;
                    .navbarLeft-icon{
                        display: inline-block;
                        width: 23px;
                        height:18px;
                        font-size: 0;
                        margin:0 18px 0 13px;
                        background-size: 23px 18px;
                    }
                    .navbarLeft-icon1{
                        background: url('/static/images/pc/navbarLeft-icon.png') no-repeat center center;
                    }
                    .navbarLeft-icon1:hover{
                        background: url('/static/images/pc/navbarLeft-icon1.png') no-repeat center center;
                    }
                    a{
                        font-size: 18px;
                        color: #ffffff;
                    }
                }
                .navbox{
                    width: 195px;
                    height: 353px;
                    background-color: #333333;
                    box-shadow: 0px 3px 5px 0px rgba(6, 0, 1, 0.46);
                    position: absolute;
                    top: 43px;
                    z-index: 999;
                    .lisnav-ul{
                        margin-left: 1px;
                        width: 195px;
                        height: 353px;
                        .nav-item{
                            width: 194px;
                            height: 44px;
                            line-height: 44px;
                            background: url('/static/images/pc/nav-right2.png') no-repeat right 14px center;
                            align-items: center;
                            a{
                                font-size: 17px;
                            }
                            .nav-item1-title{
                                color: #ffffff;
                            }
                            .nav-item1-title1{
                                color: #ff6400;
                            }
                        }
                        .nav-item1{
                            background: #fff url('/static/images/pc/nav-right1.png') no-repeat right 14px center;
                            .nav-item1-title{
                            	color: #ff6400;
                            }
                            width: 194px;
                            height: 44px;
                        }
                        .nav-item-icon{
                            vertical-align: middle;
                            display: inline-block;
                            margin:0 13px 0 13px;
                            width: 26px;
                            height: 26px;
                        }
                        .nav-item1-icon{   
                            background: url('/static/images/pc/nav-item-search.png') no-repeat center center;
                        }
                        .nav-item1-icon1{ 
                            background: url('/static/images/pc/nav-item-search1.png') no-repeat center center;
                        }
                        .nav-item2-icon{
                            background: url('/static/images/pc/nav-item-parise.png') no-repeat center center;
                        }
                        .nav-item2-icon1{
                            background: url('/static/images/pc/nav-item-parise1.png') no-repeat center center;
                        }
                        .nav-item3-icon{
                            background: url('/static/images/pc/nav-item-news.png') no-repeat center center;
                        }
                        .nav-item3-icon1{
                            background: url('/static/images/pc/nav-item-news1.png') no-repeat center center;
                        }
                        .nav-item4-icon{
                            background: url('/static/images/pc/nav-item-adver.png') no-repeat center center;
                        }
                        .nav-item4-icon1{
                            background: url('/static/images/pc/nav-item-adver1.png') no-repeat center center;
                        }
                        .nav-item5-icon{
                            background: url('/static/images/pc/nav-item-fans.png') no-repeat center center;
                        }
                        .nav-item5-icon1{
                            background: url('/static/images/pc/nav-item-fans1.png') no-repeat center center;
                        }
                        .nav-item6-icon{
                            background: url('/static/images/pc/nav-item-popular.png') no-repeat center center;
                        }
                        .nav-item6-icon1{
                            background: url('/static/images/pc/nav-item-popular1.png') no-repeat center center;
                        }
                        .nav-item7-icon{
                            background: url('/static/images/pc/nav-item-serve.png') no-repeat top 2px center;
                        }
                        .nav-item7-icon1{
                            background: url('/static/images/pc/nav-item-serve1.png') no-repeat top 2px center;
                        }
                        .nav-item8-icon{
                            background: url('/static/images/pc/nav-item-trustee.png') no-repeat center center;
                        }
                        .nav-item8-icon1{
                            background: url('/static/images/pc/nav-item-trustee1.png') no-repeat center center;
                        }
                    }
                }
                .subnav{
                    display: inline-block;
                    z-index: 999;
                    width: 1004px;
                    height: 351px;
                    position: absolute;
                    top: 43px;
                    left: 195px;
                    background-color: #ffffff;
                    border:solid 1px #2d2c2c;
                    border-left: none;
                    box-shadow: 0px 3px 5px 0px rgba(6, 0, 1, 0.46);
                    .fullcategory{
                        width: 920px;
                        height: 260px;
                        margin: 30px 40px 60px 40px;
                        .category-item{
                            width: 100%;
                            height: 16px;
                            line-height: 16px;
                            margin-bottom: 20px;
                            .categoryTitle{
                                font-size: 15px;
                                font-weight: bold;
                                vertical-align: middle;
                            }
                            .categoryType{
                                font-size: 13px;
                                vertical-align: middle;
                                margin-left: 30px;
                                color: #656565;
                            }
                            .categoryType:hover{
                                color:#ff6400;
                                font-size: 13px;
                                vertical-align: middle;
                            }
                        }
                        .category-imgBox{
                            margin-top: 30px;
                            height: 106px;
                            width: 100%;
                            .categoryImgBox-a{
                                display: inline-block;
                                width: 105px;
                                height: 105px;
                                box-sizing: border-box;
                                margin-right:10px;
                                border: 1px solid #ededed;
                                .categoryImgBox-img{
                                    display: inline-block;
                                    width: 103px;
                                    height: 103px;
                                }
                            }
                        .categoryImgBox:last-child{
                            margin-right: 0px !important;
                        }
                        }
                    }
                }
            }
            
            .navbarRight{
                width: 1005px;
                height: 44px;
                position: relative;
                .navbarMain{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    right: 0;
                    .navbarMain-item{
                        width: 90px;
                        height: 44px;
                        float: left;
                        margin-left: 35px;
                        line-height: 44px;
                        .navbarMain-item-a{
                            font-size: 18px;
                            font-weight: 500;
                            color: #000;
                        }
                    }
                }
            }
        }
    }
</style>