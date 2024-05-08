import React, { useEffect, useState } from "react";
import "./AddEditUser.scss";
import { useNavigate, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const initialFormVals = { name: "", email: "", password: "", role: "user","issuedBooks": [] };

function AddEditUser() {
  const [formVals, setFormVals] = useState(initialFormVals);
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await newRequest.get(
        `users/${params.userId}`
      );
      console.log(response.data);
      setFormVals(response.data);
    };
    if (params.userId) {
      fetchData();
    }
  }, []);

  const inputChangeHandler = (e) => {
    setFormVals({ ...formVals, [e.target.id]: e.target.value });
  };
  const addEditUser = async (e) => {
    e.preventDefault();
    if(params.userId){
      await newRequest.put(`users/${params.userId}`, formVals)
    }
    else{
      await newRequest.post("users", formVals);
    }
    alert("Success");
    navigate("/user-list");
  };

  return (
    <div className="addUser">
      <h2>{params.userId ? "Edit" : "Add"} User</h2>
      <form>
        <div className="inputGroup">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            className="input"
            id="name"
            placeholder="Enter Name"
            onChange={inputChangeHandler}
            value={formVals.name}
          />
        </div>
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
        <button onClick={addEditUser} className="btn btn-success">
         {params.userId ? "Edit" : "Add"} 
        </button>
      </form>
    </div>
  );
}

export default AddEditUser;
