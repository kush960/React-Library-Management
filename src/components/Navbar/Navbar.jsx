import React from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const role = currentUser?.role;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <h2>Library Management System</h2>
        </div>
        <div className="links">
          {currentUser && (
            <>
              <Link className="link" to="/book-list">
                Book List
              </Link>
              {role == "admin" && (
                <Link className="link" to="/user-list">
                  User List
                </Link>
              )}
              {role != "user"  && (
                <Link className="link" to="/issue-request">
                  Issue Request
                </Link>
              )}
              {role == "user"  && (
                <Link className="link" to="/my-books">
                  My Books
                </Link>
              )}
              <span className="link" onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
