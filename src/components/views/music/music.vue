<template>
  <div class="container">
    <div class="card card-square">
      <!-- {{ musicObj.music_name }} -->
      <div class="card-header">
        <p 
          class="font-weight-bold" 
          style="text-align: center">
          {{ musicObj.music_name }}
        </p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-12 mb-5 mb-sm-2">
                <carousel-img :images="musicObj.images"/>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <b>Download {{ musicObj.music_name }} MP3</b>
            <hr >
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
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <hr >
            <share
              :phead="musicObj.music_name"
              :pbody="musicObj.music_details"
            />
            <hr >
          </div>
        </div>
        <div class="d-block mb-4 mt-4 text-center">
          <h3>You may also like:</h3>
        </div>
        <div class="row show-music">
          <router-link
            class="col-md-3 grid-margin stretch-card"
            v-for="(rmusic, i) in relatedMusicArr"
            :key="i"
            :to="`/music/${rmusic.short_url}`"
            tag="div"
          >
            <div class="card card-rounded shadow music">
              <router-link
                :to="`/music/${rmusic.short_url}`"
                class="text-decoration-none"
              >
                <div class="card-img-holder">
                  <img
                    :src="rmusic.images[0] | formatSrc"
                    alt=""
                    class="card-img"
                  >
                </div>
              </router-link>

              <div 
                class="card-body p-2" 
                style="background: #eee">
                <router-link
                  class="h3 mb-0"
                  :to="`/music/${rmusic.short_url}`"
                  style="text-decoration: none; color: inherit"
                >
                  <h3 
                    class="font-weight-200 mb-2" 
                    style="color: #561529">
                    (Download MP3) - {{ rmusic.music_name }}
                  </h3>
                </router-link>
                <div class="d-flex justify-content-between">
                  <p class="d-inline L5 mb-0">
                    <i class="mdi mdi-artist"/>
                    <a
                      :href="`/#/music/${rmusic.short_url}`"
                      class="fs-15 text-muted text-decoration-none"
                    >
                      {{ rmusic.artist }}
                    </a>
                  </p>
                  <p class="d-inline mb-0">
                    <i class="mdi mdi-comment"/>({{
                      rmusic.comments.length
                    }})
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="mt-3"/>
        <comment
          :comment-key="musicObj.music_key"
          :comments="musicObj.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Api_Base, api } from "@/config/config.js";
import carouselImg from "@/components/utils/carousel/carouselImage.vue";
import comment from "@/components/utils/comments/comments.vue";
import share from "@/components/utils/share/share.vue";
import timeago from "timeago-simple";
import $ from "jquery";
export default {
  name: "ViewMusic",
  components: {
    comment,
    carouselImg,
    share,
  },
  data() {
    return {
      musicObj: {},
      relatedMusicArr: [],
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        500
      );
    },
  },
  filters: {
    formatSrc(link) {
      return `${Api_Base}/${link}`;
    },
  },
  methods: {
    init() {
      api
        .get(`/api/v1/music/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.musicObj = res.data;
          this.musicObj.comments = this.musicObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));

          //related Music Obj fires when {this.musicObj} is updated

          api.get(`/api/v1/search/${this.musicObj.artist}`).then((resp) => {
            //removes the current music from relatedMusicArray
            this.relatedMusicArr = resp.data.data[0].data.filter(
              (val, i) => val.id !== this.musicObj.id && i < 9
            );
          });
        });
    },
  },
  metaInfo: {
    title: `Leccel::${window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    )}`,
  },
};
</script>