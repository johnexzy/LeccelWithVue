<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 grid-margin stretch-card">
        <div class="card shadow-lg" style="border-radius: 0">
          <div class="card-header font-weight-bold">
            <i class="mdi mdi-trending-up"></i> Trending Music
          </div>
          <div class="card-body">
            <a
              v-for="(pmusic, i) in popularMusic"
              :key="i"
              class="h3 font-weight-200 mb-1"
              href="/view/music/$short_url"
              style="text-decoration: none; color: inherit"
            >
              <div
                class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
                style="cursor: pointer"
              >
                <i class="mdi mdi-star-circle text-danger"></i>
                <h4 class="d-inline font-weight-200 mb-0">
                  <img
                    :src="pmusic.images[0] | formatSrc"
                    style="width: 60px; height: 60px"
                    alt=""
                    class="card-img d-inline"
                  />
                </h4>
                <p class="d-inline ml-1 font-weight-bold text-primary">
                  {{ pmusic.music_name }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="col-lg-8 grid-margin" data-aos="fade-down">
        <div class="card card-square">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div class="card-title">Download Latest Music</div>
              <a
                class="mb-2 btn btn-outline-light btn-primary btn-info"
                style="font-size: 16px"
                href="pages/music.html"
              >
                Go to Music <b class="mdi">&RightArrow;</b>
              </a>
            </div>
          </div>
          <div class="card-body">
            <router-link
              v-for="(lmusic, i) in latestMusic"
              :key="i"
              class="h3 font-weight-200 mb-1"
              :to="`/music/${lmusic.short_url}`"
              style="text-decoration: none; color: inherit"
            >
              <div
                class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
                style="cursor: pointer"
              >
                <h4 class="d-inline font-weight-200 mb-0">
                  <img
                    :src="lmusic.images[0] | formatSrc"
                    style="width: 60px; height: 60px"
                    alt=""
                    class="card-img d-inline"
                  />
                </h4>
                <h4 class="d-inline ml-1 font-weight-bold text-primary">
                  Download (MP3) - {{ lmusic.music_name }}
                </h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row" data-aos="fade-right">
      <div class="col-sm-12 grid-margin">
        <div class="card card-square">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <p style="font-size: 17px; font-weight: bold">Movies</p>

              <a
                class="mb-2 btn btn-outline-light btn-primary btn-info"
                style="font-size: 16px"
                href="pages/movies.html"
              >
                Go to Movies <b class="mdi">&RightArrow;</b>
              </a>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-8">
                <div class="row">
                  <!-- <?=$firstmovie?> -->
                  <div
                    v-for="(lmovie, i) in firstMoviesLayout"
                    :key="i"
                    class="col-sm-6 grid-margin"
                  >
                    <div class="position-relative">
                      <a
                        href="/view/movies/$short_url"
                        style="text-decoration: none; color: inherit"
                      >
                        <div class="rotate-img">
                          <img
                            :src="lmovie.images[0] | formatSrc"
                            alt="thumb"
                            style="border-radius: 10px"
                            class="img-fluid"
                          />
                        </div>
                      </a>
                      <div class="badge-positioned w-90">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <span class="badge badge-danger font-weight-bold">{{
                            lmovie.category
                          }}</span>
                          <div class="video-icon">
                            <a
                              href="/view/movies/$short_url"
                              style="text-decoration: none; color: inherit"
                              ><i class="mdi mdi-play"></i
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end-firstMovie -->
                </div>
                <div class="row">
                  <!-- <?=$secondMovie?> -->
                  <div
                    v-for="(lmovie, i) in secondMoviesLayout"
                    :key="i"
                    class="col-sm-6 grid-margin"
                  >
                    <div class="position-relative">
                      <a
                        href="/view/movies/$short_url"
                        style="text-decoration: none; color: inherit"
                      >
                        <div class="rotate-img">
                          <img
                            :src="lmovie.images[0] | formatSrc"
                            alt="thumb"
                            style="border-radius: 10px"
                            class="img-fluid"
                          />
                        </div>
                      </a>
                      <div class="badge-positioned w-90">
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <span class="badge badge-danger font-weight-bold">{{
                            lmovie.category
                          }}</span>
                          <div class="video-icon">
                            <a
                              href="/view/movies/$short_url"
                              style="text-decoration: none; color: inherit"
                              ><i class="mdi mdi-play"></i
                            ></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="card-title">More Videos</div>
                  <a
                    class="mb-2 btn btn-outline-light btn-primary btn-info"
                    href="pages/movies.html"
                  >
                    See All Movies
                  </a>
                </div>
                <!-- All Movie -->
                <a
                  v-for="(lmovie, i) in otherMovies"
                  :key="i"
                  class="h3 font-weight-200 mb-1"
                  href="/view/music/$short_url"
                  style="text-decoration: none; color: inherit"
                >
                  <div
                    class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
                    style="cursor: pointer"
                  >
                    <h4 class="d-inline font-weight-200 mb-0">
                      <img
                        :src="lmovie.images[0] | formatSrc"
                        style="width: 60px; height: 60px"
                        alt=""
                        class="card-img d-inline"
                      />
                    </h4>
                    <h4 class="d-inline ml-1 font-weight-bold text-primary">
                      {{ lmovie.video_name }}
                    </h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" data-aos="fade-up">
      <div class="col-sm-12 grid-margin">
        <div class="card card-square">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-12">
                <h3 class="font-weight-600 mb-4 text-center">TV Series</h3>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-xl-12">
                <div class="row show-music">
                  <div 
                    v-for="(lseries, i) in latestSeries" 
                    :key="i" 
                    class="col-md-4 grid-margin stretch-card"
                  >
                    <div class="card card-rounded shadow music">
                      <a
                        href="/view/music/${music.short_url}"
                        class="text-decoration-none"
                      >
                        <div class="card-img-holder">
                          <img
                            :src="lseries.images[0] | formatSrc"
                            alt=""
                            class="card-img"
                          />
                        </div>
                      </a>

                      <div class="card-body p-2" style="background: #eee">
                        <a
                          class="h3 mb-0"
                          href="/view/movies/${music.short_url}"
                          style="text-decoration: none; color: inherit"
                        >
                          <h3
                            class="font-weight-200 mb-2"
                            style="color: #561529"
                          >
                            (Download) - {{lseries.series_name}}
                          </h3>
                        </a>
                        <!-- <div class="d-flex justify-content-between">
                          <p class="d-inline L5 mb-0">
                            <i class="mdi mdi-artist"></i>
                            <a
                              href="/view/search/${music.artist}"
                              target="_blank"
                              class="fs-15 text-muted text-decoration-none"
                            >
                              ${music.artist}
                            </a>
                          </p>
                          <p class="d-inline mb-0">
                            <i class="mdi mdi-comment"></i
                            >(${music.comments.length})
                          </p>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Api_Base } from "@/config/config.js";
export default {
  name: "index",
  beforeMount() {
    this.$store.dispatch("getLatestMusic");
    this.$store.dispatch("getPopularMusic");
    this.$store.dispatch("getLatestMovie");
    this.$store.dispatch("getLatestSeries");
  },
  computed: {
    ...mapState(["latestMusic", "latestMovies", "latestSeries", "popularMusic"]),

    firstMoviesLayout() {
      return this.latestMovies.slice(0, 2) || this.latestMovies;
    },

    secondMoviesLayout() {
      return this.latestMovies.slice(2, 4) || [];
    },

    otherMovies() {
      return this.latestMovies.slice(4) || [];
    },
  },
  filters: {
    formatSrc(link) {
      return `${Api_Base}/${link}`;
    },
  },
};
</script>