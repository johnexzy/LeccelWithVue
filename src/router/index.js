import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index.vue'
import ViewMusic from '@/components/views/music/music.vue';
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: index
    }, {
        path: '/music/:short_url',
        name: 'Music',
        component: ViewMusic
    },
]
})
