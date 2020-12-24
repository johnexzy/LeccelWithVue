<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="container-scroller">
      <div class="main-panel">
        <NavBar />
        <router-view />
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center pad2x">
      <p class="mt-2">
        <router-link :to="{ name: 'about' }">About Us </router-link> |
        <router-link :to="{ name: 'contact' }">Contact Us</router-link> |
        <router-link :to="{ name: 'privacy' }">Privacy Policy</router-link>
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import "@mdi/font/scss/materialdesignicons.scss";
import 'nprogress/nprogress.css';
import '../public/assets/css/style.css';
import NavBar from "@/components/layout/Nav.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
    NavBar,
  },
  beforeMount() {
    this.$store.dispatch("getLatestMusic");
    this.$store.dispatch("getPopularMusic");
    this.$store.dispatch("getLatestMovie");
    this.$store.dispatch("getLatestSeries");
    this.$store.dispatch("getPopularVideo");
    this.$store.dispatch("getPopularSeries");
    this.$store.dispatch("fetchMovie");
  },
  mounted() {
    (function (s, u, z, p) {
      (s.async = true), (s.src = u), s.setAttribute("data-ad-client", z), p.appendChild(s);
    })(
      document.createElement("script"),
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
      "ca-pub-8373811857243589",
      document.head || document.documentElement
    );
    // (function (s, u, z, p) {
    //   (s.src = u), s.setAttribute("data-zone", z), p.appendChild(s);
    // })(
    //   document.createElement("script"),
    //   "https://iclickcdn.com/tag.min.js",
    //   3758037,
    //   document.body || document.documentElement
    // );
  },
};
</script>
