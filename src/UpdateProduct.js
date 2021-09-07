import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchPost } from "./api/api";
import { useHistory, useParams } from "react-router-dom";

function UpdateProduct(props) {
  const { id: id } = useParams();

  const histry = useHistory();
  const [post, setPost] = useState([]);
  const [title, setName] = useState("");
  const [body, setPrice] = useState("");
  const user = JSON.parse(localStorage.getItem("user-info"));
  useEffect(() => {
    const post = async () => {
      const data = await (await fetchPost(id)).data;
      setPost(data);
    };
    post();
  }, []);

  const updatePost = () => {
    if (title === "") {
      alert("title must required");
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
        method: "PUT",
        body: JSON.stringify({
          id: post.id,
          title: title,
          body: body,
          userId: user.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          histry.push("/");
        });
    }
  };

  return (
    <>
      <Header />
      <div className="col-md-4 offset-md-4">
        <h1>{props.title}</h1>
        <br />
        <label className="float-left">Title</label>
        <input
          type="text"
          defaultValue={post.title}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
        <br />
        <label className="float-left">Body</label>
        <textarea
          type="text"
          defaultValue={post.body}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
        ></textarea>

        <br />
        <button
          type="submit"
          onClick={updatePost}
          className="btn btn-info btn-block"
        >
          Update Product
        </button>
        <br />
        <br />
      </div>
    </>
  );
}

export default React.memo(UpdateProduct);
