import React, { useState } from "react";
import Header from "./Header";
import { useHistory, Prompt } from "react-router-dom";

function AddProduct() {
  const histry = useHistory();
  const [title, setName] = useState("");
  const [body, setPrice] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  async function addPost(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user-info"));

    if (title === "") {
      alert("title must required");
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
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
  }
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <Header />
      <div className="col-md-4 offset-md-4">
        <h1>Add Product</h1>
        <br />
        <form onFocus={formFocusedHandler} onSubmit={addPost}>
          <label className="float-left">post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />

          <br />
          <label className="float-left">Body</label>
          <textarea
            type="text"
            value={body}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          ></textarea>

          <br />
          <button
            type="submit"
            onClick={finishEnteringHandler}
            className="btn btn-info btn-block"
          >
            Add Post
          </button>
        </form>
      </div>
    </>
  );
}
export default AddProduct;
