import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import AddProduct from "./AddProduct";
import Home from "./Home";
import UpdateProduct from "./UpdateProduct";
import Protected from "./Protected";
import { users } from "./UserData";

function App(props) {
  //console.log(users());
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" key={props.id} component={Home} />
        <Route path="/login">
          <Login data={users} />
        </Route>
        <Route path="/add">
          <Protected Cmp={AddProduct} />
        </Route>
        <Route path="/update/:id" key={props.id}>
          <Protected Cmp={UpdateProduct} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
