import React, { useEffect, useState } from "react";
// import "./EditBook.scss";
import { useNavigate, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const initialFormVals = { title: "", author: "", available: ""};

function EditBook() {
  const [formVals, setFormVals] = useState(initialFormVals);
  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await newRequest.get(
        `books/${params.bookId}`
      );
      setFormVals(response.data);
    };
    if (params.bookId) {
      fetchData();
    }
  }, []);

  const inputChangeHandler = (e) => {
    setFormVals({ ...formVals, [e.target.id]: e.target.value });
  };
  const EditBookHandler = async (e) => {
    e.preventDefault();
    if (params.bookId) {
      await newRequest.put(`books/${params.bookId}`, formVals);
      alert("Success");
      navigate("/book-list");
    }
  };

  return (
    <div className="addUser">
      <h2>Edit Book</h2>
      <form>
        <div className="inputGroup">
          <label htmlFor="title" className="label">
            Book Name
          </label>
          <input
            type="text"
            className="input"
            id="title"
            placeholder="Enter Book Name"
            onChange={inputChangeHandler}
            value={formVals.title}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="author" className="label">
            Author Name
          </label>
          <input
            type="text"
            className="input"
            id="author"
            placeholder="Enter Author Name"
            onChange={inputChangeHandler}
            value={formVals.author}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="available" className="label">
            Password
          </label>
          <input
            type="number"
            className="input"
            id="available"
            placeholder="Available Count"
            onChange={inputChangeHandler}
            value={formVals.available}
          />
        </div>
        <button onClick={EditBookHandler} className="btn btn-success">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditBook;
