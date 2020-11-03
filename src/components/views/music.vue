<template>
  <div class="container">
    <div class="card">
      <!-- {{ musicObj.music_name }} -->
      <div class="card-header">
        <p class="font-weight-bold" style="text-align: center">
          {{ musicObj.music_name }}
        </p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-12 mb-5 mb-sm-2">
                <div
                  id="carouselExampleFade"
                  class="carousel slide carousel-fade"
                  data-ride="carousel"
                >
                  <ol class="carousel-indicators">
                    <li
                      v-for="(images, i) in musicObj.images"
                      :key="i"
                      data-target="#carouselExampleIndicators"
                      :data-slide-to="i"
                      :class="i == 0 ? 'active' : ''"
                    ></li>
                  </ol>
                  <div class="carousel-inner">
                    <div
                      v-for="(images, i) in musicObj.images"
                      :key="i"
                      :class="i == 0 ? 'carousel-item active' : 'carousel-item'"
                    >
                      <img
                        class="d-block w-100"
                        :src="images | formatSrc"
                        :alt="`slide ${i}`"
                      />
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
                      aria-hidden="true"
                    ></span>
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
                      aria-hidden="true"
                    ></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <b>Download {{ musicObj.music_name }} MP3</b>
            <hr />
            <p style="line-height: 2.5">{{ musicObj.music_details }}</p>
            <a
              :href="musicObj.audio[0].song_url | formatSrc"
              class="btn btn-primary btn-lg btn-block"
              download
            >
              Download MP3 ({{
                (Number(musicObj.audio[0].song_bytes) / (1024 * 1024)).toFixed(
                  2
                )
              }}mb)
            </a>
          </div>
        </div>
        <div class="row">
          <p class="m-4 d-block">PLAY ONLINE?</p>
          <div class="embed-responsive">
            <audio
              class="d-block"
              :src="musicObj.audio[0].song_url | formatSrc"
              style="
                margin: 5px;
                display: inline;
                border: 1px solid;
                background: #f1f3f4;
                height: 33px;
              "
              controls
            ></audio>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
              <hr>
            <div class="d-flex justify-content-center align-items-center">
                
              <button
                type="button"
                class="btn btn-primary btn-icon-text"
                @click="SharePost(musicObj.music_name, musicObj.music_details)"
              >
                <i class="mdi mdi-share btn-icon-prepend"></i>
                Share
              </button>
              
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api_Base } from "@/config/config.js";
import api from "axios";
export default {
  name: "ViewMusic",
  data() {
    return {
      musicObj: {},
      state: "",
    };
  },
  mounted() {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.state = "loading";
    this.init();
    next();
  },
  filters: {
    formatSrc(link) {
      return `${Api_Base}/${link}`;
    },
  },
  methods: {
    init() {
      api
        .get(`${Api_Base}/api/v1/music/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.musicObj = res.data;
        });
    },
    SharePost(title, details) {
      if (navigator.share) {
        //alert(phead)
        navigator
          .share({
            title: title,
            text: details,
            url: window.location.href,
          })
          .then(() => {
            alert("Thanks for Sharing");
          })
          .catch(alert("WebShare not supported"));
      } else {
        alert("Web Share not suprted");
      }
    },
  },
};
</script>