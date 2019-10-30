import orderDetail from './index.vue';
import myHeader from '../header/index.js';
import myFooter from '../footer/index.js';
//import myPopup from '../popup/index.js';
//import myPagination from '../pagination/index.js';
const Vuex = require('vuex');
const axios = require('axios');
const VueResource = require('vue-resource');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)
//Vue.use(ElementUi)
//Vue.use(myPopup);
//Vue.use(myPagination);
Vue.use(myHeader);
Vue.use(myFooter);
//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	render:h => h(orderDetail,myHeader,myFooter),
	mounted: function() {

	}
}).$mount('#app');