/* eslint-disable no-console */
import { api, Api_Base } from '../../config/config'

const state = {
    news: [],
    isLoadingNews: true
}


const actions = {
    async fetchMovie({ commit, dispatch }) {
        try {
            await api.get("/api/v1/videos/popular/1").then((res) => {
                commit("addMovie", res.data.map(v => (
                    {
                        title: v.video_name,
                        body: v.video_details.length > 246 ? v.video_details.substr(0, 246) : v.video_details,
                        image: Api_Base+"/"+v.images[0],
                        short_url: v.short_url,
                        tag: "Movie"
                        
                    })))
                dispatch("fetchMusic")
            })
        } catch (error) {
            console.error(error);
        }
    },
    async fetchMusic({ commit, dispatch }) {
        try {
            await api.get("/api/v1/music/popular/1").then((res) => {
                commit("addMusic", res.data.map(v => (
                    {
                        title: v.music_name,
                        body: v.music_details.length > 246 ? v.music_details.substr(0, 246) : v.music_details,
                        image: Api_Base+"/"+v.images[0],
                        short_url: v.short_url,
                        tag: "Music"
                        
                    })))
                dispatch("fetchSeries")
            })
        } catch (error) {
            console.error(error);
        }
    },

    async fetchSeries({ commit }) {
        try {
            await api.get("/api/v1/series/popular/1").then((res) => {
                commit("addSeries", res.data.map(v => (
                    {
                        title: v.series_name,
                        body: v.series_details.length > 246 ? v.series_details.substr(0, 246) : v.series_details,
                        image: Api_Base+"/"+v.images[0],
                        short_url: v.short_url,
                        tag: "Series"
                        
                    })))
                commit("isLoadingNews", false)
            })
        } catch (error) {
            console.error(error);
        }
    },
}

const mutations = {
    addMovie: (state, movies) => (state.news.push(movies[0])),
    addMusic: (state, music) => (state.news.push(music[0])),
    addSeries: (state, series) => (state.news.push(series[0])),
    isLoadingNews: (state, bool) => (state.isLoadingNews = bool)
}
const getters = {
    news: state => state.news,
    isLoadingNews: state => state.isLoadingNews
}
export default {
    state,
    getters,
    actions,
    mutations
}