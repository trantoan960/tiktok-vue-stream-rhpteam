<template>
  <div ref="videoRef" class="video" @click="onToogleVideo">
    <top-video />
    <video class="video__element" src="@/assets/demo.mp4" loop></video>
    <div class="video__bottom">
      <info-video />
      <control-video />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import InfoVideo from "./InfoVideo.vue";
import ControlVideo from "./ControlVideo.vue";
import TopVideo from "./TopVideo.vue";

export default {
  name: "App",
  components: {
    InfoVideo,
    ControlVideo,
    TopVideo,
  },
  setup() {
    const videoRef = ref(null);
    const isPlaying = ref(false);

    function reCalVideoSize() {
      videoRef.value.style.height = window.innerHeight + "px";
      videoRef.value.style.width = (window.innerHeight * 9) / 16 + "px";
    }

    function onToogleVideo() {
      const videoElement = videoRef.value.querySelector(".video__element");

      if (isPlaying.value) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      isPlaying.value = !isPlaying.value;
    }

    onMounted(() => {
      reCalVideoSize();
      window.addEventListener("resize", reCalVideoSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", reCalVideoSize);
    });

    return { videoRef, onToogleVideo };
  },
};
</script>
