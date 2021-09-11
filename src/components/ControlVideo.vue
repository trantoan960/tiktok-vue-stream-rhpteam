<template>
  <nav class="video__control">
    <ul>
      <li>
        <button class="video__control--btn">
          <heart-icon size="40" />
          <span>200k</span>
        </button>
      </li>
      <li>
        <button class="video__control--btn">
          <chat-icon size="40" />
          <span>200k</span>
        </button>
      </li>
      <li>
        <button class="video__control--btn">
          <share-icon size="40" />
          <span>200k</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ChatIcon, HeartIcon, ShareIcon } from "@vue-hero-icons/solid";
export default {
  components: {
    ChatIcon,
    HeartIcon,
    ShareIcon,
  },
  setup() {},
};
</script>
