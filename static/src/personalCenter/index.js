import personalCenter from './personalCenter.vue';
import myHeader from '../header/index.js';
import myFooter from '../footer/index.js';
// import VueLazyload from 'vue-lazyload'
const Vuex = require('vuex');
const axios = require('axios');
const VueResource = require('vue-resource');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)
Vue.use(myHeader);
Vue.use(myFooter);
//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	render:h => h(personalCenter,myHeader,myFooter),
	mounted: function() {

	}
}).$mount('#app');