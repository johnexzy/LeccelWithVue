<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="container-scroller">
      <div class="main-panel">
        <NavBar />
        <div class="content-wrapper">
          <router-view />
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center pad2x">
      <p class="mt-2">
        <a href="/pages/aboutus.html">About Us </a> |
        <a href="/pages/contactus.html">Contact Us</a>
      </p>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from "@/components/layout/Nav.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
    NavBar,
  },
  beforeMount() {
    // this.$store.dispatch("getLatestMusic");
    // this.$store.dispatch("getPopularMusic");
    // this.$store.dispatch("getLatestMovie");
    // this.$store.dispatch("getLatestSeries");
  },
};
</script>
<style scoped>
</style>
