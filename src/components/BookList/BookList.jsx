
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import { approveBookService, issueBookService } from "../../Services/Services";
import newRequest from "../../utils/newRequest";

function BookList() {
  const [Books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selSctedUserId, setSelectedUserId] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const closeRef = useRef();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await newRequest.get("books");
      setBooks(response.data);
    } catch (error) {
      console.error("error msg is::", error.message);
    }
  };
  const fetchUsers = async (book) => {
    try {
      const response = await newRequest.get("users?role=user");
      setUsers(response.data);
      setSelectedBook(book)
    } catch (error) {
      console.error("error msg is::", error.message);
    }
  };

  const sendIssueRequest = async (book) => {
    try {
      let data = { ...book, studentId: currentUser.id };
      const response = await newRequest.post("requests", data);
      alert("Issue Request sent..");
    } catch (error) {
      console.error("error msg is::", error.message);
    }
  };
  const issueBookHandler = async () => {
    let data = { ...selectedBook, studentId: selSctedUserId };
    let res = await issueBookService(data);
    if (res) {
      alert("success");
      closeRef.current.click()
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3">All Books</h2>
      <Modal
        openModal={fetchUsers}
        users={users}
        onSelectChange={(e) => setSelectedUserId(e.target.value)}
        issueBookHandler={issueBookHandler}
        closeRef={closeRef}
      />
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
            {Books.map((book, i) => (
              <tr key={book.id}>
                <th scope="row">{i + 1}</th>
                <td>{book?.title}</td>
                <td>{book?.author}</td>
                <td>{book?.available}</td>
                {currentUser?.role == "user" ? (
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => sendIssueRequest(book)}
                    >
                      Issue
                    </button>
                  </td>
                ) : (
                  <td className="actionBtns">
                    <Link to={`/edit-book/${book.id}`}>
                      <button className="btn btn-secondary btn-sm">
                        Edit Book
                      </button>
                    </Link>

                    {currentUser?.role == "admin" && (
                      <button className="btn btn-warning btn-sm"  
                      type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                      onClick={()=>fetchUsers(book)}>
                        Issue
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
