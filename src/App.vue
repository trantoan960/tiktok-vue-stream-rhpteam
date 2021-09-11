<template>
  <top-video />
  <div id="video__inner">
    <video-item
      v-for="(video, index) in videoList"
      :key="index"
      :video="video"
    />
  </div>
  <login-modal @onPlayVideo="activeFirstVideo" />
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import LoginModal from "./components/LoginModal.vue";
import TopVideo from "./components/TopVideo.vue";
import VideoItem from "./components/VideoItem.vue";

// import other logic from outside
import useVideo from "./composables/useVideo";

export default {
  name: "App",
  components: {
    LoginModal,
    TopVideo,
    VideoItem,
  },
  setup() {
    const observerForScroll = ref(null);
    const { videoList, fetchVideos } = useVideo();

    fetchVideos();

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
      let currentVideoElement = null;
      observerForScroll.value = new IntersectionObserver(function(entries) {
        if (entries && entries.length === 1 && entries[0].isIntersecting) {
          if (currentVideoElement) {
            currentVideoElement.pause();
            currentVideoElement.currentTime = 0;
          }
          // console.log(entries[0]);
          currentVideoElement = entries[0].target.querySelector(
            ".video__element"
          );
          entries[0].target.querySelector(".video__element").play();
        }
      }, options);
      let targets = document.querySelectorAll("#video__inner .video");
      targets.forEach((target) => {
        observerForScroll.value.observe(target);
      });
    });

    return { activeFirstVideo, videoList };
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
