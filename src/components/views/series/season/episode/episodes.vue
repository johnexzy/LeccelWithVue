
<template>
  <div class="container">
    <div class="card card-square">
      <!-- {{ episodeObj.video_name }} -->
      <div class="card-header">
        <p 
          class="font-weight-bold" 
          style="text-align: center">
          {{ episodeObj.series_name }}: Episode {{ episodeObj.ep_name.charAt(3) }}
        </p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-12 mb-5 mb-sm-2">
                <carousel-img :images="episodeObj.images"/>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <b>Download Episode {{ episodeObj.ep_name.charAt(3) }}</b>
            <hr >
            <p style="line-height: 2.5">{{ episodeObj.ep_details }}</p>
            <hr >
            <a
              :href="episodeObj.videos[0].video_url | formatSrc"
              class="btn btn-primary btn-lg btn-block"
              download
            >
              Download MP4 ({{
                (
                  Number(episodeObj.videos[0].video_bytes) /
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
              :phead="episodeObj.ep_name" 
              :pbody="episodeObj.ep_details"/>
            <hr >
          </div>
        </div>
        <div class="mt-3"/>

        <comment
          :comment-key="episodeObj.video_key"
          :comments="episodeObj.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { api, Api_Base } from "@/config/config.js";
import { formatVideos } from "@/helpers/ArrayFormatter";
import carouselImg from "@/components/utils/carousel/carouselImage.vue";
import comment from "@/components/utils/comments/comments.vue";
import share from "@/components/utils/share/share.vue";
// eslint-disable-next-line no-unused-vars

import timeago from "timeago-simple";
import $ from "jquery";
export default {
  name: "ViewEpisodes",
  components: {
    comment,
    carouselImg,
    share
  },
  data() {
    return {
      episodeObj: {},
      state: {},
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
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        500
      );
    },
  },
  methods: {
    init() {
      api
        .get(
          `/api/v1/episode/${this.$route.params.series_name}/${this.$route.params.episode_short_url}`
        )
        .then((res) => {
          this.episodeObj = res.data;
          this.episodeObj.comments = this.episodeObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));
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