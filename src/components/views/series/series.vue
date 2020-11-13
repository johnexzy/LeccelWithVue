<template>
  <div class="container">
    <div class="card card-square">
      <!-- {{ seriesObj.series_name }} -->
      <div class="card-header">
        <p 
          class="font-weight-bold" 
          style="text-align: center">
          {{ seriesObj.series_name }}
        </p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-lg-12 mb-5 mb-sm-2">
                <carousel-img :images="seriesObj.images"/>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <b>Download {{ seriesObj.series_name }}</b>
            <hr >
            <p style="line-height: 2.5">{{ seriesObj.series_details }}</p>
            <hr >
            <router-link
              v-for="(season, i) in seriesObj.series"
              :key="i"
              tag="div"
              :to="`/season/${seriesObj.series_name}/${season.short_url}`"
            >
              <div
                class="d-flex justify-content-start border-bottom py-3 shadow"
                style="cursor: pointer"
              >
                <h4 class="d-inline ml-1 font-weight-bold text-primary">
                  {{ season.season_name }}
                </h4>
              </div>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <hr >
            <share
              :phead="seriesObj.series_name"
              :pbody="seriesObj.series_details"
            />

            <hr >
          </div>
        </div>
        <div class="d-block mb-4 mt-4 text-center">
          <h3>You may also like:</h3>
        </div>
        <div class="row show-series">
          <router-link
            class="col-md-3 grid-margin stretch-card"
            v-for="(rseries, i) in relatedseriesArr"
            :key="i"
            :to="`/series/${rseries.short_url}`"
            tag="div"
          >
            <div class="card card-rounded shadow series">
              <div class="card-img-holder">
                <img 
                  :src="rseries.images[0]" 
                  alt="" 
                  class="card-img" >
              </div>

              <div 
                class="card-body p-2" 
                style="background: #eee">
                <h3 
                  class="font-weight-200 mb-2" 
                  style="color: #561529">
                  (Download) - {{ rseries.series_name }}
                </h3>
              </div>
            </div>
          </router-link>
        </div>
        <div class="mt-3"/>

        <comment
          :comment-key="seriesObj.series_key"
          :comments="seriesObj.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { api, Api_Base } from "@/config/config.js";
import carouselImg from "@/components/utils/carousel/carouselImage.vue";
import comment from "@/components/utils/comments/comments.vue";
import share from "@/components/utils/share/share.vue";
import { formatSeries } from "@/helpers/ArrayFormatter";
import timeago from "timeago-simple";
import $ from "jquery";
export default {
  name: "ViewSeries",
  components: {
    comment,
    carouselImg,
    share,
  },
  data() {
    return {
      seriesObj: {},
      relatedseriesArr: [],
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
        .get(`/api/v1/series/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.seriesObj = res.data;
          this.seriesObj.comments = this.seriesObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));

          //related series Obj fires when {this.seriesObj} is updated
          api
            .get(`/api/v1/search/${this.seriesObj.series_name}`)
            .then((resp) => {
              //removes the current series from relatedseriesArray
              this.state = resp.data;
              this.relatedseriesArr = formatSeries(
                resp.data.data[2].data
              ).filter((val) => val.id !== this.seriesObj.id);
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