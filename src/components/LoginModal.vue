<template>
  <div id="modal__login" v-if="isActived">
    <div class="modal__form">
      <template v-if="!userLoggedIn">
        <h2>Join our community now?</h2>
        <form @submit.prevent="onSubmit">
          <label for="">
            <p>Username:</p>
            <input
              type="text"
              placeholder="please fill username"
              v-model="username"
            />
          </label>
          <label for="">
            <p>Password:</p>
            <input
              type="password"
              placeholder="please fill password"
              v-model="password"
            />
          </label>
          <button type="submit">Get Started</button>
        </form>
      </template>
      <template v-else>
        <h2>Welcome back! {{ name }}</h2>
        <button type="button" @click="onPlayVideoFromModal">Start watch</button>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import useLogin from "../composables/useLogin";
export default {
  emits: ["onPlayVideo"],
  setup(props, { emit }) {
    const { onLogin } = useLogin();

    const username = ref("");
    const password = ref("");
    const isActived = ref(true);
    const userLoggedIn = ref(localStorage.getItem("token") ? true : false);

    async function onSubmit() {
      const result = await onLogin({
        username: username.value,
        password: password.value,
      });
      if (result) {
        isActived.value = false;
        // emit to play video
        emit("onPlayVideo");
      }
    }

    function onPlayVideoFromModal() {
      isActived.value = false;
      emit("onPlayVideo");
    }

    const name = computed(() =>
      localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "User Tictoc"
    );

    return {
      username,
      password,
      isActived,
      userLoggedIn,
      name,
      onPlayVideoFromModal,
      onSubmit,
    };
  },
};
</script>
