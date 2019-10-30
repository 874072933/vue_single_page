import Vue from 'vue';
import right from './index.vue';
const rightBar = {
	install:function(Vue){
		Vue.component('rightBar',right);
	}
}
export default rightBar

