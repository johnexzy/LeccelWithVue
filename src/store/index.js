import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '../config/config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        latestMusic: [],
        popularMusic: [],
        latestMovies: [],
        latestSeries: []
    },

    actions: {
        
        async getLatestMusic({ commit }) {
            return commit('setLatestMusic', await api.get(`/api/v1/music/limit/20`))
        },
        async getPopularMusic({ commit }) {
            return commit('setPopularMusic', await api.get(`/api/v1/music/popular/10`))
        },
        async getLatestMovie({commit}) {
            return commit('setLatestMovie', await api.get(`/api/v1/videos/limit/10`))
        },
        async getLatestSeries({commit}) {
            return commit('setLatestSeries', await api.get(`/api/v1/series/limit/9`))
        }
    },

    mutations: {
        setLatestMusic(state, res) {
            state.latestMusic = res.data
        },

        setPopularMusic(state, res) {
            state.popularMusic = res.data
        },

        setLatestMovie(state, res) {
            state.latestMovies = res.data
        },

        setLatestSeries(state, res) {
            state.latestSeries = res.data
        }
    },
    strict: false
})