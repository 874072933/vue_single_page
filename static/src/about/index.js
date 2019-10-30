import about from './about.vue';
import myHeader from '../header/index.js';
import myFooter from '../footer/index.js';
// import VueLazyload from 'vue-lazyload'
const Vuex = require('vuex');
const axios = require('axios');
// Vue.use(VueLazyload,{
// 	loading:require('./default.png')
// })
const ElementUi = require('element-ui');
import {Input,InputNumber,Message,Carousel,Loading} from 'element-ui'
Vue.use(Input,InputNumber,Message,Carousel,Loading)
Vue.use(ElementUi)
Vue.use(ElementUi)
Vue.use(myHeader);
Vue.use(myFooter);
//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	render:h => h(about,myHeader,myFooter),
	mounted: function() {

	}
}).$mount('#app');