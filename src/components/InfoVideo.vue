<template>
  <section class="video__info">
    <h1 class="video__info--title">@{{ username }}</h1>
    <p class="video__info--desc">
      {{ description }}
    </p>
  </section>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
