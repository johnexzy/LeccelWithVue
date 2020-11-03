import Vue from 'vue'
import Router from 'vue-router'
import Gp from '@/components/Gp.vue'
import Api from '@/components/Api.vue'
import index from '@/components/pages/index.vue'
import ViewMusic from '@/components/views/music.vue';
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: index
    }, {
        path: '/api',
        name: 'Api',
        component: Api
    }, {
        path: '/home',
        name: 'Gp',
        component: Gp
    },{
        path: '/music/:short_url',
        name: 'Music',
        component: ViewMusic
    },
]
})
