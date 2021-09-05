import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function Login(props) {
  const data = props.data;
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      histry.push("/add");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [perror, psetError] = useState("");
  const [error, setError] = useState("");
  const [ferror, fsetError] = useState("");
  const histry = useHistory();

  async function validate() {
    let item = { email, password };
    if (data.length === 0) {
      fsetError("Something is wrong");
    } else {
      if (email == "" || password == "") {
        fsetError("Both fields are required");
      } else {
        data
          .filter(
            (user) =>
              user.email === item.email && user.password === item.password
          )
          .map((filteredPerson) => {
            localStorage.setItem("user-info", JSON.stringify(filteredPerson));
            histry.push("/add");
          });
        if (!localStorage.getItem("user-info")) {
          fsetError("Email or password is not matched");
        }
      }
    }
  }

  const EmailCheck = async (e) => {
    setEmail(e.target.value);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (email.length == 0) {
      setPasswordError(true);
      setError("Email is required");
    }
    if (!pattern.test(email)) {
      setEmailError(true);
      setError("please provide a valid email address");
    } else {
      setEmailError(false);
      setError("");
    }
  };

  const PasswordCheck = async (e) => {
    setPassword(e.target.value);
    // if (password.length == 0) {
    //   setPasswordError(true);
    //   psetError("Password is required");
    // }
    if (password.length < 6) {
      setPasswordError(true);
      psetError("Password must be grater than 6");
    }
    if (password.length >= 6) {
      setPasswordError(false);
      psetError("");
    }
  };

  return (
    <>
      <Header />
      <div className="col-md-4 offset-md-4">
        <h1>Sign In</h1>
        <br />
        {ferror && <p className="text-danger">{ferror}</p>}
        <br />
        <label className="float-left">Email</label>
        <input
          type="email"
          value={email}
          onChange={EmailCheck}
          className="form-control"
        />
        <label className="text-danger float-left">{emailError && error}</label>
        <br />
        <label className="float-left">Password</label>
        <input
          type="password"
          value={password}
          onChange={PasswordCheck}
          className="form-control"
        />
        <label className="text-danger float-left">
          {passwordError && perror}
        </label>
        <br />
        <button
          type="submit"
          onClick={validate}
          className="btn btn-info btn-block"
        >
          Sign In
        </button>
      </div>
    </>
  );
}

export default Login;
