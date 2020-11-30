<template>
  <div
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
  </div>
</template>
<script>
import { Api_Base } from "@/config/config.js"
export default {
  name: "CarouselImg",
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatSrc(link) {
      return `${Api_Base}/${link}`;
    },
  },
};
</script>