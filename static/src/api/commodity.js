import axios from 'axios'
// 获取商品详情页列表数据
export function getCommodityDet(id){
    const url= '/itemdetails/'+id;
    return axios.get(url)
        .then((res)=>{
            return Promise.resolve(res.data)
        })
} 