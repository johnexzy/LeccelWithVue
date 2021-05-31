import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '../config/config';
import { formatMusic, formatSeries, formatVideos } from '../helpers/ArrayFormatter';
// import news from "./modules/news"
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        // news
    },
    state: {
        // latest
        latestMusic: [],
        latestMovies: [],
        latestSeries: [],

        //popular
        popularMusic: [],
        popularVideo: [],
        popularSeries: []
    },

    actions: {
        /**
         * get latest music and return commit
         * @param {commit} commit Commit
         * @return commit
         */
        async getLatestMusic({ commit }) {
            return commit('setLatestMusic', await api.get(`/api/v1/music/limit/10`))
        },

        /**
         * get latest movies and return commit
         * @param {commit} commit Commit
         * @return commit
         */
        async getLatestMovie({ commit }) {
            return commit('setLatestMovie', await api.get(`/api/v1/videos/limit/10`))
        },

        /**
         * get latest Series and return commit
         * @param {commit} commit Commit
         * @return commit
         */
        async getLatestSeries({ commit }) {
            return commit('setLatestSeries', await api.get(`/api/v1/series/limit/9`))
        },

        /**
         * get popular music and return commit
         * @param {commit} commit Commit
         * @return commit
         */
        async getPopularMusic({ commit }) {
            return commit('setPopularMusic', await api.get(`/api/v1/music/popular/10`))
        },

        /**
         * get popular video and return commit
         * @param {commit} commit Commit
         * @return commit
         */
        async getPopularVideo({ commit }) {
            return commit('setPopularVideo', await api.get(`/api/v1/videos/popular/10`))
        },

        /**
         * get popular Series and return commit
         * @param {Commit} commit Commit
         * @return commit
         */
        async getPopularSeries({ commit }) {
            return commit('setPopularSeries', await api.get(`/api/v1/series/popular/10`))
        }

    },

    mutations: {
        /**
         * Set's LatestMusic Array from Commit
         * @param {Object} state $Store.state.latestMusic
         * @param {Object} res 
         */
        setLatestMusic(state, res) {
            state.latestMusic = formatMusic(res.data)
        },

        /**
         * Set's LatestMovie Array from Commit
         * @param {Object} state $Store.state.latestMovie
         * @param {Object} res 
         */
        setLatestMovie(state, res) {
            state.latestMovies = formatVideos(res.data)
        },

        /**
         * Set's latestSeries Array from Commit
         * @param {Object} state $Store.state.latestSeries
         * @param {Object} res 
         */
        setLatestSeries(state, res) {
            state.latestSeries = formatSeries(res.data)
        },

        /**
         * Set's popularMusic Array from Commit
         * @param {Object} state $Store.state.popularMusic
         * @param {Object} res 
         */
        setPopularMusic(state, res) {
            state.popularMusic = formatMusic(res.data)
        },

        /**
         * Set's popularVideo Array from Commit
         * @param {Object} state $Store.state.popularVideo
         * @param {Object} res 
         */
        setPopularVideo(state, res) {
            state.popularVideo = formatVideos(res.data)
        },

        /**
         * Set's popularSeries Array from Commit
         * @param {Object} state $Store.state.popularSeries
         * @param {Object} res 
         */
        setPopularSeries(state, res) {
            state.popularSeries = formatSeries(res.data)
        },

    },
    strict: false
})