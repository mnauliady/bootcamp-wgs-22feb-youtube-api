import axios from "axios";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: "AIzaSyCfyhuZxuN81t9S9LJx3zJamJ8-PmegOgI",
  },
});
