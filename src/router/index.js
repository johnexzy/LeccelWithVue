import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index.vue'
Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [{
        path: '/',
        name: 'home',
        component: index
    },

    // Music
    {
        path: '/music/:short_url',
        name: 'Music',
        component: () => import('@/components/views/music/music.vue')
    }, {
        path: '/view/music',
        name: 'AllMusic',
        component: () => import('@/components/pages/music/index.vue')
    },


    // Series
    {
        path: '/view/series',
        name: 'AllSeries',
        component: () => import('@/components/pages/series/index.vue')
    }, {
        path: '/series/:short_url',
        name: 'Series',
        component: () => import('@/components/views/series/series.vue')
    }, {
        path: '/season/:series_name/:season_short_url',
        name: 'Season',
        component: () => import('@/components/views/series/season/seasons.vue')
    }, {
        path: '/episode/:series_name/:episode_short_url',
        name: 'Episode',
        component: () => import('@/components/views/series/season/episode/episodes.vue')
    },

    // Movies
    {
        path: '/view/movies',
        name: 'AllMovies',
        component: () => import('@/components/pages/movies/index.vue')
    },
    {
        path: '/video/:short_url',
        name: 'Movie',
        component: () => import('@/components/views/movies/movies.vue')
    },

    // Miscellaneous
    {
        path: '/aboutus',
        name: 'about',
        component: () => import('@/components/pages/aboutus.vue')
    }, {
        path: '/contactus',
        name: 'contact',
        component: () => import('@/components/pages/contactus.vue')
    },{
        path: '/privacy',
        name: 'privacy',
        component: () => import('@/components/pages/privacy.vue')
    },
    {
        path: '/search/:group/:query',
        name: 'Search',
        component: () => import('@/components/utils/search/search.vue')
    },





    //Fallback Route
    {
        path: '/*',
        component: index
    }
    ]
})
