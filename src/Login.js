import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

const emailReducer = (state, action) => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  if (action.val.length === 0) {
    return {
      value: action.val,
      isValid: "Email is required",
      type: action.type,
    };
  }
  if (!pattern.test(action.val)) {
    return {
      value: action.val,
      isValid: "please provide a valid email address",
      type: action.type,
    };
  }

  return { value: action.val, isValid: true, type: action.type };
};

const passwordReducer = (state, action) => {
  if (action.val.length === 0) {
    return {
      value: action.val,
      isValid: "Password is required",
      type: action.type,
    };
  }
  if (action.val.length < 6) {
    return {
      value: action.val,
      isValid: "Password must be grater than 6",
      type: action.type,
    };
  }

  return { value: action.val, isValid: true, type: action.type };
};

const Login = (props) => {
  //console.log("Login COmponet rendering with React.memo()");

  const data = props.data;
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
    type: "",
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
    type: "",
  });
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const [error, setErrorMessage] = useState("");
  const histry = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      histry.push("/");
    }
    setFormIsValid(emailIsValid && passwordIsValid);
    // return () => {
    // };
  }, [emailIsValid, passwordIsValid, histry]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "email", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "password", val: event.target.value });
  };

  async function validate() {
    let item = { email: emailState.value, password: passwordState.value };
    data
      .filter(
        (user) => user.email === item.email && user.password === item.password
      )
      .map((filteredPerson) => {
        localStorage.setItem("user-info", JSON.stringify(filteredPerson));
        histry.push("/");
      });
    if (!localStorage.getItem("user-info")) {
      setErrorMessage("Email or password is not matched");
    }
  }

  return (
    <>
      <Header />
      <div className="col-md-4 offset-md-4">
        <h1>Sign In</h1>
        {error && <p className="text-danger">{error}</p>}
        <br />
        <br />
        <label className="float-left">Email</label>
        <input
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          className="form-control"
        />
        <label className="text-danger float-left">
          {emailState.isValid && emailState.isValid}
        </label>
        <br />
        <label className="float-left">Password</label>
        <input
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          className="form-control"
        />
        <br />
        <label className="text-danger float-left">
          {passwordState.isValid && passwordState.isValid}
        </label>
        <button
          type="submit"
          onClick={validate}
          className="btn btn-info btn-block"
          disabled={!formIsValid}
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default React.memo(Login);
