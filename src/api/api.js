import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  try {
    return await axios.get(`${url}/posts`);
  } catch (error) {
    console.log("something error");
  }
};

export const fetchPost = async (id) => {
  let changableUrl = url;

  if (id) {
    changableUrl = `${url}/posts/${id}`;
  }

  try {
    return await axios.get(changableUrl);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostComments = async (postId) => {
  try {
    let changableUrl = url;

    if (postId) {
      changableUrl = `${url}/posts/${postId}/comments`;
    }
    return await axios.get(changableUrl);
  } catch (error) {
    console.log("something error");
  }
};
