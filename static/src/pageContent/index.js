import Vue from 'vue';
const ElementUi = require('element-ui');
import {Input,InputNumber,Message} from 'element-ui'


Vue.use(Input,InputNumber,Message)
Vue.use(ElementUi)
import pageContent from './pageContent.vue';
const myPageContent = {
    install:function(Vue){
      Vue.component('myPageContent',pageContent);
    }
  }
  export default myPageContent