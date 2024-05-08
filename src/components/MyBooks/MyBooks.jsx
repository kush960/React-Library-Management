import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";

function MyBooks() {
  const [Books, setBooks] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await newRequest.get(
        `users/${currentUser.id}`
      );
      setBooks(response.data.issuedBooks);
    } catch (error) {
      console.error("error msg is::", error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-3">My Books</h2>
      {Books?.length > 0 ? (
     <div className="list">
     <table className="table table-striped ">
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Name</th>
           <th scope="col">Author</th>
         </tr>
       </thead>
       <tbody>
         {Books.map((book, i) => (
           <tr key={book.id}>
             <th scope="row">{i + 1}</th>
             <td>{book?.title}</td>
             <td>{book?.author}</td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
      )
      :
      <h2 className="error">You don't have any issue book yet..</h2>
      }
    </div>
  );
}

export default MyBooks;
