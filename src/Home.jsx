import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Header from "./Header";
import DataContext from './store/DataContext'

const Home = () => {
  const [data, setData] = useState( [] );
  const ctxData = useContext( DataContext )
  useEffect( () => {
    console.log("called useEffect hook")
    setData(ctxData._currentValue.data);
    //calbackExample()
  }, [data] );
  
  const calbackExample = useCallback(
    () => {
      console.log("called useCallback hook")
      setData(ctxData._currentValue.data);
    },
    []
  );
  

  return (
    <div>
      <Header />
      {localStorage.getItem("user-info") ? (
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-1">
              <h1 className="text-center text-primary py-3">All Products</h1>
              <button className="btn btn-primary mb-3" onClick={calbackExample}>Refresh with useCallback</button>
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
                  {data.map((item,i) => (
                    <tr key={i}>
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
