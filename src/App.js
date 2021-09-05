import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import AddProduct from "./AddProduct";
import Home from "./Home";
import UpdateProduct from "./UpdateProduct";
import Protected from "./Protected";
import { users } from "./UserData";
import DataContext from "./store/DataContext";

function App( props ) {
  //console.log(DataContext._currentValue.data)
  return (
    <div className="App">
      <BrowserRouter>
      <Route path="/login">
          <Login data={users} />
        </Route>
        <DataContext.Provider value={DataContext}>
        <Route exact path="/" component={Home} />
        <Route path="/add">
          <Protected Cmp={AddProduct} />
        </Route>
          <Route path="/update/:id" key={ props.id }>
            <UpdateProduct title="Update Product post" />
          {/* <Protected Cmp={UpdateProduct} /> */}
        </Route>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
