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
            <hr />
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
            <hr />
          </div>
        </div>
        <div class="d-block border-bottom border-top mb-4 mt-4 text-center">
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
                  />
                </div>
              </router-link>

              <div class="card-body p-2" style="background: #eee">
                <router-link
                  class="h3 mb-0"
                  :to="`/music/${rmusic.short_url}`"
                  style="text-decoration: none; color: inherit"
                >
                  <h3 class="font-weight-200 mb-2" style="color: #561529">
                    (Download MP3) - {{ rmusic.music_name }}
                  </h3>
                </router-link>
                <div class="d-flex justify-content-between">
                  <p class="d-inline L5 mb-0">
                    <i class="mdi mdi-artist"></i>
                    <a
                      :href="`/#/music/${rmusic.short_url}`"
                      class="fs-15 text-muted text-decoration-none"
                    >
                      {{ rmusic.artist }}
                    </a>
                  </p>
                  <p class="d-inline mb-0">
                    <i class="mdi mdi-comment"></i>({{
                      rmusic.comments.length
                    }})
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="border-bottom mt-4"></div>
        <div class="row">
          <div class="col-sm-6">
            <h1 class="mt-5 text-center mb-5">Add Your Comment</h1>
            <div class="col-lg-12 mb-5 mb-sm-2">
              <form>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <textarea
                        class="form-control textarea"
                        placeholder="Comment *"
                        id="comment"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        aria-describedby="name"
                        placeholder="Name *"
                      />
                      <input
                        type="hidden"
                        id="commentKey"
                        value="$data[music_key]"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <button
                        type="button"
                        id="handleSubmit"
                        class="btn btn-lg btn-dark font-weight-bold mt-3"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="post-comment-section">
              <i class="mdi mdi-comment"></i>
              <span class="count text-monospace fs-13"
                >({{ musicObj.comments.length }})</span
              >
              <div class="mt-4"></div>
              <div class="comment-section">
                <div
                  v-for="(comment, i) in musicObj.comments"
                  :key="i"
                  class="comment-box"
                >
                  <div class="d-flex align-items-center">
                    <div class="rotate-img">
                      <img
                        src="/assets/images/avatar.png"
                        alt="banner"
                        class="img-fluid img-rounded mr-3"
                      />
                    </div>
                    <div>
                      <p class="fs-12 mb-1 line-height-xs">
                        {{ comment.updated_at }}
                      </p>
                      <p class="fs-16 font-weight-600 mb-0 line-height-xs">
                        {{ comment.name }}
                      </p>
                    </div>
                  </div>

                  <p class="fs-12 mt-3">{{ comment.comment }}</p>
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
import { Api_Base, api } from "../../config/config.js";
import timeago from "timeago-simple";
import $ from "jquery";
export default {
  name: "ViewMusic",

  data() {
    return {
      musicObj: {
        id: "48",
        music_name: "phyno - cho life",
        music_details: "joj xos xpo noiox onio",
        artist: "john",
        music_key: "d91b59d031172b63f11915d2c73244a8",
        short_url: "phyno_-_cho_life-1129312831",
        popular: "0",
        uploaded_by: "Leccel",
        created_at: "2020-10-16 10:10:10",
        updated_at: "2020-10-16 10:10:10",
        images: ["uploads/images/20201016111010951062254.jpg"],
        comments: [],
      },
      relatedMusicArr: [
        //the incoming Objects should replicate this model
        {
          id: "48",
          music_name: "phyno - cho life",
          music_details: "joj xos xpo noiox onio",
          artist: "john",
          music_key: "d91b59d031172b63f11915d2c73244a8",
          short_url: "phyno_-_cho_life-1129312831",
          popular: "0",
          uploaded_by: "Leccel",
          created_at: "2020-10-16 10:10:10",
          updated_at: "2020-10-16 10:10:10",
          images: ["uploads/images/20201016111010951062254.jpg"],
          comments: [],
        },
      ],
      state: "",
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
  // beforeRouteUpdate(to, from, next) {
  //   this.state = "loading";
  //   this.init();
  //   // next();
  //   // to();
  //   // from()
  //   next();
  // },
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

          //related Music Obj fires when data changes
          api.get(`/api/v1/search/${this.musicObj.artist}`).then((resp) => {
            //filters the current Music Obj from the related Music Array of Objects
            this.relatedMusicArr = resp.data.data[0].data.filter(
              (val) => val.id !== this.musicObj.id
            );
          });
        });
    },
    SharePost(title, details) {
      if (navigator.share) {
        navigator
          .share({
            title: title,
            text: details,
            url: window.location.href,
          })
          .then(() => {
            alert("Thanks for Sharing");
          })
          .catch((err) => alert(`Unexpected Error Occured ${err}`));
      } else {
        alert("Web Share not suprted");
      }
    },
  },
  metaInfo: {
    title: `Leccel::${window.location.href.substr(window.location.href.lastIndexOf("/")+1)}`,
  },
};
</script>