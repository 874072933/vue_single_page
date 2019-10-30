import navbar from './navbar.vue';
const Vuex = require('vuex');
const axios = require('axios');
const VueResource = require('vue-resource');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)

//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	el: '#app',
	components: {
		navbar

	},
	mounted: function() {

	}
});