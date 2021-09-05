import React, { useState } from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";

function AddProduct() {
  const histry = useHistory();
  const [name, setName] = useState("");
  const [file_path, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function addProduct() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file_path", file_path);
    formData.append("price", price);
    if (formData.name === "") {
      alert("name must required");
    } else {
      // formData.append('description',description)
      // let result = await fetch('http://127.0.0.1:8000/api/add-product',{
      //     method:'POST',
      //     body:formData
      // });
      histry.push("/add");
    }
  }
  return (
    <>
      <Header />
      <div className="col-md-4 offset-md-4">
        <h1>Add Product</h1>
        <br />
        <label className="float-left">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />

        <br />
        <label className="float-left">Upload Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
        />

        <br />
        <label className="float-left">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
        />

        <br />
        <label className="float-left">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />

        <br />
        <button
          type="submit"
          onClick={addProduct}
          className="btn btn-info btn-block"
        >
          Add Product
        </button>
      </div>
    </>
  );
}
export default AddProduct;
