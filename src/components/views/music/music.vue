<template>
  <div class="container">
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
      class="card card-square">
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
              v-for="(f, i) in musicObj.audio"
              :key="i"
              :href="f.song_url | formatSrc"
              class="btn btn-primary btn-lg btn-block"
              download
            >
              Download MP3 ({{
                (Number(f.song_bytes) / (1024 * 1024)).toFixed(
                  2
                )
              }}mb)
            </a>
          </div>
        </div>
        <!-- <div class="row">
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
        </div> -->
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
        <div 
          v-if="rmusicCount > 0" 
          class="d-block mb-4 mt-4 text-center">
          <h3>You may also like:</h3>
        </div>
        <div class="row show-music">
          <router-link
            class="col-md-3 grid-margin stretch-card"
            v-for="(rmusic, i) in relatedmusicArr"
            :key="i"
            :to="`/music/${rmusic.short_url}`"
            tag="div"
          >
            <div class="card card-rounded shadow music">
              <div class="card-img-holder">
                <img 
                  :src="rmusic.images[0]" 
                  alt="" 
                  class="card-img" >
              </div>

              <div 
                class="card-body p-2" 
                style="background: #eee">
                <h3 
                  class="font-weight-200 mb-2" 
                  style="color: #561529">
                  (Download) - {{ rmusic.music_name }}
                </h3>
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
import { api, Api_Base } from "@/config/config.js";
import { formatMusic } from "@/helpers/ArrayFormatter";
import timeago from "timeago-simple";
export default {
  name: "ViewMusic",
  data() {
    return {
      musicObj: {},
      relatedmusicArr: [],
      rmusicCount: 0,
      state: false,
    };
  },
  mounted() {
    this.init();
  },
  filters: {
    formatSrc(link) {
      return `${Api_Base}/${link}`;
    },
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    init() {
      this.state = false
      api
        .get(`/api/v1/music/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.musicObj = res.data;
          this.musicObj.comments = this.musicObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));

          //related music Obj fires when {this.musicObj} is updated
          api
            .get(`/api/v1/search/${this.musicObj.artist}`)
            .then((resp) => {
              //removes the current music from relatedmusicArray
              this.relatedmusicArr = formatMusic(
                resp.data.data[0].data
              ).filter((val, i) => val.id !== this.musicObj.id && i < 8);
              this.rmusicCount = this.relatedmusicArr.length
            });
            this.state = true
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