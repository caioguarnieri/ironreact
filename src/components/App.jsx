import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Book from "../pages/Book";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

import { AuthContextComponent } from "../contexts/authContext";
import { Header } from "./Header";
import CreateBook from "../pages/book/Create";
import EditBook from "../pages/book/Edit";
import { BooksContextComponent } from "../contexts/booksContext";

function App() {
  return (
    <AuthContextComponent>
      <Header />
      <main>
        <BooksContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<Book />} />
            <Route
              path="/book/create"
              element={<ProtectedRoute component={CreateBook} />}
            />
            <Route
              path="/book/edit/:id"
              element={<ProtectedRoute component={EditBook} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BooksContextComponent>
      </main>
    </AuthContextComponent>
  );
}

export default App;
