import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index.vue'
import aboutUs from '@/components/pages/aboutus.vue'
import contactUs from '@/components/pages/contactus.vue'

import allMovies from '@/components/pages/movies/index.vue'
import allMusic from '@/components/pages/music/index.vue'
import allSeries from '@/components/pages/series/index.vue'
import ViewMusic from '@/components/views/music/music.vue';
import ViewSeries from '@/components/views/series/series.vue';
import ViewSeason from '@/components/views/series/season/seasons.vue';
import ViewEpisode from '@/components/views/series/season/episode/episodes.vue';
import ViewVideo from '@/components/views/movies/movies.vue';
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: index
    },
    
    // Music
    {
        path: '/music/:short_url',
        name: 'Music',
        component: ViewMusic
    }, {
        path: '/view/music',
        name: 'AllMusic',
        component: allMusic
    },


    // Series
    {
        path: '/view/series',
        name: 'AllSeries',
        component: allSeries
    }, {
        path: '/series/:short_url',
        name: 'Series',
        component: ViewSeries
    }, {
        path: '/season/:series_name/:season_short_url',
        name: 'Season',
        component: ViewSeason
    },{
        path: '/episode/:series_name/:episode_short_url',
        name: 'Episode',
        component: ViewEpisode
    },

    // Movies
    {
        path: '/view/movies',
        name: 'AllMovies',
        component: allMovies
    },
    {
        path: '/video/:short_url',
        name: 'Movie',
        component: ViewVideo
    },

    // Miscellaneous
    {
        path: '/aboutus',
        name: 'about',
        component: aboutUs
    }, {
        path: '/contactus',
        name: 'contact',
        component: contactUs
    }, {
        path: '/*',
        component: index
    }
    ]
})
