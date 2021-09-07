import React from "react";
import { fetchPosts, fetchPost, fetchPostComments } from "../api/api";

const DataContext = React.createContext({
  postComments: fetchPostComments(),
  fetchPost: fetchPost(),
});

export default DataContext;
