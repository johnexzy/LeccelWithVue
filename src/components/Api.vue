/* eslint-disable vue/valid-template-root */
<template>
    <div class="container-scroller">
        <div class="main-panel">
        <!-- partial:partials/_navbar.html -->
        

        <!-- partial -->
        <!-- NavBar -->
        <div class="flash-news-banner" style="background:#ffffff; margin-top:-5px">
            <div class="d-flex justify-content-between mt-2">
                
                <router-link to="/">
                    <img src="/assets/images/LECCEL3.png" alt="">
                </router-link>
                <div class="form-group" data-aos="fade-down">
                    <div class="input-group">
                        <input type="text" class="form-control searchInput border-info shadow" style="border-radius:20px; height:40px; " placeholder="Search here">
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-info btn-icon-text searchButton text-center" style="border-radius:0 20px 20px 0; margin-left:-20px; z-index:1000; max-width:10%" type="button">
                            <i class="mdi mdi-search-web"></i> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-block text-center border-top menu-bottom">
                <div class="d-flex justify-content-center" >
                    <ul class="d-flex flex-flow" style="margin-left:-30px">
                        <li class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow" style="width:62px; height:62px;">
                            <router-link to="/" class="text-decoration-none">

                                <i class=" d-block mdi mdi-24px mdi-home"></i>
                                <p class="font-weight-bold text-uppercase">Home</p>
                            </router-link>
                        </li>
                        <li class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow" style="width:62px; height:62px;">
                            <a href="#/" class="text-decoration-none">
                                <i class=" d-block mdi mdi-24px mdi-music-note"></i>
                                <p class="font-weight-bold text-uppercase">Music</p>
                            </a>
                        </li>
                        <li class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow" style="width:62px; height:62px;">
                            <a href="/pages/movies.html" class="text-decoration-none">
                                <i class=" d-block mdi mdi-24px mdi-video"></i>
                                <p class="font-weight-bold text-uppercase">Movies</p>
                            </a>
                        </li>
                        <li class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow" style="width:62px; height:62px;">
                            <a href="/pages/series.html" class="text-decoration-none">
                                <i class=" d-block mdi mdi-24px mdi-movie"></i>
                                <p class="font-weight-bold text-uppercase">Series</p>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        <!-- NavBar Ends -->
        </div>
    </div>
    <!-- <div>
        <div class="row" v-for="(music, index) in musicList" :key="index">
            <div class="d-block ">
                <p class="my-3 border-bottom">{{music.music_name}}</p>
            </div>
        </div>
    </div> -->
</template>
<script>
export default {
    name: 'Api',
    data(){
        return{
            musicList: []
        }
    },
    created(){
        fetch("http://127.0.0.1:8090/api/v1/music/limit/20")
            .then((res) => res.json())
                .then((music) => {
                    this.musicList = music;
                })
    }
}
</script>