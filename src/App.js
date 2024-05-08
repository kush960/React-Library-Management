import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import BookList from "./components/BookList/BookList";
import AddEditUser from "./components/AddEditUser/AddEditUser";
import Login from "./components/Login/Login";
import EditBook from "./components/EditBook/EditBook";
import IssueRequests from "./components/IssueRequests/IssueRequests";
import MyBooks from "./components/MyBooks/MyBooks";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/add-edit-user" element={<AdminRoute><AddEditUser/></AdminRoute>} />
        <Route path="/add-edit-user/:userId" element={<AdminRoute><AddEditUser/></AdminRoute>} />
        <Route path="/user-list" element={<AdminRoute><UserList/></AdminRoute>} />
        <Route path="/book-list" element={<ProtectedRoute><BookList/></ProtectedRoute>} />
        <Route path="/edit-book/:bookId" element={<AdminLibrarianRoute><EditBook/></AdminLibrarianRoute>} />
        <Route path="/issue-request" element={<AdminLibrarianRoute><IssueRequests/></AdminLibrarianRoute>} />
        <Route path="/my-books" element={<MyBooks/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;


const AdminRoute =({children})=>{
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if(currentUser?.role == "admin"){
    return children
  }
  else{
    return <Navigate to="/book-list" replace />
  }
}

const ProtectedRoute=({children})=>{
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if(currentUser){
    return children
  }
  else{
    return <Navigate to="/login" replace />
  }
}
const AdminLibrarianRoute=({children})=>{
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if(currentUser?.role == "librarian" || currentUser?.role == "admin"){
    return children
  }
  else{
    return <Navigate to="/book-list" replace />
  }
}
