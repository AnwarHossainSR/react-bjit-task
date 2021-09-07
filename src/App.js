import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import AddProduct from "./AddProduct";
import Home from "./Home";
import UpdateProduct from "./UpdateProduct";
import Protected from "./Protected";
import { users } from "./UserData";
import Details from "./Details";
import NotFound from "./NotFound";
//import DataContext from "./store/DataContext";

function App(props) {
  //console.log(DataContext._currentValue);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login data={users} />
          </Route>
          {/* <DataContext.Provider value={DataContext._currentValue}> */}
          {/* <Route path="/" exact>
            <Redirect to="/home" />
          </Route> */}

          <Route path="/add">
            <Protected Cmp={AddProduct} />
          </Route>
          <Route path="/posts/:id">
            <Details title="Update Product post" />
            {/* <Protected Cmp={UpdateProduct} /> */}
          </Route>
          <Route path="/post/update/:id">
            <UpdateProduct title="Update Product post" />
            {/* <Protected Cmp={UpdateProduct} /> */}
          </Route>
          <Route path="/">
            <Home />
          </Route>
          {/* <Route path="*">
            <NotFound />
          </Route> */}
          {/* </DataContext.Provider> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
