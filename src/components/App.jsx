import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import { Header } from "./Header";

import { AuthContextComponent } from "../contexts/authContext";
import { BooksContextComponent } from "../contexts/booksContext";

function App() {
  return (
    <AuthContextComponent>
      <BooksContextComponent>
        <Header />
        <main>
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
        </main>
      </BooksContextComponent>
    </AuthContextComponent>
  );
}

export default App;
