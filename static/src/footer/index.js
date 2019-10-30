import Vue from 'vue';
import footer from './footer.vue';
const myFooter = {
    install:function(Vue){
      Vue.component('myFooter',footer);
    }
  }
  export default myFooter