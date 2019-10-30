import Vue from 'vue';
import header from './header.vue';
const myHeader = {
    install:function(Vue){
      Vue.component('myHeader',header);
    }
  }
  export default myHeader