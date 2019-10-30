import detail from './detail.vue';
import myHeader from '../header/index.js';
import myFooter from '../footer/index.js';
import rightBar from '../rightBar/index.js';
Vue.use(rightBar)
// import VueLazyload from 'vue-lazyload'
const Vuex = require('vuex');
const axios = require('axios');
const VueResource = require('vue-resource');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)

// Vue.use(VueLazyload,{
// 	loading:require('./default.png')
// })
Vue.use(myHeader);
Vue.use(myFooter);
//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	render:h => h(detail,myHeader,myFooter),
	mounted: function() {

	}
}).$mount('#app');