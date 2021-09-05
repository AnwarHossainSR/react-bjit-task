import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Header from "./Header";
import Swal from "sweetalert2";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { products } from "./UserData";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setData(products);
  }

  return (
    <div>
      <Header />
      {localStorage.getItem("user-info") ? (
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-1">
              <h1 className="text-center text-primary py-3">All Products</h1>
              <Table id="example" striped hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.description}</td>
                      <td>
                        <Link to={"update/" + item.id} key={item.id}>
                          <i className="fa fa-2x fa-edit text-primary" />
                        </Link>
                        <i
                          className="ml-2 fa fa-2x fa-trash text-danger mr-2"
                          // onClick={() => deleteProduct(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <h2>Please Login first</h2>
      )}
    </div>
  );
};

export default Home;
