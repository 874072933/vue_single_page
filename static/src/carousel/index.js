import Vue from 'vue';
import carousel from './carousel.vue';
const myCarousel = {
    install:function(Vue){
      Vue.component('myCarousel',carousel);
    }
  }
  export default myCarousel
