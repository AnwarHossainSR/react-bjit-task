import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchPost, fetchPostComments } from "./api/api";
import Header from "./Header";

const Details = () => {
  const { id: id } = useParams();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const post = async () => {
      const data = await (await fetchPost(id)).data;
      setPost(data);
      const comment = await (await fetchPostComments(data.id)).data;
      setComments(comment);
    };
    post();
  }, []);

  return (
    <>
      <Header />
      {localStorage.getItem("user-info") ? (
        <div className="container my-3">
          <div className="row">
            <div className="col-md-12">
              <div className=" mb-5 card mt-2">
                <h3 className="mt-4">{post.title}</h3>
                <p className="my-5">{post.body}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <h2>Total Comments : {comments.length}</h2>
            <div className="row">
              <div className="container">
                {comments.length > 0
                  ? comments.map((comment, i) => (
                      <div className="">
                        <div
                          key={i}
                          className="card mb-2 d-flex justify-content-around"
                        >
                          <p>Comment-{i} : </p>
                          <p className="m-3">{comment.body}</p>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Please Login first</h2>
      )}
    </>
  );
};

export default Details;
