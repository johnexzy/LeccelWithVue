<template>
  <div class="row">
    <div class="col-sm-6">
      <div class="post-comment-section">
        <i class="mdi mdi-comment"/>
        <span 
          class="count text-monospace fs-13"
        >({{ comments.length }})</span
        >
        <div class="mt-4"/>
        <div class="comment-section">
          <div
            v-for="(comment, i) in comments"
            :key="i"
            class="comment-box"
          >
            <div class="d-flex align-items-center">
              <div class="rotate-img">
                <img
                  src="/assets/images/avatar.png"
                  alt="banner"
                  class="img-fluid img-rounded mr-3"
                >
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
    <div class="col-sm-6">
      <h1 class="text-center my-3">Add Your Comment</h1>
      <div class="col-lg-12 mb-5 mb-sm-2">
        <ValidationObserver v-slot="{ passes }">
          <form @submit.prevent="passes(addComment)">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="comment"
                    rules="required"
                  >
                    <textarea
                      v-model="comment"
                      class="form-control textarea"
                      placeholder="Comment *"
                    />

                    <div
                      v-for="(datum, i) in errors"
                      :key="i"
                      class="alert"
                    >
                      <i>{{ datum }}</i>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    aria-describedby="name"
                    placeholder="Name *"
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn btn-lg btn-dark font-weight-bold mt-3"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { api } from "@/config/config.js";
import timeago from 'timeago-simple';
extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  name: "Comment",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    commentKey: {
      required: true,
      default: "",
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    comments:{
        type: Array,
        default: () => []
    }
  },
  data() {
    return {
      comment: "",
      name: "",
      commentResp: undefined,
      comlen: 0
    };
  },
  mounted(){
    this.comlen = this.comments.length
  },
  methods: {
    addComment() {
      api
        .get(
          `/api/v1/comment?name=${this.name}&comment=${this.comment}&comment_key=${this.commentKey}`
        )
        .then((resp) => (this.comments = resp.data.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }))));
      
      this.comment = ""
    }
  },
};
</script>