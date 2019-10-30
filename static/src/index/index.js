import index from './index.vue';
import myHeader from '../header/index.js';
import myCarousel from '../carousel/index.js';
import myPageContent from '../pageContent/index.js';
import myFooter from '../footer/index.js';
// import VueLazyload from 'vue-lazyload'
const Vuex = require('vuex');
const axios = require('axios');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)
Vue.use(myHeader);
Vue.use(myCarousel);
Vue.use(myPageContent);
Vue.use(myFooter);
//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	render:h => h(index,myHeader,myCarousel,myPageContent,myFooter),
	mounted: function() {

	}
}).$mount('#app');