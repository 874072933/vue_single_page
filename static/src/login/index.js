import logon from './login.vue';
const Vuex = require('vuex');
const axios = require('axios');
const VueResource = require('vue-resource');
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'
import '../common/gt'

Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)

//上面的组件需要分别use
Vue.prototype.$axios = axios
new Vue({
	render:h => h(logon),
	mounted: function() {

	}
}).$mount('#app');