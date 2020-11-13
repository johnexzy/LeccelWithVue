
<template>
  <div class="container">
    <div class="col-sm-12">
      <div class="card card-square grid-margin">
        <div class="card-header">
          <h3 class="font-weight-600 mb-4 text-center">Searching Made Easy</h3>
        </div>
        <div class="card-body">
          <div 
            class="form-group" 
            data-aos="fade-down">
            <div class="input-group">
              <input
                type="text"
                class="form-control searchInput border-info shadow-inset"
                style="height: 60px; line-height: normal; font-size: large"
                placeholder="Search here"
              >
            </div>
            <div class="mt-3 fs-14">
              Search Music In: &nbsp; &nbsp;
              <div class="mt-2">
                <input 
                  type="checkbox" 
                  name="artist" 
                  id="artist" 
                  checked >
                <label for="artist">Artists</label> &nbsp;&nbsp;
              </div>
              <div>
                <input 
                  type="checkbox" 
                  name="artist" 
                  id="artist" 
                  checked >
                <label for="artist">Music Name</label> &nbsp;&nbsp;
              </div>
            </div>
          </div>
          <div class="border-bottom shadow"/>
          <div class="d-flex justify-content-center align-content-center mt-2">
            <button
              class="btn btn-lg btn-info btn-icon-text searchButton text-center shadow"
              type="button"
            >
              <i class="mdi mdi-search-web"/>
            </button>
          </div>
        </div>
      </div>
      <div 
        class="row" 
        data-aos="fade-up">
        <div class="col-sm-12 grid-margin">
          <div class="card card-square">
            <div class="card-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="font-weight-600 mb-4 text-center">
                    Trending Music 💹💹
                  </h3>
                </div>
              </div>
            </div>
            <div class="card-body show-popular">
              <router-link
                v-for="(pmusic, i) in popularMusic"
                :key="i"
                class="h3 font-weight-200 mb-1"
                :to="`/music/${pmusic.short_url}`"
                style="text-decoration: none; color: inherit"
              >
                <div
                  class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
                  style="cursor: pointer"
                >
                  <h4 class="d-inline font-weight-200 mb-0">
                    <img
                      :src="pmusic.images[0]"
                      style="width: 60px; height: 60px"
                      alt=""
                      class="card-img d-inline"
                    >
                  </h4>
                  <h4 class="d-inline ml-1 font-weight-bold text-primary">
                    {{ pmusic.music_name }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div 
        class="row" 
        data-aos="fade-up">
        <div class="col-sm-12 grid-margin">
          <div class="card card-square">
            <div class="card-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="font-weight-600 mb-4 text-center">All Music</h3>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="row show-music">
                    <div 
                      v-show="loading" 
                      class="album-loader">
                      <div class="d-flex justify-content-center">
                        <img 
                          src="/assets/images/loader.gif" 
                          alt="" >
                      </div>
                    </div>
                    <router-link
                      v-for="(music, i) in musicArr"
                      :key="i"
                      :to="`/music/${music.short_url}`"
                      tag="div"
                      class="col-md-4 grid-margin stretch-card"
                    >
                      <div class="card card-rounded shadow music">
                        
                        <div class="card-img-holder">
                          <img
                            :src="music.images[0]"
                            alt=""
                            class="card-img"
                          >
                        </div>

                        <div 
                          class="card-body p-2" 
                          style="background: #eee">
                          
                          <h3
                            class="font-weight-200 mb-2"
                            style="color: #561529"
                          >
                            (Download MP3) - {{ music.music_name }}
                          </h3>
                          <div class="d-flex justify-content-between">
                            <p class="d-inline L5 mb-0">
                              <i class="mdi mdi-artist"/>
                              <a
                                href="/view/search/${music.artist}"
                                target="_blank"
                                class="fs-15 text-muted text-decoration-none"
                              >
                                {{ music.artist }}
                              </a>
                            </p>
                            <p class="d-inline mb-0">
                              <i class="mdi mdi-comment"/>({{
                                music.comments.length
                              }})
                            </p>
                          </div>
                        </div>
                      </div>

                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <nav
              class="nav d-flex align-items-center justify-content-center"
              aria-label="Album-pager"
            >
              <ul class="pagination">
                <li 
                  class="page-item prev" 
                  @click="makeReq('- 1')">
                  <input 
                    id="pagelink" 
                    value="" 
                    type="hidden" >
                  <a class="page-link">
                    <i class="mdi mdi-arrow-left-bold"/>
                  </a>
                </li>

                <li 
                  class="page-item next" 
                  @click="makeReq('+ 1')">
                  <input 
                    id="pagelink" 
                    value="" 
                    type="hidden" >
                  <a class="page-link">
                    <i class="mdi mdi-arrow-right-bold"/>
                  </a>
                </li>
              </ul>
            </nav>
            <div class="d-flex align-items-center justify-content-center pad2x">
              <p class="pager">Page {{ current_page }} of {{ total_pages }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { api } from "@/config/config";
import { formatMusic } from "@/helpers/ArrayFormatter";
export default {
  name: "Allmusic",
  data() {
    return {
      loading: true,
      musicArr: [],
      current_page: 0,
      total_pages: 1,
      isLastPage: false,
    };
  },
  computed: {
    ...mapState(["popularMusic"]),
  },
  methods: {
    makeReq(param) {
      if (this.isLastPage && param == "+ 1") return;
      this.loading === true;
      api
        .get(`/api/v1/music/pages/${eval(`${this.current_page}${param}`)}`)
        .then((res) => {
          this.musicArr = formatMusic(res.data.data);
          this.total_pages = res.data.meta.total_pages;
          this.current_page = res.data.meta.current_page;
          this.isLastPage =
            this.current_page === this.total_pages ? true : false;
          this.loading = false;
        });
    },
  },
  beforeMount() {
    this.$store.dispatch("getPopularMusic");
    this.makeReq("+ 1");
  },
};
</script>