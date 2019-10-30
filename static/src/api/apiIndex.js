// import VueResource from 'vue-resource'
import axios from 'axios'
// 获取首页列表数据
export function getIndexList(){
    const url= '/item-campaign/list'
    return axios.get(url)
        .then((res)=>{
            return Promise.resolve(res.data)
        })
} 
//footer提交电话号码
export function updateRecord(name,mobile){
    const url = '/record';
    const data = {
        name:name,
        mobile:mobile
    }
    return axios.get(url,{
        params:data
    }).then((res) =>{
        return Promise.resolve(res)
    })
}

//获取验证码
 export function getPhoneCode(params){
     const url = '/sendCode';
     return  axios.get(url,{params:params}).then((res)=>{
         return Promise.resolve(res)
     })

 }

 export function getOrderInfo(id,quantity){
    const url = '/order/checkout';
    const data = {
        id:id,
        quantity:quantity
    }
    return axios.post(url,{
        params:data
    }).then((res) =>{
        return Promise.resolve(res)
    })
}

 export function getUserName(){
    const url = '/user/name';
    return  axios.get(url).then((res)=>{
        return Promise.resolve(res)
    })
 }

 export function getMenubarList(){
    const url = '/cate/menubar';
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    })
 }

 export function getbannerList(){
    const url = '/ad-index';
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    })
 }


 //获取头部导航栏
 export function getHeaderMenu(){
    const url = '/cate/header-menu';
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    })
 }

 //获取底部导航栏
  export function getFooterMenu(){
    const url = '/cate/foot-menu';
    return axios.get(url).then((res)=>{
        return Promise.resolve(res)
    })
 }
