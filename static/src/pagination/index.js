import Vue from 'vue';
import Pagination from './index.vue';
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)
const myPagination = {
	install:function(Vue){
		Vue.component('myPagination',Pagination);
	}
}
export default myPagination

