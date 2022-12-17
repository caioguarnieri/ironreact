import React, { useContext, useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import { DeleteModal } from "../components/DeleteModal";
import { BooksContext } from "../contexts/booksContext";

function Home() {
  const { books, list } = useContext(BooksContext);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState("");

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <>
      {books[0] ? (
        <ul className="booklist">
          {books.map((book) => (
            <BookCard
              key={book._id}
              {...book}
              openDeleteModal={openDeleteModal}
              setDeleteModalId={setDeleteModalId}
            />
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
      {deleteModalIsOpen && (
        <DeleteModal id={deleteModalId} close={closeDeleteModal} />
      )}
    </>
  );
}

export default Home;
