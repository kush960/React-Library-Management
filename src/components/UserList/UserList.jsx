import React, { useEffect, useState } from "react";
import "./UserList.scss";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";


function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchUsers();
  }, []);

  const FetchUsers = async () => {
    const response = await newRequest.get("users?role=user");
    console.log(response.data);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    const response = await newRequest.delete(
      `users/${userId}`
    );
    FetchUsers();
  };

  const toggleBlock = async (userId, user) => {
    const response = await newRequest.put(`users/${userId}`, {
      ...user,
      isBlocked: !user.isBlocked,
    });
    console.log(response);
    FetchUsers();
  };
  const editUser = (userId) => {
    navigate(`/add-edit-user/${userId}`);
  };

  return (
    <div className="container">
      <div className="info">
        <h2>Users</h2>
        <Link className="link" to="/add-edit-user">
          <button className="btn btn-primary">Add User</button>
        </Link>
      </div>

      {users?.length > 0 ? (
        <div className="list">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <th scope="row">1</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td className="actionBtns">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => editUser(user.id)}
                    >
                      Edit User
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => toggleBlock(user.id, user)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"} User
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="error">Please add users first...</h2>
      )}
    </div>
  );
}

export default UserList;
