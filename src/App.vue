<template>
  <top-video />
  <div id="video__inner">
    <video-item />
    <video-item />
    <video-item />
  </div>
  <div style="position: absolute;top: 0; left: 0;">
    <button @click="activeFirstVideo">Click dang nhap</button>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import TopVideo from "./components/TopVideo.vue";
import VideoItem from "./components/VideoItem.vue";

export default {
  name: "App",
  components: {
    TopVideo,
    VideoItem,
  },
  setup() {
    const observerForScroll = ref(null);

    function activeFirstVideo() {
      let targets = document.querySelectorAll("#video__inner .video");
      targets[0].querySelector(".video__element").play();
    }

    onMounted(() => {
      const options = {
        root: document.querySelector("#video__inner"),
        rootMargin: "0px",
        threshold: 1.0,
      };
      observerForScroll.value = new IntersectionObserver(function(entries) {
        if (entries && entries.length > 0) {
          entries[0].target.querySelector(".video__element").play();
        }
      }, options);
      let targets = document.querySelectorAll("#video__inner .video");
      targets.forEach((target) => {
        observerForScroll.value.observe(target);
      });
    });

    return { activeFirstVideo };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
