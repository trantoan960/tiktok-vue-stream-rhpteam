import axios from "axios";
import { ref } from "vue";

const getVideoList = async () => {
  try {
    const result = await axios.get(
      `https://tictoc-api.herokuapp.com/videos?token=${localStorage.getItem(
        "token"
      )}`
    );
    return result.data;
  } catch (err) {
    return [];
  }
};

const likeVideo = async (id, token) => {
  try {
    const result = await axios.post(
      "https://tictoc-api.herokuapp.com/videos/" + id + "/like",
      { token }
    );
    return result.data;
  } catch (err) {
    return [];
  }
};

const videoList = ref([]);

const useVideo = () => {
  // get all video from server

  async function fetchVideos() {
    videoList.value = await getVideoList();
  }

  async function onLikeVideo(id) {
    try {
      await likeVideo(id, localStorage.getItem("token"));
      // edit isLiked this video
      videoList.value = videoList.value.map((video) => {
        if (video._id === id) {
          if (video.isLiked) video.likeCounter -= 1;
          else video.likeCounter += 1;
          video.isLiked = !video.isLiked;
        }
        return video;
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  return {
    videoList,
    fetchVideos,
    onLikeVideo,
  };
};

export default useVideo;
