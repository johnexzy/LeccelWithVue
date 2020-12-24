<template>
  <!-- <div class="content-wrapper"> -->
  <!-- <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          v-for="(i) in images"
          :key="i"
          data-target="#carouselExampleIndicators"
          :data-slide-to="i"
          :class="i == 0 ? 'active' : ''"
        />
      </ol>
      <div class="carousel-inner">
        <div
          v-for="(image, i) in images"
          :key="i"
          :class="i == 0 ? 'carousel-item active' : 'carousel-item'"
        >
          <img
            class="d-block w-100"
            :src="image | formatSrc"
            :alt="`slide ${i}`"
          >
        </div>
      </div>

      <a
        class="carousel-control-prev"
        href="#carouselExampleFade"
        role="button"
        data-slide="prev"
      >
        <span 
          class="carousel-control-prev-icon" 
          aria-hidden="true"/>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleFade"
        role="button"
        data-slide="next"
      >
        <span 
          class="carousel-control-next-icon" 
          aria-hidden="true"/>
        <span class="sr-only">Next</span>
      </a>
    </div> -->
  <!-- <carousel
      :per-page="1"
      :autoplay="true"
      :mouse-drag="true"
      :navigation-enabled="false"
    >
      <slide 
        v-for="(n, i) in news" 
        :key="i">
        <div class="container bg-light">
          <div
            class="jumbotron jumbotron-fluid bg-light position-relative"
          >
            <div class="pl-4 pr-3 tofront">
              <div class="row justify-content-between">
                <div 
                  class="col-md-8 pt-6 pb-6 align-self-center" 
                  style="min-height: 200px">
                  <h1 class="secondfont mb-3 font-weight-bold">
                    {{ n.title }}
                  </h1>
                  <p class="mb-3">
                    {{ n.body }}
                  </p>
                  <router-link 
                    :to="{ name: n.tag, params: { short_url: n.short_url}}" 
                    class="btn btn-dark">View</router-link>
                </div>
                <div
                  class="col-md-4 d-md-block mt-3"
                >
                  <div class="flex justify-content-center align-items-center text-center">
                    <img 
                      :src="n.image" 
                      height="300px" 
                      width="180px" 
                      alt="">
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
    </carousel> -->
  <div class="content-wrapper">
    <div class="container">
      <music-index
        :latest-music="latestMusic"
        :popular-music="popularMusic"
      />
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
  </div>
  <!-- </div> -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import moviesIndex from "@/components/pages/movies/movies.vue";
import musicIndex from "@/components/pages/music/music.vue";
import seriesIndex from "@/components/pages/series/series.vue";
// import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Index",
  components: {
    // Carousel,
    // Slide,
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
    ...mapGetters(["news", "isLoadingNews"])
  },
};
</script>