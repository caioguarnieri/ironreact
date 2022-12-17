import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../contexts/booksContext";
import { BookDetails } from "../components/BookDetails";
import { DeleteModal } from "../components/DeleteModal";

function Book() {
  const { show } = useContext(BooksContext);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState("");

  const { id } = useParams();

  const [book, setBook] = useState({});

  const openDeleteModal = () => {
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  useEffect(() => {
    const loadBook = async () => {
      const response = await show(id);
      setBook(response);
    };

    loadBook();
  }, []);

  return (
    <>
      {book._id ? (
        <BookDetails
          {...book}
          openDeleteModal={openDeleteModal}
          setDeleteModalId={setDeleteModalId}
        />
      ) : (
        <div>Loading...</div>
      )}
      {deleteModalIsOpen && (
        <DeleteModal id={deleteModalId} close={closeDeleteModal} />
      )}
    </>
  );
}

export default Book;
