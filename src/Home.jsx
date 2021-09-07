import React, { useEffect, useState, useContext, useCallback } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Header from "./Header";
//import DataContext from "./store/DataContext";
import { fetchPosts } from "./api/api";

const sortPosts = (quotes, ascending) => {
  return quotes.sort((postA, postB) => {
    if (ascending) {
      return postA.id > postB.id ? 1 : -1;
    } else {
      return postA.id < postB.id ? 1 : -1;
    }
  });
};

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get("sort") === "asc";
  const sortedQuotes = sortPosts(posts, isSortingAscending);
  //setPosts(sortedQuotes);
  //const ctxData = useContext(DataContext);
  useEffect(() => {
    const posts = async () => {
      const data = await (await fetchPosts()).data;
      setPosts(data);
    };
    posts();
    //setData(ctxData);
    //calbackExample()
  }, [posts]);

  // const calbackExample = useCallback(() => {
  //   console.log("called useCallback hook");
  //   setData(ctxData);
  // }, [ctxData]);

  const deletePost = (id) => {
    // fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
    //   method: "DELETE",
    // });
  };
  const changeSortingHandler = () => {
    history.push("/posts?sort=" + (isSortingAscending ? "desc" : "asc"));
    // history.push({
    //   pathname: location.pathname,
    //   search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    // });
  };

  return (
    <div>
      <Header />
      {localStorage.getItem("user-info") ? (
        <div className="container mt-5 mb-3">
          <div className="card mb-3">
            <div className="row my-3">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={changeSortingHandler}
                >
                  Sort {isSortingAscending ? "Descending" : "Ascending"}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {posts.map((post, i) => (
              <div className="col-md-4" key={i}>
                <div className="card p-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <div className="ms-2 c-details d-flex justify-content-between">
                        <h6 className="mb-0">Mailchimp</h6>{" "}
                        <Link className="ml-5" to={`/post/update/${post.id}`}>
                          Edit
                        </Link>
                        <button className="ml-5" onClick={deletePost(post.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link to={`posts/${post.id}`} className="heading">
                      {post.title}
                    </Link>
                    <div className="mt-5">
                      <div className="mt-3">
                        <span className="text1">32 comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>Please Login first</h2>
      )}
    </div>
  );
};

export default Home;
