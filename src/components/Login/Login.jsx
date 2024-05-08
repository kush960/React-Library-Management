import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const initialFormVals = { email: "", password: "" };

function Login() {
  const [formVals, setFormVals] = useState(initialFormVals);

  let navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(currentUser){
      navigate("/book-list");
    }
  }, []);

  const inputChangeHandler = (e) => {
    setFormVals({ ...formVals, [e.target.id]: e.target.value });
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formVals;

    const response = await newRequest.get(
      `users?email=${email}&password=${password}`
    );
    console.log("Login response>>", response);
    if (response.data[0]?.isBlocked) {
      alert("You are blocked by admin..");
    } else if (response?.data?.length == 0) {
      alert("Invalid Credentials..");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(response?.data[0]));
      navigate("/book-list");
    }
  };

  return (
    <div className="addUser">
      <h2>Please Login</h2>
      <form>
        <div className="inputGroup">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            className="input"
            id="email"
            placeholder="Enter Email"
            onChange={inputChangeHandler}
            value={formVals.email}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            className="input"
            id="password"
            placeholder="Enter Password"
            onChange={inputChangeHandler}
            value={formVals.password}
          />
        </div>
        <button onClick={LoginHandler} className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
