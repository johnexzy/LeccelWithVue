import Vue from 'vue';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router'
import store from './store/index';
import NProgress from 'nprogress';
import VueAPlayer from 'vue-aplayer'
import comment from "@/components/utils/comments/comments.vue";
import "@mdi/font/scss/materialdesignicons.scss";
import 'nprogress/nprogress.css';
import '../public/assets/css/style.css';
import carouselImg from "@/components/utils/carousel/carouselImage.vue";
import share from "@/components/utils/share/share.vue";
import 'jquery'
import 'bootstrap'
import 'popper.js'
import './registerServiceWorker'
Vue.component('aplayer', VueAPlayer)
Vue.use(VueMeta)
Vue.config.productionTip = true;
// import 'jquery';
// import 'bootstrap'
// import 'popper.js'
router.beforeResolve((to, from, next) =>{
    if (to.name) {
        NProgress.start()
    }
    next()
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) =>{
    NProgress.done()
})

Vue.component('comment', comment)
Vue.component('carousel-img', carouselImg)
Vue.component('share', share)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');


