import Vue from 'vue';
import pop from './index.vue';
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)
const myPopup = {
	install:function(Vue){
		Vue.component('myPopup',pop);
	}
}
export default myPopup

