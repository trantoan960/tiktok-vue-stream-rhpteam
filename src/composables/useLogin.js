import axios from "axios";
import { ref } from "vue";

const login = async (data) => {
  try {
    const result = await axios.post(
      "https://tictoc-api.herokuapp.com/login",
      data
    );
    if (result.data.token) return result.data.token;
  } catch (err) {
    return false;
  }
};

const useLogin = () => {
  const videoList = ref([]);
  // get all video from server

  async function onLogin({ username, password }) {
    const result = await login({ username, password });
    if (result) {
      // set token to localStorage
      localStorage.setItem("token", result);
      return true;
    } else return false;
  }

  return {
    videoList,
    onLogin,
  };
};

export default useLogin;
