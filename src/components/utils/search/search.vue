<template>
  <div class="container">
    <div class="col-sm-12">
      <div class="mb-3 text-light">
        <a 
          href="/" 
          class="mb-1 font-weight-bold pad2x text-decoration-none text-light">Home</a> &RightArrow; 
        <a 
          href="#" 
          class="mb-1 font-weight-bold pad2x text-decoration-none text-light">Search Result for ({{ query }}) </a>
      </div>
    </div>
    <div 
      v-show="!state">
      <div class="d-flex justify-content-center">
        <img 
          src="/assets/images/loader.gif" 
          alt="" >
      </div>
    </div>
    <div
      v-show="state" 
      class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card card-square">
          <div class="card-body dashboard-tabs p-0">
            <ul 
              class="nav nav-tabs" 
              role="tablist">
              <li class="nav-item">
                <a
                  :class="`nav-link ${checkGroup('music') ? 'active' : ''}`"
                  id="overview-tab"
                  data-toggle="tab"
                  href="#music"
                  role="tab"
                  aria-controls="music"
                  :aria-selected="checkGroup('music')"
                >🎧
                  <sup 
                    style="color: #cc0303; font-weight: bolder"
                  >({{ musicSearch.length }})</sup
                ></a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="`nav-link ${checkGroup('movies') ? 'active' : ''}`"
                  id="sales-tab"
                  data-toggle="tab"
                  href="#movies"
                  role="tab"
                  aria-controls="movies"
                  :aria-selected="checkGroup('movies')"
                >🎬
                  <sup 
                    style="color: #cc0303; font-weight: bolder"
                  >({{ videoSearch.length }})</sup
                ></a
                >
              </li>
              <li class="nav-item">
                <a
                  :class="`nav-link ${checkGroup('series') ? 'active' : ''}`"
                  id="purchases-tab"
                  data-toggle="tab"
                  href="#series"
                  role="tab"
                  aria-controls="series"
                  :aria-selected="checkGroup('series')"
                >📺
                  <sup 
                    style="color: #cc0303; font-weight: bolder"
                  >({{ seriesSearch.length }})</sup
                ></a
                >
              </li>
            </ul>
            <div class="tab-content py-3 px-5">
              <div
                :class="`tab-pane fade show ${checkGroup('music') ? 'active' : ''}`"
                id="music"
                role="tabpanel"
                aria-labelledby="music-tab"
              >
                <div 
                  class="row" 
                  v-for="(m, i) in musicSearch" 
                  :key="i">
                  <div class="col-sm-4 grid-margin">
                    <router-link
                      :to="{
                        name: 'Music',
                        params: { short_url: m.short_url },
                      }"
                      style="text-decoration: none; color: inherit"
                    >
                      <div class="rotate-img">
                        <img
                          :src="m.images[0] | formatSrc"
                          alt="banner"
                          class="img-fluid"
                        >
                      </div>
                    </router-link>
                  </div>
                  <div class="col-sm-8 grid-margin">
                    <h2 class="font-weight-600 mb-2">
                      <router-link
                        :to="{
                          name: 'Music',
                          params: { short_url: m.short_url },
                        }"
                        style="text-decoration: none; color: inherit"
                      >
                        {{ m.music_name }}
                      </router-link>
                    </h2>

                    <p class="L5 mb-0">
                      <i class="mdi mdi-artist" />
                      <span class="fs-16 mr-2 text-muted">{{ m.artist }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                :class="`tab-pane fade show ${checkGroup('movies') ? 'active' : ''}`"
                id="movies"
                role="tabpanel"
                aria-labelledby="movies-tab"
              >
                <div 
                  class="row" 
                  v-for="(v, i) in videoSearch" 
                  :key="i">
                  <div class="col-sm-4 grid-margin">
                    <router-link
                      :to="{
                        name: 'Movie',
                        params: { short_url: v.short_url },
                      }"
                      style="text-decoration: none; color: inherit"
                    >
                      <div class="rotate-img">
                        <img
                          :src="v.images[0] | formatSrc"
                          alt="banner"
                          class="img-fluid"
                        >
                      </div>
                    </router-link>
                  </div>
                  <div class="col-sm-8 grid-margin">
                    <h2 class="font-weight-600 mb-2">
                      <router-link
                        :to="{
                          name: 'Movie',
                          params: { short_url: v.short_url },
                        }"
                        style="text-decoration: none; color: inherit"
                      >
                        {{ v.video_name }}
                      </router-link>
                    </h2>

                    <p class="L5 mb-0">
                      <i class="mdi mdi-artist" />
                      <span 
                        class="fs-16 mr-2 text-muted"
                      >{{ v.category }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div
                :class="`tab-pane fade show ${checkGroup('series') ? 'active' : ''}`"
                id="series"
                role="tabpanel"
                aria-labelledby="series-tab"
              >
                <div 
                  class="row" 
                  v-for="(s, i) in seriesSearch" 
                  :key="i">
                  <div class="col-sm-4 grid-margin">
                    <router-link
                      :to="{
                        name: 'Series',
                        params: { short_url: s.short_url },
                      }"
                      style="text-decoration: none; color: inherit"
                    >
                      <div class="rotate-img">
                        <img
                          :src="s.images[0] | formatSrc"
                          alt="banner"
                          class="img-fluid"
                        >
                      </div>
                    </router-link>
                  </div>
                  <div class="col-sm-8 grid-margin">
                    <h2 class="font-weight-600 mb-2">
                      <router-link
                        :to="{
                          name: 'Series',
                          params: { short_url: s.short_url },
                        }"
                        style="text-decoration: none; color: inherit"
                      >
                        {{ s.series_name }}
                      </router-link>
                    </h2>
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
import { Api_Base, api } from "@/config/config.js";
// import timeago from "timeago-simple";

export default {
  name: "Search",
  data() {
    return {
      group: this.$route.params.group,
      query: this.$route.params.query,
      search: [],
      state: false
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
      this.query = this.$route.params.query
    },
  },
  methods: {
    init() {
      this.state = false
      api.get(`/api/v1/search/${this.$route.params.query}`).then((res) => {
        // this.search = res.data.data.filter((s) => s.group === this.group);
        this.search = res.data.data;
        this.state = true
      });
    },
    /**
     * @param {string} group
     */
    checkGroup(group){
        return (this.group == group)
    }
  },
  computed: {
    seriesSearch() {
      return this.search
        .filter((s) => s.group === "series")
        .map((x) => x.data)[0];
    },
    musicSearch() {
      return this.search
        .filter((s) => s.group === "music")
        .map((x) => x.data)[0];
    },
    videoSearch() {
      return this.search
        .filter((s) => s.group === "movies")
        .map((x) => x.data)[0];
    },
  },
  filters: {
    formatSrc(link) {
      return `${Api_Base}/${link}`;
    },
  },
};
</script>