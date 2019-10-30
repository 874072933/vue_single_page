import index from './index.vue';
import myHeader from '../header/index.js';
import myFooter from '../footer/index.js';
import myPagination from '../pagination/index.js';
import rightBar from '../rightBar/index.js';
const VueResource = require('vue-resource');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message,Loading} from 'element-ui'
Vue.use(Input,InputNumber,Message,Loading)
Vue.use(ElementUi)
Vue.use(rightBar);
Vue.use(VueResource);
//const Vuex = require('vuex');
//const axios = require('axios');
Vue.use(myHeader);
Vue.use(myFooter);
Vue.use(myPagination);
//Vue.prototype.$axios = axios;
//上面的组件需要分别use
new Vue({
	render:h => h(index,myHeader,myFooter,myPagination,rightBar),
	mounted: function() {

	}
}).$mount('#app');