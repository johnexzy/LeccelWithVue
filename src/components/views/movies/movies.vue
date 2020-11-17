
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
      <!-- {{ videoObj.video_name }} -->
      <div 
        class="card-header">
        <p 
          class="font-weight-bold" 
          style="text-align: center">
          {{ videoObj.video_name }}
        </p>
      </div>
      <div class="card-body">
      
        
        
        <div 
          class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-12 mb-5 mb-sm-2">
                <carousel-img :images="videoObj.images"/>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <b>Download {{ videoObj.video_name }}</b>
            <hr >
            <p style="line-height: 2.5">{{ videoObj.video_details }}</p>
            <hr >
            <a
              v-for="(f, i) in videoObj.videos"
              :key="i"
              :href="f.video_url | formatSrc"
              class="btn btn-primary btn-lg btn-block"
              download
            >
              Download MP4 ({{
                (
                  Number(f.video_bytes) /
                  (1024 * 1024)
                ).toFixed(2)
              }}mb)
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <hr >
            <share
              :phead="videoObj.video_name"
              :pbody="videoObj.video_details"
            />
            <hr >
          </div>
        </div>
        <div class="d-block mb-4 mt-4 text-center">
          <h3>You may also like:</h3>
        </div>
        <div class="row show-video">
          <router-link
            class="col-md-3 grid-margin stretch-card"
            v-for="(rvideo, i) in relatedvideoArr"
            :key="i"
            :to="`/video/${rvideo.short_url}`"
            tag="div"
          >
            <div class="card card-rounded shadow video">
              <router-link
                :to="`/video/${rvideo.short_url}`"
                class="text-decoration-none"
              >
                <div class="card-img-holder">
                  <img
                    :src="rvideo.images[0] | formatSrc"
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
                  :to="`/video/${rvideo.short_url}`"
                  style="text-decoration: none; color: inherit"
                >
                  <h3 
                    class="font-weight-200 mb-2" 
                    style="color: #561529">
                    (Download MP4) - {{ rvideo.video_name }}
                  </h3>
                </router-link>
              </div>
            </div>
          </router-link>
        </div>
        <div class="mt-3"/>

        <comment
          :comment-key="videoObj.video_key"
          :comments="videoObj.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { api, Api_Base } from "@/config/config.js";
import { formatVideos } from "@/helpers/ArrayFormatter";

import timeago from "timeago-simple";
// ;
export default {
  name: "ViewVideo",

  data() {
    return {
      videoObj: {},
      relatedvideoArr: [],
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
        .get(`/api/v1/videos/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.videoObj = res.data;
          this.videoObj.comments = this.videoObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));

          //related video Obj fires when {this.videoObj} is updated
          api.get(`/api/v1/search/${this.videoObj.video_name}`).then((resp) => {
            //removes the current video from relatedvideoArray
            this.relatedvideoArr = resp.data.data[1].data.filter(
              (val, i) => val.id !== this.videoObj.id && i < 8
            );
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