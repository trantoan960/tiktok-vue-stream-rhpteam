<template>
  <nav class="video__control">
    <ul>
      <li>
        <button class="video__control--btn" @click="onLike">
          <heart-icon size="40" :style="{ color: isLiked ? 'red' : 'white' }" />
          <span>{{ like }}</span>
        </button>
      </li>
      <li>
        <button class="video__control--btn">
          <chat-icon size="40" />
          <span>{{ comment }}</span>
        </button>
      </li>
      <li>
        <button class="video__control--btn">
          <share-icon size="40" />
          <span>{{ share }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ChatIcon, HeartIcon, ShareIcon } from "@vue-hero-icons/solid";
import useVideo from "../composables/useVideo";
export default {
  components: {
    ChatIcon,
    HeartIcon,
    ShareIcon,
  },
  props: {
    like: {
      type: Number,
      required: true,
    },
    comment: {
      type: Number,
      required: true,
    },
    share: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    isLiked: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const { onLikeVideo } = useVideo();

    async function onLike() {
      if (localStorage.getItem("token")) await onLikeVideo(props.id);
    }

    return { onLike };
  },
};
</script>
