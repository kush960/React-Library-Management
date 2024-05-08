import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { approveBookService } from "../../Services/Services";
import newRequest from "../../utils/newRequest";

function IssueRequests() {
  const [Requests, setRequests] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await newRequest.get("requests");
      setRequests(response.data);
    } catch (error) {
      console.error("error msg is::", error.message);
    }
  };

  const approveHandler = async (data) => {
    let res = await approveBookService(data);
    if (res) {
      fetchRequests();
    }
  };
  const rejectHandler = async (data) => {
    try {
      const response = await newRequest.delete(`requests/${data.id}`);
      alert("success");
      fetchRequests();
    } catch (error) {
      console.error("error msg is::", error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3">Issue Requests</h2>
      {Requests?.length > 0 ? (
        <div className="list">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Author</th>
                <th scope="col">Available</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Requests.map((data, i) => (
                <tr key={data.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data?.title}</td>
                  <td>{data?.author}</td>
                  <td>{data?.available}</td>
                  <td className="actionBtns">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => approveHandler(data)}
                    >
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm" 
                     onClick={() => rejectHandler(data)} >Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2 className="error">You don't have any requests..</h2>
      )}
    </div>
  );
}

export default IssueRequests;
