import React from 'react';
import Header from './Header';

function UpdateProduct(props) {
    console.log( 'First rendered -  Update Component ' )
    
    const changeValue = () => {
        console.log( 'rendered -  Update Component - same props' )
    }
    return (
        <>
            <Header />
            <div className="col-md-4 offset-md-4">
                <h1>{props.title}</h1><br/>
                <label className="float-left">Product Name</label>
                <input type="text"  className="form-control" />
                <br/>
                <label className="float-left">Price</label>
                <input type="text" className="form-control" />

                <br/>
                <label className="float-left">Description</label>
                <input type="text" className="form-control" />

                <br/><br/>
                <label className="float-left">Change Image</label><br/>
                <input type="file" className="form-control" />
                <br/>
                <button type="submit" onClick={changeValue}  className="btn btn-info btn-block">Update Product</button><br/><br/>
            </div>
        </>
    )
}

export default React.memo(UpdateProduct);