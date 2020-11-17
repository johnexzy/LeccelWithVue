<template>
  <div class="container">
    <music-index 
      :latest-music="latestMusic" 
      :popular-music="popularMusic" />
    <div 
      class="row" 
      data-aos="fade-right">
      <movies-index :latest-movies="latestMovies" />
    </div>
    <div 
      class="row" 
      data-aos="fade-up">
      <series-index :latest-series="latestSeries" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moviesIndex from "@/components/pages/movies/movies.vue";
import musicIndex from "@/components/pages/music/music.vue";
import seriesIndex from "@/components/pages/series/series.vue";

export default {
  name: "Index",
  components: {
    moviesIndex,
    musicIndex,
    seriesIndex,
  },

  computed: {
    ...mapState([
      "latestMusic",
      "latestMovies",
      "latestSeries",
      "popularMusic",
    ]),
  },
};
</script>