import React,{useEffect, useState} from 'react';
import Header from './Header';
import { useHistory,withRouter } from 'react-router-dom'

function UpdateProduct(props) {
    const [data, setData] = useState([]);

    useEffect(async () => {
        let result = await fetch("http://localhost:8000/api/productget/"+props.match.params.id)
        result = await result.json()
        setData(result)
    })
    return (
        <>
            <Header />
            <div className="col-md-4 offset-md-4">
                <h1>Update Product</h1><br/>
                <label className="float-left">Product Name</label>
                <input type="text" defaultValue={data.name} className="form-control" />
                <br/>
                <label className="float-left">Price</label>
                <input type="text" defaultValue={data.price} className="form-control" />

                <br/>
                <label className="float-left">Description</label>
                <input type="text" defaultValue={data.description} className="form-control" />

                <br/>
                <img src={"http://127.0.0.1:8000/" + data.file_path} width="100%" height="320"/>
                <br/><br/>
                <label className="float-left">Change Image</label><br/>
                <input type="file" className="form-control" />
                <br/>
                <button type="submit"  className="btn btn-info btn-block">Update Product</button><br/><br/>
            </div>
        </>
    )
}

export default withRouter(UpdateProduct);