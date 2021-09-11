<template>
  <div ref="videoRef" class="video" @click="onToogleVideo">
    <video class="video__element" :src="video.source" volume="0.3" loop></video>
    <div class="video__bottom">
      <info-video
        :username="video.owner.username"
        :description="video.description"
      />
      <control-video
        :like="video.likeCounter"
        :comment="video.commentCounter"
        :share="video.shareCounter"
        :id="video._id"
        :is-liked="video.isLiked"
      />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import InfoVideo from "./InfoVideo.vue";
import ControlVideo from "./ControlVideo.vue";

export default {
  components: {
    InfoVideo,
    ControlVideo,
  },
  props: {
    video: {
      type: Object,
    },
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
