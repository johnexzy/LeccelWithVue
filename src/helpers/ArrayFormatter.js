const { Api_Base } = require("../config/config")
// const musicObj = require("../model/musicobj")


const helpers = {
    formatMusic: (musicArr) =>{
        return musicArr.map(m => (
            {
                comments: m.comments,
                created_at: m.created_at,
                id: m.id,
                images: m.images.map(x => `${Api_Base}/${x}`),
                popular: m.popular,
                audio: m.audio.map(y => (
                    {
                        song_url: `${Api_Base}/${y.song_url}`,
                        song_bytes: y.song_bytes
                    }
                )),
                music_details: m.music_details,
                music_key: m.music_key,
                music_name: m.music_name,
                short_url: m.short_url,
                updated_at: m.updated_at,
                uploaded_by: m.uploaded_by,
                artist: m.artist
            }))
    },
    formatVideos : (videoArr) =>{
        return videoArr.map(v => (
            {
                comments: v.comments,
                created_at: v.created_at,
                id: v.id,
                images: v.images.map(x => `${Api_Base}/${x}`),
                popular: v.popular,
                videos: v.videos.map(y => (
                    {
                        video_url: `${Api_Base}/${y.video_url}`,
                        video_bytes: y.video_bytes
                    }
                )),
                video_details: v.video_details,
                video_key: v.video_key,
                video_name: v.video_name,
                short_url: v.short_url,
                updated_at: v.updated_at,
                uploaded_by: v.uploaded_by,
                category: v.category
            }))
    },
    formatSeries: (seriesArr)=>{
        return seriesArr.map(series => (
            {
                comments: series.comments,
                created_at: series.created_at,
                id: series.id,
                images: series.images.map(x => `${Api_Base}/${x}`),
                popular: series.popular,
                series: series.series,
                series_details: series.series_details,
                series_key: series.series_key,
                series_name: series.series_name,
                short_url: series.short_url,
                updated_at: series.updated_at,
                uploaded_by: series.uploaded_by,
            }))
    }
    
}

module.exports = helpers