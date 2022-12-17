import React, { useState, createContext } from "react";
import api from "../apis/api";

const BooksContext = createContext({});

function BooksContextComponent(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function upload(file) {
    console.log(file);
    const formData = new FormData();
    formData.append("coverImage", file);
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
    });
    console.log(response);
    if (response.status === 201) {
      return response.data.url;
    }
  }

  async function list() {
    setLoading(true);
    const response = await api.get("/book");

    if (response.status === 200) {
      setBooks(response.data);
    }

    setLoading(false);

    console.log(response);
  }

  async function show(id) {
    setLoading(true);
    const response = await api.get(`/book/${id}`);
    setLoading(false);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  }

  async function create({ author, title, synopsis, releaseYear, genre, file }) {
    setLoading(true);

    let coverImage;

    if (file) {
      coverImage = await upload(file);
      console.log(coverImage);
    }

    const response = await api.post("/book", {
      author,
      title,
      synopsis,
      releaseYear,
      genre,
      coverImage,
    });
    console.log(response);

    setLoading(false);
    if (response.status === 201) {
      setBooks([...books, response.data]);
      return true;
    }
  }

  async function update({ title, synopsis, releaseYear, genre, file }, id) {
    setLoading(true);

    let coverImage;

    if (file) {
      coverImage = await upload(file);
      console.log(coverImage);
    }

    const response = await api.patch(`/book/${id}`, {
      title,
      synopsis,
      releaseYear,
      genre,
      coverImage,
    });
    console.log(response);

    setLoading(false);

    if (response.status === 200) {
      const updatedBooks = books.map((book) => {
        if (book._id === id) {
          book = { ...response.data };
        }
        return book;
      });
      setBooks(updatedBooks);
      return true;
    }
  }

  async function destroy(id) {
    setLoading(true);
    const response = await api.delete(`/book/${id}`);
    setLoading(false);
    console.log(response);

    if (response.status === 204) {
      const filteredBooks = books.filter((book) => book._id !== id);
      setBooks(filteredBooks);
    }
  }

  return (
    <BooksContext.Provider
      value={{ books, list, show, create, update, destroy, loading }}
    >
      {props.children}
    </BooksContext.Provider>
  );
}

export { BooksContextComponent, BooksContext };
